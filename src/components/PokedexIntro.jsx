import { useEffect, useState } from 'react'
import { spriteUrl } from '../utils/pokemon'
import '../css/PokedexIntro.css'

// Duração de cada fase da animação (ms)
const PHASE_DURATION = {
  opening: 1100, // a tampa abre
  booting: 1800, // a tela liga e carrega
  leaving: 700, // zoom para dentro da tela e entra no app
}
const NEXT_PHASE = { opening: 'booting', booting: 'leaving', leaving: 'done' }

// Tela de abertura: uma Pokédex fechada que o usuário abre antes de ver a lista
export default function PokedexIntro({ total, onFinish }) {
  const [phase, setPhase] = useState('idle')

  const open = () => setPhase((p) => (p === 'idle' ? 'opening' : p))

  // Avança automaticamente pelas fases depois que a Pokédex é aberta
  useEffect(() => {
    if (phase === 'idle') return
    if (phase === 'done') {
      onFinish()
      return
    }
    const timer = setTimeout(() => setPhase(NEXT_PHASE[phase]), PHASE_DURATION[phase])
    return () => clearTimeout(timer)
  }, [phase, onFinish])

  // Enter ou espaço também abrem; trava a rolagem enquanto a intro está visível
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [])

  const screenOn = phase === 'booting' || phase === 'leaving'

  return (
    <div className={`intro intro--${phase}`}>
      <div className="intro__stage">
        <div
          className="dex"
          onClick={open}
          role="button"
          tabIndex={phase === 'idle' ? 0 : -1}
          aria-label="Abrir Pokédex">
          {/* Metade esquerda: tela principal e controles */}
          <div className="dex__body">
            <div className="dex__top">
              <span className="dex__lens"/>
              <span className="dex__led dex__led--red"/>
              <span className="dex__led dex__led--yellow"/>
              <span className="dex__led dex__led--green"/>
            </div>

            <div className="dex__screen-frame">
              <div className="dex__screen-dots">
                <span />
                <span />
              </div>
              <div className={`dex__screen ${screenOn ? 'is-on' : ''}`}>
                {screenOn && (
                  <>
                    <img src={spriteUrl(25)} alt="" className="dex__screen-sprite"/>
                    <strong>POKÉDEX</strong>
                    <small>{total} registrados</small>
                    <div className="dex__progress">
                      <span />
                    </div>
                  </>
                )}
              </div>
              <div className="dex__screen-bottom">
                <span className="dex__mini-led"/>
                <span className="dex__speaker"/>
              </div>
            </div>

            <div className="dex__controls">
              <span className="dex__round-btn"/>
              <div className="dex__pills">
                <span className="dex__pill dex__pill--red"/>
                <span className="dex__pill dex__pill--blue"/>
              </div>
              <span className="dex__dpad"/>
              <span className="dex__mini-screen"/>
            </div>
          </div>

          <span className="dex__hinge"/>

          {/* Tampa: frente vermelha; ao abrir, o verso vira a metade direita */}
          <div className="dex__cover">
            <div className="dex__cover-front">
              <svg className="dex__groove" viewBox="0 0 100 145" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 34 H48 L60 24 H100"/>
              </svg>
              <div className="dex__top">
                <span className="dex__lens"/>
                <span className="dex__led dex__led--red"/>
                <span className="dex__led dex__led--yellow"/>
                <span className="dex__led dex__led--green"/>
              </div>
              <span className="dex__label">POKéDEX</span>
              <span className="dex__triangle"/>
            </div>

            <div className="dex__cover-back">
              <div className="dex__info-screen">
                {screenOn ? (
                  <>
                    <span>#025 PIKACHU</span>
                    <span>TIPO: ELECTRIC</span>
                  </>
                ) : null}
              </div>
              <div className="dex__keys">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
              <div className="dex__white-btns">
                <span/>
                <span/>
              </div>
              <div className="dex__black-screens">
                <span/>
                <span/>
              </div>
            </div>
          </div>
        </div>

        <div className="intro__actions">
          <button className="intro__open" onClick={open} disabled={phase !== 'idle'}>
            ▶️ Abrir Pokédex
          </button>
          <small>ou pressione Enter</small>
        </div>
      </div>
    </div>
  )
}
