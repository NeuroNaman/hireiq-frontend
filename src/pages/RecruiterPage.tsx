// // // import { useEffect, useState } from 'react'
// // // import { useNavigate } from 'react-router-dom'
// // // import { motion, AnimatePresence } from 'framer-motion'
// // // import { Search, Send, ChevronRight, RefreshCw, Bot, User, Mic } from 'lucide-react'
// // // import { recruiterApi } from '@/lib/api'
// // // import AnimatedCounter from '@/components/ui/AnimatedCounter'
// // // import toast from 'react-hot-toast'

// // // interface Candidate {
// // //   session_id: string
// // //   candidate_name: string
// // //   status: string
// // //   turn_count: number
// // //   city: string | null
// // //   experience_years: number | null
// // //   total_score: number | null
// // //   final_verdict: string | null
// // //   hiring_confidence: number | null
// // // }

// // // const VERDICT_STYLES = {
// // //   'Strong Hire': { color: 'var(--emerald-400)', bg: 'var(--emerald-glow)', border: 'rgba(52,211,153,0.25)' },
// // //   'Consider':    { color: 'var(--amber-400)',   bg: 'var(--amber-glow)',   border: 'rgba(251,191,36,0.25)' },
// // //   'Reject':      { color: 'var(--rose-400)',    bg: 'var(--rose-glow)',    border: 'rgba(251,113,133,0.25)' },
// // // }

// // // export default function RecruiterPage() {
// // //   const navigate = useNavigate()
// // //   const [candidates, setCandidates] = useState<Candidate[]>([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [search, setSearch] = useState('')
// // //   const [selected, setSelected] = useState<Candidate | null>(null)
// // //   const [filterVerdict, setFilterVerdict] = useState<string>('all')

// // //   useEffect(() => {
// // //     fetchCandidates()
// // //   }, [])

// // //   async function fetchCandidates() {
// // //     setLoading(true)
// // //     try {
// // //       const { data } = await recruiterApi.candidates()
// // //       setCandidates(data)
// // //     } catch {
// // //       toast.error('Failed to load candidates')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const filtered = candidates.filter(c => {
// // //     const matchSearch = c.candidate_name.toLowerCase().includes(search.toLowerCase()) ||
// // //       (c.city || '').toLowerCase().includes(search.toLowerCase())
// // //     const matchVerdict = filterVerdict === 'all' || c.final_verdict === filterVerdict
// // //     return matchSearch && matchVerdict
// // //   })

// // //   const evaluated = candidates.filter(c => c.final_verdict)
// // //   const strongHires = candidates.filter(c => c.final_verdict === 'Strong Hire').length
// // //   const considers = candidates.filter(c => c.final_verdict === 'Consider').length
// // //   const rejects = candidates.filter(c => c.final_verdict === 'Reject').length
// // //   const avgScore = evaluated.length
// // //     ? evaluated.reduce((a, c) => a + (c.total_score || 0), 0) / evaluated.length
// // //     : 0

// // //   return (
// // //     <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100vh', overflow: 'hidden' }}>

// // //       {/* Main Panel */}
// // //       <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '40px 40px 0', gap: 28 }}>
// // //         {/* Header */}
// // //         <div>
// // //           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
// // //             <div>
// // //               <span className="badge badge-muted" style={{ marginBottom: 8 }}>Recruiter Dashboard</span>
// // //               <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Candidates</h1>
// // //             </div>
// // //             <div style={{ display: 'flex', gap: 10 }}>
// // //               <button className="btn btn-ghost" onClick={fetchCandidates} style={{ fontSize: '0.85rem' }}>
// // //                 <RefreshCw size={14} /> Refresh
// // //               </button>
// // //               <button className="btn btn-primary" onClick={() => navigate('/interview')} style={{ fontSize: '0.85rem' }}>
// // //                 <Mic size={14} /> New Interview
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Summary stats */}
// // //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
// // //           {[
// // //             { label: 'Total', value: candidates.length, color: 'var(--cyan-400)' },
// // //             { label: 'Strong Hire', value: strongHires, color: 'var(--emerald-400)' },
// // //             { label: 'Consider', value: considers, color: 'var(--amber-400)' },
// // //             { label: 'Avg Score', value: avgScore, color: '#818cf8', decimals: 1 },
// // //           ].map(s => (
// // //             <div key={s.label} className="glass-card" style={{ padding: '14px 16px' }}>
// // //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.6rem', color: s.color, lineHeight: 1 }}>
// // //                 <AnimatedCounter value={s.value} decimals={(s as any).decimals || 0} />
// // //               </div>
// // //               <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
// // //                 {s.label}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Search + filters */}
// // //         <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
// // //           <div style={{ position: 'relative', flex: 1 }}>
// // //             <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
// // //             <input
// // //               className="input"
// // //               style={{ paddingLeft: 42 }}
// // //               placeholder="Search candidates..."
// // //               value={search}
// // //               onChange={e => setSearch(e.target.value)}
// // //             />
// // //           </div>
// // //           {['all', 'Strong Hire', 'Consider', 'Reject'].map(v => (
// // //             <button
// // //               key={v}
// // //               className="btn btn-ghost"
// // //               onClick={() => setFilterVerdict(v)}
// // //               style={{
// // //                 fontSize: '0.78rem',
// // //                 padding: '8px 14px',
// // //                 background: filterVerdict === v ? 'rgba(34,211,238,0.08)' : undefined,
// // //                 borderColor: filterVerdict === v ? 'var(--cyan-400)' : undefined,
// // //                 color: filterVerdict === v ? 'var(--cyan-400)' : undefined,
// // //               }}
// // //             >
// // //               {v === 'all' ? 'All' : v}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Candidate list */}
// // //         <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24 }}>
// // //           {loading ? (
// // //             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
// // //               <div style={{ width: 32, height: 32, border: '2px solid var(--border-subtle)', borderTop: '2px solid var(--cyan-400)', borderRadius: '50%', animation: 'spin-slow 1s linear infinite' }} />
// // //             </div>
// // //           ) : filtered.length === 0 ? (
// // //             <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
// // //               <p>No candidates found.</p>
// // //               <button className="btn btn-primary" style={{ marginTop: 20, fontSize: '0.85rem' }} onClick={() => navigate('/interview')}>
// // //                 Start First Interview
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <AnimatePresence>
// // //               {filtered.map((c, i) => {
// // //                 const vs = VERDICT_STYLES[c.final_verdict as keyof typeof VERDICT_STYLES]
// // //                 const isSelected = selected?.session_id === c.session_id

