import {useState, useEffect} from "react"

function useDebounce(val, delay = 1500) {
  const [debounce, setDebounce] = useState(val)
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(val), delay)
    return () => {
      clearTimeout(timer)
    }
  }, [delay, val])

  return debounce
}

export default useDebounce
