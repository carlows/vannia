import { useRef, useState } from 'react'
import './App.css'

const HEARTS = ['💖', '💕', '💗', '💘', '💝', '😘', '💋']

function FloatingHearts() {
  // Generate hearts once so they don't reshuffle on re-render
  const hearts = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      emoji: HEARTS[i % HEARTS.length],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 8,
      size: 1 + Math.random() * 1.8,
    }))
  ).current

  return (
    <div className="hearts-bg" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

function RunawayButton() {
  const btnRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const runAway = () => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const margin = 20

    // Pick a random spot far enough from the current position
    let x, y, tries = 0
    do {
      x = margin + Math.random() * (window.innerWidth - rect.width - margin * 2)
      y = margin + Math.random() * (window.innerHeight - rect.height - margin * 2)
      tries++
    } while (tries < 10 && Math.hypot(x - rect.left, y - rect.top) < 200)

    setOffset((prev) => ({
      x: prev.x + (x - rect.left),
      y: prev.y + (y - rect.top),
    }))
  }

  return (
    <button
      ref={btnRef}
      className="btn btn-no"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseEnter={runAway}
      onTouchStart={(e) => {
        e.preventDefault()
        runAway()
      }}
      onClick={runAway}
    >
      No 🙈
    </button>
  )
}

function EmojiBurst() {
  const BURST = ['💋', '💖', '😍', '💘', '✨', '💕', '😘']
  const pieces = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      emoji: BURST[i % BURST.length],
      dx: (Math.random() - 0.5) * 2 * (window.innerWidth * 0.45),
      dy: (Math.random() - 0.5) * 2 * (window.innerHeight * 0.45),
      rot: (Math.random() - 0.5) * 540,
      size: 1.4 + Math.random() * 1.6,
      delay: Math.random() * 0.15,
    }))
  ).current

  return (
    <div className="burst" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="burst-emoji"
          style={{
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function CuteCat() {
  return <img className="cat" src="/gatito.jpg" alt="Gatito cuqui" />
}

function App() {
  const [saidYes, setSaidYes] = useState(false)

  return (
    <div className="app">
      <FloatingHearts />

      {saidYes ? (
        <main className="content pop-in">
          <EmojiBurst />
          <div className="polaroid">
            <CuteCat />
          </div>
          <h1 className="title">Más te vale, bonita 😏</h1>
        </main>
      ) : (
        <main className="content">
          <p className="eyebrow">hola guapa</p>
          <h1 className="title">
            Nos damos
            <br />
            unos <em>besotes</em>?
          </h1>
          <div className="buttons">
            <button className="btn btn-yes" onClick={() => setSaidYes(true)}>
              Sí 😍
            </button>
            <RunawayButton />
          </div>
        </main>
      )}
    </div>
  )
}

export default App