// // //                 return (
// // //                   <motion.div
// // //                     key={c.session_id}
// // //                     initial={{ opacity: 0, y: 12 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ delay: i * 0.04 }}
// // //                     onClick={() => setSelected(isSelected ? null : c)}
// // //                     style={{
// // //                       padding: '16px 20px',
// // //                       borderRadius: 12,
// // //                       background: isSelected
// // //                         ? 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.04))'
// // //                         : 'rgba(255,255,255,0.02)',
// // //                       border: `1px solid ${isSelected ? 'var(--border-cyan)' : 'var(--border-subtle)'}`,
// // //                       cursor: 'pointer',
// // //                       transition: 'all 0.2s',
// // //                       display: 'grid',
// // //                       gridTemplateColumns: '1fr auto auto auto',
// // //                       alignItems: 'center',
// // //                       gap: 20,
// // //                     }}
// // //                   >
// // //                     {/* Name + meta */}
// // //                     <div>
// // //                       <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>
// // //                         {c.candidate_name}
// // //                       </div>
// // //                       <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // //                         {c.city && <span>📍 {c.city}</span>}
// // //                         {c.experience_years != null && <span>{c.experience_years}y exp</span>}
// // //                         <span>{c.turn_count} turns</span>
// // //                         <span className={`badge ${c.status === 'active' ? 'badge-cyan' : 'badge-muted'}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
// // //                           {c.status}
// // //                         </span>
// // //                       </div>
// // //                     </div>

// // //                     {/* Score */}
// // //                     {c.total_score != null && (
// // //                       <div style={{ textAlign: 'center' }}>
// // //                         <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.3rem', color: vs?.color || 'var(--text-secondary)' }}>
// // //                           {c.total_score.toFixed(1)}
// // //                         </div>
// // //                         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/10</div>
// // //                       </div>
// // //                     )}

// // //                     {/* Verdict */}
// // //                     {c.final_verdict && vs ? (
// // //                       <div style={{
// // //                         padding: '4px 12px', borderRadius: 6,
// // //                         background: vs.bg, border: `1px solid ${vs.border}`,
// // //                         fontSize: '0.75rem', fontWeight: 700, color: vs.color,
// // //                         whiteSpace: 'nowrap',
// // //                       }}>
// // //                         {c.final_verdict}
// // //                       </div>
// // //                     ) : (
// // //                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</div>
// // //                     )}

// // //                     {/* Arrow */}
// // //                     <div style={{ display: 'flex', gap: 8 }}>
// // //                       {c.final_verdict && (
// // //                         <button
// // //                           className="btn btn-ghost"
// // //                           style={{ fontSize: '0.75rem', padding: '6px 12px' }}
// // //                           onClick={(e) => { e.stopPropagation(); navigate(`/evaluation/${c.session_id}`) }}
// // //                         >
// // //                           Report <ChevronRight size={12} />
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </motion.div>
// // //                 )
// // //               })}
// // //             </AnimatePresence>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Right — Copilot panel */}
// // //       <CopilotPanel selected={selected} />
// // //     </div>
// // //   )
// // // }

// // // function CopilotPanel({ selected }: { selected: Candidate | null }) {
// // //   const [question, setQuestion] = useState('')
// // //   const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([])
// // //   const [loading, setLoading] = useState(false)

// // //   async function handleAsk() {
// // //     if (!question.trim() || !selected) return
// // //     const q = question.trim()
// // //     setQuestion('')
// // //     setMessages(m => [...m, { role: 'user', text: q }])
// // //     setLoading(true)
// // //     try {
// // //       const { data } = await recruiterApi.copilot({ session_id: selected.session_id, question: q })
// // //       setMessages(m => [...m, { role: 'ai', text: data.answer }])
// // //     } catch {
// // //       toast.error('Copilot unavailable')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const SUGGESTED = [
// // //     'How did they explain fractions?',
// // //     'What was their empathy like?',
// // //     'Did they give concrete examples?',
// // //     'Any red flags to note?',
// // //   ]

// // //   return (
// // //     <div style={{
// // //       borderLeft: '1px solid var(--border-subtle)',
// // //       background: 'var(--obsidian-900)',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       height: '100vh',
// // //       overflow: 'hidden',
// // //     }}>
// // //       {/* Header */}
// // //       <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
// // //         <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
// // //           <div style={{
// // //             width: 32, height: 32, borderRadius: '50%',
// // //             background: 'linear-gradient(135deg, var(--cyan-400), #818cf8)',
// // //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //           }}>
// // //             <Bot size={16} color="var(--obsidian-950)" />
// // //           </div>
// // //           <div>
// // //             <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recruiter Copilot</div>
// // //             <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// // //               {selected ? `Analyzing: ${selected.candidate_name}` : 'Select a candidate'}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Messages */}
// // //       <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
// // //         {!selected ? (
// // //           <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
// // //             <Bot size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
// // //             <p style={{ fontSize: '0.875rem' }}>Select a candidate to start asking questions</p>
// // //           </div>
// // //         ) : messages.length === 0 ? (
// // //           <div>
// // //             <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
// // //               Ask me anything about {selected.candidate_name}'s interview:
// // //             </p>
// // //             <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // //               {SUGGESTED.map(s => (
// // //                 <button
// // //                   key={s}
// // //                   onClick={() => setQuestion(s)}
// // //                   style={{
// // //                     background: 'rgba(255,255,255,0.03)',
// // //                     border: '1px solid var(--border-subtle)',
// // //                     borderRadius: 8,
// // //                     padding: '10px 14px',
// // //                     color: 'var(--text-secondary)',
// // //                     cursor: 'pointer',
// // //                     fontSize: '0.82rem',
// // //                     textAlign: 'left',
// // //                     transition: 'all 0.15s',
// // //                   }}
// // //                   onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-cyan)')}
// // //                   onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
// // //                 >
// // //                   {s}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <AnimatePresence>
// // //             {messages.map((m, i) => (
// // //               <motion.div
// // //                 key={i}
// // //                 initial={{ opacity: 0, y: 10 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 style={{
// // //                   display: 'flex',
// // //                   gap: 10,
// // //                   alignItems: 'flex-start',
// // //                   flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
// // //                 }}
// // //               >
// // //                 <div style={{
// // //                   width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
// // //                   background: m.role === 'ai'
// // //                     ? 'linear-gradient(135deg, var(--cyan-400), #818cf8)'
// // //                     : 'var(--obsidian-600)',
// // //                   display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //                 }}>
// // //                   {m.role === 'ai' ? <Bot size={13} color="var(--obsidian-950)" /> : <User size={13} color="var(--text-secondary)" />}
// // //                 </div>
// // //                 <div style={{
// // //                   maxWidth: '80%',
// // //                   padding: '10px 14px',
// // //                   borderRadius: m.role === 'ai' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
// // //                   background: m.role === 'ai' ? 'rgba(34,211,238,0.06)' : 'var(--obsidian-700)',
// // //                   border: `1px solid ${m.role === 'ai' ? 'var(--border-cyan)' : 'var(--border-subtle)'}`,
// // //                   fontSize: '0.85rem',
// // //                   lineHeight: 1.6,
// // //                   color: m.role === 'ai' ? 'var(--text-primary)' : 'var(--text-secondary)',
// // //                 }}>
// // //                   {m.text}
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //             {loading && (
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
// // //                 <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan-400), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //                   <Bot size={13} color="var(--obsidian-950)" />
// // //                 </div>
// // //                 <div style={{ padding: '10px 14px', borderRadius: '4px 12px 12px 12px', background: 'rgba(34,211,238,0.06)', border: '1px solid var(--border-cyan)' }}>
// // //                   <div className="loading-dots" style={{ display: 'flex', gap: 5 }}><span /><span /><span /></div>
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         )}
// // //       </div>

