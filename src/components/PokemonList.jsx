import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

export default function PokemonList({ pokemon, favorites, compareIds, onSelect, onToggleFavorite, onToggleCompare, onReset }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty-state">
        <img src="/pokeball.svg" alt="" />
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente outro nome, ID ou tipo.</p>
        <button className="btn btn--primary" onClick={onReset}>
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <>
      <p className="pokemon-list__count">{pokemon.length} Pokémon encontrado(s)</p>
      <div className="pokemon-list">
        {pokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            isFavorite={favorites.includes(p.id)}
            isComparing={compareIds.includes(p.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </>
  )
}
