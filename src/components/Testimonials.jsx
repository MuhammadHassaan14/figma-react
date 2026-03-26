import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const allTestimonials = [
  {
    stars: 5,
    text: "This platform changed the way I stay in touch with my friends and family. The interface is smooth, and I love how easy it is to share my moments!",
    name: "Emily R",
    country: "USA",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    stars: 5,
    text: "Finally, a social network that understands what I need! The privacy features are a game-changer, and I feel safer sharing my life online",
    name: "Amit K",
    country: "India",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    stars: 5,
    text: "I joined just to explore, but now I can't imagine my day without it. The real-time chat and engaging communities make every interaction special!",
    name: "Sophie M",
    country: "UK",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    stars: 5,
    text: "Running my small business has never been easier! This platform helped me connect with customers, promote my products, and grow my brand",
    name: "Javier L",
    country: "Spain",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    stars: 5,
    text: "The perfect blend of fun and functionality! Whether I want to go live, discover trending content, or just catch up with friends, everything is right here!",
    name: "Lucas T",
    country: "Brazil",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    stars: 5,
    text: "I've tried many social platforms, but this one truly stands out! The experience feels personal, the connections feel real, and every feature just makes sense",
    name: "Nora S",
    country: "Canada",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    stars: 5,
    text: "This platform brings people closer in the best way possible! From reconnecting with old friends to making new ones, every moment feels meaningful.",
    name: "Priya D",
    country: "India",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
  {
    stars: 5,
    text: "A social network that actually listens to its users! The design is sleek, the features are powerful, and the experience is seamless.",
    name: "Marco V",
    country: "Italy",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    stars: 5,
    text: "I love how MyBindle keeps me connected without overwhelming me. The smart notifications are a lifesaver!",
    name: "Hana W",
    country: "Japan",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
]

export default function Testimonials() {
  const sectionRef = useRef()
  const [showAll, setShowAll] = useState(false)
  const [cols, setCols] = useState(() => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setCols(w < 600 ? 1 : w < 900 ? 2 : 3)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Show first 6 collapsed, all when expanded
  const visibleCount = showAll ? allTestimonials.length : 6
  const visible = allTestimonials.slice(0, visibleCount)

  // Last row of collapsed state is blurred
  const lastRowStart = visibleCount - cols

  useGSAP(() => {
    gsap.from(".testimonials-title", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".testimonials-title", start: "top 85%" },
    })

    gsap.from(".t-card", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".t-grid", start: "top 80%" },
    })
  }, { scope: sectionRef })

  const Stars = ({ count }) => (
    <div style={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={styles.star}>★</span>
      ))}
    </div>
  )

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section ref={sectionRef} style={styles.section}>
        <h2 className="testimonials-title" style={styles.title}>
          What Our Users Say
        </h2>

        {/* Grid wrapper with bottom fade when collapsed */}
        <div style={styles.gridWrapper}>
          <div
            className="t-grid"
            style={{
              ...styles.grid,
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}
          >
            {visible.map((t, i) => {
              const isBlurred = !showAll && i >= lastRowStart
              return (
                <div
                  key={i}
                  className="t-card"
                  style={{
                    ...styles.card,
                    filter: isBlurred ? "blur(3px)" : "none",
                    userSelect: isBlurred ? "none" : "auto",
                    pointerEvents: isBlurred ? "none" : "auto",
                    transition: "filter 0.3s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isBlurred) {
                      e.currentTarget.style.borderColor = "#e8432d"
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,67,45,0.15), 0 2px 8px rgba(232,67,45,0.08)"
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#efefef"
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)"
                  }}
                >
                  <Stars count={t.stars} />
                  <p style={styles.text}>{t.text}</p>
                  <div style={styles.author}>
                    <img src={t.avatar} alt={t.name} style={styles.avatar} />
                    <div>
                      <div style={styles.authorName}>{t.name}</div>
                      <div style={styles.authorCountry}>{t.country}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Gradient fade overlay when collapsed */}
          {!showAll && (
            <div style={styles.fadeOverlay} />
          )}
        </div>

        {/* See More / See Less button */}
        <div style={styles.btnWrap}>
          <button
            style={styles.seeMoreBtn}
            onClick={() => setShowAll(v => !v)}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#e8432d"
              e.currentTarget.style.color = "white"
              e.currentTarget.style.borderColor = "#e8432d"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "#e8432d"
              e.currentTarget.style.borderColor = "#e8432d"
            }}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      </section>
    </>
  )
}

const styles = {
  section: {
    background: "#F2F2F2",
    fontFamily: "'Nunito', sans-serif",
    padding: "80px 6vw",
    boxSizing: "border-box",
  },

  title: {
    fontSize: "clamp(26px, 3vw, 44px)",
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    margin: "0 0 48px",
    letterSpacing: "-0.5px",
  },

  gridWrapper: {
    position: "relative",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    padding: "24px 22px",
    border: "1.5px solid #efefef",
    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxSizing: "border-box",
  },

  stars: {
    display: "flex",
    gap: "2px",
  },

  star: {
    color: "#f5a623",
    fontSize: "18px",
    lineHeight: 1,
  },

  text: {
    fontSize: "clamp(12px, 0.95vw, 14px)",
    color: "#444",
    lineHeight: "1.7",
    margin: 0,
    fontWeight: "800",
    flex: 1,
  },

  author: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "4px",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },

  authorName: {
    fontSize: "13px",
    fontWeight: "900",
    color: "#111",
  },

  authorCountry: {
    fontSize: "11px",
    color: "#999",
    fontWeight: "800",
  },

  // Gradient fade at bottom of grid when collapsed
  fadeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "160px",
    background: "linear-gradient(to bottom, transparent, #F2F2F2)",
    pointerEvents: "none",
  },

  btnWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "28px",
  },

  seeMoreBtn: {
    padding: "12px 40px",
    border: "2px solid #e8432d",
    borderRadius: "8px",
    background: "transparent",
    color: "#e8432d",
    fontSize: "15px",
    fontWeight: "800",
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    transition: "background 0.25s, color 0.25s",
    letterSpacing: "0.2px",
  },
}