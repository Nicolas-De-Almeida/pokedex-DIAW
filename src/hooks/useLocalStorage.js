import { useEffect, useState } from 'react'

// Estado persistido no localStorage (favoritos, tema...)
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // armazenamento indisponível: mantém apenas em memória
    }
  }, [key, value])

  return [value, setValue]
}
