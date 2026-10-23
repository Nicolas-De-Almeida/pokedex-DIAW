import Modal from './Modal'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import { STATS, TYPE_COLORS, formatId, totalStats } from '../utils/pokemon'
import '../css/ComparePanel.css'

// Barra flutuante que mostra a seleção atual para comparação
export function CompareBar({ selected, onOpen, onClear }) {
  if (selected.length === 0) return null

  return (
    <div className="compare-bar">
      <span>⚔️ {selected.map((p) => p.name).join(' vs ')}</span>
      {selected.length < 2 && <small>Selecione mais um Pokémon</small>}
      <button className="btn btn--primary" disabled={selected.length < 2} onClick={onOpen}>
        Comparar
      </button>
      <button className="btn" onClick={onClear}>
        Limpar
      </button>
    </div>
  )
}

export default function ComparePanel({ pair, onClose }) {
  const [a, b] = pair
  const totalA = totalStats(a)
  const totalB = totalStats(b)
  const winner = totalA === totalB ? null : totalA > totalB ? a : b

  return (
    <Modal onClose={onClose} labelledBy="compare-title">
      <div className="compare">
        <h2 id="compare-title">⚔️ Comparação</h2>
        <div className="compare__grid">
          {[a, b].map((p, index) => {
            const other = index === 0 ? b : a
            return (
              <div key={p.id} className="compare__column">
                <PokemonImage pokemon={p} className="compare__image" />
                <span className="details__id">{formatId(p.id)}</span>
                <h3>{p.name}</h3>
                <div className="compare__types">
                  {p.types.map((t) => (
                    <TypeBadge key={t.id} type={t.name} small />
                  ))}
                </div>
                {STATS.map((stat) => (
                  <StatBar
                    key={stat.key}
                    label={stat.label}
                    icon={stat.icon}
                    value={p.stats[stat.key]}
                    compareValue={other.stats[stat.key]}
                    color={TYPE_COLORS[p.types[0].name]}
                  />
                ))}
                <p className="details__total">
                  Total: <strong>{totalStats(p)}</strong>
                </p>
              </div>
            )
          })}
        </div>
        <p className="compare__result">
          {winner ? `🏆 ${winner.name} tem mais pontos de atributos!` : '🤝 Empate nos atributos totais!'}
        </p>
      </div>
    </Modal>
  )
}
