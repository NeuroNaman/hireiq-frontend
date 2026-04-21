// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { ArrowRight, Mic, Users, BarChart3, Zap, Shield, Clock } from 'lucide-react'
// import NeuralOrb from '@/components/three/NeuralOrb'

// const STATS = [
//   { value: '14', label: 'Questions', suffix: '' },
//   { value: '6', label: 'Dimensions', suffix: '' },
//   { value: '95', label: 'Accuracy', suffix: '%' },
//   { value: '10', label: 'Min Screen', suffix: 'min' },
// ]

// const FEATURES = [
//   {
//     icon: Mic,
//     title: 'Voice-Native',
//     desc: 'Real speech. Not typing. Candidates speak naturally, we transcribe and analyze in real time.',
//     color: 'var(--cyan-400)',
//   },
//   {
//     icon: Zap,
//     title: 'Adaptive AI',
//     desc: 'Follows up on vague answers. Probes deeper on strong ones. Every interview is unique.',
//     color: '#818cf8',
//   },
//   {
//     icon: BarChart3,
//     title: 'Evidence-Grounded',
//     desc: 'Every score cites a direct quote. No black boxes. Recruiters see exactly why.',
//     color: 'var(--amber-400)',
//   },
//   {
//     icon: Shield,
//     title: 'Fair & Consistent',
//     desc: 'Same rubric every time. Eliminate interviewer bias. Built for scale.',
//     color: 'var(--emerald-400)',
//   },
//   {
//     icon: Users,
//     title: 'Recruiter Copilot',
//     desc: 'Ask any question about a candidate. AI answers from the transcript instantly.',
//     color: 'var(--rose-400)',
//   },
//   {
//     icon: Clock,
//     title: 'Scale Instantly',
//     desc: 'Screen 100 candidates simultaneously. No scheduling. No fatigue. No wait.',
//     color: '#f472b6',
//   },
// ]

// const stagger = {
//   container: {
//     animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
//   },
//   item: {
//     initial: { opacity: 0, y: 24 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }
//   }
// }

// export default function HomePage() {
//   const navigate = useNavigate()

//   return (
//     <div style={{ position: 'relative', overflow: 'hidden' }}>
//       {/* Hero */}
//       <section style={{
//         minHeight: '100vh',
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         alignItems: 'center',
//         padding: '80px 64px',
//         position: 'relative',
//         gap: 64,
//       }}>
//         {/* Grid background */}
//         <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

//         {/* Gradient glow */}
//         <div style={{
//           position: 'absolute',
//           top: '10%', right: '30%',
//           width: 600, height: 600,
//           background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
//           pointerEvents: 'none',
//         }} />

//         {/* Left — Text */}
//         <motion.div
//           variants={stagger.container}
//           initial="initial"
//           animate="animate"
//           style={{ position: 'relative', zIndex: 1 }}
//         >
//           <motion.div variants={stagger.item}>
//             <span className="badge badge-cyan" style={{ marginBottom: 24 }}>
//               <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan-400)', display: 'inline-block' }} />
//               AI-Powered Tutor Screening
//             </span>
//           </motion.div>

//           <motion.h1
//             variants={stagger.item}
//             style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: 24 }}
//           >
//             Screen tutors
//             <br />
//             <span className="font-serif" style={{ fontStyle: 'italic', color: 'var(--cyan-400)' }}>
//               10× faster.
//             </span>
//             <br />
//             <span style={{ color: 'var(--text-secondary)', fontSize: '80%' }}>
//               with evidence.
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={stagger.item}
//             style={{
//               fontSize: '1.1rem',
//               color: 'var(--text-secondary)',
//               lineHeight: 1.7,
//               marginBottom: 40,
//               maxWidth: 480,
//             }}
//           >
//             HireIQ conducts natural voice interviews, analyzes communication clarity,
//             patience, warmth, and simplicity — then delivers a structured evaluation
//             with direct transcript evidence.
//           </motion.p>

//           <motion.div variants={stagger.item} style={{ display: 'flex', gap: 12 }}>
//             <button
//               className="btn btn-primary"
//               style={{ fontSize: '1rem', padding: '14px 28px' }}
//               onClick={() => navigate('/interview')}
//             >
//               Start Interview
//               <ArrowRight size={18} />
//             </button>
//             <button
//               className="btn btn-ghost"
//               onClick={() => navigate('/recruiter')}
//             >
//               <Users size={16} />
//               View Candidates
//             </button>
//           </motion.div>

