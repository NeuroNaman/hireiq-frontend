// // // import { NavLink, useLocation } from 'react-router-dom'
// // // import { motion, AnimatePresence } from 'framer-motion'
// // // import {
// // //   LayoutDashboard, Mic, Users, FileText,
// // //   Zap, ChevronRight, Activity
// // // } from 'lucide-react'

// // // const NAV = [
// // //   { to: '/',           icon: LayoutDashboard, label: 'Home' },
// // //   { to: '/interview',  icon: Mic,             label: 'Interview' },
// // //   { to: '/recruiter',  icon: Users,           label: 'Candidates' },
// // // ]

// // // export default function Layout({ children }: { children: React.ReactNode }) {
// // //   const location = useLocation()

// // //   return (
// // //     <div style={{ display: 'flex', minHeight: '100vh' }}>
// // //       {/* Sidebar */}
// // //       <aside style={{
// // //         width: 72,
// // //         background: 'var(--obsidian-900)',
// // //         borderRight: '1px solid var(--border-subtle)',
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         padding: '24px 0',
// // //         position: 'fixed',
// // //         top: 0, left: 0, bottom: 0,
// // //         zIndex: 100,
// // //         gap: 8,
// // //       }}>
// // //         {/* Logo */}
// // //         <div style={{ marginBottom: 24 }}>
// // //           <div style={{
// // //             width: 40, height: 40,
// // //             background: 'linear-gradient(135deg, var(--cyan-400), #818cf8)',
// // //             borderRadius: 10,
// // //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //             fontSize: '1.1rem',
// // //             fontWeight: 800,
// // //             color: 'var(--obsidian-950)',
// // //             fontFamily: 'var(--font-display)',
// // //           }}>
// // //             H
// // //           </div>
// // //         </div>

// // //         {NAV.map(({ to, icon: Icon, label }) => {
// // //           const active = location.pathname === to ||
// // //             (to !== '/' && location.pathname.startsWith(to))
// // //           return (
// // //             <NavLink
// // //               key={to}
// // //               to={to}
// // //               title={label}
// // //               style={{
// // //                 width: 44, height: 44,
// // //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //                 borderRadius: 10,
// // //                 color: active ? 'var(--cyan-400)' : 'var(--text-secondary)',
// // //                 background: active ? 'var(--cyan-glow)' : 'transparent',
// // //                 border: active ? '1px solid var(--border-cyan)' : '1px solid transparent',
// // //                 transition: 'all 0.2s',
// // //                 position: 'relative',
// // //                 textDecoration: 'none',
// // //               }}
// // //             >
// // //               <Icon size={18} />
// // //               {active && (
// // //                 <motion.div
// // //                   layoutId="activeIndicator"
// // //                   style={{
// // //                     position: 'absolute',
// // //                     right: -1,
// // //                     width: 2,
// // //                     height: 24,
// // //                     background: 'var(--cyan-400)',
// // //                     borderRadius: '2px 0 0 2px',
// // //                   }}
// // //                 />
// // //               )}
// // //             </NavLink>
// // //           )
// // //         })}

// // //         {/* Bottom status */}
// // //         <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
// // //           <div style={{
// // //             width: 8, height: 8,
// // //             borderRadius: '50%',
// // //             background: 'var(--emerald-400)',
// // //             margin: '0 auto',
// // //             boxShadow: '0 0 8px var(--emerald-400)',
// // //             animation: 'pulse-ring 2s ease-out infinite',
// // //           }} />
// // //         </div>
// // //       </aside>

// // //       {/* Main content */}
// // //       <main style={{ flex: 1, marginLeft: 72, minHeight: '100vh', overflow: 'auto' }}>
// // //         <AnimatePresence mode="wait">
// // //           <motion.div
// // //             key={location.pathname}
// // //             initial={{ opacity: 0, y: 12 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             exit={{ opacity: 0, y: -8 }}
// // //             transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
// // //             style={{ minHeight: '100vh' }}
// // //           >
// // //             {children}
// // //           </motion.div>
// // //         </AnimatePresence>
// // //       </main>
// // //     </div>
// // //   )
// // // }


// // import { useLocation } from 'react-router-dom'
// // import { AnimatePresence, motion } from 'framer-motion'
// // import Sidebar from './Sidebar'

// // export default function Layout({ children }: { children: React.ReactNode }) {
// //   const location = useLocation()
// //   return (
// //     <div style={{ display: 'flex', minHeight: '100vh' }}>
// //       <Sidebar />
// //       <main className="page">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={location.pathname}
// //             initial={{ opacity: 0, y: 10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -6 }}
// //             transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
// //             style={{ minHeight: '100vh' }}
// //           >
// //             {children}
// //           </motion.div>
// //         </AnimatePresence>
// //       </main>
// //     </div>
// //   )
// // }



// import { useLocation } from 'react-router-dom'
// import { AnimatePresence, motion } from 'framer-motion'
// import Sidebar from './Sidebar'

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const location = useLocation()
//   return (
//     <>
//       {/* Sidebar is position:fixed — sits outside normal flow */}
//       <Sidebar />

//       {/* Main content pushed right by sidebar width */}
//       <main className="page">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={location.pathname}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
//             style={{ minHeight: '100vh' }}
//           >
//             {children}
//           </motion.div>
//         </AnimatePresence>
//       </main>
//     </>
//   )
// }




import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <>
      <Navbar />
      {/* Push content below fixed navbar (64px tall) */}
      <main style={{ paddingTop: 64, minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ minHeight: 'calc(100vh - 64px)' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  )
}