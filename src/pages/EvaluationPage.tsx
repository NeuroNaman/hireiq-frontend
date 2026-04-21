// // // // // import { useEffect, useState } from 'react'
// // // // // import { useParams, useNavigate } from 'react-router-dom'
// // // // // import { motion } from 'framer-motion'
// // // // // import { ArrowLeft, Quote, TrendingUp, AlertTriangle, BookOpen, Star } from 'lucide-react'
// // // // // import { evaluationApi } from '@/lib/api'
// // // // // import DimensionRadar from '@/components/ui/DimensionRadar'
// // // // // import AnimatedCounter from '@/components/ui/AnimatedCounter'
// // // // // import ScoreCard3D from '@/components/three/ScoreCard3D'
// // // // // import toast from 'react-hot-toast'

// // // // // interface Report {
// // // // //   session_id: string
// // // // //   candidate_name: string
// // // // //   experience_years: number | null
// // // // //   total_score: number
// // // // //   final_verdict: string
// // // // //   verdict_rationale: string
// // // // //   hiring_confidence: number
// // // // //   dimensions: Array<{
// // // // //     dimension: string
// // // // //     score: number
// // // // //     weight: number
// // // // //     explanation: string
// // // // //     supporting_quote: string
// // // // //     evidence_count: number
// // // // //   }>
// // // // //   strengths: string[]
// // // // //   weaknesses: string[]
// // // // //   coaching_notes: string[]
// // // // //   key_insight: string
// // // // //   best_response: string
// // // // //   weakest_response: string
// // // // //   teaching_style: string
// // // // //   teaching_style_reasoning: string
// // // // //   risk_flags: string[]
// // // // //   stats: {
// // // // //     total_candidate_turns: number
// // // // //     total_words_spoken: number
// // // // //     average_response_length: number
// // // // //     concrete_examples_given: number
// // // // //     strong_responses: number
// // // // //     weak_responses: number
// // // // //     follow_up_count: number
// // // // //   } | null
// // // // //   interview_duration_minutes: number | null
// // // // //   city: string | null
// // // // // }

// // // // // const VERDICT_CONFIG = {
// // // // //   'Strong Hire': { color: 'var(--emerald-400)', bg: 'var(--emerald-glow)', border: 'rgba(52,211,153,0.3)', icon: '★' },
// // // // //   'Consider':    { color: 'var(--amber-400)',   bg: 'var(--amber-glow)',   border: 'rgba(251,191,36,0.3)',  icon: '◎' },
// // // // //   'Reject':      { color: 'var(--rose-400)',    bg: 'var(--rose-glow)',    border: 'rgba(251,113,133,0.3)', icon: '✕' },
// // // // // }

// // // // // const stagger = {
// // // // //   container: { animate: { transition: { staggerChildren: 0.07 } } },
// // // // //   item: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }
// // // // // }

// // // // // export default function EvaluationPage() {
// // // // //   const { sessionId } = useParams()
// // // // //   const navigate = useNavigate()
// // // // //   const [report, setReport] = useState<Report | null>(null)
// // // // //   const [loading, setLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     if (!sessionId) return
// // // // //     evaluationApi.get(sessionId)
// // // // //       .then(r => setReport(r.data))
// // // // //       .catch(() => {
// // // // //         // try generating
// // // // //         evaluationApi.generate(sessionId)
// // // // //           .then(r => setReport(r.data))
// // // // //           .catch(() => toast.error('Failed to load report'))
// // // // //       })
// // // // //       .finally(() => setLoading(false))
// // // // //   }, [sessionId])

// // // // //   if (loading) return <LoadingState />
// // // // //   if (!report) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Report not found.</div>

// // // // //   const vc = VERDICT_CONFIG[report.final_verdict as keyof typeof VERDICT_CONFIG] || VERDICT_CONFIG['Consider']

// // // // //   return (
// // // // //     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 48px' }}>
// // // // //       {/* Back */}
// // // // //       <motion.button
// // // // //         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
// // // // //         className="btn btn-ghost"
// // // // //         style={{ marginBottom: 32, fontSize: '0.85rem' }}
// // // // //         onClick={() => navigate('/recruiter')}
// // // // //       >
// // // // //         <ArrowLeft size={16} /> Back to Candidates
// // // // //       </motion.button>

// // // // //       {/* Hero header */}
// // // // //       <motion.div
// // // // //         variants={stagger.container} initial="initial" animate="animate"
// // // // //         style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, marginBottom: 48, alignItems: 'start' }}
// // // // //       >
// // // // //         <div>
// // // // //           <motion.div variants={stagger.item}>
// // // // //             <span className="badge badge-muted" style={{ marginBottom: 16 }}>Evaluation Report</span>
// // // // //           </motion.div>
// // // // //           <motion.h1 variants={stagger.item} style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: 8 }}>
// // // // //             {report.candidate_name}
// // // // //           </motion.h1>
// // // // //           <motion.div variants={stagger.item} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
// // // // //             {report.city && (
// // // // //               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // // // //                 📍 {report.city}
// // // // //               </span>
// // // // //             )}
// // // // //             {report.experience_years && (
// // // // //               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // // // //                 · {report.experience_years}y experience
// // // // //               </span>
// // // // //             )}
// // // // //             {report.interview_duration_minutes && (
// // // // //               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // // // //                 · {report.interview_duration_minutes}min interview
// // // // //               </span>
// // // // //             )}
// // // // //           </motion.div>

// // // // //           {/* Verdict chip */}
// // // // //           <motion.div variants={stagger.item} style={{
// // // // //             display: 'inline-flex', alignItems: 'center', gap: 10,
// // // // //             padding: '10px 20px', borderRadius: 12,
// // // // //             background: vc.bg, border: `1px solid ${vc.border}`,
// // // // //             marginBottom: 20,
// // // // //           }}>
// // // // //             <span style={{ fontSize: '1.2rem' }}>{vc.icon}</span>
// // // // //             <span style={{ color: vc.color, fontWeight: 800, fontSize: '1.1rem' }}>{report.final_verdict}</span>
// // // // //             <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
// // // // //               {report.hiring_confidence}% confidence
// // // // //             </span>
// // // // //           </motion.div>

// // // // //           {/* Rationale */}
// // // // //           <motion.p variants={stagger.item} style={{
// // // // //             color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem',
// // // // //             maxWidth: 560, padding: '14px 0', borderTop: '1px solid var(--border-subtle)',
// // // // //           }}>
// // // // //             {report.verdict_rationale}
// // // // //           </motion.p>

// // // // //           {/* Teaching style */}
// // // // //           {report.teaching_style && (
// // // // //             <motion.div variants={stagger.item} style={{
// // // // //               marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8,
// // // // //               padding: '6px 14px', borderRadius: 8,
// // // // //               background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)',
// // // // //             }}>
// // // // //               <Star size={14} color="#818cf8" />
// // // // //               <span style={{ fontSize: '0.82rem', color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
// // // // //                 {report.teaching_style}
// // // // //               </span>
// // // // //             </motion.div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* 3D Score card */}
// // // // //         <motion.div variants={stagger.item}>
// // // // //           <ScoreCard3D score={report.total_score} verdict={report.final_verdict} />
// // // // //           <div style={{ textAlign: 'center', marginTop: -8 }}>
// // // // //             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
// // // // //               Weighted Score · out of 10
// // // // //             </span>
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </motion.div>

// // // // //       {/* Stats bar */}
// // // // //       {report.stats && (
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
// // // // //           style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 48 }}
// // // // //         >
// // // // //           {[
// // // // //             { label: 'Total Words', value: report.stats.total_words_spoken, color: 'var(--cyan-400)' },
// // // // //             { label: 'Avg Response', value: `${report.stats.average_response_length}w`, color: '#818cf8', raw: true },
// // // // //             { label: 'Examples', value: report.stats.concrete_examples_given, color: 'var(--amber-400)' },
// // // // //             { label: 'Strong', value: report.stats.strong_responses, color: 'var(--emerald-400)' },
// // // // //             { label: 'Weak', value: report.stats.weak_responses, color: 'var(--rose-400)' },
// // // // //             { label: 'Follow-ups', value: report.stats.follow_up_count, color: 'var(--text-secondary)' },
// // // // //           ].map((s) => (
// // // // //             <div key={s.label} className="glass-card" style={{ padding: '16px 12px', textAlign: 'center' }}>
// // // // //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.4rem', color: s.color }}>
// // // // //                 {(s as any).raw ? s.value : <AnimatedCounter value={Number(s.value)} duration={1000} />}
// // // // //               </div>
// // // // //               <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
// // // // //                 {s.label}
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </motion.div>
// // // // //       )}

// // // // //       {/* Main content grid */}
// // // // //       <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
// // // // //         {/* Left column */}
// // // // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

// // // // //           {/* Dimension scores */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
// // // // //             className="glass-card"
// // // // //             style={{ padding: 28 }}
// // // // //           >
// // // // //             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 24 }}>Dimension Breakdown</h3>
// // // // //             <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
// // // // //               {report.dimensions.map((dim, i) => {
// // // // //                 const pct = (dim.score / 10) * 100
// // // // //                 const color = dim.score >= 7.5 ? 'var(--emerald-400)'
// // // // //                   : dim.score >= 5.5 ? 'var(--amber-400)'
// // // // //                   : 'var(--rose-400)'
// // // // //                 return (
// // // // //                   <motion.div
// // // // //                     key={dim.dimension}
// // // // //                     initial={{ opacity: 0, x: -20 }}
// // // // //                     animate={{ opacity: 1, x: 0 }}
// // // // //                     transition={{ delay: 0.5 + i * 0.06 }}
// // // // //                   >
// // // // //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
// // // // //                       <div>
// // // // //                         <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{dim.dimension}</span>
// // // // //                         <span style={{ marginLeft: 8, fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // // // //                           w={dim.weight}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                       <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color, fontSize: '1.1rem' }}>
// // // // //                         {dim.score}<span style={{ fontSize: '0.7rem', opacity: 0.6 }}>/10</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="score-bar">
// // // // //                       <motion.div
// // // // //                         className="score-bar-fill"
// // // // //                         initial={{ width: 0 }}
// // // // //                         animate={{ width: `${pct}%` }}
// // // // //                         transition={{ delay: 0.7 + i * 0.06, duration: 0.8, ease: [0.16,1,0.3,1] }}
// // // // //                         style={{ background: color }}
// // // // //                       />
// // // // //                     </div>
// // // // //                     <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
// // // // //                       {dim.explanation}
// // // // //                     </p>
// // // // //                     {dim.supporting_quote && (
// // // // //                       <div style={{
// // // // //                         marginTop: 8, padding: '8px 12px',
// // // // //                         background: 'rgba(255,255,255,0.02)',
// // // // //                         border: '1px solid var(--border-subtle)',
// // // // //                         borderLeft: `3px solid ${color}`,
// // // // //                         borderRadius: '0 6px 6px 0',
// // // // //                         fontSize: '0.78rem',
// // // // //                         color: 'var(--text-muted)',
// // // // //                         fontStyle: 'italic',
// // // // //                       }}>
// // // // //                         "{dim.supporting_quote}"
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </motion.div>
// // // // //                 )
// // // // //               })}
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Strengths & Weaknesses */}
// // // // //           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
// // // // //               className="glass-card" style={{ padding: 24 }}
// // // // //             >
// // // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // // // //                 <TrendingUp size={16} color="var(--emerald-400)" />
// // // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--emerald-400)' }}>Strengths</h4>
// // // // //               </div>
// // // // //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// // // // //                 {report.strengths.map((s, i) => (
// // // // //                   <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, paddingLeft: 12, borderLeft: '2px solid var(--emerald-400)' }}>
// // // // //                     {s}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </motion.div>

// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
// // // // //               className="glass-card" style={{ padding: 24 }}
// // // // //             >
// // // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // // // //                 <AlertTriangle size={16} color="var(--amber-400)" />
// // // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--amber-400)' }}>Gaps</h4>
// // // // //               </div>
// // // // //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// // // // //                 {report.weaknesses.map((w, i) => (
// // // // //                   <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, paddingLeft: 12, borderLeft: '2px solid var(--amber-400)' }}>
// // // // //                     {w}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </div>

// // // // //           {/* Key insight */}
// // // // //           {report.key_insight && (
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
// // // // //               className="glass-card-strong" style={{ padding: 24 }}
// // // // //             >
// // // // //               <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
// // // // //                 <Quote size={20} color="var(--cyan-400)" style={{ flexShrink: 0, marginTop: 2 }} />
// // // // //                 <div>
// // // // //                   <div style={{ fontSize: '0.72rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
// // // // //                     Key Insight
// // // // //                   </div>
// // // // //                   <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
// // // // //                     {report.key_insight}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           )}

// // // // //           {/* Best / Weakest responses */}
// // // // //           {(report.best_response || report.weakest_response) && (
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
// // // // //               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// // // // //             >
// // // // //               {report.best_response && (
// // // // //                 <div className="glass-card" style={{ padding: 20 }}>
// // // // //                   <div style={{ fontSize: '0.72rem', color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
// // // // //                     ★ Best Response
// // // // //                   </div>
// // // // //                   <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
// // // // //                     "{report.best_response.slice(0, 200)}{report.best_response.length > 200 ? '...' : ''}"
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}
// // // // //               {report.weakest_response && (
// // // // //                 <div className="glass-card" style={{ padding: 20 }}>
// // // // //                   <div style={{ fontSize: '0.72rem', color: 'var(--rose-400)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
// // // // //                     ✗ Weakest Response
// // // // //                   </div>
// // // // //                   <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
// // // // //                     "{report.weakest_response.slice(0, 200)}{report.weakest_response.length > 200 ? '...' : ''}"
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </motion.div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Right column */}
// // // // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
// // // // //           {/* Radar */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
// // // // //             className="glass-card" style={{ padding: 24 }}
// // // // //           >
// // // // //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Skill Radar</h4>
// // // // //             <DimensionRadar dimensions={report.dimensions} />
// // // // //           </motion.div>

// // // // //           {/* Coaching notes */}
// // // // //           {report.coaching_notes?.length > 0 && (
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
// // // // //               className="glass-card" style={{ padding: 24 }}
// // // // //             >
// // // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // // // //                 <BookOpen size={16} color="#818cf8" />
// // // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Coaching Notes</h4>
// // // // //               </div>
// // // // //               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
// // // // //                 {report.coaching_notes.map((note, i) => (
// // // // //                   <div key={i} style={{
// // // // //                     fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6,
// // // // //                     padding: '10px 12px',
// // // // //                     background: 'rgba(129,140,248,0.05)',
// // // // //                     border: '1px solid rgba(129,140,248,0.15)',
// // // // //                     borderRadius: 8,
// // // // //                   }}>
// // // // //                     {i + 1}. {note}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           )}

// // // // //           {/* Risk flags */}
// // // // //           {report.risk_flags?.length > 0 && (
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
// // // // //               className="glass-card" style={{ padding: 24 }}
// // // // //             >
// // // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // // // //                 <AlertTriangle size={16} color="var(--rose-400)" />
// // // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose-400)' }}>Risk Flags</h4>
// // // // //               </div>
// // // // //               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // // // //                 {report.risk_flags.map((flag, i) => (
// // // // //                   <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: 12, borderLeft: '2px solid var(--rose-400)', lineHeight: 1.5 }}>
// // // // //                     {flag}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           )}

