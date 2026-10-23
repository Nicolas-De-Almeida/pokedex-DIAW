import '../css/SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔎</span>
      <input
        type="search"
        placeholder="Pesquisar Pokémon por nome ou ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar Pokémon"/>
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Limpar pesquisa">
          X
        </button>
      )}
    </div>
  )
}
