import { useEffect, useRef } from 'react'

interface WaveformProps {
  isActive: boolean
  color?: string
  barCount?: number
  className?: string
}

export default function Waveform({
  isActive,
  color = '#22d3ee',
  barCount = 32,
  className = '',
}: WaveformProps) {
  const barsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!isActive) {
      barsRef.current.forEach(bar => {
        if (bar) bar.style.transform = 'scaleY(0.15)'
      })
      return
    }

    const interval = setInterval(() => {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const center = barCount / 2
        const dist = Math.abs(i - center) / center
        const base = (1 - dist) * 0.6 + 0.1
        const rand = base + Math.random() * 0.7
        bar.style.transform = `scaleY(${Math.min(rand, 1)})`
        bar.style.transition = `transform ${50 + Math.random() * 100}ms ease`
      })
    }, 80)

    return () => clearInterval(interval)
  }, [isActive, barCount])

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        height: 48,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) barsRef.current[i] = el }}
          style={{
            flex: 1,
            height: '100%',
            background: color,
            borderRadius: 2,
            transform: 'scaleY(0.15)',
            transformOrigin: 'center',
            opacity: isActive ? 0.85 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
    </div>
  )
}