// // //       {/* Input */}
// // //       {selected && (
// // //         <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)' }}>
// // //           <div style={{ display: 'flex', gap: 10 }}>
// // //             <input
// // //               className="input"
// // //               style={{ fontSize: '0.875rem' }}
// // //               placeholder="Ask about this candidate..."
// // //               value={question}
// // //               onChange={e => setQuestion(e.target.value)}
// // //               onKeyDown={e => e.key === 'Enter' && handleAsk()}
// // //               disabled={loading}
// // //             />
// // //             <motion.button
// // //               whileTap={{ scale: 0.92 }}
// // //               onClick={handleAsk}
// // //               disabled={!question.trim() || loading}
// // //               style={{
// // //                 width: 44, height: 44,
// // //                 borderRadius: 10,
// // //                 border: 'none',
// // //                 background: 'linear-gradient(135deg, var(--cyan-400), #818cf8)',
// // //                 color: 'var(--obsidian-950)',
// // //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //                 cursor: !question.trim() || loading ? 'not-allowed' : 'pointer',
// // //                 opacity: !question.trim() ? 0.5 : 1,
// // //                 flexShrink: 0,
// // //               }}
// // //             >
// // //               <Send size={16} />
// // //             </motion.button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }


// // import { useEffect, useState, useRef } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import {
// //   Search, Send, RefreshCw, Mic, Bot, User,
// //   ChevronRight, ExternalLink, TrendingUp, Users,
// //   Star, Clock, MessageSquare, Zap, X
// // } from 'lucide-react'
// // import { recruiterApi } from '@/lib/api'
// // import { AnimatedCounter } from '@/components/ui'
// // import toast from 'react-hot-toast'

// // interface Candidate {
// //   session_id: string; candidate_name: string; status: string;
// //   turn_count: number; city: string | null; experience_years: number | null;
// //   total_score: number | null; final_verdict: string | null; hiring_confidence: number | null;
// // }

// // const VC: Record<string, { color: string; bg: string; border: string }> = {
// //   'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)' },
// //   'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)' },
// //   'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.08)',border: 'rgba(251,113,133,0.25)' },
// // }

// // const SUGGESTED = [
// //   'How clear was their explanation style?',
// //   'Did they show empathy for struggling children?',
// //   'What concrete examples did they give?',
// //   'Any red flags or concerns?',
// //   'Would you recommend them?',
// // ]

// // export default function RecruiterPage() {
// //   const navigate = useNavigate()
// //   const [candidates, setCandidates] = useState<Candidate[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [search, setSearch] = useState('')
// //   const [filter, setFilter] = useState('all')
// //   const [selected, setSelected] = useState<Candidate | null>(null)
// //   const [copilotOpen, setCopilotOpen] = useState(false)
// //   const [copilotQ, setCopilotQ] = useState('')
// //   const [copilotMsgs, setCopilotMsgs] = useState<Array<{ role: 'user'|'ai'; text: string }>>([])
// //   const [copilotLoading, setCopilotLoading] = useState(false)
// //   const chatRef = useRef<HTMLDivElement>(null)

// //   useEffect(() => { fetchCandidates() }, [])
// //   useEffect(() => { chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }) }, [copilotMsgs])

// //   async function fetchCandidates() {
// //     setLoading(true)
// //     try {
// //       const { data } = await recruiterApi.candidates()
// //       setCandidates(data)
// //     } catch { toast.error('Failed to load candidates') }
// //     finally { setLoading(false) }
// //   }

// //   const filtered = candidates.filter(c => {
// //     const ms = (c.candidate_name + (c.city || '')).toLowerCase().includes(search.toLowerCase())
// //     const mf = filter === 'all' || c.final_verdict === filter ||
// //       (filter === 'pending' && !c.final_verdict)
// //     return ms && mf
// //   })

// //   const evaluated  = candidates.filter(c => c.final_verdict)
// //   const strongH    = candidates.filter(c => c.final_verdict === 'Strong Hire').length
// //   const consider   = candidates.filter(c => c.final_verdict === 'Consider').length
// //   const avgScore   = evaluated.length ? evaluated.reduce((a, c) => a + (c.total_score || 0), 0) / evaluated.length : 0

// //   async function handleCopilot() {
// //     if (!copilotQ.trim() || !selected) return
// //     const q = copilotQ.trim(); setCopilotQ('')
// //     setCopilotMsgs(m => [...m, { role: 'user', text: q }])
// //     setCopilotLoading(true)
// //     try {
// //       const { data } = await recruiterApi.copilot({ session_id: selected.session_id, question: q })
// //       setCopilotMsgs(m => [...m, { role: 'ai', text: data.answer }])
// //     } catch { toast.error('Copilot unavailable') }
// //     finally { setCopilotLoading(false) }
// //   }

// //   function openCopilot(c: Candidate) {
// //     setSelected(c); setCopilotMsgs([]); setCopilotOpen(true)
// //   }

// //   return (
// //     <div style={{ padding: '40px 48px', maxWidth: 1280, margin: '0 auto' }}>
// //       {/* Header */}
// //       <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
// //         <div>
// //           <span className="badge badge-muted" style={{ marginBottom: 12 }}>Recruiter Dashboard</span>
// //           <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Candidates</h1>
// //         </div>
// //         <div style={{ display: 'flex', gap: 10 }}>
// //           <button className="btn btn-ghost btn-sm" onClick={fetchCandidates}>
// //             <RefreshCw size={13} /> Refresh
// //           </button>
// //           <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>
// //             <Mic size={14} /> New Interview
// //           </button>
// //         </div>
// //       </div>

