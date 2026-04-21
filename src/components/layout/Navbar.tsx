// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Mic, Users, Home, ChevronDown, Zap, Menu, X } from 'lucide-react'

// const NAV_LINKS = [
//   { to: '/',          label: 'Home',       icon: Home },
//   { to: '/interview', label: 'Interview',  icon: Mic,   badge: 'Live' },
//   { to: '/recruiter', label: 'Candidates', icon: Users },
// ]

// export default function Navbar() {
//   const navigate  = useNavigate()
//   const location  = useLocation()
//   const [scrolled, setScrolled]   = useState(false)
//   const [mobileOpen, setMobile]   = useState(false)
//   const [hovered, setHovered]     = useState<string | null>(null)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 16)
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => { setMobile(false) }, [location.pathname])

//   return (
//     <>
//       <motion.header
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//         style={{
//           position: 'fixed',
//           top: 0, left: 0, right: 0,
//           zIndex: 500,
//           padding: '0 40px',
//           height: 64,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
//           background: scrolled
//             ? 'rgba(5,8,16,0.92)'
//             : 'rgba(5,8,16,0.6)',
//           borderBottom: scrolled
//             ? '1px solid rgba(34,211,238,0.12)'
//             : '1px solid rgba(255,255,255,0.05)',
//           backdropFilter: 'blur(24px)',
//           WebkitBackdropFilter: 'blur(24px)',
//           boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
//         }}
//       >
//         {/* ── Logo ─────────────────────────────────── */}
//         <div
//           onClick={() => navigate('/')}
//           style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
//         >
//           <div style={{
//             width: 34, height: 34,
//             background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
//             borderRadius: 9,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontWeight: 900, fontSize: '0.95rem', color: '#02030a',
//             boxShadow: '0 0 16px rgba(34,211,238,0.35)',
//             letterSpacing: '-0.03em',
//           }}>
//             H
//           </div>
//           <div>
//             <div style={{
//               fontWeight: 800, fontSize: '1rem',
//               letterSpacing: '-0.03em', lineHeight: 1,
//               background: 'linear-gradient(90deg, #f8faff, #a0b4d0)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}>
//               HireIQ
//             </div>
//             <div style={{
//               fontSize: '0.58rem', color: 'rgba(34,211,238,0.7)',
//               fontFamily: '"DM Mono", monospace',
//               letterSpacing: '0.08em', textTransform: 'uppercase',
//               marginTop: 1,
//             }}>
//               AI Screening
//             </div>
//           </div>
//         </div>

//         {/* ── Center nav links ─────────────────────── */}
//         <nav style={{
//           display: 'flex', alignItems: 'center', gap: 2,
//           position: 'absolute', left: '50%', transform: 'translateX(-50%)',
//         }}>
//           {/* Pill background track */}
//           <div style={{
//             display: 'flex', alignItems: 'center', gap: 2,
//             background: 'rgba(255,255,255,0.04)',
//             border: '1px solid rgba(255,255,255,0.08)',
//             borderRadius: 100,
//             padding: '4px 6px',
//           }}>
//             {NAV_LINKS.map(({ to, label, icon: Icon, badge }: any) => {
//               const active = location.pathname === to ||
//                 (to !== '/' && location.pathname.startsWith(to))
//               return (
//                 <div
//                   key={to}
//                   onClick={() => navigate(to)}
//                   onMouseEnter={() => setHovered(to)}
//                   onMouseLeave={() => setHovered(null)}
//                   style={{ position: 'relative', cursor: 'pointer' }}
//                 >
//                   {/* Active pill */}
//                   {active && (
//                     <motion.div
//                       layoutId="navPill"
//                       style={{
//                         position: 'absolute', inset: 0,
//                         background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(129,140,248,0.1))',
//                         border: '1px solid rgba(34,211,238,0.25)',
//                         borderRadius: 100,
//                       }}
//                       transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//                     />
//                   )}

//                   {/* Hover highlight */}
//                   {hovered === to && !active && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       style={{
//                         position: 'absolute', inset: 0,
//                         background: 'rgba(255,255,255,0.05)',
//                         borderRadius: 100,
//                       }}
//                     />
//                   )}

