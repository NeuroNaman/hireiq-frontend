// import { NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import {
//   Home, Mic, Users, BarChart3, Settings,
//   Zap, Shield, Activity, ChevronRight,
// } from 'lucide-react'

// const NAV_SECTIONS = [
//   {
//     label: 'Platform',
//     items: [
//       { to: '/',          icon: Home,      label: 'Overview', badge: null },
//       { to: '/interview', icon: Mic,       label: 'Interview', badge: 'Live' },
//       { to: '/recruiter', icon: Users,     label: 'Candidates', badge: null },
//     ]
//   },
//   {
//     label: 'Analytics',
//     items: [
//       { to: '/insights',  icon: BarChart3, label: 'Insights', badge: 'Soon' },
//       { to: '/settings',  icon: Settings,  label: 'Settings',  badge: null },
//     ]
//   }
// ]

// const STATS = [
//   { label: 'Active Today', value: '3', icon: Activity, color: 'var(--emerald)' },
//   { label: 'Accuracy',     value: '94%', icon: Shield,  color: 'var(--cyan)' },
// ]

// export default function Sidebar() {
//   const location = useLocation()
//   const navigate = useNavigate()

//   return (
//     <aside className="sidebar">
//       {/* Logo */}
//       <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border-1)' }}>
//         <div
//           onClick={() => navigate('/')}
//           style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
//         >
//           <div style={{
//             width: 36, height: 36,
//             background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
//             borderRadius: 10,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontWeight: 800, fontSize: '1rem', color: 'var(--bg-0)',
//             boxShadow: '0 0 20px rgba(34,211,238,0.3)',
//             flexShrink: 0,
//           }}>H</div>
//           <div>
//             <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>HireIQ</div>
//             <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>
//               AI Screening v2.0
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Nav sections */}
//       <nav style={{ flex: 1, padding: '16px 12px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
//         {NAV_SECTIONS.map(section => (
//           <div key={section.label}>
//             <div style={{
//               fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
//               color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em',
//               padding: '0 6px', marginBottom: 6,
//             }}>
//               {section.label}
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {section.items.map(({ to, icon: Icon, label, badge }) => {
//                 const active = location.pathname === to ||
//                   (to !== '/' && location.pathname.startsWith(to))
//                 const isDisabled = badge === 'Soon'
//                 return (
//                   <NavLink
//                     key={to}
//                     to={isDisabled ? '#' : to}
//                     className={`nav-item ${active ? 'active' : ''}`}
//                     onClick={e => isDisabled && e.preventDefault()}
//                     style={{ opacity: isDisabled ? 0.45 : 1 }}
//                   >
//                     <Icon size={16} style={{ flexShrink: 0 }} />
//                     <span style={{ flex: 1 }}>{label}</span>
//                     {badge === 'Live' && (
//                       <span style={{
//                         width: 7, height: 7, borderRadius: '50%',
//                         background: 'var(--emerald)',
//                         boxShadow: '0 0 6px var(--emerald)',
//                         animation: 'pulse-glow 2s infinite',
//                       }} />
//                     )}
//                     {badge === 'Soon' && (
//                       <span className="badge badge-muted" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
//                         Soon
//                       </span>
//                     )}
//                     {active && !badge && (
//                       <motion.div
//                         layoutId="activeBar"
//                         style={{
//                           width: 3, height: 18, background: 'var(--cyan)',
//                           borderRadius: '2px 0 0 2px',
//                           position: 'absolute', right: -12,
//                         }}
//                       />
//                     )}
//                   </NavLink>
//                 )
//               })}
//             </div>
//           </div>
//         ))}
//       </nav>

//       {/* Quick stats panel */}
//       <div style={{
//         margin: '0 12px 12px',
//         padding: '14px',
//         background: 'rgba(34,211,238,0.04)',
//         border: '1px solid var(--border-cyan)',
//         borderRadius: 12,
//       }}>
//         <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
//           Platform
//         </div>
//         {STATS.map(s => (
//           <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-2)' }}>
//               <s.icon size={13} color={s.color} />
//               {s.label}
//             </div>
//             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: s.color }}>
//               {s.value}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div style={{
//         padding: '14px 20px',
//         borderTop: '1px solid var(--border-1)',
//         display: 'flex', alignItems: 'center', gap: 10,
//       }}>
//         <div style={{
//           width: 32, height: 32, borderRadius: 8,
//           background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontSize: '0.75rem', fontWeight: 700, color: 'var(--bg-0)', flexShrink: 0,
//         }}>
//           R
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div style={{ fontSize: '0.82rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             Recruiter
//           </div>
//           <div style={{ fontSize: '0.7rem', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: 4 }}>
//             <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />
//             Online
//           </div>
//         </div>
//         <Zap size={14} color="var(--text-3)" />
//       </div>
//     </aside>
//   )
// }