// //       {/* Summary cards */}
// //       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
// //         {[
// //           { label: 'Total',       value: candidates.length, color: 'var(--cyan)',    icon: Users },
// //           { label: 'Strong Hire', value: strongH,           color: 'var(--emerald)', icon: TrendingUp },
// //           { label: 'Consider',    value: consider,          color: 'var(--amber)',   icon: Star },
// //           { label: 'Avg Score',   value: avgScore,          color: 'var(--indigo)',  icon: Zap, dec: 1 },
// //         ].map(s => (
// //           <div key={s.label} className="card card-hover" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
// //             <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //               <s.icon size={18} color={s.color} />
// //             </div>
// //             <div>
// //               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.6rem', color: s.color, lineHeight: 1 }}>
// //                 <AnimatedCounter value={s.value} decimals={(s as any).dec || 0} />
// //               </div>
// //               <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>
// //                 {s.label}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Filter + search */}
// //       <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
// //         <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
// //           <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
// //           <input className="input" style={{ paddingLeft: 40, fontSize: '0.875rem' }} placeholder="Search candidates…" value={search} onChange={e => setSearch(e.target.value)} />
// //         </div>
// //         {['all', 'Strong Hire', 'Consider', 'Reject', 'pending'].map(f => (
// //           <button
// //             key={f}
// //             className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
// //             onClick={() => setFilter(f)}
// //             style={{ fontSize: '0.78rem', opacity: filter === f ? 1 : 0.7 }}
// //           >
// //             {f.charAt(0).toUpperCase() + f.slice(1)}
// //           </button>
// //         ))}
// //         <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
// //           {filtered.length} candidates
// //         </span>
// //       </div>

// //       {/* Table header */}
// //       <div style={{
// //         display: 'grid',
// //         gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
// //         padding: '10px 20px',
// //         fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
// //         color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
// //         borderBottom: '1px solid var(--border-1)',
// //         marginBottom: 8,
// //       }}>
// //         <span>Candidate</span>
// //         <span>Score</span>
// //         <span>Verdict</span>
// //         <span>Turns</span>
// //         <span>Status</span>
// //         <span>Actions</span>
// //       </div>

// //       {/* Candidate rows */}
// //       <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
// //         {loading ? (
// //           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
// //             <div className="spinner" />
// //           </div>
// //         ) : filtered.length === 0 ? (
// //           <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-3)' }}>
// //             <Users size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
// //             <p style={{ marginBottom: 20 }}>No candidates yet.</p>
// //             <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>Start First Interview</button>
// //           </div>
// //         ) : (
// //           <AnimatePresence>
// //             {filtered.map((c, i) => {
// //               const vs = VC[c.final_verdict as keyof typeof VC]
// //               return (
// //                 <motion.div
// //                   key={c.session_id}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: i * 0.035 }}
// //                   style={{
// //                     display: 'grid',
// //                     gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
// //                     alignItems: 'center',
// //                     padding: '14px 20px',
// //                     borderRadius: 12,
// //                     border: '1px solid var(--border-0)',
// //                     background: 'rgba(255,255,255,0.015)',
// //                     transition: 'all 0.15s',
// //                     cursor: 'default',
// //                   }}
// //                   whileHover={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-1)' }}
// //                 >
// //                   {/* Name */}
// //                   <div>
// //                     <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 3 }}>{c.candidate_name}</div>
// //                     <div style={{ fontSize: '0.74rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', display: 'flex', gap: 10 }}>
// //                       {c.city && <span>📍 {c.city}</span>}
// //                       {c.experience_years != null && <span>{c.experience_years}y</span>}
// //                     </div>
// //                   </div>

// //                   {/* Score */}
// //                   <div>
// //                     {c.total_score != null ? (
// //                       <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.15rem', color: vs?.color || 'var(--text-2)' }}>
// //                         {c.total_score.toFixed(1)}
// //                         <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>/10</span>
// //                       </span>
// //                     ) : <span style={{ color: 'var(--text-3)', fontSize: '0.82rem' }}>—</span>}
// //                   </div>

// //                   {/* Verdict */}
// //                   <div>
// //                     {c.final_verdict && vs ? (
// //                       <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 6, background: vs.bg, border: `1px solid ${vs.border}`, fontSize: '0.75rem', fontWeight: 600, color: vs.color, whiteSpace: 'nowrap' }}>
// //                         {c.final_verdict}
// //                       </span>
// //                     ) : (
// //                       <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Pending</span>
// //                     )}
// //                   </div>

// //                   {/* Turns */}
// //                   <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-2)' }}>
// //                     {c.turn_count}
// //                   </div>

// //                   {/* Status */}
// //                   <div>
// //                     <span className={`badge ${c.status === 'active' ? 'badge-cyan' : 'badge-muted'}`} style={{ fontSize: '0.64rem' }}>
// //                       {c.status === 'active' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />}
// //                       {c.status}
// //                     </span>
// //                   </div>

// //                   {/* Actions */}
// //                   <div style={{ display: 'flex', gap: 8 }}>
// //                     <button
// //                       className="btn btn-ghost btn-sm"
// //                       onClick={() => openCopilot(c)}
// //                       title="Ask Copilot"
// //                     >
// //                       <MessageSquare size={13} />
// //                     </button>
// //                     {c.final_verdict && (
// //                       <button
// //                         className="btn btn-secondary btn-sm"
// //                         onClick={() => navigate(`/evaluation/${c.session_id}`)}
// //                         style={{ fontSize: '0.76rem' }}
// //                       >
// //                         View Details <ExternalLink size={11} />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </motion.div>
// //               )
// //             })}
// //           </AnimatePresence>
// //         )}
// //       </div>

// //       {/* ── Floating Copilot ────────────────────────────── */}
// //       <AnimatePresence>
// //         {copilotOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 20, scale: 0.95 }}
// //             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
// //             style={{
// //               position: 'fixed',
// //               bottom: 28,
// //               right: 28,
// //               width: 400,
// //               height: 560,
// //               background: 'var(--bg-3)',
// //               border: '1px solid var(--border-cyan)',
// //               borderRadius: 20,
// //               boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.1)',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               overflow: 'hidden',
// //               zIndex: 500,
// //             }}
// //           >
// //             {/* Copilot header */}
// //             <div style={{
// //               padding: '16px 20px', borderBottom: '1px solid var(--border-1)',
// //               background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.04))',
// //               display: 'flex', alignItems: 'center', gap: 12,
// //             }}>
// //               <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //                 <Bot size={17} color="var(--bg-0)" />
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recruiter Copilot</div>
// //                 <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
// //                   {selected?.candidate_name}
// //                 </div>
// //               </div>
// //               <button className="btn-icon" onClick={() => setCopilotOpen(false)} style={{ width: 28, height: 28, borderRadius: 8 }}>
// //                 <X size={13} />
// //               </button>
// //             </div>

