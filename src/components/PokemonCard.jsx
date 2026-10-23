import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import { STATS, TYPE_COLORS, formatId } from '../utils/pokemon'
import '../css/PokemonCard.css'

export default function PokemonCard({ pokemon, isFavorite, isComparing, onSelect, onToggleFavorite, onToggleCompare }) {
  const mainColor = TYPE_COLORS[pokemon.types[0].name]

  return (
    <article
      className={`pokemon-card ${isComparing ? 'is-comparing' : ''}`}
      style={{ '--type-color': mainColor }}
      onClick={() => onSelect(pokemon.id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pokemon.id)}
    >
      <div className="pokemon-card__top">
        <span className="pokemon-card__id">{formatId(pokemon.id)}</span>
        <div className="pokemon-card__buttons">
          <button
            className={`icon-btn ${isComparing ? 'is-on' : ''}`}
            title="Comparar"
            onClick={(e) => {
              e.stopPropagation()
              onToggleCompare(pokemon.id)
            }}
          >
            ⚔️
          </button>
          <button
            className={`icon-btn ${isFavorite ? 'is-on' : ''}`}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(pokemon.id)
            }}
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
        </div>
      </div>

      <div className="pokemon-card__image">
        <PokemonImage pokemon={pokemon} />
      </div>

      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <div className="pokemon-card__types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} type={t.name} small />
        ))}
      </div>

      <ul className="pokemon-card__stats">
        {STATS.map((stat) => (
          <li key={stat.key} title={stat.label}>
            <span aria-hidden="true">{stat.icon}</span>
            <strong>{pokemon.stats[stat.key]}</strong>
            <small>{stat.label}</small>
          </li>
        ))}
      </ul>
    </article>
  )
}
