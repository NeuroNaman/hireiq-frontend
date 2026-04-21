// // import { useState, useEffect, useRef } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { Mic, MicOff, Square, ArrowRight, User, Bot, ChevronRight } from 'lucide-react'
// // import { sessionApi, conversationApi } from '@/lib/api'
// // import { useInterviewStore } from '@/store'
// // import { useSpeech } from '@/hooks/useSpeech'
// // import Waveform from '@/components/ui/Waveform'
// // import SignalBadge from '@/components/ui/SignalBadge'
// // import toast from 'react-hot-toast'

// // type Phase = 'setup' | 'greeting' | 'interview' | 'done'

// // export default function InterviewPage() {
// //   const navigate = useNavigate()
// //   const store = useInterviewStore()
// //   const speech = useSpeech()

// //   const [phase, setPhase] = useState<Phase>('setup')
// //   const [loading, setLoading] = useState(false)
// //   const [form, setForm] = useState({ name: '', city: '', experience: '' })
// //   const [aiThinking, setAiThinking] = useState(false)
// //   const [recordingPhase, setRecordingPhase] = useState<'idle' | 'recording' | 'processing'>('idle')

// //   const chatRef = useRef<HTMLDivElement>(null)

// //   useEffect(() => {
// //     chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
// //   }, [store.transcript])

// //   async function handleStart() {
// //     if (!form.name.trim()) return toast.error('Please enter your name')
// //     setLoading(true)
// //     try {
// //       const { data } = await sessionApi.start({
// //         candidate: {
// //           name: form.name.trim(),
// //           city: form.city || undefined,
// //           experience_years: form.experience ? parseInt(form.experience) : undefined,
// //         },
// //       })
// //       store.setSession(data.session_id, form.name)
// //       store.addTurn('interviewer', data.greeting)
// //       setPhase('greeting')
// //       await speech.speak(data.greeting)
// //       setPhase('interview')
// //     } catch {
// //       toast.error('Failed to start session. Is the backend running?')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   async function handleRecord() {
// //     if (recordingPhase === 'recording') {
// //       const text = speech.stopListening()
// //       if (!text.trim()) return toast('Speak something first', { icon: '🎤' })
// //       await submitResponse(text)
// //     } else {
// //       setRecordingPhase('recording')
// //       speech.startListening()
// //     }
// //   }

// //   async function submitResponse(text: string) {
// //     setRecordingPhase('processing')
// //     store.addTurn('candidate', text)
// //     setAiThinking(true)
// //     try {
// //       const { data } = await conversationApi.turn({
// //         session_id: store.sessionId!,
// //         candidate_text: text,
// //       })
// //       store.setSignal(data.adaptive_signal.signal)
// //       store.setProgress(data.question_progress, data.turn_number)
// //       store.addTurn('interviewer', data.interviewer_text)

// //       if (data.is_interview_complete) {
// //         store.completeInterview()
// //         setPhase('done')
// //       }
// //       setAiThinking(false)
// //       setRecordingPhase('idle')
// //       await speech.speak(data.interviewer_text)
// //     } catch {
// //       toast.error('Failed to process response')
// //       setAiThinking(false)
// //       setRecordingPhase('idle')
// //     }
// //   }

// //   if (phase === 'setup') return <SetupForm form={form} setForm={setForm} onStart={handleStart} loading={loading} />
// //   if (phase === 'done') return <InterviewDone name={store.candidateName!} sessionId={store.sessionId!} navigate={navigate} />

// //   return (
// //     <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', height: '100vh', overflow: 'hidden' }}>
// //       {/* Main chat area */}
// //       <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
// //         {/* Header */}
// //         <div style={{
// //           padding: '20px 32px',
// //           borderBottom: '1px solid var(--border-subtle)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: 16,
// //           background: 'var(--obsidian-900)',
// //         }}>
// //           <div style={{
// //             width: 10, height: 10, borderRadius: '50%',
// //             background: 'var(--emerald-400)',
// //             boxShadow: '0 0 8px var(--emerald-400)',
// //             animation: 'pulse-ring 2s ease-out infinite',
// //           }} />
// //           <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
// //             LIVE INTERVIEW
// //           </span>
// //           <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
// //           <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan-400)' }}>
// //             {store.questionProgress || 'Starting...'}
// //           </span>
// //           <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
// //             <SignalBadge signal={store.adaptiveSignal} />
// //           </div>
// //         </div>

