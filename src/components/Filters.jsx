import { TYPE_COLORS, TYPE_ICONS } from '../utils/pokemon'
import '../css/Filters.css'

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'specialAttack', label: 'Ataque Especial' },
  { value: 'specialDefense', label: 'Defesa Especial' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'total', label: 'Total' },
]

const SYNC_STATUS = {
  local: { label: '💾 Salvo localmente', title: 'Supabase não configurado: favoritos salvos apenas neste navegador' },
  loading: { label: '⏳ Conectando...', title: 'Carregando favoritos do Supabase' },
  online: { label: '☁️ Salvo no Supabase', title: 'Favoritos sincronizados com o banco de dados' },
  error: { label: '⚠️ Erro no Supabase', title: 'Falha ao acessar o Supabase: favoritos salvos apenas neste navegador' },
}

export default function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onSortBy,
  sortDir,
  onToggleSortDir,
  onlyFavorites,
  onToggleFavorites,
  favoritesCount,
  favoritesStatus,
  onRandom,
}) {
  const sync = SYNC_STATUS[favoritesStatus]

  return (
    <section className="filters">
      <div className="filters__types" role="group" aria-label="Filtrar por tipo">
        <button
          className={`type-chip ${selectedType === 'All' ? 'is-active' : ''}`}
          onClick={() => onSelectType('All')}
        >
          🌈 Todos
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`type-chip ${selectedType === type ? 'is-active' : ''}`}
            style={{ '--chip-color': TYPE_COLORS[type] }}
            onClick={() => onSelectType(selectedType === type ? 'All' : type)}
          >
            {TYPE_ICONS[type]} {type}
          </button>
        ))}
      </div>

      <div className="filters__actions">
        <label className="filters__sort">
          📊 Ordenar por
          <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <button className="btn" onClick={onToggleSortDir} title="Inverter ordem">
          {sortDir === 'asc' ? '⬆️ Crescente' : '⬇️ Decrescente'}
        </button>
        <button className={`btn ${onlyFavorites ? 'btn--active' : ''}`} onClick={onToggleFavorites}>
          ⭐ Favoritos ({favoritesCount})
        </button>
        <span className={`sync-status sync-status--${favoritesStatus}`} title={sync.title}>
          {sync.label}
        </span>
        <button className="btn btn--primary" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </section>
  )
}