// // // // //           {/* Confidence gauge */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
// // // // //             className="glass-card" style={{ padding: 24 }}
// // // // //           >
// // // // //             <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
// // // // //               Hiring Confidence
// // // // //             </div>
// // // // //             <div style={{ position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // // // //               <ConfidenceGauge value={report.hiring_confidence} />
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function ConfidenceGauge({ value }: { value: number }) {
// // // // //   const color = value >= 75 ? 'var(--emerald-400)' : value >= 50 ? 'var(--amber-400)' : 'var(--rose-400)'
// // // // //   const angle = -135 + (value / 100) * 270

// // // // //   return (
// // // // //     <div style={{ position: 'relative', width: 140, height: 90 }}>
// // // // //       <svg viewBox="0 0 140 90" style={{ width: '100%', height: '100%' }}>
// // // // //         {/* Track */}
// // // // //         <path d="M 15 85 A 55 55 0 0 1 125 85" fill="none" stroke="var(--obsidian-600)" strokeWidth="10" strokeLinecap="round" />
// // // // //         {/* Fill */}
// // // // //         <motion.path
// // // // //           d="M 15 85 A 55 55 0 0 1 125 85"
// // // // //           fill="none"
// // // // //           stroke={color}
// // // // //           strokeWidth="10"
// // // // //           strokeLinecap="round"
// // // // //           strokeDasharray="173"
// // // // //           initial={{ strokeDashoffset: 173 }}
// // // // //           animate={{ strokeDashoffset: 173 - (value / 100) * 173 }}
// // // // //           transition={{ delay: 0.9, duration: 1.2, ease: [0.16,1,0.3,1] }}
// // // // //         />
// // // // //         {/* Needle */}
// // // // //         <motion.line
// // // // //           x1="70" y1="82"
// // // // //           x2="70" y2="36"
// // // // //           stroke={color}
// // // // //           strokeWidth="2.5"
// // // // //           strokeLinecap="round"
// // // // //           style={{ transformOrigin: '70px 82px' }}
// // // // //           initial={{ rotate: -135 }}
// // // // //           animate={{ rotate: angle }}
// // // // //           transition={{ delay: 0.9, duration: 1.2, ease: [0.16,1,0.3,1] }}
// // // // //         />
// // // // //         <circle cx="70" cy="82" r="4" fill={color} />
// // // // //       </svg>
// // // // //       <div style={{
// // // // //         position: 'absolute', bottom: 0, left: 0, right: 0,
// // // // //         textAlign: 'center', fontFamily: 'var(--font-mono)',
// // // // //         fontWeight: 800, fontSize: '1.5rem', color,
// // // // //       }}>
// // // // //         <AnimatedCounter value={value} suffix="%" duration={1400} />
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function LoadingState() {
// // // // //   return (
// // // // //     <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
// // // // //       <div style={{
// // // // //         width: 64, height: 64, borderRadius: '50%',
// // // // //         border: '2px solid var(--border-subtle)',
// // // // //         borderTop: '2px solid var(--cyan-400)',
// // // // //         animation: 'spin-slow 1s linear infinite',
// // // // //       }} />
// // // // //       <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
// // // // //         Generating evaluation...
// // // // //       </p>
// // // // //     </div>
// // // // //   )
// // // // // }



// // // // import { useEffect, useRef, useState } from 'react'
// // // // import { useParams, useNavigate } from 'react-router-dom'
// // // // import { motion, useInView } from 'framer-motion'
// // // // import {
// // // //   ArrowLeft, Quote, TrendingUp, AlertTriangle,
// // // //   BookOpen, Star, Target, Brain, Heart, Volume2,
// // // //   CheckCircle, XCircle, ChevronDown, ChevronUp,
// // // // } from 'lucide-react'
// // // // import { evaluationApi } from '@/lib/api'
// // // // import { AnimatedCounter } from '@/components/ui'
// // // // import {
// // // //   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// // // //   RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
// // // //   PolarRadiusAxis
// // // // } from 'recharts'
// // // // import toast from 'react-hot-toast'

// // // // /* ── Types ── */
// // // // interface DimScore {
// // // //   dimension: string; score: number; weight: number;
// // // //   explanation: string; supporting_quote: string; evidence_count: number;
// // // // }
// // // // interface Report {
// // // //   session_id: string; candidate_name: string; experience_years: number | null;
// // // //   total_score: number; final_verdict: string; verdict_rationale: string;
// // // //   hiring_confidence: number;
// // // //   dimensions: DimScore[];
// // // //   strengths: string[]; weaknesses: string[];
// // // //   coaching_notes: string[]; key_insight: string;
// // // //   best_response: string; weakest_response: string;
// // // //   teaching_style: string; teaching_style_reasoning: string;
// // // //   risk_flags: string[];
// // // //   stats: {
// // // //     total_candidate_turns: number; total_words_spoken: number;
// // // //     average_response_length: number; concrete_examples_given: number;
// // // //     strong_responses: number; weak_responses: number; follow_up_count: number;
// // // //   } | null;
// // // //   interview_duration_minutes: number | null; city: string | null;
// // // // }

// // // // const VERDICT_CFG = {
// // // //   'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', icon: '★', cls: 'badge-emerald' },
// // // //   'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  icon: '◎', cls: 'badge-amber' },
// // // //   'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.3)', icon: '✕', cls: 'badge-rose' },
// // // // }

// // // // const DIM_ICONS: Record<string, any> = {
// // // //   'Communication Clarity':  Target,
// // // //   'Ability to Simplify':    Brain,
// // // //   'Patience & Empathy':     Heart,
// // // //   'Warmth & Child Connect': Star,
// // // //   'English Fluency':        Volume2,
// // // //   'Math Teaching Ability':  CheckCircle,
// // // // }

// // // // const DIM_COLORS = ['#22d3ee','#818cf8','#34d399','#fbbf24','#c084fc','#fb7185']

// // // // export default function EvaluationPage() {
// // // //   const { sessionId } = useParams()
// // // //   const navigate = useNavigate()
// // // //   const [report, setReport] = useState<Report | null>(null)
// // // //   const [loading, setLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     if (!sessionId) return
// // // //     evaluationApi.get(sessionId)
// // // //       .then(r => setReport(r.data))
// // // //       .catch(() =>
// // // //         evaluationApi.generate(sessionId)
// // // //           .then(r => setReport(r.data))
// // // //           .catch(() => toast.error('Failed to load report'))
// // // //       )
// // // //       .finally(() => setLoading(false))
// // // //   }, [sessionId])

// // // //   if (loading) return <Loader />
// // // //   if (!report) return <div style={{ padding: 60, color: 'var(--text-2)' }}>Report not found.</div>

// // // //   const vc = VERDICT_CFG[report.final_verdict as keyof typeof VERDICT_CFG] || VERDICT_CFG['Consider']

// // // //   // Build chart data
// // // //   const barData = report.dimensions.map((d, i) => ({
// // // //     name: d.dimension.split(' ')[0], fullName: d.dimension,
// // // //     score: d.score, fill: DIM_COLORS[i],
// // // //   }))
// // // //   const radarData = report.dimensions.map((d, i) => ({
// // // //     subject: d.dimension.replace(' & ', '/').split(' ').slice(0, 2).join(' '),
// // // //     score: d.score, fullMark: 10,
// // // //   }))

// // // //   return (
// // // //     <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 80px' }}>
// // // //       {/* Back */}
// // // //       <motion.button
// // // //         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
// // // //         className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}
// // // //         onClick={() => navigate('/recruiter')}
// // // //       >
// // // //         <ArrowLeft size={15} /> Back to Candidates
// // // //       </motion.button>

// // // //       {/* ── HERO HEADER ─────────────────────────────────── */}
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
// // // //         style={{ marginBottom: 48 }}
// // // //       >
// // // //         <div style={{
// // // //           padding: '40px 48px',
// // // //           background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(129,140,248,0.04) 100%)',
// // // //           border: '1px solid var(--border-cyan)',
// // // //           borderRadius: 24,
// // // //           display: 'grid',
// // // //           gridTemplateColumns: '1fr auto',
// // // //           gap: 40,
// // // //           alignItems: 'center',
// // // //           position: 'relative',
// // // //           overflow: 'hidden',
// // // //         }}>
// // // //           {/* BG glow */}
// // // //           <div style={{ position: 'absolute', top: -80, right: -40, width: 300, height: 300, background: `radial-gradient(circle, ${vc.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

// // // //           <div>
// // // //             <span className="badge badge-muted" style={{ marginBottom: 16 }}>Evaluation Report</span>
// // // //             <h1 style={{ fontSize: '2.8rem', marginBottom: 8 }}>{report.candidate_name}</h1>
// // // //             <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
// // // //               {report.city && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>📍 {report.city}</span>}
// // // //               {report.experience_years && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.experience_years}y exp</span>}
// // // //               {report.interview_duration_minutes && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.interview_duration_minutes}min</span>}
// // // //             </div>
// // // //             {/* Verdict */}
// // // //             <div style={{
// // // //               display: 'inline-flex', alignItems: 'center', gap: 10,
// // // //               padding: '10px 20px', borderRadius: 12,
// // // //               background: vc.bg, border: `1px solid ${vc.border}`, marginBottom: 16,
// // // //             }}>
// // // //               <span style={{ fontSize: '1.3rem' }}>{vc.icon}</span>
// // // //               <span style={{ color: vc.color, fontWeight: 800, fontSize: '1.1rem' }}>{report.final_verdict}</span>
// // // //               <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
// // // //                 {report.hiring_confidence}% confidence
// // // //               </span>
// // // //             </div>
// // // //             <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: 560 }}>
// // // //               {report.verdict_rationale}
// // // //             </p>
// // // //             {report.teaching_style && (
// // // //               <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)' }}>
// // // //                 <Star size={12} color="var(--indigo)" />
// // // //                 <span style={{ fontSize: '0.78rem', color: 'var(--indigo)', fontFamily: 'var(--font-mono)' }}>
// // // //                   {report.teaching_style}
// // // //                 </span>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Big score */}
// // // //           <div style={{ textAlign: 'center' }}>
// // // //             <ScoreRing score={report.total_score} color={vc.color} />
// // // //           </div>
// // // //         </div>
// // // //       </motion.div>

// // // //       {/* ── STATS ROW ────────────────────────────────────── */}
// // // //       {report.stats && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
// // // //           style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 40 }}
// // // //         >
// // // //           {[
// // // //             { l: 'Total Words',    v: report.stats.total_words_spoken,        c: 'var(--cyan)',    dec: 0 },
// // // //             { l: 'Avg Response',   v: report.stats.average_response_length,   c: 'var(--indigo)',  dec: 0, suf: 'w' },
// // // //             { l: 'Examples',       v: report.stats.concrete_examples_given,   c: 'var(--amber)',   dec: 0 },
// // // //             { l: 'Strong',         v: report.stats.strong_responses,          c: 'var(--emerald)', dec: 0 },
// // // //             { l: 'Weak',           v: report.stats.weak_responses,            c: 'var(--rose)',    dec: 0 },
// // // //             { l: 'Follow-ups',     v: report.stats.follow_up_count,           c: 'var(--violet)',  dec: 0 },
// // // //             { l: 'Total Score',    v: report.total_score,                     c: vc.color,         dec: 1, suf: '/10' },
// // // //           ].map(s => (
// // // //             <div key={s.l} className="card" style={{ padding: '14px 12px', textAlign: 'center' }}>
// // // //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.4rem', color: s.c, lineHeight: 1 }}>
// // // //                 <AnimatedCounter value={s.v} decimals={s.dec} suffix={s.suf || ''} />
// // // //               </div>
// // // //               <div style={{ fontSize: '0.66rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 5 }}>
// // // //                 {s.l}
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </motion.div>
// // // //       )}

// // // //       {/* ── MAIN GRID ────────────────────────────────────── */}
// // // //       <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28 }}>

// // // //         {/* LEFT */}
// // // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

// // // //           {/* Bar chart */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
// // // //             className="card" style={{ padding: 28 }}
// // // //           >
// // // //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Dimension Scores</h3>
// // // //             <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 22 }}>Weighted scores 1–10 per hiring dimension</p>
// // // //             <ResponsiveContainer width="100%" height={220}>
// // // //               <BarChart data={barData} barCategoryGap="30%">
// // // //                 <XAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// // // //                 <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// // // //                 <Tooltip
// // // //                   contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12, color: 'var(--text-0)' }}
// // // //                   formatter={(v: number, _: string, props: any) => [`${v}/10`, props.payload.fullName]}
// // // //                   cursor={{ fill: 'rgba(255,255,255,0.03)' }}
// // // //                 />
// // // //                 <Bar dataKey="score" radius={[4, 4, 0, 0]}>
// // // //                   {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
// // // //                 </Bar>
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </motion.div>

// // // //           {/* Dimension detail cards */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
// // // //             className="card" style={{ padding: 28 }}
// // // //           >
// // // //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>Detailed Breakdown</h3>
// // // //             <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
// // // //               {report.dimensions.map((dim, i) => (
// // // //                 <DimensionCard key={dim.dimension} dim={dim} index={i} color={DIM_COLORS[i]} />
// // // //               ))}
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Key Insight */}
// // // //           {report.key_insight && (
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
// // // //               className="card-glow" style={{ padding: 28 }}
// // // //             >
// // // //               <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
// // // //                 <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // //                   <Quote size={18} color="var(--cyan)" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <div style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Key Insight</div>
// // // //                   <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--text-0)' }}>{report.key_insight}</p>
// // // //                 </div>
// // // //               </div>
// // // //             </motion.div>
// // // //           )}

// // // //           {/* Best / Weakest responses */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
// // // //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// // // //           >
// // // //             {[
// // // //               { label: '★ Best Response', text: report.best_response, color: 'var(--emerald)', border: 'rgba(52,211,153,0.2)' },
// // // //               { label: '✕ Weakest Response', text: report.weakest_response, color: 'var(--rose)', border: 'rgba(251,113,133,0.2)' },
// // // //             ].map(r => (
// // // //               r.text && (
// // // //                 <div key={r.label} className="card" style={{ padding: 20 }}>
// // // //                   <div style={{ fontSize: '0.68rem', color: r.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, borderLeft: `3px solid ${r.color}`, paddingLeft: 8 }}>
// // // //                     {r.label}
// // // //                   </div>
// // // //                   <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
// // // //                     "{r.text.slice(0, 220)}{r.text.length > 220 ? '…' : ''}"
// // // //                   </p>
// // // //                 </div>
// // // //               )
// // // //             ))}
// // // //           </motion.div>

// // // //           {/* Strengths + Weaknesses */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
// // // //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// // // //           >
// // // //             <div className="card" style={{ padding: 24 }}>
// // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // // //                 <TrendingUp size={16} color="var(--emerald)" />
// // // //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald)' }}>Strengths</h4>
// // // //               </div>
// // // //               {report.strengths.map((s, i) => (
// // // //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// // // //                   <CheckCircle size={14} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
// // // //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{s}</span>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             <div className="card" style={{ padding: 24 }}>
// // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // // //                 <AlertTriangle size={16} color="var(--amber)" />
// // // //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber)' }}>Growth Areas</h4>
// // // //               </div>
// // // //               {report.weaknesses.map((w, i) => (
// // // //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// // // //                   <XCircle size={14} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
// // // //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{w}</span>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>

// // // //         {/* RIGHT */}
// // // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

// // // //           {/* Radar Chart */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
// // // //             className="card" style={{ padding: 24 }}
// // // //           >
// // // //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Skill Web</h4>
// // // //             <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 8 }}>Competency across all 6 dimensions</p>
// // // //             <ResponsiveContainer width="100%" height={270}>
// // // //               <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
// // // //                 <PolarGrid stroke="rgba(255,255,255,0.06)" />
// // // //                 <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} />
// // // //                 <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
// // // //                 <Radar dataKey="score" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.1} strokeWidth={1.5} dot={{ fill: 'var(--cyan)', r: 3 }} />
// // // //                 <Tooltip contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 11 }} formatter={(v: number) => [`${v}/10`]} />
// // // //               </RadarChart>
// // // //             </ResponsiveContainer>
// // // //           </motion.div>

// // // //           {/* Confidence Gauge */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}
// // // //             className="card" style={{ padding: 24 }}
// // // //           >
// // // //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16 }}>Hiring Confidence</h4>
// // // //             <ConfidenceGauge value={report.hiring_confidence} color={vc.color} />
// // // //           </motion.div>

// // // //           {/* Coaching Notes */}
// // // //           {report.coaching_notes?.length > 0 && (
// // // //             <motion.div
// // // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
// // // //               className="card" style={{ padding: 24 }}
// // // //             >
// // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // // //                 <BookOpen size={16} color="var(--indigo)" />
// // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Coaching Notes</h4>
// // // //               </div>
// // // //               {report.coaching_notes.map((note, i) => (
// // // //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, padding: '10px 14px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: 8, marginBottom: 8 }}>
// // // //                   <span style={{ color: 'var(--indigo)', fontFamily: 'var(--font-mono)', marginRight: 6 }}>{i + 1}.</span>
// // // //                   {note}
// // // //                 </div>
// // // //               ))}
// // // //             </motion.div>
// // // //           )}

// // // //           {/* Risk flags */}
// // // //           {report.risk_flags?.filter(Boolean).length > 0 && (
// // // //             <motion.div
// // // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
// // // //               className="card" style={{ padding: 24 }}
// // // //             >
// // // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // // //                 <AlertTriangle size={16} color="var(--rose)" />
// // // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose)' }}>Risk Flags</h4>
// // // //               </div>
// // // //               {report.risk_flags.filter(Boolean).map((flag, i) => (
// // // //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', paddingLeft: 12, borderLeft: '2px solid var(--rose)', lineHeight: 1.5, marginBottom: 8 }}>
// // // //                   {flag}
// // // //                 </div>
// // // //               ))}
// // // //             </motion.div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // /* ── Score Ring ── */
// // // // function ScoreRing({ score, color }: { score: number; color: string }) {
// // // //   const circumference = 2 * Math.PI * 52
// // // //   const offset = circumference * (1 - score / 10)
// // // //   return (
// // // //     <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// // // //       <svg width={140} height={140}>
// // // //         <circle cx={70} cy={70} r={52} fill="none" stroke="var(--bg-5)" strokeWidth={10} />
// // // //         <motion.circle
// // // //           cx={70} cy={70} r={52} fill="none"
// // // //           stroke={color} strokeWidth={10}
// // // //           strokeLinecap="round"
// // // //           strokeDasharray={circumference}
// // // //           initial={{ strokeDashoffset: circumference }}
// // // //           animate={{ strokeDashoffset: offset }}
// // // //           transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.3 }}
// // // //           style={{ transformOrigin: '70px 70px', transform: 'rotate(-90deg)' }}
// // // //         />
// // // //       </svg>
// // // //       <div style={{ position: 'absolute', textAlign: 'center' }}>
// // // //         <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '2.2rem', color, lineHeight: 1 }}>
// // // //           <AnimatedCounter value={score} decimals={1} />
// // // //         </div>
// // // //         <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 3 }}>/ 10</div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // /* ── Confidence gauge ── */
// // // // function ConfidenceGauge({ value, color }: { value: number; color: string }) {
// // // //   const circumference = 2 * Math.PI * 44 * 0.75
// // // //   const offset = circumference * (1 - value / 100)
// // // //   return (
// // // //     <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
// // // //       <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// // // //         <svg width={100} height={100} viewBox="0 0 100 100">
// // // //           <circle cx={50} cy={50} r={44} fill="none" stroke="var(--bg-5)" strokeWidth={8} strokeDasharray={`${circumference} ${circumference * 4}`} strokeDashoffset={-circumference * 0.125} strokeLinecap="round" />
// // // //           <motion.circle
// // // //             cx={50} cy={50} r={44} fill="none"
// // // //             stroke={color} strokeWidth={8}
// // // //             strokeLinecap="round"
// // // //             strokeDasharray={`${circumference} ${circumference * 4}`}
// // // //             initial={{ strokeDashoffset: -circumference * 0.125 + circumference }}
// // // //             animate={{ strokeDashoffset: -circumference * 0.125 + offset }}
// // // //             transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.5 }}
// // // //           />
// // // //         </svg>
// // // //         <div style={{ position: 'absolute', textAlign: 'center' }}>
// // // //           <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color, lineHeight: 1 }}>
// // // //             <AnimatedCounter value={value} suffix="%" duration={1400} />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <div>
// // // //         <div style={{ fontWeight: 600, fontSize: '0.9rem', color }}>
// // // //           {value >= 80 ? 'High Confidence' : value >= 55 ? 'Moderate' : 'Low Confidence'}
// // // //         </div>
// // // //         <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>
// // // //           Based on response quality, signal distribution, and evidence count.
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // /* ── Collapsible dimension card ── */
// // // // function DimensionCard({ dim, index, color }: { dim: DimScore; index: number; color: string }) {
// // // //   const [open, setOpen] = useState(false)
// // // //   const Icon = DIM_ICONS[dim.dimension] || Target
// // // //   const pct = (dim.score / 10) * 100
// // // //   const scoreColor = dim.score >= 7.5 ? 'var(--emerald)' : dim.score >= 5.5 ? 'var(--amber)' : 'var(--rose)'
// // // //   const ref = useRef(null)
// // // //   const inView = useInView(ref, { once: true })

// // // //   return (
// // // //     <motion.div
// // // //       ref={ref}
// // // //       initial={{ opacity: 0, x: -20 }}
// // // //       animate={inView ? { opacity: 1, x: 0 } : {}}
// // // //       transition={{ delay: index * 0.06, duration: 0.45 }}
// // // //       style={{
// // // //         borderBottom: '1px solid var(--border-0)',
// // // //         paddingBottom: 18, paddingTop: index === 0 ? 0 : 18,
// // // //       }}
// // // //     >
// // // //       <div
// // // //         style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
// // // //         onClick={() => setOpen(o => !o)}
// // // //       >
// // // //         <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // //           <Icon size={15} color={color} />
// // // //         </div>
// // // //         <div style={{ flex: 1 }}>
// // // //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
// // // //             <span style={{ fontWeight: 600, fontSize: '0.87rem' }}>{dim.dimension}</span>
// // // //             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
// // // //               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: scoreColor, fontSize: '1rem' }}>
// // // //                 {dim.score}<span style={{ fontSize: '0.7rem', opacity: 0.6 }}>/10</span>
// // // //               </span>
// // // //               {open ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
// // // //             </div>
// // // //           </div>
// // // //           <div className="score-track">
// // // //             <motion.div
// // // //               className="score-fill"
// // // //               initial={{ width: 0 }}
// // // //               animate={inView ? { width: `${pct}%` } : {}}
// // // //               transition={{ delay: index * 0.06 + 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
// // // //               style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <AnimatePresence>
// // // //         {open && (
// // // //           <motion.div
// // // //             initial={{ height: 0, opacity: 0 }}
// // // //             animate={{ height: 'auto', opacity: 1 }}
// // // //             exit={{ height: 0, opacity: 0 }}
// // // //             transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
// // // //             style={{ overflow: 'hidden' }}
// // // //           >
// // // //             <div style={{ paddingLeft: 46, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
// // // //               <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{dim.explanation}</p>
// // // //               {dim.supporting_quote && (
// // // //                 <div style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.02)', borderLeft: `3px solid ${color}`, borderRadius: '0 6px 6px 0', fontSize: '0.78rem', color: 'var(--text-3)', fontStyle: 'italic' }}>
// // // //                   "{dim.supporting_quote}"
// // // //                 </div>
// // // //               )}
// // // //               <div style={{ display: 'flex', gap: 8 }}>
// // // //                 <span className={`badge badge-muted`} style={{ fontSize: '0.62rem' }}>
// // // //                   weight: {dim.weight}
// // // //                 </span>
// // // //                 {dim.evidence_count > 0 && (
// // // //                   <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>
// // // //                     {dim.evidence_count} evidence points
// // // //                   </span>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </motion.div>
// // // //   )
// // // // }

// // // // function Loader() {
// // // //   return (
// // // //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
// // // //       <div className="spinner" style={{ width: 40, height: 40 }} />
// // // //       <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
// // // //         Generating evaluation…
// // // //       </p>
// // // //     </div>
// // // //   )
// // // // }



// // // import { useEffect, useRef, useState } from 'react'
// // // import { useParams, useNavigate } from 'react-router-dom'
// // // import { motion, useInView } from 'framer-motion'
// // // import {
// // //   ArrowLeft, Quote, TrendingUp, AlertTriangle,
// // //   BookOpen, Star, Target, Brain, Heart, Volume2,
// // //   CheckCircle, XCircle, ChevronDown, ChevronUp,
// // //   RefreshCw,
// // // } from 'lucide-react'
// // // import { evaluationApi, recruiterApi } from '@/lib/api'
// // // import { AnimatedCounter } from '@/components/ui'
// // // import {
// // //   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// // //   RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
// // //   PolarRadiusAxis
// // // } from 'recharts'
// // // import toast from 'react-hot-toast'

// // // /* ── Types ── */
// // // interface DimScore {
// // //   dimension: string; score: number; weight: number;
// // //   explanation: string; supporting_quote: string; evidence_count: number;
// // // }
// // // interface Report {
// // //   session_id: string; candidate_name: string; experience_years: number | null;
// // //   total_score: number; final_verdict: string; verdict_rationale: string;
// // //   hiring_confidence: number;
// // //   dimensions: DimScore[];
// // //   strengths: string[]; weaknesses: string[];
// // //   coaching_notes: string[]; key_insight: string;
// // //   best_response: string; weakest_response: string;
// // //   teaching_style: string; teaching_style_reasoning: string;
// // //   risk_flags: string[];
// // //   stats: {
// // //     total_candidate_turns: number; total_words_spoken: number;
// // //     average_response_length: number; concrete_examples_given: number;
// // //     strong_responses: number; weak_responses: number; follow_up_count: number;
// // //   } | null;
// // //   interview_duration_minutes: number | null; city: string | null;
// // // }

// // // const VERDICT_CFG = {
// // //   'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', icon: '★', cls: 'badge-emerald' },
// // //   'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  icon: '◎', cls: 'badge-amber' },
// // //   'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.3)', icon: '✕', cls: 'badge-rose' },
// // // }

// // // const DIM_ICONS: Record<string, any> = {
// // //   'Communication Clarity':  Target,
// // //   'Ability to Simplify':    Brain,
// // //   'Patience & Empathy':     Heart,
// // //   'Warmth & Child Connect': Star,
// // //   'English Fluency':        Volume2,
// // //   'Math Teaching Ability':  CheckCircle,
// // // }

// // // const DIM_COLORS = ['#22d3ee','#818cf8','#34d399','#fbbf24','#c084fc','#fb7185']

// // // export default function EvaluationPage() {
// // //   const { sessionId } = useParams()
// // //   const navigate = useNavigate()
// // //   const [report, setReport] = useState<Report | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [generating, setGenerating] = useState(false)
// // //   const [error, setError] = useState<string | null>(null)

// // //   async function loadReport(id: string) {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       // 1. Try recruiter/report endpoint first (returns full dict with extra fields)
// // //       try {
// // //         const { data } = await recruiterApi.report(id)
// // //         if (data && data.total_score !== undefined) {
// // //           setReport(data)
// // //           return
// // //         }
// // //       } catch {}

// // //       // 2. Try GET /evaluation/{id}
// // //       try {
// // //         const { data } = await evaluationApi.get(id)
// // //         if (data && data.total_score !== undefined) {
// // //           setReport(data)
// // //           return
// // //         }
// // //       } catch {}

// // //       // 3. Generate fresh evaluation
// // //       setGenerating(true)
// // //       const { data } = await evaluationApi.generate(id)
// // //       // generate returns the report directly OR we need to GET it
// // //       if (data && data.total_score !== undefined) {
// // //         setReport(data)
// // //       } else {
// // //         // Backend returns report via GET after generation
// // //         const { data: report2 } = await recruiterApi.report(id)
// // //         setReport(report2)
// // //       }
// // //     } catch (e: any) {
// // //       const msg = e?.response?.data?.detail || e?.message || 'Failed to load report'
// // //       setError(msg)
// // //       toast.error(msg)
// // //     } finally {
// // //       setLoading(false)
// // //       setGenerating(false)
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     if (sessionId) loadReport(sessionId)
// // //   }, [sessionId])

// // //   if (loading) return <Loader generating={generating} />
// // //   if (error) return (
// // //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, textAlign: 'center' }}>
// // //       <div style={{ fontSize: '3rem' }}>⚠️</div>
// // //       <h2 style={{ fontSize: '1.5rem' }}>Could not load report</h2>
// // //       <p style={{ color: 'var(--text-2)', maxWidth: 420, lineHeight: 1.6, fontSize: '0.9rem' }}>{error}</p>
// // //       <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>Session: {sessionId}</p>
// // //       <div style={{ display: 'flex', gap: 12 }}>
// // //         <button className="btn btn-primary btn-md" onClick={() => sessionId && loadReport(sessionId)}>
// // //           <RefreshCw size={15} /> Retry
// // //         </button>
// // //         <button className="btn btn-ghost btn-md" onClick={() => navigate('/recruiter')}>
// // //           <ArrowLeft size={15} /> Back
// // //         </button>
// // //       </div>
// // //     </div>
// // //   )
// // //   if (!report) return (
// // //     <div style={{ padding: 60, color: 'var(--text-2)', textAlign: 'center' }}>
// // //       <p>No report data found.</p>
// // //       <button className="btn btn-primary btn-md" style={{ marginTop: 20 }} onClick={() => sessionId && loadReport(sessionId)}>
// // //         Generate Report
// // //       </button>
// // //     </div>
// // //   )

// // //   const vc = VERDICT_CFG[report.final_verdict as keyof typeof VERDICT_CFG] || VERDICT_CFG['Consider']

// // //   // Build chart data
// // //   const barData = report.dimensions.map((d, i) => ({
// // //     name: d.dimension.split(' ')[0], fullName: d.dimension,
// // //     score: d.score, fill: DIM_COLORS[i],
// // //   }))
// // //   const radarData = report.dimensions.map((d, i) => ({
// // //     subject: d.dimension.replace(' & ', '/').split(' ').slice(0, 2).join(' '),
// // //     score: d.score, fullMark: 10,
// // //   }))

// // //   return (
// // //     <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 80px' }}>
// // //       {/* Back */}
// // //       <motion.button
// // //         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
// // //         className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}
// // //         onClick={() => navigate('/recruiter')}
// // //       >
// // //         <ArrowLeft size={15} /> Back to Candidates
// // //       </motion.button>

// // //       {/* ── HERO HEADER ─────────────────────────────────── */}
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
// // //         style={{ marginBottom: 48 }}
// // //       >
// // //         <div style={{
// // //           padding: '40px 48px',
// // //           background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(129,140,248,0.04) 100%)',
// // //           border: '1px solid var(--border-cyan)',
// // //           borderRadius: 24,
// // //           display: 'grid',
// // //           gridTemplateColumns: '1fr auto',
// // //           gap: 40,
// // //           alignItems: 'center',
// // //           position: 'relative',
// // //           overflow: 'hidden',
// // //         }}>
// // //           {/* BG glow */}
// // //           <div style={{ position: 'absolute', top: -80, right: -40, width: 300, height: 300, background: `radial-gradient(circle, ${vc.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

// // //           <div>
// // //             <span className="badge badge-muted" style={{ marginBottom: 16 }}>Evaluation Report</span>
// // //             <h1 style={{ fontSize: '2.8rem', marginBottom: 8 }}>{report.candidate_name}</h1>
// // //             <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
// // //               {report.city && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>📍 {report.city}</span>}
// // //               {report.experience_years && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.experience_years}y exp</span>}
// // //               {report.interview_duration_minutes && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.interview_duration_minutes}min</span>}
// // //             </div>
// // //             {/* Verdict */}
// // //             <div style={{
// // //               display: 'inline-flex', alignItems: 'center', gap: 10,
// // //               padding: '10px 20px', borderRadius: 12,
// // //               background: vc.bg, border: `1px solid ${vc.border}`, marginBottom: 16,
// // //             }}>
// // //               <span style={{ fontSize: '1.3rem' }}>{vc.icon}</span>
// // //               <span style={{ color: vc.color, fontWeight: 800, fontSize: '1.1rem' }}>{report.final_verdict}</span>
// // //               <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
// // //                 {report.hiring_confidence}% confidence
// // //               </span>
// // //             </div>
// // //             <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: 560 }}>
// // //               {report.verdict_rationale}
// // //             </p>
// // //             {report.teaching_style && (
// // //               <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)' }}>
// // //                 <Star size={12} color="var(--indigo)" />
// // //                 <span style={{ fontSize: '0.78rem', color: 'var(--indigo)', fontFamily: 'var(--font-mono)' }}>
// // //                   {report.teaching_style}
// // //                 </span>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Big score */}
// // //           <div style={{ textAlign: 'center' }}>
// // //             <ScoreRing score={report.total_score} color={vc.color} />
// // //           </div>
// // //         </div>
// // //       </motion.div>

// // //       {/* ── STATS ROW ────────────────────────────────────── */}
// // //       {report.stats && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
// // //           style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 40 }}
// // //         >
// // //           {[
// // //             { l: 'Total Words',    v: report.stats.total_words_spoken,        c: 'var(--cyan)',    dec: 0 },
// // //             { l: 'Avg Response',   v: report.stats.average_response_length,   c: 'var(--indigo)',  dec: 0, suf: 'w' },
// // //             { l: 'Examples',       v: report.stats.concrete_examples_given,   c: 'var(--amber)',   dec: 0 },
// // //             { l: 'Strong',         v: report.stats.strong_responses,          c: 'var(--emerald)', dec: 0 },
// // //             { l: 'Weak',           v: report.stats.weak_responses,            c: 'var(--rose)',    dec: 0 },
// // //             { l: 'Follow-ups',     v: report.stats.follow_up_count,           c: 'var(--violet)',  dec: 0 },
// // //             { l: 'Total Score',    v: report.total_score,                     c: vc.color,         dec: 1, suf: '/10' },
// // //           ].map(s => (
// // //             <div key={s.l} className="card" style={{ padding: '14px 12px', textAlign: 'center' }}>
// // //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.4rem', color: s.c, lineHeight: 1 }}>
// // //                 <AnimatedCounter value={s.v} decimals={s.dec} suffix={s.suf || ''} />
// // //               </div>
// // //               <div style={{ fontSize: '0.66rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 5 }}>
// // //                 {s.l}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </motion.div>
// // //       )}

// // //       {/* ── MAIN GRID ────────────────────────────────────── */}
// // //       <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28 }}>

// // //         {/* LEFT */}
// // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

// // //           {/* Bar chart */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
// // //             className="card" style={{ padding: 28 }}
// // //           >
// // //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Dimension Scores</h3>
// // //             <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 22 }}>Weighted scores 1–10 per hiring dimension</p>
// // //             <ResponsiveContainer width="100%" height={220}>
// // //               <BarChart data={barData} barCategoryGap="30%">
// // //                 <XAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// // //                 <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// // //                 <Tooltip
// // //                   contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12, color: 'var(--text-0)' }}
// // //                   formatter={(v: number, _: string, props: any) => [`${v}/10`, props.payload.fullName]}
// // //                   cursor={{ fill: 'rgba(255,255,255,0.03)' }}
// // //                 />
// // //                 <Bar dataKey="score" radius={[4, 4, 0, 0]}>
// // //                   {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
// // //                 </Bar>
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </motion.div>

// // //           {/* Dimension detail cards */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
// // //             className="card" style={{ padding: 28 }}
// // //           >
// // //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>Detailed Breakdown</h3>
// // //             <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
// // //               {report.dimensions.map((dim, i) => (
// // //                 <DimensionCard key={dim.dimension} dim={dim} index={i} color={DIM_COLORS[i]} />
// // //               ))}
// // //             </div>
// // //           </motion.div>

// // //           {/* Key Insight */}
// // //           {report.key_insight && (
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
// // //               className="card-glow" style={{ padding: 28 }}
// // //             >
// // //               <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
// // //                 <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // //                   <Quote size={18} color="var(--cyan)" />
// // //                 </div>
// // //                 <div>
// // //                   <div style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Key Insight</div>
// // //                   <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--text-0)' }}>{report.key_insight}</p>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           )}

// // //           {/* Best / Weakest responses */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
// // //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// // //           >
// // //             {[
// // //               { label: '★ Best Response', text: report.best_response, color: 'var(--emerald)', border: 'rgba(52,211,153,0.2)' },
// // //               { label: '✕ Weakest Response', text: report.weakest_response, color: 'var(--rose)', border: 'rgba(251,113,133,0.2)' },
// // //             ].map(r => (
// // //               r.text && (
// // //                 <div key={r.label} className="card" style={{ padding: 20 }}>
// // //                   <div style={{ fontSize: '0.68rem', color: r.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, borderLeft: `3px solid ${r.color}`, paddingLeft: 8 }}>
// // //                     {r.label}
// // //                   </div>
// // //                   <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
// // //                     "{r.text.slice(0, 220)}{r.text.length > 220 ? '…' : ''}"
// // //                   </p>
// // //                 </div>
// // //               )
// // //             ))}
// // //           </motion.div>

// // //           {/* Strengths + Weaknesses */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
// // //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// // //           >
// // //             <div className="card" style={{ padding: 24 }}>
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // //                 <TrendingUp size={16} color="var(--emerald)" />
// // //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald)' }}>Strengths</h4>
// // //               </div>
// // //               {report.strengths.map((s, i) => (
// // //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// // //                   <CheckCircle size={14} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
// // //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{s}</span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             <div className="card" style={{ padding: 24 }}>
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // //                 <AlertTriangle size={16} color="var(--amber)" />
// // //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber)' }}>Growth Areas</h4>
// // //               </div>
// // //               {report.weaknesses.map((w, i) => (
// // //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// // //                   <XCircle size={14} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
// // //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{w}</span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </motion.div>
// // //         </div>

// // //         {/* RIGHT */}
// // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

// // //           {/* Radar Chart */}
// // //           <motion.div
// // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
// // //             className="card" style={{ padding: 24 }}
// // //           >
// // //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Skill Web</h4>
// // //             <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 8 }}>Competency across all 6 dimensions</p>
// // //             <ResponsiveContainer width="100%" height={270}>
// // //               <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
// // //                 <PolarGrid stroke="rgba(255,255,255,0.06)" />
// // //                 <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} />
// // //                 <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
// // //                 <Radar dataKey="score" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.1} strokeWidth={1.5} dot={{ fill: 'var(--cyan)', r: 3 }} />
// // //                 <Tooltip contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 11 }} formatter={(v: number) => [`${v}/10`]} />
// // //               </RadarChart>
// // //             </ResponsiveContainer>
// // //           </motion.div>

// // //           {/* Confidence Gauge */}
// // //           <motion.div
// // //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}
// // //             className="card" style={{ padding: 24 }}
// // //           >
// // //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16 }}>Hiring Confidence</h4>
// // //             <ConfidenceGauge value={report.hiring_confidence} color={vc.color} />
// // //           </motion.div>

// // //           {/* Coaching Notes */}
// // //           {report.coaching_notes?.length > 0 && (
// // //             <motion.div
// // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
// // //               className="card" style={{ padding: 24 }}
// // //             >
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// // //                 <BookOpen size={16} color="var(--indigo)" />
// // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Coaching Notes</h4>
// // //               </div>
// // //               {report.coaching_notes.map((note, i) => (
// // //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, padding: '10px 14px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: 8, marginBottom: 8 }}>
// // //                   <span style={{ color: 'var(--indigo)', fontFamily: 'var(--font-mono)', marginRight: 6 }}>{i + 1}.</span>
// // //                   {note}
// // //                 </div>
// // //               ))}
// // //             </motion.div>
// // //           )}

// // //           {/* Risk flags */}
// // //           {report.risk_flags?.filter(Boolean).length > 0 && (
// // //             <motion.div
// // //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
// // //               className="card" style={{ padding: 24 }}
// // //             >
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// // //                 <AlertTriangle size={16} color="var(--rose)" />
// // //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose)' }}>Risk Flags</h4>
// // //               </div>
// // //               {report.risk_flags.filter(Boolean).map((flag, i) => (
// // //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', paddingLeft: 12, borderLeft: '2px solid var(--rose)', lineHeight: 1.5, marginBottom: 8 }}>
// // //                   {flag}
// // //                 </div>
// // //               ))}
// // //             </motion.div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ── Score Ring ── */
// // // function ScoreRing({ score, color }: { score: number; color: string }) {
// // //   const circumference = 2 * Math.PI * 52
// // //   const offset = circumference * (1 - score / 10)
// // //   return (
// // //     <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// // //       <svg width={140} height={140}>
// // //         <circle cx={70} cy={70} r={52} fill="none" stroke="var(--bg-5)" strokeWidth={10} />
// // //         <motion.circle
// // //           cx={70} cy={70} r={52} fill="none"
// // //           stroke={color} strokeWidth={10}
// // //           strokeLinecap="round"
// // //           strokeDasharray={circumference}
// // //           initial={{ strokeDashoffset: circumference }}
// // //           animate={{ strokeDashoffset: offset }}
// // //           transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.3 }}
// // //           style={{ transformOrigin: '70px 70px', transform: 'rotate(-90deg)' }}
// // //         />
// // //       </svg>
// // //       <div style={{ position: 'absolute', textAlign: 'center' }}>
// // //         <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '2.2rem', color, lineHeight: 1 }}>
// // //           <AnimatedCounter value={score} decimals={1} />
// // //         </div>
// // //         <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 3 }}>/ 10</div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ── Confidence gauge ── */
// // // function ConfidenceGauge({ value, color }: { value: number; color: string }) {
// // //   const circumference = 2 * Math.PI * 44 * 0.75
// // //   const offset = circumference * (1 - value / 100)
// // //   return (
// // //     <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
// // //       <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// // //         <svg width={100} height={100} viewBox="0 0 100 100">
// // //           <circle cx={50} cy={50} r={44} fill="none" stroke="var(--bg-5)" strokeWidth={8} strokeDasharray={`${circumference} ${circumference * 4}`} strokeDashoffset={-circumference * 0.125} strokeLinecap="round" />
// // //           <motion.circle
// // //             cx={50} cy={50} r={44} fill="none"
// // //             stroke={color} strokeWidth={8}
// // //             strokeLinecap="round"
// // //             strokeDasharray={`${circumference} ${circumference * 4}`}
// // //             initial={{ strokeDashoffset: -circumference * 0.125 + circumference }}
// // //             animate={{ strokeDashoffset: -circumference * 0.125 + offset }}
// // //             transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.5 }}
// // //           />
// // //         </svg>
// // //         <div style={{ position: 'absolute', textAlign: 'center' }}>
// // //           <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color, lineHeight: 1 }}>
// // //             <AnimatedCounter value={value} suffix="%" duration={1400} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <div>
// // //         <div style={{ fontWeight: 600, fontSize: '0.9rem', color }}>
// // //           {value >= 80 ? 'High Confidence' : value >= 55 ? 'Moderate' : 'Low Confidence'}
// // //         </div>
// // //         <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>
// // //           Based on response quality, signal distribution, and evidence count.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ── Collapsible dimension card ── */
// // // function DimensionCard({ dim, index, color }: { dim: DimScore; index: number; color: string }) {
// // //   const [open, setOpen] = useState(false)
// // //   const Icon = DIM_ICONS[dim.dimension] || Target
// // //   const pct = (dim.score / 10) * 100
// // //   const scoreColor = dim.score >= 7.5 ? 'var(--emerald)' : dim.score >= 5.5 ? 'var(--amber)' : 'var(--rose)'
// // //   const ref = useRef(null)
// // //   const inView = useInView(ref, { once: true })

// // //   return (
// // //     <motion.div
// // //       ref={ref}
// // //       initial={{ opacity: 0, x: -20 }}
// // //       animate={inView ? { opacity: 1, x: 0 } : {}}
// // //       transition={{ delay: index * 0.06, duration: 0.45 }}
// // //       style={{
// // //         borderBottom: '1px solid var(--border-0)',
// // //         paddingBottom: 18, paddingTop: index === 0 ? 0 : 18,
// // //       }}
// // //     >
// // //       <div
// // //         style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
// // //         onClick={() => setOpen(o => !o)}
// // //       >
// // //         <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // //           <Icon size={15} color={color} />
// // //         </div>
// // //         <div style={{ flex: 1 }}>
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
// // //             <span style={{ fontWeight: 600, fontSize: '0.87rem' }}>{dim.dimension}</span>
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
// // //               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: scoreColor, fontSize: '1rem' }}>
// // //                 {dim.score}<span style={{ fontSize: '0.7rem', opacity: 0.6 }}>/10</span>
// // //               </span>
// // //               {open ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
// // //             </div>
// // //           </div>
// // //           <div className="score-track">
// // //             <motion.div
// // //               className="score-fill"
// // //               initial={{ width: 0 }}
// // //               animate={inView ? { width: `${pct}%` } : {}}
// // //               transition={{ delay: index * 0.06 + 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
// // //               style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <AnimatePresence>
// // //         {open && (
// // //           <motion.div
// // //             initial={{ height: 0, opacity: 0 }}
// // //             animate={{ height: 'auto', opacity: 1 }}
// // //             exit={{ height: 0, opacity: 0 }}
// // //             transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
// // //             style={{ overflow: 'hidden' }}
// // //           >
// // //             <div style={{ paddingLeft: 46, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
// // //               <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{dim.explanation}</p>
// // //               {dim.supporting_quote && (
// // //                 <div style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.02)', borderLeft: `3px solid ${color}`, borderRadius: '0 6px 6px 0', fontSize: '0.78rem', color: 'var(--text-3)', fontStyle: 'italic' }}>
// // //                   "{dim.supporting_quote}"
// // //                 </div>
// // //               )}
// // //               <div style={{ display: 'flex', gap: 8 }}>
// // //                 <span className={`badge badge-muted`} style={{ fontSize: '0.62rem' }}>
// // //                   weight: {dim.weight}
// // //                 </span>
// // //                 {dim.evidence_count > 0 && (
// // //                   <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>
// // //                     {dim.evidence_count} evidence points
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </motion.div>
// // //   )
// // // }

// // // function Loader({ generating }: { generating?: boolean }) {
// // //   return (
// // //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
// // //       {/* Animated rings */}
// // //       <div style={{ position: 'relative', width: 80, height: 80 }}>
// // //         <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--border-1)', borderTop: '2px solid var(--cyan)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
// // //         <div style={{ position: 'absolute', inset: 8, border: '2px solid var(--border-1)', borderBottom: '2px solid var(--indigo)', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
// // //         <div style={{ position: 'absolute', inset: 18, border: '2px solid var(--border-1)', borderTop: '2px solid var(--amber)', borderRadius: '50%', animation: 'spin 2s linear infinite' }} />
// // //       </div>
// // //       <div style={{ textAlign: 'center' }}>
// // //         <p style={{ color: 'var(--text-1)', fontWeight: 600, marginBottom: 6 }}>
// // //           {generating ? 'Generating evaluation…' : 'Loading report…'}
// // //         </p>
// // //         <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
// // //           {generating ? 'Analyzing transcript · Scoring dimensions · Building report' : 'Fetching your data'}
// // //         </p>
// // //       </div>
// // //     </div>
// // //   )
// // // }








// // import { useEffect, useRef, useState } from 'react'
// // import { useParams, useNavigate } from 'react-router-dom'
// // import { motion, useInView } from 'framer-motion'
// // import {
// //   ArrowLeft, Quote, TrendingUp, AlertTriangle,
// //   BookOpen, Star, Target, Brain, Heart, Volume2,
// //   CheckCircle, XCircle, ChevronDown, ChevronUp,
// //   RefreshCw,
// // } from 'lucide-react'
// // import { evaluationApi, recruiterApi } from '@/lib/api'
// // import { AnimatedCounter } from '@/components/ui'
// // import {
// //   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// //   RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
// //   PolarRadiusAxis
// // } from 'recharts'
// // import toast from 'react-hot-toast'

// // /* ── Types ── */
// // interface DimScore {
// //   dimension: string; score: number; weight: number;
// //   explanation: string; supporting_quote: string; evidence_count: number;
// // }
// // interface Report {
// //   session_id: string; candidate_name: string; experience_years: number | null;
// //   total_score: number; final_verdict: string; verdict_rationale: string;
// //   hiring_confidence: number;
// //   dimensions: DimScore[];
// //   strengths: string[]; weaknesses: string[];
// //   coaching_notes: string[]; key_insight: string;
// //   best_response: string; weakest_response: string;
// //   teaching_style: string; teaching_style_reasoning: string;
// //   risk_flags: string[];
// //   stats: {
// //     total_candidate_turns: number; total_words_spoken: number;
// //     average_response_length: number; concrete_examples_given: number;
// //     strong_responses: number; weak_responses: number; follow_up_count: number;
// //   } | null;
// //   interview_duration_minutes: number | null; city: string | null;
// // }

// // const VERDICT_CFG = {
// //   'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', icon: '★', cls: 'badge-emerald' },
// //   'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  icon: '◎', cls: 'badge-amber' },
// //   'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.3)', icon: '✕', cls: 'badge-rose' },
// // }

// // const DIM_ICONS: Record<string, any> = {
// //   'Communication Clarity':  Target,
// //   'Ability to Simplify':    Brain,
// //   'Patience & Empathy':     Heart,
// //   'Warmth & Child Connect': Star,
// //   'English Fluency':        Volume2,
// //   'Math Teaching Ability':  CheckCircle,
// // }

// // const DIM_COLORS = ['#22d3ee','#818cf8','#34d399','#fbbf24','#c084fc','#fb7185']

// // export default function EvaluationPage() {
// //   const { sessionId } = useParams()
// //   const navigate = useNavigate()
// //   const [report, setReport] = useState<Report | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [generating, setGenerating] = useState(false)
// //   const [error, setError] = useState<string | null>(null)

// //   async function loadReport(id: string) {
// //     setLoading(true)
// //     setGenerating(false)
// //     setError(null)

// //     // Step 1 — check if report already exists
// //     let found = false
// //     try {
// //       const res = await recruiterApi.report(id)
// //       if (res.data && res.data.total_score !== undefined) {
// //         setReport(res.data)
// //         found = true
// //       }
// //     } catch (e: any) {
// //       // 404 means not generated yet — that's expected, continue
// //       if (e?.response?.status !== 404) {
// //         console.warn('recruiter/report error:', e?.response?.status)
// //       }
// //     }

// //     if (found) { setLoading(false); return }

// //     // Step 2 — try /evaluation GET
// //     try {
// //       const res = await evaluationApi.get(id)
// //       if (res.data && res.data.total_score !== undefined) {
// //         setReport(res.data)
// //         setLoading(false)
// //         return
// //       }
// //     } catch (e: any) {
// //       if (e?.response?.status !== 404) {
// //         console.warn('evaluation/get error:', e?.response?.status)
// //       }
// //     }

// //     // Step 3 — generate the evaluation (LLM call — may take 10-20s)
// //     setGenerating(true)
// //     try {
// //       const genRes = await evaluationApi.generate(id)
// //       // Backend /generate returns the report directly as JSON
// //       if (genRes.data && genRes.data.total_score !== undefined) {
// //         setReport(genRes.data)
// //         setLoading(false)
// //         setGenerating(false)
// //         return
// //       }
// //       // If generate returned the EvaluationReport model (not the full dict),
// //       // fetch the full dict from recruiter/report which has extra fields
// //       const fetchRes = await recruiterApi.report(id)
// //       if (fetchRes.data) {
// //         setReport(fetchRes.data)
// //       }
// //     } catch (e: any) {
// //       const status = e?.response?.status
// //       const detail = e?.response?.data?.detail || e?.response?.data?.message || e?.message || 'Unknown error'
// //       let userMsg = `Failed to generate report.`
// //       if (status === 400) userMsg = `Not enough interview data. The candidate needs at least 2 responses. (${detail})`
// //       else if (status === 404) userMsg = `Session not found. The session ID may be invalid. (${detail})`
// //       else if (status === 500) userMsg = `Server error during evaluation. Check your LLM API key. (${detail})`
// //       setError(userMsg)
// //     } finally {
// //       setLoading(false)
// //       setGenerating(false)
// //     }
// //   }

// //   useEffect(() => {
// //     if (sessionId) loadReport(sessionId)
// //   }, [sessionId])

// //   if (loading) return <Loader generating={generating} />
// //   if (error) return (
// //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, textAlign: 'center' }}>
// //       <div style={{ fontSize: '3rem' }}>⚠️</div>
// //       <h2 style={{ fontSize: '1.5rem' }}>Could not load report</h2>
// //       <p style={{ color: 'var(--text-2)', maxWidth: 480, lineHeight: 1.7, fontSize: '0.9rem' }}>{error}</p>
// //       <div className="card" style={{ padding: '16px 24px', maxWidth: 480, width: '100%', textAlign: 'left' }}>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6 }}>DEBUG INFO</p>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>
// //           Session ID: <span style={{ color: 'var(--cyan)' }}>{sessionId}</span>
// //         </p>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
// //           Tried: GET /recruiter/report/{sessionId}
// //         </p>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
// //           Tried: GET /evaluation/{sessionId}
// //         </p>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
// //           Tried: POST /evaluation/generate
// //         </p>
// //         <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 10 }}>
// //           Check browser DevTools → Network tab for exact HTTP status codes
// //         </p>
// //       </div>
// //       <div style={{ display: 'flex', gap: 12 }}>
// //         <button className="btn btn-primary btn-md" onClick={() => sessionId && loadReport(sessionId)}>
// //           <RefreshCw size={15} /> Retry
// //         </button>
// //         <button className="btn btn-ghost btn-md" onClick={() => navigate('/recruiter')}>
// //           <ArrowLeft size={15} /> Back to Candidates
// //         </button>
// //       </div>
// //     </div>
// //   )
// //   if (!report) return (
// //     <div style={{ padding: 60, color: 'var(--text-2)', textAlign: 'center' }}>
// //       <p>No report data found.</p>
// //       <button className="btn btn-primary btn-md" style={{ marginTop: 20 }} onClick={() => sessionId && loadReport(sessionId)}>
// //         Generate Report
// //       </button>
// //     </div>
// //   )

// //   const vc = VERDICT_CFG[report.final_verdict as keyof typeof VERDICT_CFG] || VERDICT_CFG['Consider']

// //   // Build chart data
// //   const barData = report.dimensions.map((d, i) => ({
// //     name: d.dimension.split(' ')[0], fullName: d.dimension,
// //     score: d.score, fill: DIM_COLORS[i],
// //   }))
// //   const radarData = report.dimensions.map((d, i) => ({
// //     subject: d.dimension.replace(' & ', '/').split(' ').slice(0, 2).join(' '),
// //     score: d.score, fullMark: 10,
// //   }))

// //   return (
// //     <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 80px' }}>
// //       {/* Back */}
// //       <motion.button
// //         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
// //         className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}
// //         onClick={() => navigate('/recruiter')}
// //       >
// //         <ArrowLeft size={15} /> Back to Candidates
// //       </motion.button>

// //       {/* ── HERO HEADER ─────────────────────────────────── */}
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
// //         style={{ marginBottom: 48 }}
// //       >
// //         <div style={{
// //           padding: '40px 48px',
// //           background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(129,140,248,0.04) 100%)',
// //           border: '1px solid var(--border-cyan)',
// //           borderRadius: 24,
// //           display: 'grid',
// //           gridTemplateColumns: '1fr auto',
// //           gap: 40,
// //           alignItems: 'center',
// //           position: 'relative',
// //           overflow: 'hidden',
// //         }}>
// //           {/* BG glow */}
// //           <div style={{ position: 'absolute', top: -80, right: -40, width: 300, height: 300, background: `radial-gradient(circle, ${vc.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

// //           <div>
// //             <span className="badge badge-muted" style={{ marginBottom: 16 }}>Evaluation Report</span>
// //             <h1 style={{ fontSize: '2.8rem', marginBottom: 8 }}>{report.candidate_name}</h1>
// //             <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
// //               {report.city && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>📍 {report.city}</span>}
// //               {report.experience_years && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.experience_years}y exp</span>}
// //               {report.interview_duration_minutes && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.interview_duration_minutes}min</span>}
// //             </div>
// //             {/* Verdict */}
// //             <div style={{
// //               display: 'inline-flex', alignItems: 'center', gap: 10,
// //               padding: '10px 20px', borderRadius: 12,
// //               background: vc.bg, border: `1px solid ${vc.border}`, marginBottom: 16,
// //             }}>
// //               <span style={{ fontSize: '1.3rem' }}>{vc.icon}</span>
// //               <span style={{ color: vc.color, fontWeight: 800, fontSize: '1.1rem' }}>{report.final_verdict}</span>
// //               <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
// //                 {report.hiring_confidence}% confidence
// //               </span>
// //             </div>
// //             <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: 560 }}>
// //               {report.verdict_rationale}
// //             </p>
// //             {report.teaching_style && (
// //               <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)' }}>
// //                 <Star size={12} color="var(--indigo)" />
// //                 <span style={{ fontSize: '0.78rem', color: 'var(--indigo)', fontFamily: 'var(--font-mono)' }}>
// //                   {report.teaching_style}
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           {/* Big score */}
// //           <div style={{ textAlign: 'center' }}>
// //             <ScoreRing score={report.total_score} color={vc.color} />
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* ── STATS ROW ────────────────────────────────────── */}
// //       {report.stats && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
// //           style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 40 }}
// //         >
// //           {[
// //             { l: 'Total Words',    v: report.stats.total_words_spoken,        c: 'var(--cyan)',    dec: 0 },
// //             { l: 'Avg Response',   v: report.stats.average_response_length,   c: 'var(--indigo)',  dec: 0, suf: 'w' },
// //             { l: 'Examples',       v: report.stats.concrete_examples_given,   c: 'var(--amber)',   dec: 0 },
// //             { l: 'Strong',         v: report.stats.strong_responses,          c: 'var(--emerald)', dec: 0 },
// //             { l: 'Weak',           v: report.stats.weak_responses,            c: 'var(--rose)',    dec: 0 },
// //             { l: 'Follow-ups',     v: report.stats.follow_up_count,           c: 'var(--violet)',  dec: 0 },
// //             { l: 'Total Score',    v: report.total_score,                     c: vc.color,         dec: 1, suf: '/10' },
// //           ].map(s => (
// //             <div key={s.l} className="card" style={{ padding: '14px 12px', textAlign: 'center' }}>
// //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.4rem', color: s.c, lineHeight: 1 }}>
// //                 <AnimatedCounter value={s.v} decimals={s.dec} suffix={s.suf || ''} />
// //               </div>
// //               <div style={{ fontSize: '0.66rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 5 }}>
// //                 {s.l}
// //               </div>
// //             </div>
// //           ))}
// //         </motion.div>
// //       )}

