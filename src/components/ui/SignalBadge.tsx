import { motion, AnimatePresence } from 'framer-motion'

const SIGNAL_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  strong:     { label: 'Strong Response',  color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)',  icon: '⚡' },
  ok:         { label: 'Good',             color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.3)',  icon: '✓' },
  vague:      { label: 'Needs Clarity',    color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  icon: '○' },
  short:      { label: 'Too Brief',        color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.3)',  icon: '⟳' },
  complex:    { label: 'Too Technical',    color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', icon: '≈' },
  off_topic:  { label: 'Off Topic',        color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.3)', icon: '!' },
  silent:     { label: 'No Response',      color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', icon: '…' },
}

interface SignalBadgeProps {
  signal: string | null
  showLabel?: boolean
}

export default function SignalBadge({ signal, showLabel = true }: SignalBadgeProps) {
  if (!signal) return null
  const cfg = SIGNAL_CONFIG[signal] || SIGNAL_CONFIG['ok']

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={signal}
        initial={{ opacity: 0, scale: 0.8, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: 100,
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          color: cfg.color,
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ fontSize: '0.8rem' }}>{cfg.icon}</span>
        {showLabel && cfg.label}
      </motion.div>
    </AnimatePresence>
  )
}