import { useState } from 'react'
import { artworkUrl, spriteUrl } from '../utils/pokemon'

// Tenta a arte oficial, depois o sprite e por fim uma Pokébola local
export default function PokemonImage({ pokemon, className }) {
  const sources = [artworkUrl(pokemon.id), spriteUrl(pokemon.id), '/pokeball.svg']
  const [attempt, setAttempt] = useState(0)

  return (
    <img
      className={className}
      src={sources[attempt]}
      alt={pokemon.name}
      loading="lazy"
      onError={() => setAttempt((a) => Math.min(a + 1, sources.length - 1))}
    />
  )
}