// //       {/* ── MAIN GRID ────────────────────────────────────── */}
// //       <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28 }}>

// //         {/* LEFT */}
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

// //           {/* Bar chart */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
// //             className="card" style={{ padding: 28 }}
// //           >
// //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Dimension Scores</h3>
// //             <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 22 }}>Weighted scores 1–10 per hiring dimension</p>
// //             <ResponsiveContainer width="100%" height={220}>
// //               <BarChart data={barData} barCategoryGap="30%">
// //                 <XAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// //                 <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
// //                 <Tooltip
// //                   contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12, color: 'var(--text-0)' }}
// //                   formatter={(v: number, _: string, props: any) => [`${v}/10`, props.payload.fullName]}
// //                   cursor={{ fill: 'rgba(255,255,255,0.03)' }}
// //                 />
// //                 <Bar dataKey="score" radius={[4, 4, 0, 0]}>
// //                   {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
// //                 </Bar>
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </motion.div>

// //           {/* Dimension detail cards */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
// //             className="card" style={{ padding: 28 }}
// //           >
// //             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>Detailed Breakdown</h3>
// //             <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
// //               {report.dimensions.map((dim, i) => (
// //                 <DimensionCard key={dim.dimension} dim={dim} index={i} color={DIM_COLORS[i]} />
// //               ))}
// //             </div>
// //           </motion.div>

