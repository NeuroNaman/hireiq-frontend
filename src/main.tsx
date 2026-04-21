// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: 'var(--obsidian-700)',
//             color: 'var(--text-primary)',
//             border: '1px solid var(--border-default)',
//             fontFamily: 'var(--font-display)',
//             fontSize: '0.875rem',
//           },
//         }}
//       />
//     </BrowserRouter>
//   </React.StrictMode>
// )



import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-4)',
            color: 'var(--text-0)',
            border: '1px solid var(--border-2)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)