// //             {/* Messages */}
// //             <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
// //               {copilotMsgs.length === 0 ? (
// //                 <div>
// //                   <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 14 }}>
// //                     Ask me anything about {selected?.candidate_name}'s interview:
// //                   </p>
// //                   <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
// //                     {SUGGESTED.map(s => (
// //                       <button
// //                         key={s}
// //                         onClick={() => setCopilotQ(s)}
// //                         style={{
// //                           background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-1)',
// //                           borderRadius: 8, padding: '9px 13px', color: 'var(--text-2)',
// //                           cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.15s',
// //                         }}
// //                         onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-cyan)')}
// //                         onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
// //                       >
// //                         {s}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <AnimatePresence>
// //                     {copilotMsgs.map((m, i) => (
// //                       <motion.div
// //                         key={i}
// //                         initial={{ opacity: 0, y: 8 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
// //                       >
// //                         <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: m.role === 'ai' ? 'linear-gradient(135deg, var(--cyan), var(--indigo))' : 'var(--bg-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                           {m.role === 'ai' ? <Bot size={12} color="var(--bg-0)" /> : <User size={12} color="var(--text-2)" />}
// //                         </div>
// //                         <div
// //                           className={m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}
// //                           style={{ maxWidth: '80%', padding: '9px 13px', fontSize: '0.83rem', lineHeight: 1.6 }}
// //                         >
// //                           {m.text}
// //                         </div>
// //                       </motion.div>
// //                     ))}
// //                   </AnimatePresence>
// //                   {copilotLoading && (
// //                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
// //                       <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                         <Bot size={12} color="var(--bg-0)" />
// //                       </div>
// //                       <div className="bubble-ai" style={{ padding: '9px 14px' }}>
// //                         <div className="dots"><span /><span /><span /></div>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             {/* Input */}
// //             <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8 }}>
// //               <input
// //                 className="input"
// //                 style={{ fontSize: '0.83rem' }}
// //                 placeholder="Ask about this candidate…"
// //                 value={copilotQ}
// //                 onChange={e => setCopilotQ(e.target.value)}
// //                 onKeyDown={e => e.key === 'Enter' && handleCopilot()}
// //                 disabled={copilotLoading}
// //               />
// //               <motion.button
// //                 whileTap={{ scale: 0.9 }}
// //                 onClick={handleCopilot}
// //                 disabled={!copilotQ.trim() || copilotLoading}
// //                 style={{
// //                   width: 40, height: 40, borderRadius: 10, border: 'none', flexShrink: 0,
// //                   background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
// //                   color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                   cursor: !copilotQ.trim() || copilotLoading ? 'not-allowed' : 'pointer',
// //                   opacity: !copilotQ.trim() ? 0.5 : 1,
// //                 }}
// //               >
// //                 <Send size={15} />
// //               </motion.button>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Copilot FAB (when closed) */}
// //       {!copilotOpen && (
// //         <motion.div
// //           initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
// //           style={{ position: 'fixed', bottom: 28, right: 28 }}
// //         >
// //           {selected && (
// //             <button
// //               onClick={() => setCopilotOpen(true)}
// //               style={{
// //                 width: 52, height: 52, borderRadius: '50%', border: 'none',
// //                 background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
// //                 color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                 cursor: 'pointer', boxShadow: '0 0 24px rgba(34,211,238,0.35)',
// //               }}
// //               title="Open Copilot"
// //             >
// //               <Bot size={22} />
// //             </button>
// //           )}
// //         </motion.div>
// //       )}
// //     </div>
// //   )
// // }











// import { useEffect, useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Search, Send, RefreshCw, Mic, Bot, User,
//   ChevronRight, ExternalLink, TrendingUp, Users,
//   Star, Clock, MessageSquare, Zap, X
// } from 'lucide-react'
// import { recruiterApi } from '@/lib/api'
// import { AnimatedCounter } from '@/components/ui'
// import toast from 'react-hot-toast'

// interface Candidate {
//   session_id: string; candidate_name: string; status: string;
//   turn_count: number; city: string | null; experience_years: number | null;
//   total_score: number | null; final_verdict: string | null; hiring_confidence: number | null;
// }

// const VC: Record<string, { color: string; bg: string; border: string }> = {
//   'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)' },
//   'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)' },
//   'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.08)',border: 'rgba(251,113,133,0.25)' },
// }

// const SUGGESTED = [
//   'How clear was their explanation style?',
//   'Did they show empathy for struggling children?',
//   'What concrete examples did they give?',
//   'Any red flags or concerns?',
//   'Would you recommend them?',
// ]

// export default function RecruiterPage() {
//   const navigate = useNavigate()
//   const [candidates, setCandidates] = useState<Candidate[]>([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState('')
//   const [filter, setFilter] = useState('all')
//   const [selected, setSelected] = useState<Candidate | null>(null)
//   const [copilotOpen, setCopilotOpen] = useState(false)
//   const [copilotQ, setCopilotQ] = useState('')
//   const [copilotMsgs, setCopilotMsgs] = useState<Array<{ role: 'user'|'ai'; text: string }>>([])
//   const [copilotLoading, setCopilotLoading] = useState(false)
//   const chatRef = useRef<HTMLDivElement>(null)

//   useEffect(() => { fetchCandidates() }, [])
//   useEffect(() => { chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }) }, [copilotMsgs])

//   async function fetchCandidates() {
//     setLoading(true)
//     try {
//       const { data } = await recruiterApi.candidates()
//       setCandidates(data)
//     } catch { toast.error('Failed to load candidates') }
//     finally { setLoading(false) }
//   }

//   const filtered = candidates.filter(c => {
//     const ms = (c.candidate_name + (c.city || '')).toLowerCase().includes(search.toLowerCase())
//     const mf = filter === 'all' || c.final_verdict === filter ||
//       (filter === 'pending' && !c.final_verdict)
//     return ms && mf
//   })

//   const evaluated  = candidates.filter(c => c.final_verdict)
//   const strongH    = candidates.filter(c => c.final_verdict === 'Strong Hire').length
//   const consider   = candidates.filter(c => c.final_verdict === 'Consider').length
//   const avgScore   = evaluated.length ? evaluated.reduce((a, c) => a + (c.total_score || 0), 0) / evaluated.length : 0

//   async function handleCopilot() {
//     if (!copilotQ.trim() || !selected) return
//     const q = copilotQ.trim(); setCopilotQ('')
//     setCopilotMsgs(m => [...m, { role: 'user', text: q }])
//     setCopilotLoading(true)
//     try {
//       const { data } = await recruiterApi.copilot({ session_id: selected.session_id, question: q })
//       setCopilotMsgs(m => [...m, { role: 'ai', text: data.answer }])
//     } catch { toast.error('Copilot unavailable') }
//     finally { setCopilotLoading(false) }
//   }