// //         {/* Chat transcript */}
// //         <div
// //           ref={chatRef}
// //           style={{
// //             flex: 1,
// //             overflowY: 'auto',
// //             padding: '32px',
// //             display: 'flex',
// //             flexDirection: 'column',
// //             gap: 20,
// //           }}
// //         >
// //           <AnimatePresence initial={false}>
// //             {store.transcript.map((turn, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 16 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
// //                 style={{
// //                   display: 'flex',
// //                   gap: 12,
// //                   alignItems: 'flex-start',
// //                   flexDirection: turn.role === 'candidate' ? 'row-reverse' : 'row',
// //                 }}
// //               >
// //                 {/* Avatar */}
// //                 <div style={{
// //                   width: 36, height: 36,
// //                   borderRadius: '50%',
// //                   background: turn.role === 'interviewer'
// //                     ? 'linear-gradient(135deg, var(--cyan-400), #818cf8)'
// //                     : 'var(--obsidian-600)',
// //                   display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                   flexShrink: 0,
// //                   border: turn.role === 'interviewer' ? 'none' : '1px solid var(--border-default)',
// //                 }}>
// //                   {turn.role === 'interviewer'
// //                     ? <Bot size={16} color="var(--obsidian-950)" />
// //                     : <User size={16} color="var(--text-secondary)" />
// //                   }
// //                 </div>

// //                 {/* Bubble */}
// //                 <div style={{
// //                   maxWidth: '70%',
// //                   padding: '14px 18px',
// //                   borderRadius: turn.role === 'interviewer' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
// //                   background: turn.role === 'interviewer'
// //                     ? 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.05))'
// //                     : 'var(--obsidian-700)',
// //                   border: `1px solid ${turn.role === 'interviewer' ? 'var(--border-cyan)' : 'var(--border-subtle)'}`,
// //                   fontSize: '0.95rem',
// //                   lineHeight: 1.65,
// //                   color: turn.role === 'interviewer' ? 'var(--text-primary)' : 'var(--text-secondary)',
// //                 }}>
// //                   {turn.text}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </AnimatePresence>

// //           {/* AI thinking indicator */}
// //           {aiThinking && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 12 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               style={{ display: 'flex', gap: 12, alignItems: 'center' }}
// //             >
// //               <div style={{
// //                 width: 36, height: 36, borderRadius: '50%',
// //                 background: 'linear-gradient(135deg, var(--cyan-400), #818cf8)',
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               }}>
// //                 <Bot size={16} color="var(--obsidian-950)" />
// //               </div>
// //               <div style={{
// //                 padding: '14px 18px',
// //                 borderRadius: '4px 16px 16px 16px',
// //                 background: 'rgba(34,211,238,0.06)',
// //                 border: '1px solid var(--border-cyan)',
// //               }}>
// //                 <div className="loading-dots" style={{ display: 'flex', gap: 6 }}>
// //                   <span /><span /><span />
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </div>

// //         {/* Controls */}
// //         <div style={{
// //           padding: '24px 32px',
// //           borderTop: '1px solid var(--border-subtle)',
// //           background: 'var(--obsidian-900)',
// //         }}>
// //           {/* Waveform */}
// //           <div style={{ marginBottom: 16 }}>
// //             <Waveform isActive={recordingPhase === 'recording'} />
// //           </div>

// //           {/* Live transcript preview */}
// //           {speech.transcript && (
// //             <div style={{
// //               marginBottom: 12,
// //               padding: '10px 14px',
// //               background: 'var(--obsidian-700)',
// //               borderRadius: 8,
// //               fontSize: '0.875rem',
// //               color: 'var(--text-secondary)',
// //               fontStyle: 'italic',
// //               border: '1px solid var(--border-subtle)',
// //             }}>
// //               "{speech.transcript}"
// //             </div>
// //           )}