// //           {/* Key Insight */}
// //           {report.key_insight && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
// //               className="card-glow" style={{ padding: 28 }}
// //             >
// //               <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
// //                 <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //                   <Quote size={18} color="var(--cyan)" />
// //                 </div>
// //                 <div>
// //                   <div style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Key Insight</div>
// //                   <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--text-0)' }}>{report.key_insight}</p>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           {/* Best / Weakest responses */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
// //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// //           >
// //             {[
// //               { label: '★ Best Response', text: report.best_response, color: 'var(--emerald)', border: 'rgba(52,211,153,0.2)' },
// //               { label: '✕ Weakest Response', text: report.weakest_response, color: 'var(--rose)', border: 'rgba(251,113,133,0.2)' },
// //             ].map(r => (
// //               r.text && (
// //                 <div key={r.label} className="card" style={{ padding: 20 }}>
// //                   <div style={{ fontSize: '0.68rem', color: r.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, borderLeft: `3px solid ${r.color}`, paddingLeft: 8 }}>
// //                     {r.label}
// //                   </div>
// //                   <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
// //                     "{r.text.slice(0, 220)}{r.text.length > 220 ? '…' : ''}"
// //                   </p>
// //                 </div>
// //               )
// //             ))}
// //           </motion.div>

// //           {/* Strengths + Weaknesses */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
// //             style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
// //           >
// //             <div className="card" style={{ padding: 24 }}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// //                 <TrendingUp size={16} color="var(--emerald)" />
// //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald)' }}>Strengths</h4>
// //               </div>
// //               {report.strengths.map((s, i) => (
// //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// //                   <CheckCircle size={14} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
// //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{s}</span>
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="card" style={{ padding: 24 }}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// //                 <AlertTriangle size={16} color="var(--amber)" />
// //                 <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber)' }}>Growth Areas</h4>
// //               </div>
// //               {report.weaknesses.map((w, i) => (
// //                 <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
// //                   <XCircle size={14} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
// //                   <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{w}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* RIGHT */}
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

