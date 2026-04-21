// // import { useState, useRef, useCallback } from 'react'

// // export function useSpeech() {
// //   const [isListening, setIsListening] = useState(false)
// //   const [transcript, setTranscript] = useState('')
// //   const [isSpeaking, setIsSpeaking] = useState(false)
// //   const recognitionRef = useRef<SpeechRecognition | null>(null)

// //   const startListening = useCallback(() => {
// //     const SpeechRecognition =
// //       window.SpeechRecognition || (window as any).webkitSpeechRecognition
// //     if (!SpeechRecognition) return

// //     const recognition = new SpeechRecognition()
// //     recognition.continuous = true
// //     recognition.interimResults = true
// //     recognition.lang = 'en-IN'

// //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// //       const last = event.results[event.results.length - 1]
// //       setTranscript(last[0].transcript)
// //     }
// //     recognition.onstart  = () => setIsListening(true)
// //     recognition.onend    = () => setIsListening(false)
// //     recognition.onerror  = () => setIsListening(false)

// //     recognitionRef.current = recognition
// //     recognition.start()
// //   }, [])

// //   const stopListening = useCallback((): string => {
// //     recognitionRef.current?.stop()
// //     setIsListening(false)
// //     const captured = transcript
// //     setTranscript('')
// //     return captured
// //   }, [transcript])

// //   const speak = useCallback((text: string): Promise<void> => {
// //     return new Promise((resolve) => {
// //       window.speechSynthesis.cancel()
// //       const utterance = new SpeechSynthesisUtterance(text)
// //       utterance.rate  = 0.95
// //       utterance.pitch = 1.05
// //       utterance.volume = 1
// //       const voices = window.speechSynthesis.getVoices()
// //       const preferred = voices.find(v =>
// //         v.name.includes('Google') || v.name.includes('Samantha') || v.lang === 'en-US'
// //       )
// //       if (preferred) utterance.voice = preferred
// //       utterance.onstart = () => setIsSpeaking(true)
// //       utterance.onend   = () => { setIsSpeaking(false); resolve() }
// //       window.speechSynthesis.speak(utterance)
// //     })
// //   }, [])

// //   const cancelSpeaking = useCallback(() => {
// //     window.speechSynthesis.cancel()
// //     setIsSpeaking(false)
// //   }, [])

// //   return {
// //     isListening, transcript, isSpeaking,
// //     startListening, stopListening, speak, cancelSpeaking,
// //   }
// // }



// import { useState, useRef, useCallback } from 'react'

// export function useSpeech() {
//   const [isListening, setIsListening] = useState(false)
//   const [transcript, setTranscript] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const recRef = useRef<SpeechRecognition | null>(null)

//   const startListening = useCallback(() => {
//     const SR = window.SpeechRecognition || (window as any).webkitSpeechRecognition
//     if (!SR) return
//     const rec = new SR()
//     rec.continuous = true; rec.interimResults = true; rec.lang = 'en-IN'
//     rec.onresult = (e: SpeechRecognitionEvent) => {
//       const last = e.results[e.results.length - 1]
//       setTranscript(last[0].transcript)
//     }
//     rec.onstart  = () => setIsListening(true)
//     rec.onend    = () => setIsListening(false)
//     rec.onerror  = () => setIsListening(false)
//     recRef.current = rec
//     rec.start()
//   }, [])

//   const stopListening = useCallback((): string => {
//     recRef.current?.stop()
//     setIsListening(false)
//     const t = transcript
//     setTranscript('')
//     return t
//   }, [transcript])

//   const speak = useCallback((text: string): Promise<void> => {
//     return new Promise(resolve => {
//       window.speechSynthesis.cancel()
//       const u = new SpeechSynthesisUtterance(text)
//       u.rate = 0.93; u.pitch = 1.05; u.volume = 1
//       const voices = window.speechSynthesis.getVoices()
//       const v = voices.find(v => v.name.includes('Google') || v.lang === 'en-US')
//       if (v) u.voice = v
//       u.onstart = () => setIsSpeaking(true)
//       u.onend   = () => { setIsSpeaking(false); resolve() }
//       window.speechSynthesis.speak(u)
//     })
//   }, [])

//   const cancelSpeaking = useCallback(() => {
//     window.speechSynthesis.cancel(); setIsSpeaking(false)
//   }, [])

//   return { isListening, transcript, isSpeaking, startListening, stopListening, speak, cancelSpeaking }
// }



import { useState, useRef, useCallback, useEffect } from 'react'

export function useSpeech() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript]   = useState('')
  const [isSpeaking, setIsSpeaking]   = useState(false)
  const recRef       = useRef<SpeechRecognition | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const cancelledRef = useRef(false)  // tracks intentional cancel

  // Always cancel speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return
    try {
      const rec = new SR()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = 'en-IN'
      rec.onresult = (e: SpeechRecognitionEvent) => {
        const last = e.results[e.results.length - 1]
        setTranscript(last[0].transcript)
      }
      rec.onstart = () => setIsListening(true)
      rec.onend   = () => setIsListening(false)
      rec.onerror = () => setIsListening(false)
      recRef.current = rec
      rec.start()
    } catch { /* browser may not support */ }
  }, [])

  const stopListening = useCallback((): string => {
    try { recRef.current?.stop() } catch {}
    recRef.current = null
    setIsListening(false)
    const captured = transcript
    setTranscript('')
    return captured
  }, [transcript])

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise(resolve => {
      // Cancel any running speech first
      cancelledRef.current = false
      window.speechSynthesis.cancel()

      // Small delay to let cancel take effect
      setTimeout(() => {
        if (cancelledRef.current) { resolve(); return }

        const u = new SpeechSynthesisUtterance(text)
        u.rate   = 0.93
        u.pitch  = 1.05
        u.volume = 1

        const voices = window.speechSynthesis.getVoices()
        const preferred = voices.find(v =>
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.lang === 'en-US'
        )
        if (preferred) u.voice = preferred

        u.onstart = () => {
          if (cancelledRef.current) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
            resolve()
            return
          }
          setIsSpeaking(true)
        }
        u.onend = () => {
          setIsSpeaking(false)
          utteranceRef.current = null
          resolve()
        }
        u.onerror = () => {
          setIsSpeaking(false)
          utteranceRef.current = null
          resolve()  // resolve even on error so awaits don't hang
        }

        utteranceRef.current = u
        if (!cancelledRef.current) {
          window.speechSynthesis.speak(u)
        } else {
          resolve()
        }
      }, 50)
    })
  }, [])

  const cancelSpeaking = useCallback(() => {
    cancelledRef.current = true
    try { window.speechSynthesis.cancel() } catch {}
    utteranceRef.current = null
    setIsSpeaking(false)
  }, [])

  return {
    isListening, transcript, isSpeaking,
    startListening, stopListening, speak, cancelSpeaking,
  }
}