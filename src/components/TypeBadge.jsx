import { TYPE_COLORS, TYPE_ICONS } from '../utils/pokemon'
import '../css/TypeBadge.css'

export default function TypeBadge({ type, small = false }) {
  return (
    <span className={`type-badge ${small ? 'type-badge--small' : ''}`} style={{ background: TYPE_COLORS[type] }}>
      <span aria-hidden="true">{TYPE_ICONS[type]}</span> {type}
    </span>
  )
}
