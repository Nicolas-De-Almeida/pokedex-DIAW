// Cores e ícones associados a cada tipo
export const TYPE_COLORS = {
  Normal: '#A8A77A', Fire: '#EE8130', Water: '#6390F0', Grass: '#7AC74C',
  Electric: '#F7D02C', Ice: '#96D9D6', Fighting: '#C22E28', Poison: '#A33EA1',
  Ground: '#E2BF65', Flying: '#A98FF3', Psychic: '#F95587', Bug: '#A6B91A',
  Rock: '#B6A136', Ghost: '#735797', Dragon: '#6F35FC', Dark: '#705746',
  Steel: '#B7B7CE', Fairy: '#D685AD', Typeless: '#68A090',
}

export const TYPE_ICONS = {
  Normal: '⚪', Fire: '🔥', Water: '💧', Grass: '🌱', Electric: '⚡', Ice: '❄️',
  Fighting: '🥊', Poison: '☠️', Ground: '⛰️', Flying: '🕊️', Psychic: '🧠',
  Bug: '🐛', Rock: '🪨', Ghost: '👻', Dragon: '🐉', Dark: '🌑', Steel: '⚙️',
  Fairy: '✨', Typeless: '❔',
}

export const STATS = [
  { key: 'hp', label: 'HP', icon: '❤️' },
  { key: 'attack', label: 'Ataque', icon: '⚔️' },
  { key: 'defense', label: 'Defesa', icon: '🛡️' },
  { key: 'specialAttack', label: 'Atq. Especial', icon: '✨' },
  { key: 'specialDefense', label: 'Def. Especial', icon: '🔰' },
  { key: 'speed', label: 'Velocidade', icon: '💨' },
]

// Maior valor possível de um atributo base (usado para as barras)
export const MAX_STAT = 255

export const formatId = (id) => `#${String(id).padStart(3, '0')}`

export const totalStats = (pokemon) =>
  Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)

// Imagens oficiais hospedadas pelo repositório de sprites da PokéAPI
export const artworkUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const typeGradient = (types) => {
  const [first, second = first] = types.map((t) => TYPE_COLORS[t.name] ?? '#888')
  return `linear-gradient(135deg, ${first}, ${second})`
}
