// import { Routes, Route } from 'react-router-dom'
// import Layout from '@/components/layout/Layout'
// import HomePage from '@/pages/HomePage'
// import InterviewPage from '@/pages/InterviewPage'
// import EvaluationPage from '@/pages/EvaluationPage'
// import RecruiterPage from '@/pages/RecruiterPage'

// export default function App() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/"                     element={<HomePage />} />
//         <Route path="/interview"            element={<InterviewPage />} />
//         <Route path="/evaluation/:sessionId" element={<EvaluationPage />} />
//         <Route path="/recruiter"            element={<RecruiterPage />} />
//       </Routes>
//     </Layout>
//   )
// }


import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import InterviewPage from '@/pages/InterviewPage'
import EvaluationPage from '@/pages/EvaluationPage'
import RecruiterPage from '@/pages/RecruiterPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                      element={<HomePage />} />
        <Route path="/interview"             element={<InterviewPage />} />
        <Route path="/evaluation/:sessionId" element={<EvaluationPage />} />
        <Route path="/recruiter"             element={<RecruiterPage />} />
      </Routes>
    </Layout>
  )
}