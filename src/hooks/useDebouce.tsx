import React, { useState, useEffect } from "react"

interface DebounceProps {
  value: string
  delay: number
}
const useDebounce = (value: string, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const processDebounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    //Return cleanup function to remove timer
    return () => {
      clearTimeout(processDebounce)
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
