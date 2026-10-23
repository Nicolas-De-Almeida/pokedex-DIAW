import { useEffect, useState } from 'react'

// Busca informações complementares (descrição, altura, peso) na PokéAPI.
// A Pokédex funciona normalmente se a API estiver indisponível.
export default function usePokemonSpecies(id) {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    setInfo(null)
    setLoading(true)

    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal }).then((r) => r.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, { signal: controller.signal }).then((r) => r.json()),
    ])
      .then(([pokemon, species]) => {
        const entry =
          species.flavor_text_entries.find((e) => e.language.name === 'en') ?? species.flavor_text_entries[0]
        setInfo({
          height: pokemon.height / 10,
          weight: pokemon.weight / 10,
          abilities: pokemon.abilities.map((a) => a.ability.name),
          description: entry ? entry.flavor_text.replace(/[\f\n\r]/g, ' ') : '',
          genus: species.genera.find((g) => g.language.name === 'en')?.genus ?? '',
        })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setInfo({ error: true })
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [id])

  return { info, loading }
}