//   function openCopilot(c: Candidate) {
//     setSelected(c); setCopilotMsgs([]); setCopilotOpen(true)
//   }

//   return (
//     <div style={{ padding: '40px 48px', maxWidth: 1280, margin: '0 auto' }}>
//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
//         <div>
//           <span className="badge badge-muted" style={{ marginBottom: 12 }}>Recruiter Dashboard</span>
//           <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Candidates</h1>
//         </div>
//         <div style={{ display: 'flex', gap: 10 }}>
//           <button className="btn btn-ghost btn-sm" onClick={fetchCandidates}>
//             <RefreshCw size={13} /> Refresh
//           </button>
//           <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>
//             <Mic size={14} /> New Interview
//           </button>
//         </div>
//       </div>

//       {/* Summary cards */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
//         {[
//           { label: 'Total',       value: candidates.length, color: 'var(--cyan)',    icon: Users },
//           { label: 'Strong Hire', value: strongH,           color: 'var(--emerald)', icon: TrendingUp },
//           { label: 'Consider',    value: consider,          color: 'var(--amber)',   icon: Star },
//           { label: 'Avg Score',   value: avgScore,          color: 'var(--indigo)',  icon: Zap, dec: 1 },
//         ].map(s => (
//           <div key={s.label} className="card card-hover" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
//             <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//               <s.icon size={18} color={s.color} />
//             </div>
//             <div>
//               <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.6rem', color: s.color, lineHeight: 1 }}>
//                 <AnimatedCounter value={s.value} decimals={(s as any).dec || 0} />
//               </div>
//               <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>
//                 {s.label}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filter + search */}
//       <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
//         <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
//           <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
//           <input className="input" style={{ paddingLeft: 40, fontSize: '0.875rem' }} placeholder="Search candidates…" value={search} onChange={e => setSearch(e.target.value)} />
//         </div>
//         {['all', 'Strong Hire', 'Consider', 'Reject', 'pending'].map(f => (
//           <button
//             key={f}
//             className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
//             onClick={() => setFilter(f)}
//             style={{ fontSize: '0.78rem', opacity: filter === f ? 1 : 0.7 }}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//         <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
//           {filtered.length} candidates
//         </span>
//       </div>

//       {/* Table header */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
//         padding: '10px 20px',
//         fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
//         color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
//         borderBottom: '1px solid var(--border-1)',
//         marginBottom: 8,
//       }}>
//         <span>Candidate</span>
//         <span>Score</span>
//         <span>Verdict</span>
//         <span>Turns</span>
//         <span>Status</span>
//         <span>Actions</span>
//       </div>

//       {/* Candidate rows */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//         {loading ? (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
//             <div className="spinner" />
//           </div>
//         ) : filtered.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-3)' }}>
//             <Users size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
//             <p style={{ marginBottom: 20 }}>No candidates yet.</p>
//             <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>Start First Interview</button>
//           </div>
//         ) : (
//           <AnimatePresence>
//             {filtered.map((c, i) => {
//               const vs = VC[c.final_verdict as keyof typeof VC]
//               return (
//                 <motion.div
//                   key={c.session_id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.035 }}
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
//                     alignItems: 'center',
//                     padding: '14px 20px',
//                     borderRadius: 12,
//                     border: '1px solid var(--border-0)',
//                     background: 'rgba(255,255,255,0.015)',
//                     transition: 'all 0.15s',
//                     cursor: 'default',
//                   }}
//                   whileHover={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-1)' }}
//                 >
//                   {/* Name */}
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 3 }}>{c.candidate_name}</div>
//                     <div style={{ fontSize: '0.74rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', display: 'flex', gap: 10 }}>
//                       {c.city && <span>📍 {c.city}</span>}
//                       {c.experience_years != null && <span>{c.experience_years}y</span>}
//                     </div>
//                   </div>

//                   {/* Score */}
//                   <div>
//                     {c.total_score != null ? (
//                       <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.15rem', color: vs?.color || 'var(--text-2)' }}>
//                         {c.total_score.toFixed(1)}
//                         <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>/10</span>
//                       </span>
//                     ) : <span style={{ color: 'var(--text-3)', fontSize: '0.82rem' }}>—</span>}
//                   </div>

//                   {/* Verdict */}
//                   <div>
//                     {c.final_verdict && vs ? (
//                       <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 6, background: vs.bg, border: `1px solid ${vs.border}`, fontSize: '0.75rem', fontWeight: 600, color: vs.color, whiteSpace: 'nowrap' }}>
//                         {c.final_verdict}
//                       </span>
//                     ) : (
//                       <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Pending</span>
//                     )}
//                   </div>

//                   {/* Turns */}
//                   <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-2)' }}>
//                     {c.turn_count}
//                   </div>

//                   {/* Status */}
//                   <div>
//                     <span className={`badge ${c.status === 'active' ? 'badge-cyan' : 'badge-muted'}`} style={{ fontSize: '0.64rem' }}>
//                       {c.status === 'active' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />}
//                       {c.status}
//                     </span>
//                   </div>

//                   {/* Actions */}
//                   <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
//                     <button
//                       className="btn btn-ghost btn-sm"
//                       onClick={() => openCopilot(c)}
//                       title="Ask Copilot"
//                       style={{ padding: '6px 10px' }}
//                     >
//                       <MessageSquare size={13} />
//                     </button>
//                     {/* Show View Details if verdict exists OR session is completed */}
//                     {c.final_verdict ? (
//                       <button
//                         className="btn btn-secondary btn-sm"
//                         onClick={() => navigate(`/evaluation/${c.session_id}`)}
//                         style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
//                       >
//                         View Details <ExternalLink size={11} />
//                       </button>
//                     ) : c.status === 'completed' ? (
//                       <button
//                         className="btn btn-amber btn-sm"
//                         onClick={() => navigate(`/evaluation/${c.session_id}`)}
//                         style={{ fontSize: '0.76rem', whiteSpace: 'nowrap', background: 'rgba(251,191,36,0.1)', color: 'var(--amber)', border: '1px solid rgba(251,191,36,0.25)' }}
//                       >
//                         Generate Report
//                       </button>
//                     ) : null}
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </AnimatePresence>
//         )}
//       </div>

