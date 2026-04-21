import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'

interface DimensionScore {
  dimension: string
  score: number
  weight: number
}

interface RadarChartProps {
  dimensions: DimensionScore[]
}

const SHORT_LABELS: Record<string, string> = {
  'Communication Clarity': 'Clarity',
  'Ability to Simplify':   'Simplify',
  'Patience & Empathy':    'Empathy',
  'Warmth & Child Connect':'Warmth',
  'English Fluency':       'Fluency',
  'Math Teaching Ability': 'Math',
}

export default function DimensionRadar({ dimensions }: RadarChartProps) {
  const data = dimensions.map(d => ({
    subject: SHORT_LABELS[d.dimension] || d.dimension,
    score: d.score,
    fullMark: 10,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={1}
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: '#8892aa',
            fontSize: 12,
            fontFamily: 'Syne, sans-serif',
            fontWeight: 500,
          }}
        />
        <Tooltip
          contentStyle={{
            background: '#0f1218',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 8,
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            color: '#f0f4ff',
          }}
          formatter={(value: number) => [`${value}/10`, 'Score']}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#22d3ee"
          fill="#22d3ee"
          fillOpacity={0.12}
          strokeWidth={2}
          dot={{ fill: '#22d3ee', r: 4, strokeWidth: 0 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}