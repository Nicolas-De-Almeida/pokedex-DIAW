import Modal from './Modal'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import PokemonImage from './PokemonImage'
import usePokemonSpecies from '../hooks/usePokemonSpecies'
import { STATS, TYPE_COLORS, formatId, totalStats, typeGradient } from '../utils/pokemon'
import '../css/PokemonDetails.css'

export default function PokemonDetails({ pokemon, trainers, isFavorite, onToggleFavorite, onClose, onPrev, onNext }) {
  const { info, loading } = usePokemonSpecies(pokemon.id)
  const color = TYPE_COLORS[pokemon.types[0].name]

  return (
    <Modal onClose={onClose} labelledBy="details-title">
      <div className="details">
        <div className="details__hero" style={{ background: typeGradient(pokemon.types) }}>
          <button className="details__nav details__nav--prev" onClick={onPrev} aria-label="Anterior">
            ‹
          </button>
          <PokemonImage key={pokemon.id} pokemon={pokemon} className="details__image" />
          <button className="details__nav details__nav--next" onClick={onNext} aria-label="Próximo">
            ›
          </button>
        </div>

        <div className="details__body">
          <div className="details__title">
            <div>
              <span className="details__id">{formatId(pokemon.id)}</span>
              <h2 id="details-title">{pokemon.name}</h2>
              {info?.genus && <p className="details__genus">{info.genus}</p>}
            </div>
            <button className="btn" onClick={() => onToggleFavorite(pokemon.id)}>
              {isFavorite ? '⭐ Favorito' : '☆ Favoritar'}
            </button>
          </div>

          <div className="details__types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} type={t.name} />
            ))}
          </div>

          {loading && <p className="details__muted">Carregando informações da PokéAPI...</p>}
          {info && !info.error && (
            <>
              <p className="details__description">{info.description}</p>
              <ul className="details__facts">
                <li>
                  <small>Altura</small>
                  <strong>{info.height} m</strong>
                </li>
                <li>
                  <small>Peso</small>
                  <strong>{info.weight} kg</strong>
                </li>
                <li>
                  <small>Habilidades</small>
                  <strong>{info.abilities.join(', ')}</strong>
                </li>
              </ul>
            </>
          )}

          <h3>📊 Atributos</h3>
          <div className="details__stats">
            {STATS.map((stat) => (
              <StatBar
                key={stat.key}
                label={stat.label}
                icon={stat.icon}
                value={pokemon.stats[stat.key]}
                color={color}
              />
            ))}
            <p className="details__total">
              Total: <strong>{totalStats(pokemon)}</strong>
            </p>
          </div>

          {trainers.length > 0 && (
            <>
              <h3>🧑‍🚀 Treinadores</h3>
              <div className="details__trainers">
                {trainers.map((t) => (
                  <span key={t.id} className="details__trainer">
                    {t.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