// //           {/* Radar Chart */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
// //             className="card" style={{ padding: 24 }}
// //           >
// //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Skill Web</h4>
// //             <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 8 }}>Competency across all 6 dimensions</p>
// //             <ResponsiveContainer width="100%" height={270}>
// //               <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
// //                 <PolarGrid stroke="rgba(255,255,255,0.06)" />
// //                 <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} />
// //                 <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
// //                 <Radar dataKey="score" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.1} strokeWidth={1.5} dot={{ fill: 'var(--cyan)', r: 3 }} />
// //                 <Tooltip contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 11 }} formatter={(v: number) => [`${v}/10`]} />
// //               </RadarChart>
// //             </ResponsiveContainer>
// //           </motion.div>

// //           {/* Confidence Gauge */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}
// //             className="card" style={{ padding: 24 }}
// //           >
// //             <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16 }}>Hiring Confidence</h4>
// //             <ConfidenceGauge value={report.hiring_confidence} color={vc.color} />
// //           </motion.div>

// //           {/* Coaching Notes */}
// //           {report.coaching_notes?.length > 0 && (
// //             <motion.div
// //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
// //               className="card" style={{ padding: 24 }}
// //             >
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
// //                 <BookOpen size={16} color="var(--indigo)" />
// //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Coaching Notes</h4>
// //               </div>
// //               {report.coaching_notes.map((note, i) => (
// //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, padding: '10px 14px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: 8, marginBottom: 8 }}>
// //                   <span style={{ color: 'var(--indigo)', fontFamily: 'var(--font-mono)', marginRight: 6 }}>{i + 1}.</span>
// //                   {note}
// //                 </div>
// //               ))}
// //             </motion.div>
// //           )}