// //           <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
// //             <motion.button
// //               whileTap={{ scale: 0.95 }}
// //               onClick={handleRecord}
// //               disabled={recordingPhase === 'processing' || aiThinking || speech.isSpeaking}
// //               style={{
// //                 flex: 1,
// //                 height: 52,
// //                 borderRadius: 12,
// //                 border: 'none',
// //                 cursor: recordingPhase === 'processing' || aiThinking ? 'not-allowed' : 'pointer',
// //                 background: recordingPhase === 'recording'
// //                   ? 'linear-gradient(135deg, #fb7185, #f97316)'
// //                   : 'linear-gradient(135deg, var(--cyan-400), #818cf8)',
// //                 color: 'var(--obsidian-950)',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 gap: 10,
// //                 fontFamily: 'var(--font-display)',
// //                 fontWeight: 700,
// //                 fontSize: '0.95rem',
// //                 opacity: aiThinking || speech.isSpeaking ? 0.5 : 1,
// //                 transition: 'all 0.2s',
// //                 boxShadow: recordingPhase === 'recording'
// //                   ? '0 0 32px rgba(251,113,133,0.4)'
// //                   : '0 0 32px rgba(34,211,238,0.3)',
// //               }}
// //             >
// //               {recordingPhase === 'recording' ? (
// //                 <><Square size={18} fill="currentColor" /> Stop & Send</>
// //               ) : recordingPhase === 'processing' ? (
// //                 <><span className="loading-dots" style={{ display: 'flex', gap: 4 }}><span /><span /><span /></span> Processing...</>
// //               ) : (
// //                 <><Mic size={18} /> {speech.isSpeaking ? 'Alex is speaking...' : 'Hold to Speak'}</>
// //               )}
// //             </motion.button>
// //           </div>

// //           <p style={{
// //             textAlign: 'center',
// //             fontSize: '0.75rem',
// //             color: 'var(--text-muted)',
// //             marginTop: 10,
// //             fontFamily: 'var(--font-mono)',
// //           }}>
// //             {speech.isSpeaking ? 'Wait for Alex to finish...' : 'Click to start recording · Click again to submit'}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right panel — live stats */}
// //       <LiveStatsPanel />
// //     </div>
// //   )
// // }

// // function LiveStatsPanel() {
// //   const store = useInterviewStore()
// //   const candidateTurns = store.transcript.filter(t => t.role === 'candidate')
// //   const totalWords = candidateTurns.reduce((acc, t) => acc + t.text.split(' ').length, 0)
// //   const avgWords = candidateTurns.length ? Math.round(totalWords / candidateTurns.length) : 0

// //   return (
// //     <div style={{
// //       borderLeft: '1px solid var(--border-subtle)',
// //       background: 'var(--obsidian-900)',
// //       padding: 24,
// //       display: 'flex',
// //       flexDirection: 'column',
// //       gap: 20,
// //       overflowY: 'auto',
// //     }}>
// //       <div>
// //         <span className="badge badge-muted" style={{ fontSize: '0.68rem' }}>LIVE STATS</span>
// //       </div>

// //       {[
// //         { label: 'Turns', value: candidateTurns.length, color: 'var(--cyan-400)' },
// //         { label: 'Total Words', value: totalWords, color: '#818cf8' },
// //         { label: 'Avg / Response', value: `${avgWords}w`, color: 'var(--amber-400)' },
// //       ].map((s) => (
// //         <div key={s.label} className="glass-card" style={{ padding: 16 }}>
// //           <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
// //             {s.label}
// //           </div>
// //           <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-mono)' }}>
// //             {s.value}
// //           </div>
// //         </div>
// //       ))}

// //       {/* Recent signals */}
// //       <div>
// //         <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
// //           Response Signals
// //         </div>
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
// //           {candidateTurns.slice(-5).reverse().map((_, i) => (
// //             <div key={i} style={{
// //               height: 6,
// //               borderRadius: 3,
// //               background: i === 0 ? 'var(--cyan-400)' : 'var(--obsidian-600)',
// //               width: `${100 - i * 10}%`,
// //               transition: 'width 0.6s',
// //             }} />
// //           ))}
// //           {candidateTurns.length === 0 && (
// //             <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Waiting for responses...</div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Progress bar */}
// //       <div>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //           <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Progress</span>
// //           <span style={{ fontSize: '0.75rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
// //             {store.questionProgress}
// //           </span>
// //         </div>
// //         <div className="score-bar">
// //           <div
// //             className="score-bar-fill"
// //             style={{
// //               width: store.questionProgress
// //                 ? `${(parseInt(store.questionProgress) / 14) * 100}%`
// //                 : '0%',
// //               background: 'linear-gradient(90deg, var(--cyan-400), #818cf8)',
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {/* Candidate info */}
// //       <div className="glass-card" style={{ padding: 16, marginTop: 'auto' }}>
// //         <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
// //           Candidate
// //         </div>
// //         <div style={{ fontWeight: 700, fontSize: '1rem' }}>{store.candidateName}</div>
// //         <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
// //           Session active
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // interface SetupFormProps {
// //   form: { name: string; city: string; experience: string }
// //   setForm: (f: any) => void
// //   onStart: () => void
// //   loading: boolean
// // }

