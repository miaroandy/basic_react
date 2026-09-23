import { useEffect, useState } from 'react'

/** Retarde une valeur (ex. champ de recherche) pour éviter trop d'appels API. */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
