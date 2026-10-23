import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { supabase, fetchFavorites, addFavorites, removeFavorite } from '../services/supabase'

// Favoritos salvos no Supabase, com o localStorage como cópia local e fallback.
// status: 'local' (Supabase não configurado) | 'loading' | 'online' | 'error'
export default function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('pokedex:favorites', [])
  const [status, setStatus] = useState(supabase ? 'loading' : 'local')

  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    fetchFavorites()
      .then(async (remote) => {
        // Envia ao banco os favoritos marcados antes (ou durante) a conexão
        const localOnly = favorites.filter((id) => !remote.includes(id))
        if (localOnly.length > 0) await addFavorites(localOnly)
        if (!cancelled) {
          setFavorites([...remote, ...localOnly])
          setStatus('online')
        }
      })
      .catch((err) => {
        console.error('Supabase: não foi possível carregar os favoritos', err)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // carrega apenas uma vez, ao montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFavorite = (id) => {
    const isFavorite = favorites.includes(id)
    setFavorites((prev) => (isFavorite ? prev.filter((f) => f !== id) : [...prev, id]))

    if (status !== 'online') return

    const request = isFavorite ? removeFavorite(id) : addFavorites([id])
    request.catch((err) => {
      console.error('Supabase: não foi possível salvar o favorito', err)
      setStatus('error')
    })
  }

  return { favorites, toggleFavorite, status }
}