// // function SetupForm({ form, setForm, onStart, loading }: SetupFormProps) {
// //   return (
// //     <div style={{
// //       minHeight: '100vh',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       padding: 40,
// //       position: 'relative',
// //     }}>
// //       <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
// //       <div style={{ position: 'absolute', top: '20%', left: '30%', width: 500, height: 500,
// //         background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
// //         pointerEvents: 'none' }} />

// //       <motion.div
// //         initial={{ opacity: 0, y: 32 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
// //         style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}
// //       >
// //         <div style={{ marginBottom: 40 }}>
// //           <span className="badge badge-cyan" style={{ marginBottom: 16 }}>Cuemath Tutor Screening</span>
// //           <h1 style={{ fontSize: '2.8rem', lineHeight: 1.1, marginBottom: 12 }}>
// //             Ready to
// //             <br />
// //             <span className="font-serif" style={{ fontStyle: 'italic', color: 'var(--cyan-400)' }}>
// //               meet Alex?
// //             </span>
// //           </h1>
// //           <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
// //             Your AI interviewer. 10–15 minutes. No wrong answers — just a real conversation about how you teach.
// //           </p>
// //         </div>

// //         <div className="glass-card-strong" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
// //           <div>
// //             <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
// //               Full Name *
// //             </label>
// //             <input
// //               className="input"
// //               placeholder="Your full name"
// //               value={form.name}
// //               onChange={e => setForm({ ...form, name: e.target.value })}
// //               onKeyDown={e => e.key === 'Enter' && onStart()}
// //               autoFocus
// //             />
// //           </div>

// //           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
// //             <div>
// //               <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
// //                 City
// //               </label>
// //               <input
// //                 className="input"
// //                 placeholder="e.g. Mumbai"
// //                 value={form.city}
// //                 onChange={e => setForm({ ...form, city: e.target.value })}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
// //                 Years Teaching
// //               </label>
// //               <input
// //                 className="input"
// //                 type="number"
// //                 min="0"
// //                 placeholder="e.g. 3"
// //                 value={form.experience}
// //                 onChange={e => setForm({ ...form, experience: e.target.value })}
// //               />
// //             </div>
// //           </div>

// //           <motion.button
// //             className="btn btn-primary"
// //             whileTap={{ scale: 0.97 }}
// //             onClick={onStart}
// //             disabled={loading || !form.name.trim()}
// //             style={{
// //               width: '100%',
// //               justifyContent: 'center',
// //               padding: '16px',
// //               fontSize: '1rem',
// //               marginTop: 8,
// //               opacity: !form.name.trim() ? 0.5 : 1,
// //             }}
// //           >
// //             {loading ? (
// //               <span className="loading-dots" style={{ display: 'flex', gap: 6 }}><span /><span /><span /></span>
// //             ) : (
// //               <>Begin Interview <ArrowRight size={18} /></>
// //             )}
// //           </motion.button>
// //         </div>

// //         <div style={{ display: 'flex', gap: 24, marginTop: 24, justifyContent: 'center' }}>
// //           {['Voice-based', '14 questions', '~10 min'].map(t => (
// //             <span key={t} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
// //               · {t}
// //             </span>
// //           ))}
// //         </div>
// //       </motion.div>
// //     </div>
// //   )
// // }

// // function InterviewDone({ name, sessionId, navigate }: { name: string; sessionId: string; navigate: any }) {
// //   const [generating, setGenerating] = useState(false)

// //   async function handleEvaluate() {
// //     setGenerating(true)
// //     try {
// //       const { evaluationApi } = await import('@/lib/api')
// //       await evaluationApi.generate(sessionId)
// //       navigate(`/evaluation/${sessionId}`)
// //     } catch {
// //       toast.error('Failed to generate evaluation')
// //       setGenerating(false)
// //     }
// //   }

