import {useReducer, useCallback, useRef} from "react"
import useMounted from "./useMounted"

function useSafedDispatch(dispatch) {
  const mounted = useMounted()

  return useCallback(
    (...args) => {
      if (mounted) {
        return dispatch(...args)
      }
    },
    [dispatch, mounted],
  )
}

const defaultState = {status: "idle", data: null, error: null}

function useAsync(initialState = {}) {
  const initStateRef = useRef({
    ...defaultState,
    ...initialState,
  })

  const [{data, status, error}, unsafeDispatch] = useReducer(
    (a, b) => ({...a, ...b}),
    initStateRef.current,
  )

  const dispatch = useSafedDispatch(unsafeDispatch)

  const setData = useCallback(data => dispatch({data, status: "resolved"}), [
    dispatch,
  ])

  const setError = useCallback(error => dispatch({error, status: "rejected"}), [
    dispatch,
  ])

  const reset = useCallback(() => dispatch(initStateRef.current), [dispatch])

  const run = useCallback(
    promise => {
      if (!promise) {
        return
      }
      dispatch({status: "pending"})

      promise.then(
        data => {
          setData(data)
          return data
        },
        error => {
          setError(error)
          return error
        },
      )
    },
    [dispatch, setData, setError],
  )

  return {
    data,
    run,
    status,
    error,
    setData,
    setError,
    reset,
    isLoading: status === "pending",
    isSuccess: status === "resolved",
    isError: status === "rejected",
    isIdle: status === "idle",
  }
}

export default useAsync