// //           {/* Risk flags */}
// //           {report.risk_flags?.filter(Boolean).length > 0 && (
// //             <motion.div
// //               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
// //               className="card" style={{ padding: 24 }}
// //             >
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
// //                 <AlertTriangle size={16} color="var(--rose)" />
// //                 <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose)' }}>Risk Flags</h4>
// //               </div>
// //               {report.risk_flags.filter(Boolean).map((flag, i) => (
// //                 <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', paddingLeft: 12, borderLeft: '2px solid var(--rose)', lineHeight: 1.5, marginBottom: 8 }}>
// //                   {flag}
// //                 </div>
// //               ))}
// //             </motion.div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ── Score Ring ── */
// // function ScoreRing({ score, color }: { score: number; color: string }) {
// //   const circumference = 2 * Math.PI * 52
// //   const offset = circumference * (1 - score / 10)
// //   return (
// //     <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// //       <svg width={140} height={140}>
// //         <circle cx={70} cy={70} r={52} fill="none" stroke="var(--bg-5)" strokeWidth={10} />
// //         <motion.circle
// //           cx={70} cy={70} r={52} fill="none"
// //           stroke={color} strokeWidth={10}
// //           strokeLinecap="round"
// //           strokeDasharray={circumference}
// //           initial={{ strokeDashoffset: circumference }}
// //           animate={{ strokeDashoffset: offset }}
// //           transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.3 }}
// //           style={{ transformOrigin: '70px 70px', transform: 'rotate(-90deg)' }}
// //         />
// //       </svg>
// //       <div style={{ position: 'absolute', textAlign: 'center' }}>
// //         <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '2.2rem', color, lineHeight: 1 }}>
// //           <AnimatedCounter value={score} decimals={1} />
// //         </div>
// //         <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 3 }}>/ 10</div>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ── Confidence gauge ── */
// // function ConfidenceGauge({ value, color }: { value: number; color: string }) {
// //   const circumference = 2 * Math.PI * 44 * 0.75
// //   const offset = circumference * (1 - value / 100)
// //   return (
// //     <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
// //       <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
// //         <svg width={100} height={100} viewBox="0 0 100 100">
// //           <circle cx={50} cy={50} r={44} fill="none" stroke="var(--bg-5)" strokeWidth={8} strokeDasharray={`${circumference} ${circumference * 4}`} strokeDashoffset={-circumference * 0.125} strokeLinecap="round" />
// //           <motion.circle
// //             cx={50} cy={50} r={44} fill="none"
// //             stroke={color} strokeWidth={8}
// //             strokeLinecap="round"
// //             strokeDasharray={`${circumference} ${circumference * 4}`}
// //             initial={{ strokeDashoffset: -circumference * 0.125 + circumference }}
// //             animate={{ strokeDashoffset: -circumference * 0.125 + offset }}
// //             transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.5 }}
// //           />
// //         </svg>
// //         <div style={{ position: 'absolute', textAlign: 'center' }}>
// //           <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color, lineHeight: 1 }}>
// //             <AnimatedCounter value={value} suffix="%" duration={1400} />
// //           </div>
// //         </div>
// //       </div>
// //       <div>
// //         <div style={{ fontWeight: 600, fontSize: '0.9rem', color }}>
// //           {value >= 80 ? 'High Confidence' : value >= 55 ? 'Moderate' : 'Low Confidence'}
// //         </div>
// //         <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>
// //           Based on response quality, signal distribution, and evidence count.
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ── Collapsible dimension card ── */
// // function DimensionCard({ dim, index, color }: { dim: DimScore; index: number; color: string }) {
// //   const [open, setOpen] = useState(false)
// //   const Icon = DIM_ICONS[dim.dimension] || Target
// //   const pct = (dim.score / 10) * 100
// //   const scoreColor = dim.score >= 7.5 ? 'var(--emerald)' : dim.score >= 5.5 ? 'var(--amber)' : 'var(--rose)'
// //   const ref = useRef(null)
// //   const inView = useInView(ref, { once: true })

// //   return (
// //     <motion.div
// //       ref={ref}
// //       initial={{ opacity: 0, x: -20 }}
// //       animate={inView ? { opacity: 1, x: 0 } : {}}
// //       transition={{ delay: index * 0.06, duration: 0.45 }}
// //       style={{
// //         borderBottom: '1px solid var(--border-0)',
// //         paddingBottom: 18, paddingTop: index === 0 ? 0 : 18,
// //       }}
// //     >
// //       <div
// //         style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
// //         onClick={() => setOpen(o => !o)}
// //       >
// //         <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //           <Icon size={15} color={color} />
// //         </div>
// //         <div style={{ flex: 1 }}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
// //             <span style={{ fontWeight: 600, fontSize: '0.87rem' }}>{dim.dimension}</span>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
// //               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: scoreColor, fontSize: '1rem' }}>
// //                 {dim.score}<span style={{ fontSize: '0.7rem', opacity: 0.6 }}>/10</span>
// //               </span>
// //               {open ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
// //             </div>
// //           </div>
// //           <div className="score-track">
// //             <motion.div
// //               className="score-fill"
// //               initial={{ width: 0 }}
// //               animate={inView ? { width: `${pct}%` } : {}}
// //               transition={{ delay: index * 0.06 + 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
// //               style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <AnimatePresence>
// //         {open && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: 'auto', opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
// //             style={{ overflow: 'hidden' }}
// //           >
// //             <div style={{ paddingLeft: 46, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
// //               <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{dim.explanation}</p>
// //               {dim.supporting_quote && (
// //                 <div style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.02)', borderLeft: `3px solid ${color}`, borderRadius: '0 6px 6px 0', fontSize: '0.78rem', color: 'var(--text-3)', fontStyle: 'italic' }}>
// //                   "{dim.supporting_quote}"
// //                 </div>
// //               )}
// //               <div style={{ display: 'flex', gap: 8 }}>
// //                 <span className={`badge badge-muted`} style={{ fontSize: '0.62rem' }}>
// //                   weight: {dim.weight}
// //                 </span>
// //                 {dim.evidence_count > 0 && (
// //                   <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>
// //                     {dim.evidence_count} evidence points
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </motion.div>
// //   )
// // }

// // function Loader({ generating }: { generating?: boolean }) {
// //   const [step, setStep] = useState(0)
// //   const steps = [
// //     'Checking existing report…',
// //     'Analyzing transcript…',
// //     'Scoring 6 dimensions…',
// //     'Building evaluation report…',
// //   ]
// //   useEffect(() => {
// //     if (!generating) return
// //     const iv = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 3500)
// //     return () => clearInterval(iv)
// //   }, [generating])

// //   return (
// //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
// //       {/* Triple ring spinner */}
// //       <div style={{ position: 'relative', width: 88, height: 88 }}>
// //         <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--border-1)', borderTop: '2px solid var(--cyan)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
// //         <div style={{ position: 'absolute', inset: 10, border: '2px solid var(--border-1)', borderBottom: '2px solid var(--indigo)', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
// //         <div style={{ position: 'absolute', inset: 20, border: '2px solid var(--border-1)', borderTop: '2px solid var(--amber)', borderRadius: '50%', animation: 'spin 2s linear infinite' }} />
// //       </div>
// //       <div style={{ textAlign: 'center' }}>
// //         <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>
// //           {generating ? 'Generating Evaluation' : 'Loading Report'}
// //         </p>
// //         <p style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', height: 20, transition: 'all 0.3s' }}>
// //           {generating ? steps[step] : 'Fetching your data…'}
// //         </p>
// //         {generating && (
// //           <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', marginTop: 10 }}>
// //             This may take 10–20 seconds (LLM scoring)
// //           </p>
// //         )}
// //       </div>
// //       {/* Step dots */}
// //       {generating && (
// //         <div style={{ display: 'flex', gap: 8 }}>
// //           {steps.map((_, i) => (
// //             <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? 'var(--cyan)' : 'var(--bg-5)', transition: 'background 0.4s', boxShadow: i <= step ? '0 0 8px var(--cyan)' : 'none' }} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }





import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Quote, TrendingUp, AlertTriangle,
  BookOpen, Star, Target, Brain, Heart, Volume2,
  CheckCircle, XCircle, ChevronDown, ChevronUp,
  RefreshCw,
} from 'lucide-react'
import { evaluationApi, recruiterApi } from '@/lib/api'
import { AnimatedCounter } from '@/components/ui'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
  PolarRadiusAxis
} from 'recharts'
import toast from 'react-hot-toast'

/* ── Types ── */
interface DimScore {
  dimension: string; score: number; weight: number;
  explanation: string; supporting_quote: string; evidence_count: number;
}
interface Report {
  session_id: string; candidate_name: string; experience_years: number | null;
  total_score: number; final_verdict: string; verdict_rationale: string;
  hiring_confidence: number;
  dimensions: DimScore[];
  strengths: string[]; weaknesses: string[];
  coaching_notes: string[]; key_insight: string;
  best_response: string; weakest_response: string;
  teaching_style: string; teaching_style_reasoning: string;
  risk_flags: string[];
  stats: {
    total_candidate_turns: number; total_words_spoken: number;
    average_response_length: number; concrete_examples_given: number;
    strong_responses: number; weak_responses: number; follow_up_count: number;
  } | null;
  interview_duration_minutes: number | null; city: string | null;
}

const VERDICT_CFG = {
  'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', icon: '★', cls: 'badge-emerald' },
  'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  icon: '◎', cls: 'badge-amber' },
  'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.3)', icon: '✕', cls: 'badge-rose' },
}

const DIM_ICONS: Record<string, any> = {
  'Communication Clarity':  Target,
  'Ability to Simplify':    Brain,
  'Patience & Empathy':     Heart,
  'Warmth & Child Connect': Star,
  'English Fluency':        Volume2,
  'Math Teaching Ability':  CheckCircle,
}

const DIM_COLORS = ['#22d3ee','#818cf8','#34d399','#fbbf24','#c084fc','#fb7185']

