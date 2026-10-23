import { MAX_STAT } from '../utils/pokemon'
import '../css/StatBar.css'

export default function StatBar({ label, icon, value, color, compareValue }) {
  const percent = Math.min(100, (value / MAX_STAT) * 100)
  const diff = compareValue !== undefined ? value - compareValue : 0

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">
        <span aria-hidden="true">{icon}</span> {label}
      </span>
      <span className={`stat-bar__value ${diff > 0 ? 'is-better' : diff < 0 ? 'is-worse' : ''}`}>{value}</span>
      <div className="stat-bar__track">
        <div className="stat-bar__fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  )
}
