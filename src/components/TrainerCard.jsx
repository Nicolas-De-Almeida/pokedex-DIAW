import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { formatId } from '../utils/pokemon'

export default function TrainerCard({ trainer, pokemon, onSelectPokemon }) {
  return (
    <article className="trainer-card">
      <header className="trainer-card__header">
        <div className="trainer-card__avatar" aria-hidden="true">
          {trainer.name.charAt(0)}
        </div>
        <div>
          <h3>{trainer.name}</h3>
          <p className="trainer-card__badges" title={`${trainer.badges} insígnia(s)`}>
            <span className="trainer-card__medals" aria-hidden="true">
              {'🏅'.repeat(trainer.badges)}
            </span>
            {trainer.badges} insígnia(s) · {pokemon.length} Pokémon
          </p>
        </div>
      </header>

      <ul className="trainer-card__team">
        {pokemon.map((p, index) => (
          // um treinador pode ter o mesmo Pokémon repetido, por isso a chave usa o índice
          <li key={`${p.id}-${index}`}>
            <button onClick={() => onSelectPokemon(p.id)} title={`Ver ${p.name}`}>
              <PokemonImage pokemon={p} />
              <span className="trainer-card__poke-id">{formatId(p.id)}</span>
              <strong>{p.name}</strong>
              <span className="trainer-card__poke-types">
                {p.types.map((t) => (
                  <TypeBadge key={t.id} type={t.name} small />
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