//       {/* ── Floating Copilot ────────────────────────────── */}
//       <AnimatePresence>
//         {copilotOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             style={{
//               position: 'fixed',
//               bottom: 28,
//               right: 28,
//               width: 400,
//               height: 560,
//               background: 'var(--bg-3)',
//               border: '1px solid var(--border-cyan)',
//               borderRadius: 20,
//               boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.1)',
//               display: 'flex',
//               flexDirection: 'column',
//               overflow: 'hidden',
//               zIndex: 500,
//             }}
//           >
//             {/* Copilot header */}
//             <div style={{
//               padding: '16px 20px', borderBottom: '1px solid var(--border-1)',
//               background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.04))',
//               display: 'flex', alignItems: 'center', gap: 12,
//             }}>
//               <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                 <Bot size={17} color="var(--bg-0)" />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recruiter Copilot</div>
//                 <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {selected?.candidate_name}
//                 </div>
//               </div>
//               <button className="btn-icon" onClick={() => setCopilotOpen(false)} style={{ width: 28, height: 28, borderRadius: 8 }}>
//                 <X size={13} />
//               </button>
//             </div>

//             {/* Messages */}
//             <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {copilotMsgs.length === 0 ? (
//                 <div>
//                   <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 14 }}>
//                     Ask me anything about {selected?.candidate_name}'s interview:
//                   </p>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                     {SUGGESTED.map(s => (
//                       <button
//                         key={s}
//                         onClick={() => setCopilotQ(s)}
//                         style={{
//                           background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-1)',
//                           borderRadius: 8, padding: '9px 13px', color: 'var(--text-2)',
//                           cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.15s',
//                         }}
//                         onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-cyan)')}
//                         onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
//                       >
//                         {s}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <AnimatePresence>
//                     {copilotMsgs.map((m, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
//                       >
//                         <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: m.role === 'ai' ? 'linear-gradient(135deg, var(--cyan), var(--indigo))' : 'var(--bg-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                           {m.role === 'ai' ? <Bot size={12} color="var(--bg-0)" /> : <User size={12} color="var(--text-2)" />}
//                         </div>
//                         <div
//                           className={m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}
//                           style={{ maxWidth: '80%', padding: '9px 13px', fontSize: '0.83rem', lineHeight: 1.6 }}
//                         >
//                           {m.text}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                   {copilotLoading && (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
//                       <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <Bot size={12} color="var(--bg-0)" />
//                       </div>
//                       <div className="bubble-ai" style={{ padding: '9px 14px' }}>
//                         <div className="dots"><span /><span /><span /></div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Input */}
//             <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8 }}>
//               <input
//                 className="input"
//                 style={{ fontSize: '0.83rem' }}
//                 placeholder="Ask about this candidate…"
//                 value={copilotQ}
//                 onChange={e => setCopilotQ(e.target.value)}
//                 onKeyDown={e => e.key === 'Enter' && handleCopilot()}
//                 disabled={copilotLoading}
//               />
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={handleCopilot}
//                 disabled={!copilotQ.trim() || copilotLoading}
//                 style={{
//                   width: 40, height: 40, borderRadius: 10, border: 'none', flexShrink: 0,
//                   background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
//                   color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   cursor: !copilotQ.trim() || copilotLoading ? 'not-allowed' : 'pointer',
//                   opacity: !copilotQ.trim() ? 0.5 : 1,
//                 }}
//               >
//                 <Send size={15} />
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Copilot FAB (when closed) */}
//       {!copilotOpen && (
//         <motion.div
//           initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
//           style={{ position: 'fixed', bottom: 28, right: 28 }}
//         >
//           {selected && (
//             <button
//               onClick={() => setCopilotOpen(true)}
//               style={{
//                 width: 52, height: 52, borderRadius: '50%', border: 'none',
//                 background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
//                 color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer', boxShadow: '0 0 24px rgba(34,211,238,0.35)',
//               }}
//               title="Open Copilot"
//             >
//               <Bot size={22} />
//             </button>
//           )}
//         </motion.div>
//       )}
//     </div>
//   )
// }





import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Send, RefreshCw, Mic, Bot, User,
  ChevronRight, ExternalLink, TrendingUp, Users,
  Star, Clock, MessageSquare, Zap, X
} from 'lucide-react'
import { recruiterApi } from '@/lib/api'
import { AnimatedCounter } from '@/components/ui'
import toast from 'react-hot-toast'

interface Candidate {
  session_id: string; candidate_name: string; status: string;
  turn_count: number; city: string | null; experience_years: number | null;
  total_score: number | null; final_verdict: string | null; hiring_confidence: number | null;
}

const VC: Record<string, { color: string; bg: string; border: string }> = {
  'Strong Hire': { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)' },
  'Consider':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)' },
  'Reject':      { color: '#fb7185', bg: 'rgba(251,113,133,0.08)',border: 'rgba(251,113,133,0.25)' },
}

const SUGGESTED = [
  'How clear was their explanation style?',
  'Did they show empathy for struggling children?',
  'What concrete examples did they give?',
  'Any red flags or concerns?',
  'Would you recommend them?',
]

