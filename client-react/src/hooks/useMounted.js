import {useRef, useLayoutEffect} from "react"

const useMounted = () => {
  const mountedRef = useRef()

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return mountedRef
}

export default useMounted