//           {/* Stats row */}
//           <motion.div
//             variants={stagger.item}
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(4, 1fr)',
//               gap: 24,
//               marginTop: 56,
//               paddingTop: 40,
//               borderTop: '1px solid var(--border-subtle)',
//             }}
//           >
//             {STATS.map((s) => (
//               <div key={s.label}>
//                 <div style={{
//                   fontSize: '1.8rem',
//                   fontWeight: 800,
//                   color: 'var(--cyan-400)',
//                   fontFamily: 'var(--font-mono)',
//                   lineHeight: 1,
//                 }}>
//                   {s.value}<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{s.suffix}</span>
//                 </div>
//                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Right — 3D Orb */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, ease: [0.16,1,0.3,1], delay: 0.2 }}
//           style={{ position: 'relative', height: 520 }}
//         >
//           <NeuralOrb />

//           {/* Floating info cards */}
//           <motion.div
//             animate={{ y: [0, -8, 0] }}
//             transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
//             className="glass-card"
//             style={{
//               position: 'absolute',
//               top: '15%', right: '-5%',
//               padding: '12px 16px',
//               minWidth: 160,
//               zIndex: 2,
//             }}
//           >
//             <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Signal</div>
//             <div className="badge badge-green">⚡ Strong Response</div>
//           </motion.div>

//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
//             className="glass-card"
//             style={{
//               position: 'absolute',
//               bottom: '20%', left: '-8%',
//               padding: '12px 16px',
//               minWidth: 180,
//               zIndex: 2,
//             }}
//           >
//             <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Dimension</div>
//             <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--emerald-400)' }}>Empathy: 8.5/10</div>
//           </motion.div>

//           <motion.div
//             animate={{ y: [0, -6, 0] }}
//             transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
//             className="glass-card"
//             style={{
//               position: 'absolute',
//               bottom: '35%', right: '-12%',
//               padding: '10px 14px',
//               zIndex: 2,
//             }}
//           >
//             <div style={{ color: 'var(--emerald-400)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
//               ✓ Strong Hire
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Features */}
//       <section style={{ padding: '80px 64px', background: 'rgba(255,255,255,0.01)' }}>
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           style={{ marginBottom: 56, maxWidth: 480 }}
//         >
//           <span className="badge badge-muted" style={{ marginBottom: 16 }}>Features</span>
//           <h2 style={{ fontSize: '2.5rem', lineHeight: 1.15 }}>
//             Built for the messy
//             <br />
//             <span className="font-serif" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
//               reality of hiring.
//             </span>
//           </h2>
//         </motion.div>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: 16,
//         }}>
//           {FEATURES.map((f, i) => (
//             <motion.div
//               key={f.title}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.07, duration: 0.5 }}
//               whileHover={{ y: -4, transition: { duration: 0.2 } }}
//               className="glass-card"
//               style={{ padding: 28, cursor: 'default' }}
//             >
//               <div style={{
//                 width: 44, height: 44,
//                 borderRadius: 10,
//                 background: `${f.color}15`,
//                 border: `1px solid ${f.color}30`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 marginBottom: 16,
//               }}>
//                 <f.icon size={20} color={f.color} />
//               </div>
//               <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
//               <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }



import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mic, Users, BarChart3, Zap, Shield, Clock, ChevronRight, Star, Brain, Heart } from 'lucide-react'
import GlobeHero from '@/components/three/GlobeHero'

const METRICS = [
  { val: '14',  suf: '',    label: 'Questions',   color: 'var(--cyan)' },
  { val: '6',   suf: '',    label: 'Dimensions',  color: 'var(--indigo)' },
  { val: '94',  suf: '%',   label: 'Accuracy',    color: 'var(--emerald)' },
  { val: '10',  suf: 'min', label: 'Screen Time', color: 'var(--amber)' },
]

const FEATURES = [
  { icon: Mic,      title: 'Voice-Native',      desc: 'Real speech. Not typing. Candidates speak naturally — we transcribe and analyze live.',   color: 'var(--cyan)',    gradient: 'rgba(34,211,238,0.08)' },
  { icon: Brain,    title: 'Adaptive AI',        desc: 'Follows up on vague answers. Probes deeper on strong ones. Every interview is unique.',   color: 'var(--indigo)',  gradient: 'rgba(129,140,248,0.08)' },
  { icon: BarChart3,title: 'Evidence-Grounded',  desc: 'Every score cites a direct quote. No black boxes. Recruiters see exactly why.',           color: 'var(--amber)',   gradient: 'rgba(251,191,36,0.07)' },
  { icon: Shield,   title: 'Fair & Consistent',  desc: 'Same rubric every time. Eliminate interviewer bias. Built for scale.',                    color: 'var(--emerald)', gradient: 'rgba(52,211,153,0.07)' },
  { icon: Heart,    title: 'Candidate-First',    desc: 'Professional, welcoming, fair. This may be their first Cuemath touch — make it count.',   color: 'var(--rose)',    gradient: 'rgba(251,113,133,0.07)' },
  { icon: Clock,    title: 'Scale Instantly',    desc: 'Screen 100 candidates simultaneously. No scheduling, no fatigue, no wait.',               color: 'var(--violet)',  gradient: 'rgba(192,132,252,0.07)' },
]