export default function RecruiterPage() {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Candidate | null>(null)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [copilotQ, setCopilotQ] = useState('')
  const [copilotMsgs, setCopilotMsgs] = useState<Array<{ role: 'user'|'ai'; text: string }>>([])
  const [copilotLoading, setCopilotLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => { fetchCandidates() }, [])
  useEffect(() => { chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }) }, [copilotMsgs])

  async function fetchCandidates() {
    setLoading(true)
    try {
      const { data } = await recruiterApi.candidates()
      setCandidates(data)
    } catch { toast.error('Failed to load candidates') }
    finally { setLoading(false) }
  }

  const filtered = candidates.filter(c => {
    const ms = (c.candidate_name + (c.city || '')).toLowerCase().includes(search.toLowerCase())
    const mf = filter === 'all' || c.final_verdict === filter ||
      (filter === 'pending' && !c.final_verdict)
    return ms && mf
  })

  const evaluated  = candidates.filter(c => c.final_verdict)
  const strongH    = candidates.filter(c => c.final_verdict === 'Strong Hire').length
  const consider   = candidates.filter(c => c.final_verdict === 'Consider').length
  const avgScore   = evaluated.length ? evaluated.reduce((a, c) => a + (c.total_score || 0), 0) / evaluated.length : 0

  async function handleCopilot() {
    if (!copilotQ.trim() || !selected) return
    const q = copilotQ.trim(); setCopilotQ('')
    setCopilotMsgs(m => [...m, { role: 'user', text: q }])
    setCopilotLoading(true)
    try {
      const { data } = await recruiterApi.copilot({ session_id: selected.session_id, question: q })
      setCopilotMsgs(m => [...m, { role: 'ai', text: data.answer }])
    } catch { toast.error('Copilot unavailable') }
    finally { setCopilotLoading(false) }
  }

  function openCopilot(c: Candidate) {
    setSelected(c); setCopilotMsgs([]); setCopilotOpen(true)
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <span className="badge badge-muted" style={{ marginBottom: 12 }}>Recruiter Dashboard</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Candidates</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={fetchCandidates}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>
            <Mic size={14} /> New Interview
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
        {[
          { label: 'Total',       value: candidates.length, color: 'var(--cyan)',    icon: Users },
          { label: 'Strong Hire', value: strongH,           color: 'var(--emerald)', icon: TrendingUp },
          { label: 'Consider',    value: consider,          color: 'var(--amber)',   icon: Star },
          { label: 'Avg Score',   value: avgScore,          color: 'var(--indigo)',  icon: Zap, dec: 1 },
        ].map(s => (
          <div key={s.label} className="card card-hover" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.6rem', color: s.color, lineHeight: 1 }}>
                <AnimatedCounter value={s.value} decimals={(s as any).dec || 0} />
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + search */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input className="input" style={{ paddingLeft: 40, fontSize: '0.875rem' }} placeholder="Search candidates…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all', 'Strong Hire', 'Consider', 'Reject', 'pending'].map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(f)}
            style={{ fontSize: '0.78rem', opacity: filter === f ? 1 : 0.7 }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
          {filtered.length} candidates
        </span>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
        padding: '10px 20px',
        fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
        color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
        borderBottom: '1px solid var(--border-1)',
        marginBottom: 8,
      }}>
        <span>Candidate</span>
        <span>Score</span>
        <span>Verdict</span>
        <span>Turns</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Candidate rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
            <div className="spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-3)' }}>
            <Users size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
            <p style={{ marginBottom: 20 }}>No candidates yet.</p>
            <button className="btn btn-primary btn-md" onClick={() => navigate('/interview')}>Start First Interview</button>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((c, i) => {
              const vs = VC[c.final_verdict as keyof typeof VC]
              return (
                <motion.div
                  key={c.session_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
                    alignItems: 'center',
                    padding: '14px 20px',
                    borderRadius: 12,
                    border: '1px solid var(--border-0)',
                    background: 'rgba(255,255,255,0.015)',
                    transition: 'all 0.15s',
                    cursor: 'default',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-1)' }}
                >
                  {/* Name */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 3 }}>{c.candidate_name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', display: 'flex', gap: 10 }}>
                      {c.city && <span>📍 {c.city}</span>}
                      {c.experience_years != null && <span>{c.experience_years}y</span>}
                    </div>
                  </div>

                  {/* Score */}
                  <div>
                    {c.total_score != null ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.15rem', color: vs?.color || 'var(--text-2)' }}>
                        {c.total_score.toFixed(1)}
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>/10</span>
                      </span>
                    ) : <span style={{ color: 'var(--text-3)', fontSize: '0.82rem' }}>—</span>}
                  </div>

                  {/* Verdict */}
                  <div>
                    {c.final_verdict && vs ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 6, background: vs.bg, border: `1px solid ${vs.border}`, fontSize: '0.75rem', fontWeight: 600, color: vs.color, whiteSpace: 'nowrap' }}>
                        {c.final_verdict}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Pending</span>
                    )}
                  </div>

                  {/* Turns */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-2)' }}>
                    {c.turn_count}
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`badge ${c.status === 'active' ? 'badge-cyan' : 'badge-muted'}`} style={{ fontSize: '0.64rem' }}>
                      {c.status === 'active' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />}
                      {c.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => openCopilot(c)}
                      title="Ask Copilot"
                      style={{ padding: '6px 10px' }}
                    >
                      <MessageSquare size={13} />
                    </button>
                    {/* Show View Details if verdict exists OR session is completed */}
                    {c.final_verdict ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/evaluation/${c.session_id}`)}
                        style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                      >
                        View Details <ExternalLink size={11} />
                      </button>
                    ) : c.status === 'completed' ? (
                      <button
                        className="btn btn-amber btn-sm"
                        onClick={() => navigate(`/evaluation/${c.session_id}`)}
                        style={{ fontSize: '0.76rem', whiteSpace: 'nowrap', background: 'rgba(251,191,36,0.1)', color: 'var(--amber)', border: '1px solid rgba(251,191,36,0.25)' }}
                      >
                        Generate Report
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>

      {/* ── Floating Copilot ────────────────────────────── */}
      <AnimatePresence>
        {copilotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: 28,
              right: 28,
              width: 400,
              height: 560,
              background: 'var(--bg-3)',
              border: '1px solid var(--border-cyan)',
              borderRadius: 20,
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 500,
            }}
          >
            {/* Copilot header */}
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid var(--border-1)',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.04))',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={17} color="var(--bg-0)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recruiter Copilot</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selected?.candidate_name}
                </div>
              </div>
              <button className="btn-icon" onClick={() => setCopilotOpen(false)} style={{ width: 28, height: 28, borderRadius: 8 }}>
                <X size={13} />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {copilotMsgs.length === 0 ? (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 14 }}>
                    Ask me anything about {selected?.candidate_name}'s interview:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SUGGESTED.map(s => (
                      <button
                        key={s}
                        onClick={() => setCopilotQ(s)}
                        style={{
                          background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-1)',
                          borderRadius: 8, padding: '9px 13px', color: 'var(--text-2)',
                          cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-cyan)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {copilotMsgs.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
                      >
                        <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: m.role === 'ai' ? 'linear-gradient(135deg, var(--cyan), var(--indigo))' : 'var(--bg-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {m.role === 'ai' ? <Bot size={12} color="var(--bg-0)" /> : <User size={12} color="var(--text-2)" />}
                        </div>
                        <div
                          className={m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}
                          style={{ maxWidth: '80%', padding: '9px 13px', fontSize: '0.83rem', lineHeight: 1.6 }}
                        >
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {copilotLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={12} color="var(--bg-0)" />
                      </div>
                      <div className="bubble-ai" style={{ padding: '9px 14px' }}>
                        <div className="dots"><span /><span /><span /></div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8 }}>
              <input
                className="input"
                style={{ fontSize: '0.83rem' }}
                placeholder="Ask about this candidate…"
                value={copilotQ}
                onChange={e => setCopilotQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCopilot()}
                disabled={copilotLoading}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopilot}
                disabled={!copilotQ.trim() || copilotLoading}
                style={{
                  width: 40, height: 40, borderRadius: 10, border: 'none', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
                  color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: !copilotQ.trim() || copilotLoading ? 'not-allowed' : 'pointer',
                  opacity: !copilotQ.trim() ? 0.5 : 1,
                }}
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copilot FAB (when closed) */}
      {!copilotOpen && (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
          style={{ position: 'fixed', bottom: 28, right: 28 }}
        >
          {selected && (
            <button
              onClick={() => setCopilotOpen(true)}
              style={{
                width: 52, height: 52, borderRadius: '50%', border: 'none',
                background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
                color: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 0 24px rgba(34,211,238,0.35)',
              }}
              title="Open Copilot"
            >
              <Bot size={22} />
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}