//                   <div style={{
//                     position: 'relative',
//                     display: 'flex', alignItems: 'center', gap: 6,
//                     padding: '7px 14px',
//                     borderRadius: 100,
//                     color: active ? '#22d3ee' : 'rgba(200,212,240,0.8)',
//                     fontSize: '0.85rem',
//                     fontWeight: active ? 600 : 500,
//                     transition: 'color 0.2s',
//                     userSelect: 'none',
//                   }}>
//                     <Icon size={14} />
//                     {label}
//                     {badge === 'Live' && (
//                       <span style={{
//                         width: 6, height: 6, borderRadius: '50%',
//                         background: '#34d399',
//                         boxShadow: '0 0 6px #34d399',
//                         animation: 'pulse-glow 2s infinite',
//                         display: 'inline-block',
//                       }} />
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </nav>

//         {/* ── Right side actions ───────────────────── */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
//           {/* Status indicator */}
//           <div style={{
//             display: 'flex', alignItems: 'center', gap: 7,
//             padding: '5px 12px',
//             background: 'rgba(52,211,153,0.07)',
//             border: '1px solid rgba(52,211,153,0.18)',
//             borderRadius: 100,
//             fontSize: '0.72rem',
//             fontFamily: '"DM Mono", monospace',
//             color: '#34d399',
//           }}>
//             <span style={{
//               width: 5, height: 5, borderRadius: '50%',
//               background: '#34d399',
//               boxShadow: '0 0 6px #34d399',
//               animation: 'pulse-glow 2s infinite',
//               display: 'inline-block',
//             }} />
//             AI Online
//           </div>

//           {/* CTA button */}
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => navigate('/interview')}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 7,
//               padding: '8px 18px',
//               background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
//               border: 'none',
//               borderRadius: 100,
//               color: '#02030a',
//               fontFamily: '"Syne", sans-serif',
//               fontWeight: 700,
//               fontSize: '0.82rem',
//               cursor: 'pointer',
//               boxShadow: '0 0 20px rgba(34,211,238,0.25)',
//               letterSpacing: '-0.01em',
//             }}
//           >
//             <Mic size={13} />
//             New Interview
//           </motion.button>

//           {/* Mobile menu toggle */}
//           <button
//             onClick={() => setMobile(o => !o)}
//             style={{
//               display: 'none', // hidden on desktop; shown via media query workaround below
//               width: 36, height: 36,
//               borderRadius: 9,
//               background: 'rgba(255,255,255,0.06)',
//               border: '1px solid rgba(255,255,255,0.1)',
//               color: 'rgba(200,212,240,0.8)',
//               alignItems: 'center', justifyContent: 'center',
//               cursor: 'pointer',
//             }}
//             className="mobile-menu-btn"
//           >
//             {mobileOpen ? <X size={16} /> : <Menu size={16} />}
//           </button>
//         </div>
//       </motion.header>

//       {/* ── Mobile dropdown ──────────────────────── */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             style={{
//               position: 'fixed', top: 64, left: 0, right: 0,
//               background: 'rgba(5,8,16,0.97)',
//               borderBottom: '1px solid rgba(34,211,238,0.12)',
//               backdropFilter: 'blur(24px)',
//               zIndex: 499,
//               padding: '16px 24px',
//               display: 'flex', flexDirection: 'column', gap: 4,
//             }}
//           >
//             {NAV_LINKS.map(({ to, label, icon: Icon }) => (
//               <div
//                 key={to}
//                 onClick={() => navigate(to)}
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 12,
//                   padding: '12px 16px', borderRadius: 10,
//                   color: location.pathname === to ? '#22d3ee' : 'rgba(200,212,240,0.8)',
//                   background: location.pathname === to ? 'rgba(34,211,238,0.08)' : 'transparent',
//                   cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
//                   transition: 'all 0.15s',
//                 }}
//               >
//                 <Icon size={16} />
//                 {label}
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }




import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Users, Home, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',          label: 'Home',      icon: Home  },
  { to: '/interview', label: 'Interview', icon: Mic,  badge: 'Live' },
  { to: '/recruiter', label: 'Candidates',icon: Users },
]

