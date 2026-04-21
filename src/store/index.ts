// import { create } from 'zustand'

// interface InterviewStore {
//   sessionId: string | null
//   candidateName: string | null
//   isInterviewComplete: boolean
//   turnNumber: number
//   questionProgress: string
//   transcript: Array<{ role: 'interviewer' | 'candidate'; text: string; timestamp: Date }>
//   adaptiveSignal: string | null
  
//   setSession: (id: string, name: string) => void
//   addTurn: (role: 'interviewer' | 'candidate', text: string) => void
//   setSignal: (signal: string) => void
//   setProgress: (progress: string, turn: number) => void
//   completeInterview: () => void
//   reset: () => void
// }

// export const useInterviewStore = create<InterviewStore>((set) => ({
//   sessionId: null,
//   candidateName: null,
//   isInterviewComplete: false,
//   turnNumber: 0,
//   questionProgress: '',
//   transcript: [],
//   adaptiveSignal: null,

//   setSession: (id, name) => set({ sessionId: id, candidateName: name }),
//   addTurn: (role, text) =>
//     set((s) => ({ transcript: [...s.transcript, { role, text, timestamp: new Date() }] })),
//   setSignal: (signal) => set({ adaptiveSignal: signal }),
//   setProgress: (progress, turn) => set({ questionProgress: progress, turnNumber: turn }),
//   completeInterview: () => set({ isInterviewComplete: true }),
//   reset: () =>
//     set({
//       sessionId: null, candidateName: null,
//       isInterviewComplete: false, turnNumber: 0,
//       questionProgress: '', transcript: [], adaptiveSignal: null,
//     }),
// }))

// interface UIStore {
//   sidebarOpen: boolean
//   toggleSidebar: () => void
// }

// export const useUIStore = create<UIStore>((set) => ({
//   sidebarOpen: false,
//   toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
// }))




import { create } from 'zustand'

interface Turn { role: 'interviewer' | 'candidate'; text: string; timestamp: Date }

interface InterviewStore {
  sessionId: string | null
  candidateName: string | null
  isComplete: boolean
  turnNumber: number
  questionProgress: string
  questionsAsked: number
  transcript: Turn[]
  signal: string | null
  setSession: (id: string, name: string) => void
  addTurn: (role: Turn['role'], text: string) => void
  setSignal: (s: string) => void
  setProgress: (p: string, t: number, q: number) => void
  complete: () => void
  reset: () => void
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  sessionId: null, candidateName: null, isComplete: false,
  turnNumber: 0, questionProgress: '', questionsAsked: 0,
  transcript: [], signal: null,
  setSession: (id, name) => set({ sessionId: id, candidateName: name }),
  addTurn: (role, text) =>
    set(s => ({ transcript: [...s.transcript, { role, text, timestamp: new Date() }] })),
  setSignal: (signal) => set({ signal }),
  setProgress: (p, t, q) => set({ questionProgress: p, turnNumber: t, questionsAsked: q }),
  complete: () => set({ isComplete: true }),
  reset: () => set({
    sessionId: null, candidateName: null, isComplete: false,
    turnNumber: 0, questionProgress: '', questionsAsked: 0,
    transcript: [], signal: null,
  }),
}))