import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function AnimatedCounter({
  value,
  duration = 1200,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}: CounterProps) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const from = startRef.current
    const to   = value
    startTimeRef.current = null

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(from + (to - from) * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
      else startRef.current = to
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  )
}