// //   return (
// //     <div style={{
// //       minHeight: '100vh',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       flexDirection: 'column',
// //       gap: 32,
// //       padding: 40,
// //       textAlign: 'center',
// //     }}>
// //       <motion.div
// //         initial={{ scale: 0, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         transition={{ type: 'spring', stiffness: 200, damping: 15 }}
// //         style={{
// //           width: 80, height: 80,
// //           borderRadius: '50%',
// //           background: 'linear-gradient(135deg, var(--emerald-400), var(--cyan-400))',
// //           display: 'flex', alignItems: 'center', justifyContent: 'center',
// //           fontSize: '2rem',
// //           boxShadow: '0 0 48px rgba(52,211,153,0.4)',
// //         }}
// //       >
// //         ✓
// //       </motion.div>

// //       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
// //         <h2 style={{ fontSize: '2.5rem', marginBottom: 12 }}>Interview Complete!</h2>
// //         <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
// //           Great job, {name}. Alex has all the responses needed.
// //         </p>
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.5 }}
// //         style={{ display: 'flex', gap: 16 }}
// //       >
// //         <button
// //           className="btn btn-primary"
// //           style={{ fontSize: '1rem', padding: '14px 28px' }}
// //           onClick={handleEvaluate}
// //           disabled={generating}
// //         >
// //           {generating ? (
// //             <><span className="loading-dots" style={{ display: 'flex', gap: 4 }}><span /><span /><span /></span> Generating Report...</>
// //           ) : (
// //             <>View Evaluation Report <ChevronRight size={18} /></>
// //           )}
// //         </button>
// //         <button className="btn btn-ghost" onClick={() => navigate('/recruiter')}>
// //           Go to Dashboard
// //         </button>
// //       </motion.div>
// //     </div>
// //   )
// // }


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
//   const qCount = store.questionsAsked

//   useEffect(() => {
//     chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
//   }, [store.transcript])

//   async function handleStart() {
//     if (!form.name.trim()) return toast.error('Please enter your name')
//     setLoading(true)
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
//     setRecPhase('processing')
//     store.addTurn('candidate', text)
//     setAiThinking(true)

//     try {
//       const { data } = await conversationApi.turn({ session_id: store.sessionId!, candidate_text: text })
//       store.setSignal(data.adaptive_signal.signal)

//       const qNum = parseInt(data.question_progress?.split(' ')[1] || '0') || (qCount + 1)
//       store.setProgress(data.question_progress, data.turn_number, qNum)

//       store.addTurn('interviewer', data.interviewer_text)

//       const isDone = data.is_interview_complete || qNum >= MAX_Q
//       if (isDone) {
//         store.complete()
//         setPhase('done')
//         setAiThinking(false)
//         setRecPhase('idle')
//         await speech.speak(data.interviewer_text)
//         return
//       }

//       setAiThinking(false)
//       setRecPhase('idle')
//       await speech.speak(data.interviewer_text)
//     } catch {
//       toast.error('Failed to process response')
//       setAiThinking(false)
//       setRecPhase('idle')
//     }
//   }

//   async function handleEndInterview() {
//     setShowEndConfirm(false)
//     speech.cancelSpeaking()
//     // Send a closing message
//     store.addTurn('candidate', '[Candidate ended the interview early]')
//     setAiThinking(true)
//     try {
//       const { data } = await conversationApi.turn({
//         session_id: store.sessionId!,
//         candidate_text: 'I would like to end the interview now.',
//       })
//       store.addTurn('interviewer', data.interviewer_text)
//       store.complete()
//       setPhase('done')
//       setAiThinking(false)
//       await speech.speak(data.interviewer_text)
//     } catch {
//       store.complete()
//       setPhase('done')
//       setAiThinking(false)
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




import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Bot, User, ChevronRight, StopCircle, Activity } from 'lucide-react'
import { sessionApi, conversationApi, evaluationApi } from '@/lib/api'
import { useInterviewStore } from '@/store'
import { useSpeech } from '@/hooks/useSpeech'
import { Waveform, SignalBadge } from '@/components/ui'
import toast from 'react-hot-toast'

