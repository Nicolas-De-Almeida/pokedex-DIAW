import { useState } from 'react'
import TrainerCard from './TrainerCard'
import '../css/Trainers.css'

export default function TrainerList({ trainers, pokemonById, onSelectPokemon }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('badges')

  const visible = trainers
    .filter((t) => t.name.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : b.badges - a.badges))

  return (
    <section className="trainers">
      <div className="trainers__toolbar">
        <div className="search-bar">
          <span className="search-bar__icon" aria-hidden="true">🔎</span>
          <input
            type="search"
            placeholder="Pesquisar treinador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar treinador"/>
        </div>
        <label className="filters__sort">
          Ordenar por
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="badges">Insígnias</option>
            <option value="name">Nome</option>
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhum treinador encontrado</h2>
        </div>
      ) : (
        <div className="trainers__grid">
          {visible.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              pokemon={trainer.pokemonIds.map((id) => pokemonById[id]).filter(Boolean)}
              onSelectPokemon={onSelectPokemon}/>
          ))}
        </div>
      )}
    </section>
  )
}