export default function EvaluationPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadReport(id: string) {
    setLoading(true)
    setGenerating(false)
    setError(null)

    // Step 1 — check if report already exists
    let found = false
    try {
      const res = await recruiterApi.report(id)
      if (res.data && res.data.total_score !== undefined) {
        setReport(res.data)
        found = true
      }
    } catch (e: any) {
      // 404 means not generated yet — that's expected, continue
      if (e?.response?.status !== 404) {
        console.warn('recruiter/report error:', e?.response?.status)
      }
    }

    if (found) { setLoading(false); return }

    // Step 2 — try /evaluation GET
    try {
      const res = await evaluationApi.get(id)
      if (res.data && res.data.total_score !== undefined) {
        setReport(res.data)
        setLoading(false)
        return
      }
    } catch (e: any) {
      if (e?.response?.status !== 404) {
        console.warn('evaluation/get error:', e?.response?.status)
      }
    }

    // Step 3 — generate the evaluation (LLM call — may take 10-20s)
    setGenerating(true)
    try {
      const genRes = await evaluationApi.generate(id)
      // Backend /generate returns the report directly as JSON
      if (genRes.data && genRes.data.total_score !== undefined) {
        setReport(genRes.data)
        setLoading(false)
        setGenerating(false)
        return
      }
      // If generate returned the EvaluationReport model (not the full dict),
      // fetch the full dict from recruiter/report which has extra fields
      const fetchRes = await recruiterApi.report(id)
      if (fetchRes.data) {
        setReport(fetchRes.data)
      }
    } catch (e: any) {
      const status = e?.response?.status
      const detail = e?.response?.data?.detail || e?.response?.data?.message || e?.message || 'Unknown error'
      let userMsg = `Failed to generate report.`
      if (status === 400) userMsg = `Not enough interview data. The candidate needs at least 2 responses. (${detail})`
      else if (status === 404) userMsg = `Session not found. The session ID may be invalid. (${detail})`
      else if (status === 500) userMsg = `Server error during evaluation. Check your LLM API key. (${detail})`
      setError(userMsg)
    } finally {
      setLoading(false)
      setGenerating(false)
    }
  }

  useEffect(() => {
    if (sessionId) loadReport(sessionId)
  }, [sessionId])

  if (loading) return <Loader generating={generating} />
  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <h2 style={{ fontSize: '1.5rem' }}>Could not load report</h2>
      <p style={{ color: 'var(--text-2)', maxWidth: 480, lineHeight: 1.7, fontSize: '0.9rem' }}>{error}</p>
      <div className="card" style={{ padding: '16px 24px', maxWidth: 480, width: '100%', textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6 }}>DEBUG INFO</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>
          Session ID: <span style={{ color: 'var(--cyan)' }}>{sessionId}</span>
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
          Tried: GET /recruiter/report/{sessionId}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
          Tried: GET /evaluation/{sessionId}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 4 }}>
          Tried: POST /evaluation/generate
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 10 }}>
          Check browser DevTools → Network tab for exact HTTP status codes
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-primary btn-md" onClick={() => sessionId && loadReport(sessionId)}>
          <RefreshCw size={15} /> Retry
        </button>
        <button className="btn btn-ghost btn-md" onClick={() => navigate('/recruiter')}>
          <ArrowLeft size={15} /> Back to Candidates
        </button>
      </div>
    </div>
  )
  if (!report) return (
    <div style={{ padding: 60, color: 'var(--text-2)', textAlign: 'center' }}>
      <p>No report data found.</p>
      <button className="btn btn-primary btn-md" style={{ marginTop: 20 }} onClick={() => sessionId && loadReport(sessionId)}>
        Generate Report
      </button>
    </div>
  )

  const vc = VERDICT_CFG[report.final_verdict as keyof typeof VERDICT_CFG] || VERDICT_CFG['Consider']

  // Build chart data
  const barData = report.dimensions.map((d, i) => ({
    name: d.dimension.split(' ')[0], fullName: d.dimension,
    score: d.score, fill: DIM_COLORS[i],
  }))
  const radarData = report.dimensions.map((d, i) => ({
    subject: d.dimension.replace(' & ', '/').split(' ').slice(0, 2).join(' '),
    score: d.score, fullMark: 10,
  }))

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 80px' }}>
      {/* Back */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}
        onClick={() => navigate('/recruiter')}
      >
        <ArrowLeft size={15} /> Back to Candidates
      </motion.button>

      {/* ── HERO HEADER ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{
          padding: '40px 48px',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(129,140,248,0.04) 100%)',
          border: '1px solid var(--border-cyan)',
          borderRadius: 24,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* BG glow */}
          <div style={{ position: 'absolute', top: -80, right: -40, width: 300, height: 300, background: `radial-gradient(circle, ${vc.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div>
            <span className="badge badge-muted" style={{ marginBottom: 16 }}>Evaluation Report</span>
            <h1 style={{ fontSize: '2.8rem', marginBottom: 8 }}>{report.candidate_name}</h1>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
              {report.city && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>📍 {report.city}</span>}
              {report.experience_years && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.experience_years}y exp</span>}
              {report.interview_duration_minutes && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>· {report.interview_duration_minutes}min</span>}
            </div>
            {/* Verdict */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '10px 20px', borderRadius: 12,
              background: vc.bg, border: `1px solid ${vc.border}`, marginBottom: 16,
            }}>
              <span style={{ fontSize: '1.3rem' }}>{vc.icon}</span>
              <span style={{ color: vc.color, fontWeight: 800, fontSize: '1.1rem' }}>{report.final_verdict}</span>
              <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                {report.hiring_confidence}% confidence
              </span>
            </div>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: 560 }}>
              {report.verdict_rationale}
            </p>
            {report.teaching_style && (
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)' }}>
                <Star size={12} color="var(--indigo)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--indigo)', fontFamily: 'var(--font-mono)' }}>
                  {report.teaching_style}
                </span>
              </div>
            )}
          </div>

          {/* Big score */}
          <div style={{ textAlign: 'center' }}>
            <ScoreRing score={report.total_score} color={vc.color} />
          </div>
        </div>
      </motion.div>

      {/* ── STATS ROW ────────────────────────────────────── */}
      {report.stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 40 }}
        >
          {[
            { l: 'Total Words',    v: report.stats.total_words_spoken,        c: 'var(--cyan)',    dec: 0 },
            { l: 'Avg Response',   v: report.stats.average_response_length,   c: 'var(--indigo)',  dec: 0, suf: 'w' },
            { l: 'Examples',       v: report.stats.concrete_examples_given,   c: 'var(--amber)',   dec: 0 },
            { l: 'Strong',         v: report.stats.strong_responses,          c: 'var(--emerald)', dec: 0 },
            { l: 'Weak',           v: report.stats.weak_responses,            c: 'var(--rose)',    dec: 0 },
            { l: 'Follow-ups',     v: report.stats.follow_up_count,           c: 'var(--violet)',  dec: 0 },
            { l: 'Total Score',    v: report.total_score,                     c: vc.color,         dec: 1, suf: '/10' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.4rem', color: s.c, lineHeight: 1 }}>
                <AnimatedCounter value={s.v} decimals={s.dec} suffix={s.suf || ''} />
              </div>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 5 }}>
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── MAIN GRID ────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28 }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="card" style={{ padding: 28 }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Dimension Scores</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 22 }}>Weighted scores 1–10 per hiring dimension</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barCategoryGap="30%">
                <XAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12, color: 'var(--text-0)' }}
                  formatter={(v: number, _: string, props: any) => [`${v}/10`, props.payload.fullName]}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Dimension detail cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card" style={{ padding: 28 }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24 }}>Detailed Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {report.dimensions.map((dim, i) => (
                <DimensionCard key={dim.dimension} dim={dim} index={i} color={DIM_COLORS[i]} />
              ))}
            </div>
          </motion.div>

          {/* Key Insight */}
          {report.key_insight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="card-glow" style={{ padding: 28 }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Quote size={18} color="var(--cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Key Insight</div>
                  <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--text-0)' }}>{report.key_insight}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Best / Weakest responses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {[
              { label: '★ Best Response', text: report.best_response, color: 'var(--emerald)', border: 'rgba(52,211,153,0.2)' },
              { label: '✕ Weakest Response', text: report.weakest_response, color: 'var(--rose)', border: 'rgba(251,113,133,0.2)' },
            ].map(r => (
              r.text && (
                <div key={r.label} className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: '0.68rem', color: r.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, borderLeft: `3px solid ${r.color}`, paddingLeft: 8 }}>
                    {r.label}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{r.text.slice(0, 220)}{r.text.length > 220 ? '…' : ''}"
                  </p>
                </div>
              )
            ))}
          </motion.div>

          {/* Strengths + Weaknesses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <TrendingUp size={16} color="var(--emerald)" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald)' }}>Strengths</h4>
              </div>
              {report.strengths.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <CheckCircle size={14} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <AlertTriangle size={16} color="var(--amber)" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber)' }}>Growth Areas</h4>
              </div>
              {report.weaknesses.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <XCircle size={14} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{w}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="card" style={{ padding: 24 }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Skill Web</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 8 }}>Competency across all 6 dimensions</p>
            <ResponsiveContainer width="100%" height={270}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'DM Mono' }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                <Radar dataKey="score" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.1} strokeWidth={1.5} dot={{ fill: 'var(--cyan)', r: 3 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-4)', border: '1px solid var(--border-2)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 11 }} formatter={(v: number) => [`${v}/10`]} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Confidence Gauge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}
            className="card" style={{ padding: 24 }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16 }}>Hiring Confidence</h4>
            <ConfidenceGauge value={report.hiring_confidence} color={vc.color} />
          </motion.div>

          {/* Coaching Notes */}
          {report.coaching_notes?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
              className="card" style={{ padding: 24 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <BookOpen size={16} color="var(--indigo)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Coaching Notes</h4>
              </div>
              {report.coaching_notes.map((note, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, padding: '10px 14px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: 'var(--indigo)', fontFamily: 'var(--font-mono)', marginRight: 6 }}>{i + 1}.</span>
                  {note}
                </div>
              ))}
            </motion.div>
          )}

          {/* Risk flags */}
          {report.risk_flags?.filter(Boolean).length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="card" style={{ padding: 24 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={16} color="var(--rose)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose)' }}>Risk Flags</h4>
              </div>
              {report.risk_flags.filter(Boolean).map((flag, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-2)', paddingLeft: 12, borderLeft: '2px solid var(--rose)', lineHeight: 1.5, marginBottom: 8 }}>
                  {flag}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Score Ring ── */
function ScoreRing({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 52
  const offset = circumference * (1 - score / 10)
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={140} height={140}>
        <circle cx={70} cy={70} r={52} fill="none" stroke="var(--bg-5)" strokeWidth={10} />
        <motion.circle
          cx={70} cy={70} r={52} fill="none"
          stroke={color} strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.3 }}
          style={{ transformOrigin: '70px 70px', transform: 'rotate(-90deg)' }}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '2.2rem', color, lineHeight: 1 }}>
          <AnimatedCounter value={score} decimals={1} />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 3 }}>/ 10</div>
      </div>
    </div>
  )
}

/* ── Confidence gauge ── */
function ConfidenceGauge({ value, color }: { value: number; color: string }) {
  const circumference = 2 * Math.PI * 44 * 0.75
  const offset = circumference * (1 - value / 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={100} height={100} viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={44} fill="none" stroke="var(--bg-5)" strokeWidth={8} strokeDasharray={`${circumference} ${circumference * 4}`} strokeDashoffset={-circumference * 0.125} strokeLinecap="round" />
          <motion.circle
            cx={50} cy={50} r={44} fill="none"
            stroke={color} strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference * 4}`}
            initial={{ strokeDashoffset: -circumference * 0.125 + circumference }}
            animate={{ strokeDashoffset: -circumference * 0.125 + offset }}
            transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.5 }}
          />
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color, lineHeight: 1 }}>
            <AnimatedCounter value={value} suffix="%" />
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color }}>
          {value >= 80 ? 'High Confidence' : value >= 55 ? 'Moderate' : 'Low Confidence'}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>
          Based on response quality, signal distribution, and evidence count.
        </p>
      </div>
    </div>
  )
}

/* ── Collapsible dimension card ── */
function DimensionCard({ dim, index, color }: { dim: DimScore; index: number; color: string }) {
  const [open, setOpen] = useState(false)
  const Icon = DIM_ICONS[dim.dimension] || Target
  const pct = (dim.score / 10) * 100
  const scoreColor = dim.score >= 7.5 ? 'var(--emerald)' : dim.score >= 5.5 ? 'var(--amber)' : 'var(--rose)'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      style={{
        borderBottom: '1px solid var(--border-0)',
        paddingBottom: 18, paddingTop: index === 0 ? 0 : 18,
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={15} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ fontWeight: 600, fontSize: '0.87rem' }}>{dim.dimension}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: scoreColor, fontSize: '1rem' }}>
                {dim.score}<span style={{ fontSize: '0.7rem', opacity: 0.6 }}>/10</span>
              </span>
              {open ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
            </div>
          </div>
          <div className="score-track">
            <motion.div
              className="score-fill"
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ delay: index * 0.06 + 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
              style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingLeft: 46, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{dim.explanation}</p>
              {dim.supporting_quote && (
                <div style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.02)', borderLeft: `3px solid ${color}`, borderRadius: '0 6px 6px 0', fontSize: '0.78rem', color: 'var(--text-3)', fontStyle: 'italic' }}>
                  "{dim.supporting_quote}"
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <span className={`badge badge-muted`} style={{ fontSize: '0.62rem' }}>
                  weight: {dim.weight}
                </span>
                {dim.evidence_count > 0 && (
                  <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>
                    {dim.evidence_count} evidence points
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Loader({ generating }: { generating?: boolean }) {
  const [step, setStep] = useState(0)
  const steps = [
    'Checking existing report…',
    'Analyzing transcript…',
    'Scoring 6 dimensions…',
    'Building evaluation report…',
  ]
  useEffect(() => {
    if (!generating) return
    const iv = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 3500)
    return () => clearInterval(iv)
  }, [generating])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      {/* Triple ring spinner */}
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--border-1)', borderTop: '2px solid var(--cyan)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 10, border: '2px solid var(--border-1)', borderBottom: '2px solid var(--indigo)', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 20, border: '2px solid var(--border-1)', borderTop: '2px solid var(--amber)', borderRadius: '50%', animation: 'spin 2s linear infinite' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>
          {generating ? 'Generating Evaluation' : 'Loading Report'}
        </p>
        <p style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', height: 20, transition: 'all 0.3s' }}>
          {generating ? steps[step] : 'Fetching your data…'}
        </p>
        {generating && (
          <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', marginTop: 10 }}>
            This may take 10–20 seconds (LLM scoring)
          </p>
        )}
      </div>
      {/* Step dots */}
      {generating && (
        <div style={{ display: 'flex', gap: 8 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? 'var(--cyan)' : 'var(--bg-5)', transition: 'background 0.4s', boxShadow: i <= step ? '0 0 8px var(--cyan)' : 'none' }} />
          ))}
        </div>
      )}
    </div>
  )
}
























// import { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Mic, Square, Bot, User, ChevronRight, StopCircle, Activity } from 'lucide-react'
// import { sessionApi, conversationApi, evaluationApi } from '@/lib/api'
// import { useInterviewStore } from '@/store'
// import { useSpeech } from '@/hooks/useSpeech'
// import { Waveform, SignalBadge } from '@/components/ui'
// import toast from 'react-hot-toast'

// const MAX_Q = 8 // Interview ends after this many questions

// type Phase = 'setup' | 'interview' | 'done'
// type RecPhase = 'idle' | 'recording' | 'processing'

// export default function InterviewPage() {
//   const navigate = useNavigate()
//   const store = useInterviewStore()
//   const speech = useSpeech()

//   const [phase, setPhase] = useState<Phase>('setup')
//   const [loading, setLoading] = useState(false)
//   const [form, setForm] = useState({ name: '', city: '', experience: '' })
//   const [aiThinking, setAiThinking] = useState(false)
//   const [recPhase, setRecPhase] = useState<RecPhase>('idle')
//   const [showEndConfirm, setShowEndConfirm] = useState(false)

//   const chatRef = useRef<HTMLDivElement>(null)
//   // This ref is the source of truth — checked BEFORE any speech/state update
//   const isCompletedRef = useRef(false)
//   const qCount = store.questionsAsked

