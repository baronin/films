import {useState, useEffect, useRef} from "react"

function useLocalStorage(
  key,
  initVal = "",
  {serialize = JSON.stringify, desirialize = JSON.parse} = {},
) {
  const [state, setState] = useState(() => {
    const val = localStorage.getItem(key)
    if (val) {
      return desirialize(val)
    }
    return typeof initVal === "function" ? initVal() : initVal
  })

  const keyRef = useRef(key)

  useEffect(() => {
    const prevKey = keyRef.current
    if (prevKey !== key) {
      localStorage.removeItem(prevKey)
    }
    keyRef.current = key
    localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]
}

export default useLocalStorage
