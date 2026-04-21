import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Waveform ─────────────────────────────────────── */
export function Waveform({ isActive, color = '#22d3ee', barCount = 40 }: {
  isActive: boolean; color?: string; barCount?: number
}) {
  const barsRef = useRef<HTMLDivElement[]>([])
  useEffect(() => {
    if (!isActive) { barsRef.current.forEach(b => { if (b) b.style.transform = 'scaleY(0.12)' }); return }
    const iv = setInterval(() => {
      barsRef.current.forEach((b, i) => {
        if (!b) return
        const center = barCount / 2
        const dist   = Math.abs(i - center) / center
        const h      = (1 - dist * 0.5) * 0.4 + Math.random() * 0.65
        b.style.transform  = `scaleY(${Math.min(h, 1)})`
        b.style.transition = `transform ${60 + Math.random() * 80}ms ease`
      })
    }, 70)
    return () => clearInterval(iv)
  }, [isActive, barCount])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 44 }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) barsRef.current[i] = el }}
          style={{
            flex: 1, height: '100%',
            background: `linear-gradient(180deg, ${color}, ${color}88)`,
            borderRadius: 2,
            transform: 'scaleY(0.12)',
            transformOrigin: 'center',
            opacity: isActive ? 0.9 : 0.25,
            transition: 'opacity 0.4s',
          }}
        />
      ))}
    </div>
  )
}

/* ── Signal Badge ─────────────────────────────────── */
const SIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  strong:    { label: 'Strong',      color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.28)',  icon: '⚡' },
  ok:        { label: 'Good',        color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.28)',  icon: '✓' },
  vague:     { label: 'Vague',       color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.28)',  icon: '○' },
  short:     { label: 'Too Brief',   color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.28)',  icon: '↑' },
  complex:   { label: 'Technical',   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.28)', icon: '≈' },
  off_topic: { label: 'Off Topic',   color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.28)', icon: '!' },
  silent:    { label: 'No Response', color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.28)', icon: '…' },
}
export function SignalBadge({ signal }: { signal: string | null }) {
  if (!signal) return null
  const cfg = SIG[signal] || SIG.ok
  return (
    <AnimatePresence mode="wait">
      <motion.div key={signal} initial={{ opacity: 0, scale: 0.8, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 100, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
      >
        {cfg.icon} {cfg.label}
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Animated Counter ─────────────────────────────── */
export function AnimatedCounter({ value, decimals = 0, suffix = '', prefix = '', className = '' }: {
  value: number; decimals?: number; suffix?: string; prefix?: string; className?: string
}) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>()
  useEffect(() => {
    const from = startRef.current; const to = value
    startTimeRef.current = null
    const step = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const p = Math.min((ts - startTimeRef.current) / 1200, 1)
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(from + (to - from) * e)
      if (p < 1) rafRef.current = requestAnimationFrame(step); else startRef.current = to
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [value])
  return <span className={className}>{prefix}{display.toFixed(decimals)}{suffix}</span>
}