/* ── tiny keyframe injected once ── */
const STYLE = `
@keyframes pulseGlow {
  0%,100% { opacity:1; box-shadow:0 0 6px #38bdf8, 0 0 12px rgba(56,189,248,0.4); }
  50%      { opacity:0.6; box-shadow:0 0 3px #38bdf8; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes floatY {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-2px); }
}
.mobile-menu-btn { display:none!important; }
@media(max-width:768px){
  .desktop-nav   { display:none!important; }
  .desktop-right { display:none!important; }
  .mobile-menu-btn { display:flex!important; }
}
`

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [scrolled,    setScrolled]  = useState(false)
  const [mobileOpen,  setMobile]    = useState(false)
  const [hovered,     setHovered]   = useState<string | null>(null)
  const [logoHover,   setLogoHover] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobile(false) }, [location.pathname])

  return (
    <>
      <style>{STYLE}</style>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 500,
          padding: '0 40px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          /* 3-layer background: deep navy base + subtle noise grain + edge vignette */
          background: scrolled
            ? 'rgba(4, 9, 20, 0.96)'
            : 'rgba(4, 9, 20, 0.70)',
          /* Bottom border with inner-glow feel */
          borderBottom: scrolled
            ? '1px solid rgba(56,189,248,0.14)'
            : '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          /* Layered box shadow for 3-D depth illusion */
          boxShadow: scrolled
            ? '0 1px 0 rgba(56,189,248,0.08), 0 4px 24px rgba(0,0,0,0.55), 0 0 80px rgba(56,189,248,0.04) inset'
            : 'none',
          transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
        }}
      >

        {/* ── Logo ──────────────────────────────────── */}
        <motion.div
          onHoverStart={() => setLogoHover(true)}
          onHoverEnd={()   => setLogoHover(false)}
          onClick={() => navigate('/')}
          animate={{ y: logoHover ? -1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
        >
          {/* Icon cube — 3-D layered shadows */}
          <div style={{
            position: 'relative',
            width: 36, height: 36,
          }}>
            {/* Shadow layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              filter: 'blur(8px)',
              opacity: logoHover ? 0.7 : 0.45,
              transform: 'translateY(3px) scale(0.9)',
              transition: 'opacity 0.3s',
            }} />
            {/* Face */}
            <div style={{
              position: 'relative',
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(145deg, #38bdf8 0%, #6366f1 60%, #818cf8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '1rem', color: '#020818',
              letterSpacing: '-0.04em',
              /* Top-left highlight for 3-D bevel */
              boxShadow: '0 1px 0 rgba(255,255,255,0.22) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
            }}>
              H
            </div>
          </div>

          <div>
            <div style={{
              fontWeight: 800, fontSize: '1.02rem',
              letterSpacing: '-0.04em', lineHeight: 1,
              background: 'linear-gradient(90deg, #e0f2fe 0%, #93c5fd 50%, #c7d2fe 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: logoHover ? 'shimmer 1.4s linear infinite' : 'none',
            }}>
              HireIQ
            </div>
            <div style={{
              fontSize: '0.58rem',
              color: 'rgba(56,189,248,0.65)',
              fontFamily: '"DM Mono", monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}>
              AI Screening
            </div>
          </div>
        </motion.div>

        {/* ── Center nav ────────────────────────────── */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          }}
        >
          {/* Pill track */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2,
            /* Frosted glass track with 3-D inner shadow */
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 100,
            padding: '4px 6px',
            boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {NAV_LINKS.map(({ to, label, icon: Icon, badge }: any) => {
              const active = location.pathname === to ||
                (to !== '/' && location.pathname.startsWith(to))
              const isHovered = hovered === to

              return (
                <div
                  key={to}
                  onClick={() => navigate(to)}
                  onMouseEnter={() => setHovered(to)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  {/* Active indicator — sliding pill */}
                  {active && (
                    <motion.div
                      layoutId="navPill"
                      style={{
                        position: 'absolute', inset: 0,
                        /* 3-D active pill: gradient face + glow shadow */
                        background: 'linear-gradient(145deg, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.12) 100%)',
                        border: '1px solid rgba(56,189,248,0.28)',
                        borderRadius: 100,
                        boxShadow: '0 0 16px rgba(56,189,248,0.12), 0 1px 0 rgba(255,255,255,0.08) inset',
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Hover shimmer */}
                  <AnimatePresence>
                    {isHovered && !active && (
                      <motion.div
                        key="hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(255,255,255,0.045)',
                          borderRadius: 100,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{ y: isHovered ? -1 : 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                    style={{
                      position: 'relative',
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 15px',
                      borderRadius: 100,
                      color: active
                        ? '#38bdf8'
                        : isHovered
                          ? 'rgba(224,242,254,0.95)'
                          : 'rgba(186,209,240,0.72)',
                      fontSize: '0.84rem',
                      fontWeight: active ? 600 : 500,
                      letterSpacing: '-0.01em',
                      transition: 'color 0.2s',
                      userSelect: 'none',
                    }}
                  >
                    <Icon size={13} strokeWidth={active ? 2.2 : 1.8} />
                    {label}
                    {badge === 'Live' && (
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#34d399',
                        display: 'inline-block',
                        animation: 'pulseGlow 2s infinite',
                      }} />
                    )}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </nav>

        {/* ── Right actions ─────────────────────────── */}
        <div
          className="desktop-right"
          style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
        >
          {/* AI status chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 13px',
            background: 'rgba(52,211,153,0.06)',
            border: '1px solid rgba(52,211,153,0.16)',
            borderRadius: 100,
            fontSize: '0.7rem',
            fontFamily: '"DM Mono", monospace',
            color: '#34d399',
            letterSpacing: '0.05em',
            /* subtle inner top-light for 3-D chip feel */
            boxShadow: '0 1px 0 rgba(52,211,153,0.12) inset',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#34d399',
              display: 'inline-block',
              animation: 'pulseGlow 2s infinite',
            }} />
            AI Online
          </div>

          {/* CTA button — 3-D raised look */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 0 }}
            onClick={() => navigate('/interview')}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 20px',
              border: 'none',
              borderRadius: 100,
              color: '#020818',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              /* 3-D layered background */
              background: 'linear-gradient(145deg, #38bdf8 0%, #6366f1 55%, #818cf8 100%)',
              /* Bottom shadow = "base" of the 3-D button */
              boxShadow: '0 0 24px rgba(56,189,248,0.28), 0 4px 12px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.25) inset',
            }}
          >
            {/* Top highlight shine */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 100%)',
              borderRadius: '100px 100px 0 0',
              pointerEvents: 'none',
            }} />
            <Mic size={13} />
            New Interview
          </motion.button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobile(o => !o)}
            className="mobile-menu-btn"
            style={{
              width: 36, height: 36,
              borderRadius: 9,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(186,209,240,0.8)',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
            }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile dropdown ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0,
              background: 'rgba(4,9,20,0.97)',
              borderBottom: '1px solid rgba(56,189,248,0.12)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              zIndex: 499,
              padding: '12px 20px 20px',
              display: 'flex', flexDirection: 'column', gap: 4,
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            }}
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to ||
                (to !== '/' && location.pathname.startsWith(to))
              return (
                <motion.div
                  key={to}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(to)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 16px', borderRadius: 12,
                    color: active ? '#38bdf8' : 'rgba(186,209,240,0.8)',
                    background: active
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(99,102,241,0.07))'
                      : 'transparent',
                    border: active
                      ? '1px solid rgba(56,189,248,0.18)'
                      : '1px solid transparent',
                    cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                    transition: 'all 0.15s',
                    boxShadow: active ? '0 1px 0 rgba(255,255,255,0.05) inset' : 'none',
                  }}
                >
                  <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                  {label}
                </motion.div>
              )
            })}

            {/* Mobile CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/interview')}
              style={{
                marginTop: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 20px',
                background: 'linear-gradient(145deg, #38bdf8, #6366f1)',
                border: 'none', borderRadius: 12,
                color: '#020818', fontWeight: 700, fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(56,189,248,0.22), 0 1px 0 rgba(255,255,255,0.2) inset',
              }}
            >
              <Mic size={14} />
              New Interview
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}