const MAX_Q = 8 // Interview ends after this many questions

type Phase = 'setup' | 'interview' | 'done'
type RecPhase = 'idle' | 'recording' | 'processing'

export default function InterviewPage() {
  const navigate = useNavigate()
  const store = useInterviewStore()
  const speech = useSpeech()

  const [phase, setPhase] = useState<Phase>('setup')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', city: '', experience: '' })
  const [aiThinking, setAiThinking] = useState(false)
  const [recPhase, setRecPhase] = useState<RecPhase>('idle')
  const [showEndConfirm, setShowEndConfirm] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)
  // This ref is the source of truth — checked BEFORE any speech/state update
  const isCompletedRef = useRef(false)
  const qCount = store.questionsAsked

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [store.transcript])

  // Cancel everything when component unmounts
  useEffect(() => {
    return () => {
      speech.cancelSpeaking()
    }
  }, [])

  function finishInterview(closingText?: string) {
    // Mark done FIRST — all subsequent async checks will bail
    isCompletedRef.current = true
    // Kill any audio immediately
    speech.cancelSpeaking()
    speech.stopListening()
    // Update state
    store.complete()
    setAiThinking(false)
    setRecPhase('idle')
    // Add closing message to transcript if provided (but DO NOT speak it)
    if (closingText) {
      store.addTurn('interviewer', closingText)
    }
    // Navigate to done screen
    setPhase('done')
  }

  async function handleStart() {
    if (!form.name.trim()) return toast.error('Please enter your name')
    setLoading(true)
    isCompletedRef.current = false
    try {
      const { data } = await sessionApi.start({
        candidate: {
          name: form.name.trim(),
          city: form.city || undefined,
          experience_years: form.experience ? parseInt(form.experience) : undefined,
        },
      })
      store.reset()
      store.setSession(data.session_id, form.name.trim())
      store.addTurn('interviewer', data.greeting)
      setPhase('interview')
      await speech.speak(data.greeting)
    } catch {
      toast.error('Failed to start. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  async function handleRecord() {
    if (isCompletedRef.current) return  // guard
    if (recPhase === 'recording') {
      const text = speech.stopListening()
      if (!text.trim()) { toast('Speak something first', { icon: '🎤' }); setRecPhase('idle'); return }
      await submitResponse(text)
    } else if (recPhase === 'idle') {
      setRecPhase('recording')
      speech.startListening()
    }
  }

  async function submitResponse(text: string) {
    if (isCompletedRef.current) return  // guard against late calls
    setRecPhase('processing')
    store.addTurn('candidate', text)
    setAiThinking(true)

    try {
      const { data } = await conversationApi.turn({ session_id: store.sessionId!, candidate_text: text })

      // Check IMMEDIATELY after await — may have been completed while waiting
      if (isCompletedRef.current) return

      store.setSignal(data.adaptive_signal.signal)

      const qNum = parseInt(data.question_progress?.split(' ')[1] || '0') || (qCount + 1)
      store.setProgress(data.question_progress, data.turn_number, qNum)

      const isDone = data.is_interview_complete || qNum >= MAX_Q

      if (isDone) {
        // Add the closing text to transcript visually, but DO NOT speak it
        // — call finishInterview which cancels all audio immediately
        finishInterview(data.interviewer_text)
        return
      }

      // Normal turn — check again before speaking
      store.addTurn('interviewer', data.interviewer_text)
      setAiThinking(false)
      setRecPhase('idle')

      // Only speak if still in interview
      if (!isCompletedRef.current) {
        await speech.speak(data.interviewer_text)
      }
    } catch {
      if (!isCompletedRef.current) {
        toast.error('Failed to process response')
        setAiThinking(false)
        setRecPhase('idle')
      }
    }
  }

  async function handleEndInterview() {
    setShowEndConfirm(false)
    // Finish immediately — don't wait for any API response
    finishInterview('Thank you for your time! The Cuemath team will review your responses and be in touch soon.')
    // Fire-and-forget the backend completion (don't await, don't speak result)
    try {
      await conversationApi.turn({
        session_id: store.sessionId!,
        candidate_text: 'I would like to end the interview now.',
      })
    } catch {
      // Ignore — interview is already done on frontend
    }
  }

  if (phase === 'setup') {
    return <SetupScreen form={form} setForm={setForm} onStart={handleStart} loading={loading} />
  }
  if (phase === 'done') {
    return <DoneScreen name={store.candidateName!} sessionId={store.sessionId!} navigate={navigate} />
  }

  const candidateTurns = store.transcript.filter(t => t.role === 'candidate')
  const totalWords = candidateTurns.reduce((a, t) => a + t.text.split(' ').length, 0)

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 300px', overflow: 'hidden' }}>
      {/* Main */}
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '16px 28px', borderBottom: '1px solid var(--border-1)',
          background: 'var(--bg-2)', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 6px var(--emerald)', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>LIVE INTERVIEW</span>
          </span>
          <span style={{ color: 'var(--text-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan)' }}>
            {store.questionProgress || 'Starting…'}
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <SignalBadge signal={store.signal} />
            {qCount >= 3 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setShowEndConfirm(true)}
              >
                <StopCircle size={13} /> End Interview
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: 'var(--bg-5)', flexShrink: 0 }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--indigo))' }}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min((qCount / MAX_Q) * 100, 100)}%` }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          />
        </div>

        {/* Chat */}
        <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <AnimatePresence initial={false}>
            {store.transcript.map((turn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16,1,0.3,1] }}
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: turn.role === 'candidate' ? 'row-reverse' : 'row' }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: turn.role === 'interviewer' ? 'linear-gradient(135deg, var(--cyan), var(--indigo))' : 'var(--bg-5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: turn.role === 'candidate' ? '1px solid var(--border-2)' : 'none',
                }}>
                  {turn.role === 'interviewer' ? <Bot size={15} color="var(--bg-0)" /> : <User size={15} color="var(--text-2)" />}
                </div>
                <div
                  className={turn.role === 'interviewer' ? 'bubble-ai' : 'bubble-user'}
                  style={{ maxWidth: '72%', padding: '13px 16px', fontSize: '0.9rem', lineHeight: 1.65 }}
                >
                  {turn.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {aiThinking && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={15} color="var(--bg-0)" />
              </div>
              <div className="bubble-ai" style={{ padding: '13px 18px' }}>
                <div className="dots"><span /><span /><span /></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-2)', flexShrink: 0 }}>
          <Waveform isActive={recPhase === 'recording'} barCount={48} />

          {speech.transcript && (
            <div style={{
              margin: '10px 0 0',
              padding: '8px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-1)',
              borderRadius: 8,
              fontSize: '0.83rem',
              color: 'var(--text-2)',
              fontStyle: 'italic',
            }}>
              "{speech.transcript}"
            </div>
          )}

          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleRecord}
              disabled={recPhase === 'processing' || aiThinking || speech.isSpeaking}
              style={{
                flex: 1, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: recPhase === 'recording'
                  ? 'linear-gradient(135deg, #fb7185, #f97316)'
                  : 'linear-gradient(135deg, var(--cyan), var(--indigo))',
                color: 'var(--bg-0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.9rem',
                opacity: (aiThinking || speech.isSpeaking) ? 0.4 : 1,
                transition: 'all 0.2s',
                boxShadow: recPhase === 'recording'
                  ? '0 0 24px rgba(251,113,133,0.35)' : '0 0 24px rgba(34,211,238,0.2)',
              }}
            >
              {recPhase === 'recording' ? (
                <><Square size={16} fill="currentColor" /> Stop & Submit</>
              ) : recPhase === 'processing' ? (
                <><div className="dots"><span /><span /><span /></div> Processing...</>
              ) : (
                <><Mic size={16} /> {speech.isSpeaking ? 'Alex is speaking…' : 'Click to Speak'}</>
              )}
            </motion.button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
            {speech.isSpeaking ? 'Wait for Alex to finish…' : 'Click to start · Click again to submit'}
          </p>
        </div>
      </div>

      {/* Right Stats Panel */}
      <div style={{
        borderLeft: '1px solid var(--border-1)',
        background: 'var(--bg-2)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflowY: 'auto',
      }}>
        <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Live Stats
        </div>

        {[
          { label: 'Questions', value: `${qCount} / ${MAX_Q}`, color: 'var(--cyan)' },
          { label: 'Total Turns', value: candidateTurns.length, color: 'var(--indigo)' },
          { label: 'Total Words', value: totalWords, color: 'var(--amber)' },
          { label: 'Avg Words', value: candidateTurns.length ? Math.round(totalWords / candidateTurns.length) : 0, color: 'var(--emerald)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
          </div>
        ))}

        {/* Progress ring */}
        <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', alignSelf: 'flex-start' }}>
            Progress
          </div>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="35" fill="none" stroke="var(--bg-5)" strokeWidth="6" />
            <motion.circle
              cx="45" cy="45" r="35" fill="none"
              stroke="var(--cyan)" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 35}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - Math.min(qCount / MAX_Q, 1)) }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
              style={{ transformOrigin: '45px 45px', transform: 'rotate(-90deg)' }}
            />
            <text x="45" y="50" textAnchor="middle" fill="var(--cyan)" fontSize="16" fontFamily="DM Mono" fontWeight="600">
              {Math.round(Math.min((qCount / MAX_Q) * 100, 100))}%
            </text>
          </svg>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center' }}>
            {MAX_Q - qCount > 0 ? `${MAX_Q - qCount} questions remaining` : 'Interview complete'}
          </p>
        </div>

        {/* Candidate */}
        <div className="card" style={{ padding: 14, marginTop: 'auto' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Candidate</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{store.candidateName}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--emerald)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />
            Session active
          </div>
        </div>
      </div>

      {/* End Confirm Modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(2,3,10,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, backdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowEndConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="card"
              style={{ padding: 36, maxWidth: 420, width: '90%', textAlign: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>⚠️</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>End Interview Early?</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 28 }}>
                This will end the interview after {qCount} questions. The evaluation will use responses collected so far.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-ghost btn-md" onClick={() => setShowEndConfirm(false)}>
                  Continue
                </button>
                <button className="btn btn-danger btn-md" onClick={handleEndInterview}>
                  <StopCircle size={15} /> End Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SetupScreen({ form, setForm, onStart, loading }: any) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative',
    }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', left: '25%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}
      >
        <span className="badge badge-cyan" style={{ marginBottom: 20 }}>Cuemath Tutor Screening</span>
        <h1 style={{ fontSize: '3rem', marginBottom: 6 }}>Ready to</h1>
        <h1 style={{ fontSize: '3rem', marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--cyan)' }}>meet Alex?</span>
        </h1>
        <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 36 }}>
          Your AI interviewer. 10–15 minutes. No wrong answers — just a real conversation about how you teach.
        </p>

        <div className="card-glow" style={{ padding: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Full Name *
              </label>
              <input className="input" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onKeyDown={(e: any) => e.key === 'Enter' && onStart()} autoFocus />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>City</label>
                <input className="input" placeholder="e.g. Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: 7, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Years Teaching</label>
                <input className="input" type="number" min="0" placeholder="e.g. 3" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary btn-lg"
              onClick={onStart}
              disabled={loading || !form.name.trim()}
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              {loading ? <><div className="dots"><span /><span /><span /></div> Preparing…</> : <>Begin Interview <ChevronRight size={17} /></>}
            </motion.button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center' }}>
          {['Voice-based', `${MAX_Q} questions`, '~10 min'].map(t => (
            <span key={t} style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>· {t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function DoneScreen({ name, sessionId, navigate }: any) {
  const [generating, setGenerating] = useState(false)

  async function handleEval() {
    setGenerating(true)
    try {
      await evaluationApi.generate(sessionId)
      navigate(`/evaluation/${sessionId}`)
    } catch {
      toast.error('Failed to generate evaluation')
      setGenerating(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28, padding: 40, textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--emerald), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 0 48px rgba(52,211,153,0.4)' }}
      >
        ✓
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 10 }}>Interview Complete!</h2>
        <p style={{ color: 'var(--text-2)', fontSize: '1.05rem' }}>Great job, {name}. Alex has everything needed for evaluation.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 14 }}>
        <button className="btn btn-primary btn-lg" onClick={handleEval} disabled={generating}>
          {generating ? <><div className="dots"><span /><span /><span /></div> Generating Report…</> : <>View Evaluation <ChevronRight size={16} /></>}
        </button>
        <button className="btn btn-secondary btn-md" onClick={() => navigate('/recruiter')}>Go to Dashboard</button>
      </motion.div>
    </div>
  )
}