//   useEffect(() => {
//     chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
//   }, [store.transcript])

//   // Cancel everything when component unmounts
//   useEffect(() => {
//     return () => {
//       speech.cancelSpeaking()
//     }
//   }, [])

//   function finishInterview(closingText?: string) {
//     // Mark done FIRST — all subsequent async checks will bail
//     isCompletedRef.current = true
//     // Kill any audio immediately
//     speech.cancelSpeaking()
//     speech.stopListening()
//     // Update state
//     store.complete()
//     setAiThinking(false)
//     setRecPhase('idle')
//     // Add closing message to transcript if provided (but DO NOT speak it)
//     if (closingText) {
//       store.addTurn('interviewer', closingText)
//     }
//     // Navigate to done screen
//     setPhase('done')
//   }

//   async function handleStart() {
//     if (!form.name.trim()) return toast.error('Please enter your name')
//     setLoading(true)
//     isCompletedRef.current = false
//     try {
//       const { data } = await sessionApi.start({
//         candidate: {
//           name: form.name.trim(),
//           city: form.city || undefined,
//           experience_years: form.experience ? parseInt(form.experience) : undefined,
//         },
//       })
//       store.reset()
//       store.setSession(data.session_id, form.name.trim())
//       store.addTurn('interviewer', data.greeting)
//       setPhase('interview')
//       await speech.speak(data.greeting)
//     } catch {
//       toast.error('Failed to start. Is the backend running?')
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function handleRecord() {
//     if (isCompletedRef.current) return  // guard
//     if (recPhase === 'recording') {
//       const text = speech.stopListening()
//       if (!text.trim()) { toast('Speak something first', { icon: '🎤' }); setRecPhase('idle'); return }
//       await submitResponse(text)
//     } else if (recPhase === 'idle') {
//       setRecPhase('recording')
//       speech.startListening()
//     }
//   }

//   async function submitResponse(text: string) {
//     if (isCompletedRef.current) return  // guard against late calls
//     setRecPhase('processing')
//     store.addTurn('candidate', text)
//     setAiThinking(true)

//     try {
//       const { data } = await conversationApi.turn({ session_id: store.sessionId!, candidate_text: text })

//       // Check IMMEDIATELY after await — may have been completed while waiting
//       if (isCompletedRef.current) return

//       store.setSignal(data.adaptive_signal.signal)

//       const qNum = parseInt(data.question_progress?.split(' ')[1] || '0') || (qCount + 1)
//       store.setProgress(data.question_progress, data.turn_number, qNum)

//       const isDone = data.is_interview_complete || qNum >= MAX_Q

//       if (isDone) {
//         // Add the closing text to transcript visually, but DO NOT speak it
//         // — call finishInterview which cancels all audio immediately
//         finishInterview(data.interviewer_text)
//         return
//       }

//       // Normal turn — check again before speaking
//       store.addTurn('interviewer', data.interviewer_text)
//       setAiThinking(false)
//       setRecPhase('idle')

//       // Only speak if still in interview
//       if (!isCompletedRef.current) {
//         await speech.speak(data.interviewer_text)
//       }
//     } catch {
//       if (!isCompletedRef.current) {
//         toast.error('Failed to process response')
//         setAiThinking(false)
//         setRecPhase('idle')
//       }
//     }
//   }

//   async function handleEndInterview() {
//     setShowEndConfirm(false)
//     // Finish immediately — don't wait for any API response
//     finishInterview('Thank you for your time! The Cuemath team will review your responses and be in touch soon.')
//     // Fire-and-forget the backend completion (don't await, don't speak result)
//     try {
//       await conversationApi.turn({
//         session_id: store.sessionId!,
//         candidate_text: 'I would like to end the interview now.',
//       })
//     } catch {
//       // Ignore — interview is already done on frontend
//     }
//   }

//   if (phase === 'setup') {
//     return <SetupScreen form={form} setForm={setForm} onStart={handleStart} loading={loading} />
//   }
//   if (phase === 'done') {
//     return <DoneScreen name={store.candidateName!} sessionId={store.sessionId!} navigate={navigate} />
//   }

//   const candidateTurns = store.transcript.filter(t => t.role === 'candidate')
//   const totalWords = candidateTurns.reduce((a, t) => a + t.text.split(' ').length, 0)

//   return (
//     <div style={{ height: '100vh', display: 'grid', gridTemplateColumns: '1fr 300px', overflow: 'hidden' }}>
//       {/* Main */}
//       <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
//         {/* Header */}
//         <div style={{
//           padding: '16px 28px', borderBottom: '1px solid var(--border-1)',
//           background: 'var(--bg-2)', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
//         }}>
//           <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//             <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 6px var(--emerald)', animation: 'pulse-glow 2s infinite' }} />
//             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>LIVE INTERVIEW</span>
//           </span>
//           <span style={{ color: 'var(--text-3)' }}>·</span>
//           <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan)' }}>
//             {store.questionProgress || 'Starting…'}
//           </span>
//           <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
//             <SignalBadge signal={store.signal} />
//             {qCount >= 3 && (
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => setShowEndConfirm(true)}
//               >
//                 <StopCircle size={13} /> End Interview
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div style={{ height: 2, background: 'var(--bg-5)', flexShrink: 0 }}>
//           <motion.div
//             style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--indigo))' }}
//             initial={{ width: '0%' }}
//             animate={{ width: `${Math.min((qCount / MAX_Q) * 100, 100)}%` }}
//             transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
//           />
//         </div>

//         {/* Chat */}
//         <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
//           <AnimatePresence initial={false}>
//             {store.transcript.map((turn, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.32, ease: [0.16,1,0.3,1] }}
//                 style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: turn.role === 'candidate' ? 'row-reverse' : 'row' }}
//               >
//                 <div style={{
//                   width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
//                   background: turn.role === 'interviewer' ? 'linear-gradient(135deg, var(--cyan), var(--indigo))' : 'var(--bg-5)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   border: turn.role === 'candidate' ? '1px solid var(--border-2)' : 'none',
//                 }}>
//                   {turn.role === 'interviewer' ? <Bot size={15} color="var(--bg-0)" /> : <User size={15} color="var(--text-2)" />}
//                 </div>
//                 <div
//                   className={turn.role === 'interviewer' ? 'bubble-ai' : 'bubble-user'}
//                   style={{ maxWidth: '72%', padding: '13px 16px', fontSize: '0.9rem', lineHeight: 1.65 }}
//                 >
//                   {turn.text}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {aiThinking && (
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
//               <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Bot size={15} color="var(--bg-0)" />
//               </div>
//               <div className="bubble-ai" style={{ padding: '13px 18px' }}>
//                 <div className="dots"><span /><span /><span /></div>
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* Controls */}
//         <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-2)', flexShrink: 0 }}>
//           <Waveform isActive={recPhase === 'recording'} barCount={48} />

//           {speech.transcript && (
//             <div style={{
//               margin: '10px 0 0',
//               padding: '8px 14px',
//               background: 'rgba(255,255,255,0.03)',
//               border: '1px solid var(--border-1)',
//               borderRadius: 8,
//               fontSize: '0.83rem',
//               color: 'var(--text-2)',
//               fontStyle: 'italic',
//             }}>
//               "{speech.transcript}"
//             </div>
//           )}

//           <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
//             <motion.button
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRecord}
//               disabled={recPhase === 'processing' || aiThinking || speech.isSpeaking}
//               style={{
//                 flex: 1, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer',
//                 background: recPhase === 'recording'
//                   ? 'linear-gradient(135deg, #fb7185, #f97316)'
//                   : 'linear-gradient(135deg, var(--cyan), var(--indigo))',
//                 color: 'var(--bg-0)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
//                 fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.9rem',
//                 opacity: (aiThinking || speech.isSpeaking) ? 0.4 : 1,
//                 transition: 'all 0.2s',
//                 boxShadow: recPhase === 'recording'
//                   ? '0 0 24px rgba(251,113,133,0.35)' : '0 0 24px rgba(34,211,238,0.2)',
//               }}
//             >
//               {recPhase === 'recording' ? (
//                 <><Square size={16} fill="currentColor" /> Stop & Submit</>
//               ) : recPhase === 'processing' ? (
//                 <><div className="dots"><span /><span /><span /></div> Processing...</>
//               ) : (
//                 <><Mic size={16} /> {speech.isSpeaking ? 'Alex is speaking…' : 'Click to Speak'}</>
//               )}
//             </motion.button>
//           </div>
//           <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
//             {speech.isSpeaking ? 'Wait for Alex to finish…' : 'Click to start · Click again to submit'}
//           </p>
//         </div>
//       </div>

//       {/* Right Stats Panel */}
//       <div style={{
//         borderLeft: '1px solid var(--border-1)',
//         background: 'var(--bg-2)',
//         padding: 20,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 16,
//         overflowY: 'auto',
//       }}>
//         <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
//           Live Stats
//         </div>

//         {[
//           { label: 'Questions', value: `${qCount} / ${MAX_Q}`, color: 'var(--cyan)' },
//           { label: 'Total Turns', value: candidateTurns.length, color: 'var(--indigo)' },
//           { label: 'Total Words', value: totalWords, color: 'var(--amber)' },
//           { label: 'Avg Words', value: candidateTurns.length ? Math.round(totalWords / candidateTurns.length) : 0, color: 'var(--emerald)' },
//         ].map(s => (
//           <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
//             <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>
//               {s.label}
//             </div>
//             <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: s.color, lineHeight: 1 }}>
//               {s.value}
//             </div>
//           </div>
//         ))}

//         {/* Progress ring */}
//         <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
//           <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', alignSelf: 'flex-start' }}>
//             Progress
//           </div>
//           <svg width="90" height="90" viewBox="0 0 90 90">
//             <circle cx="45" cy="45" r="35" fill="none" stroke="var(--bg-5)" strokeWidth="6" />
//             <motion.circle
//               cx="45" cy="45" r="35" fill="none"
//               stroke="var(--cyan)" strokeWidth="6"
//               strokeLinecap="round"
//               strokeDasharray={`${2 * Math.PI * 35}`}
//               initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
//               animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - Math.min(qCount / MAX_Q, 1)) }}
//               transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
//               style={{ transformOrigin: '45px 45px', transform: 'rotate(-90deg)' }}
//             />
//             <text x="45" y="50" textAnchor="middle" fill="var(--cyan)" fontSize="16" fontFamily="DM Mono" fontWeight="600">
//               {Math.round(Math.min((qCount / MAX_Q) * 100, 100))}%
//             </text>
//           </svg>
//           <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center' }}>
//             {MAX_Q - qCount > 0 ? `${MAX_Q - qCount} questions remaining` : 'Interview complete'}
//           </p>
//         </div>

//         {/* Candidate */}
//         <div className="card" style={{ padding: 14, marginTop: 'auto' }}>
//           <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Candidate</div>
//           <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{store.candidateName}</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--emerald)' }}>
//             <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />
//             Session active
//           </div>
//         </div>
//       </div>

//       {/* End Confirm Modal */}
//       <AnimatePresence>
//         {showEndConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             style={{
//               position: 'fixed', inset: 0, background: 'rgba(2,3,10,0.8)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               zIndex: 1000, backdropFilter: 'blur(8px)',
//             }}
//             onClick={() => setShowEndConfirm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
//               className="card"
//               style={{ padding: 36, maxWidth: 420, width: '90%', textAlign: 'center' }}
//               onClick={e => e.stopPropagation()}
//             >
//               <div style={{ fontSize: '2rem', marginBottom: 16 }}>⚠️</div>
//               <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>End Interview Early?</h3>
//               <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 28 }}>
//                 This will end the interview after {qCount} questions. The evaluation will use responses collected so far.
//               </p>
//               <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
//                 <button className="btn btn-ghost btn-md" onClick={() => setShowEndConfirm(false)}>
//                   Continue
//                 </button>
//                 <button className="btn btn-danger btn-md" onClick={handleEndInterview}>
//                   <StopCircle size={15} /> End Now
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// function SetupScreen({ form, setForm, onStart, loading }: any) {
//   return (
//     <div style={{
//       minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
//       padding: 40, position: 'relative',
//     }}>
//       <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
//       <div style={{ position: 'absolute', top: '20%', left: '25%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

//       <motion.div
//         initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
//         style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}
//       >
//         <span className="badge badge-cyan" style={{ marginBottom: 20 }}>Cuemath Tutor Screening</span>
//         <h1 style={{ fontSize: '3rem', marginBottom: 6 }}>Ready to</h1>
//         <h1 style={{ fontSize: '3rem', marginBottom: 20 }}>
//           <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--cyan)' }}>meet Alex?</span>
//         </h1>
//         <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 36 }}>
//           Your AI interviewer. 10–15 minutes. No wrong answers — just a real conversation about how you teach.
//         </p>

//         <div className="card-glow" style={{ padding: 28 }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//             <div>
//               <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
//                 Full Name *
//               </label>
//               <input className="input" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onKeyDown={(e: any) => e.key === 'Enter' && onStart()} autoFocus />
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//               <div>
//                 <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>City</label>
//                 <input className="input" placeholder="e.g. Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
//               </div>
//               <div>
//                 <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Years Teaching</label>
//                 <input className="input" type="number" min="0" placeholder="e.g. 3" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
//               </div>
//             </div>
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               className="btn btn-primary btn-lg"
//               onClick={onStart}
//               disabled={loading || !form.name.trim()}
//               style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
//             >
//               {loading ? <><div className="dots"><span /><span /><span /></div> Preparing…</> : <>Begin Interview <ChevronRight size={17} /></>}
//             </motion.button>
//           </div>
//         </div>

//         <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center' }}>
//           {['Voice-based', `${MAX_Q} questions`, '~10 min'].map(t => (
//             <span key={t} style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>· {t}</span>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// function DoneScreen({ name, sessionId, navigate }: any) {
//   const [generating, setGenerating] = useState(false)

//   async function handleEval() {
//     setGenerating(true)
//     try {
//       await evaluationApi.generate(sessionId)
//       navigate(`/evaluation/${sessionId}`)
//     } catch {
//       toast.error('Failed to generate evaluation')
//       setGenerating(false)
//     }
//   }

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28, padding: 40, textAlign: 'center' }}>
//       <motion.div
//         initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 180, damping: 14 }}
//         style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--emerald), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 0 48px rgba(52,211,153,0.4)' }}
//       >
//         ✓
//       </motion.div>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
//         <h2 style={{ fontSize: '2.5rem', marginBottom: 10 }}>Interview Complete!</h2>
//         <p style={{ color: 'var(--text-2)', fontSize: '1.05rem' }}>Great job, {name}. Alex has everything needed for evaluation.</p>
//       </motion.div>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 14 }}>
//         <button className="btn btn-primary btn-lg" onClick={handleEval} disabled={generating}>
//           {generating ? <><div className="dots"><span /><span /><span /></div> Generating Report…</> : <>View Evaluation <ChevronRight size={16} /></>}
//         </button>
//         <button className="btn btn-secondary btn-md" onClick={() => navigate('/recruiter')}>Go to Dashboard</button>
//       </motion.div>
//     </div>
//   )
// }