const DIMENSIONS = [
  { name: 'Communication Clarity',  pct: 85, color: 'var(--cyan)' },
  { name: 'Ability to Simplify',    pct: 92, color: 'var(--indigo)' },
  { name: 'Patience & Empathy',     pct: 78, color: 'var(--emerald)' },
  { name: 'Warmth & Child Connect', pct: 88, color: 'var(--amber)' },
  { name: 'English Fluency',        pct: 82, color: 'var(--violet)' },
  { name: 'Math Teaching Ability',  pct: 76, color: 'var(--rose)' },
]

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } },
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center',
        padding: '80px 64px', gap: 40,
      }}>
        {/* Background */}
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.7 }} />
        <div style={{ position: 'absolute', top: '5%', left: '35%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '45%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Left */}
        <motion.div variants={stagger.container} initial="initial" animate="animate" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={stagger.item} style={{ marginBottom: 24 }}>
            <span className="badge badge-cyan" style={{ gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)', animation: 'pulse-glow 2s infinite' }} />
              AI-Powered Tutor Screening
            </span>
          </motion.div>

          <motion.h1 variants={stagger.item} style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', marginBottom: 8 }}>
            Screen tutors
          </motion.h1>
          <motion.h1 variants={stagger.item} style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', marginBottom: 8 }}>
            <span className="gradient-text-amber" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>10× faster.</span>
          </motion.h1>
          <motion.h1 variants={stagger.item} style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: 'var(--text-2)', marginBottom: 28 }}>
            with evidence.
          </motion.h1>

          <motion.p variants={stagger.item} style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 460, marginBottom: 40 }}>
            HireIQ conducts natural voice interviews, analyzes communication clarity,
            patience, warmth, and simplicity — then delivers a structured evaluation
            with direct transcript evidence.
          </motion.p>

          <motion.div variants={stagger.item} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/interview')}>
              Start Interview <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/recruiter')}>
              <Users size={16} /> View Candidates
            </button>
          </motion.div>

          {/* Metric row */}
          <motion.div variants={stagger.item} style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
            marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border-1)',
          }}>
            {METRICS.map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '2rem', color: m.color, lineHeight: 1 }}>
                  {m.val}<span style={{ fontSize: '1rem', opacity: 0.65 }}>{m.suf}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.15 }}
          style={{ position: 'relative', height: 560, zIndex: 1 }}
        >
          <GlobeHero />
        </motion.div>
      </section>

      {/* ── What we measure ─────────────────────────────── */}
      <section style={{ padding: '100px 64px', background: 'var(--bg-1)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <span className="badge badge-indigo" style={{ marginBottom: 16 }}>Evaluation Rubric</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: 16 }}>
              6 dimensions.{' '}
              <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Evidence-grounded.</span>
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Every score requires a direct transcript quote. No inflation. No guesswork. Just honest, structured analysis.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 800, margin: '0 auto' }}>
            {DIMENSIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card"
                style={{ padding: '20px 24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{d.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: d.color, fontWeight: 600 }}>
                    {d.pct}%
                  </span>
                </div>
                <div className="score-track">
                  <motion.div
                    className="score-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
                    style={{ background: `linear-gradient(90deg, ${d.color}88, ${d.color})` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section style={{ padding: '100px 64px', position: 'relative' }}>
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: 64 }}
          >
            <span className="badge badge-muted" style={{ marginBottom: 16 }}>Features</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}>
              Built for the messy
              <br />
              <span className="font-serif" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-2)' }}>
                reality of hiring.
              </span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card card-hover"
                style={{ padding: 28, cursor: 'default', background: `linear-gradient(145deg, ${f.gradient}, rgba(255,255,255,0.01))` }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${f.color}18`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: '0.855rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: '80px 64px', borderTop: '1px solid var(--border-1)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{
              padding: '60px 48px',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.04))',
              border: '1px solid var(--border-cyan)',
              borderRadius: 24,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <span className="badge badge-emerald" style={{ marginBottom: 20 }}>Ready to deploy</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: 16 }}>Start screening smarter.</h2>
              <p style={{ color: 'var(--text-2)', marginBottom: 32, lineHeight: 1.7 }}>
                Run your first AI interview in minutes. No setup required.
              </p>
              <button className="btn btn-primary btn-xl" onClick={() => navigate('/interview')} style={{ margin: '0 auto' }}>
                Launch Interview <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border-1)', padding: '40px 64px', background: 'var(--bg-1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: 'var(--bg-0)' }}>H</div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>HireIQ</span>
            <span className="badge badge-muted" style={{ fontSize: '0.6rem' }}>v2.0</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            Built for Cuemath · AI Tutor Screening Platform
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Docs'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.8rem', color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}