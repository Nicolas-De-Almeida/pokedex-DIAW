import '../css/Header.css'

export default function Header({ view, onChangeView, theme, onToggleTheme, totals }) {
  return (
    <header className="header">
      <div className="header__brand">
        <img src="/pokeball.svg" alt="" className="header__logo"/>
        <div>
          <h1>Pokédex</h1>
          <p>
            {totals.pokemon} Pokémon · {totals.trainers} treinadores
          </p>
        </div>
      </div>

      <nav className="header__nav">
        <button className={view === 'pokedex' ? 'is-active' : ''} onClick={() => onChangeView('pokedex')}>
          🐾 Pokédex
        </button>
        <button className={view === 'trainers' ? 'is-active' : ''} onClick={() => onChangeView('trainers')}>
          🧑‍🚀 Treinadores
        </button>
        <button className="header__theme" onClick={onToggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}
