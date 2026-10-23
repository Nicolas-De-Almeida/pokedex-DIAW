import { useCallback, useEffect, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import ComparePanel, { CompareBar } from './components/ComparePanel'
import TrainerList from './components/TrainerList'
import PokedexIntro from './components/PokedexIntro'
import useLocalStorage from './hooks/useLocalStorage'
import useFavorites from './hooks/useFavorites'
import { totalStats } from './utils/pokemon'
import './css/App.css'

const { trainers, types } = data

// Alguns Pokémon (ex.: Mew) vêm sem tipos no JSON: usamos o tipo "Typeless" (id 0)
const typeless = types.find((t) => t.id === 0)
const allPokemon = data.pokemon.map((p) => (p.types.length > 0 ? p : { ...p, types: [typeless] }))

const pokemonById = Object.fromEntries(allPokemon.map((p) => [p.id, p]))

// Apenas os tipos que realmente aparecem nos Pokémon do arquivo, na ordem do JSON
const usedTypes = new Set(allPokemon.flatMap((p) => p.types.map((t) => t.name)))
const availableTypes = types.map((t) => t.name).filter((name) => usedTypes.has(name))

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const { favorites, toggleFavorite, status: favoritesStatus } = useFavorites()
  const [theme, setTheme] = useLocalStorage(
    'pokedex:theme',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Estado derivado: lista filtrada e ordenada
  const visiblePokemon = useMemo(() => {
    const term = search.trim().toLowerCase().replace(/^#/, '')

    const filtered = allPokemon.filter((p) => {
      const matchesSearch =
        term === '' || p.name.toLowerCase().includes(term) || String(p.id) === String(Number(term))
      const matchesType = selectedType === 'All' || p.types.some((t) => t.name === selectedType)
      const matchesFavorite = !onlyFavorites || favorites.includes(p.id)
      return matchesSearch && matchesType && matchesFavorite
    })

    const getValue = (p) =>
      sortBy === 'id' ? p.id : sortBy === 'name' ? p.name : sortBy === 'total' ? totalStats(p) : p.stats[sortBy]

    const sorted = [...filtered].sort((a, b) => {
      const va = getValue(a)
      const vb = getValue(b)
      const result = typeof va === 'string' ? va.localeCompare(vb) : va - vb
      return result !== 0 ? result : a.id - b.id
    })

    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [search, selectedType, sortBy, sortDir, onlyFavorites, favorites])

  const toggleCompare = (id) =>
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      return prev.length >= 2 ? [prev[1], id] : [...prev, id]
    })

  const resetFilters = () => {
    setSearch('')
    setSelectedType('All')
    setOnlyFavorites(false)
  }

  const selectRandom = () => {
    const pool = visiblePokemon.length > 0 ? visiblePokemon : allPokemon
    setSelectedId(pool[Math.floor(Math.random() * pool.length)].id)
  }

  // Navega para o anterior/próximo dentro da lista visível (ou de todos, se o Pokémon não estiver nela)
  const stepSelection = (direction) => {
    const list = visiblePokemon.some((p) => p.id === selectedId) ? visiblePokemon : allPokemon
    const index = list.findIndex((p) => p.id === selectedId)
    setSelectedId(list[(index + direction + list.length) % list.length].id)
  }

  const closeDetails = useCallback(() => setSelectedId(null), [])
  const closeCompare = useCallback(() => setShowCompare(false), [])
  const finishIntro = useCallback(() => setShowIntro(false), [])

  const selectedPokemon = selectedId ? pokemonById[selectedId] : null
  const comparePokemon = compareIds.map((id) => pokemonById[id])

  return (
    <div className="app">
      {/* A tela principal já é montada por baixo da intro, adiantando o carregamento das imagens */}
      {showIntro && <PokedexIntro total={allPokemon.length} onFinish={finishIntro} />}

      <Header
        view={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        totals={{ pokemon: allPokemon.length, trainers: trainers.length }}
      />

      <main className="app__main">
        {view === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              types={availableTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              sortBy={sortBy}
              onSortBy={setSortBy}
              sortDir={sortDir}
              onToggleSortDir={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites((v) => !v)}
              favoritesCount={favorites.length}
              favoritesStatus={favoritesStatus}
              onRandom={selectRandom}
            />
            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              compareIds={compareIds}
              onSelect={setSelectedId}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
              onReset={resetFilters}
            />
          </>
        ) : (
          <TrainerList trainers={trainers} pokemonById={pokemonById} onSelectPokemon={setSelectedId} />
        )}
      </main>

      <footer className="app__footer">
        Dados: pokedex-data.json · Imagens e descrições: PokéAPI
      </footer>

      <CompareBar selected={comparePokemon} onOpen={() => setShowCompare(true)} onClear={() => setCompareIds([])} />

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          trainers={trainers.filter((t) => t.pokemonIds.includes(selectedPokemon.id))}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          onClose={closeDetails}
          onPrev={() => stepSelection(-1)}
          onNext={() => stepSelection(1)}
        />
      )}

      {showCompare && comparePokemon.length === 2 && <ComparePanel pair={comparePokemon} onClose={closeCompare} />}
    </div>
  )
}
