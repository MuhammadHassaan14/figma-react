import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    emoji: "🔥",
    title: "Seamless Connections",
    desc: "Stay in touch with friends, family, and like-minded people with just a tap.",
  },
  {
    emoji: "📸",
    title: "Share Your Story",
    desc: "Upload photos, videos, and updates to let the world know what's happening in your life.",
  },
  {
    emoji: "💬",
    title: "Real-Time Chat",
    desc: "Whether it's a DM or a group conversation, connect instantly with smooth, lightning-fast messaging.",
  },
  {
    emoji: "🔒",
    title: "Privacy First",
    desc: "Your data, your control. We prioritize your privacy with world-class security.",
  },
  {
    emoji: "🌐",
    title: "Discover & Explore",
    desc: "Find trending content, join communities, and follow pages that match your interests.",
  },
  {
    emoji: "📈",
    title: "Grow Your Business",
    desc: "Use our platform to market your brand, connect with customers, and build meaningful relationships.",
  },
]

export default function Features() {
  const sectionRef = useRef()

  const [cols, setCols] = useState(() => {
    const w = window.innerWidth
    if (w < 600) return 1
    if (w < 900) return 2
    return 3
  })

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 600) setCols(1)
      else if (w < 900) setCols(2)
      else setCols(3)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    gsap.from(".features-title", {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".features-title", start: "top 85%" },
    })
    gsap.from(".features-subtitle", {
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1,
      scrollTrigger: { trigger: ".features-subtitle", start: "top 85%" },
    })
    gsap.from(".feature-card", {
      y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
    })
  }, { scope: sectionRef })

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <section ref={sectionRef} style={styles.section}>
        <div style={styles.header}>
          <h2 className="features-title" style={styles.title}>
            Features That Keep You Hooked!
          </h2>
          <p className="features-subtitle" style={styles.subtitle}>
            Meet, Chat, Share – Anytime, Anywhere!
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div
            className="features-grid"
            style={{
              ...styles.grid,
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{ ...styles.card }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(232,67,45,0.18)"
                  e.currentTarget.style.borderColor = "#e8432d"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)"
                  e.currentTarget.style.borderColor = "#efefef"
                }}
              >
                <div style={styles.iconWrap}>
                  <span style={styles.emoji}>{f.emoji}</span>
                </div>
                <h3 style={styles.cardTitle}>{f.title}</h3>
                <p style={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  section: {
    background: "#F2F2F2",
    fontFamily: "'Nunito', sans-serif",
    padding: "160px 6vw 80px",  // 160px top = space for phone bleed
    boxSizing: "border-box",
    position: "relative",
    zIndex: 0,
  },
  header: {
    padding: "25px",
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontSize: "clamp(24px, 3.5vw, 48px)",
    fontWeight: "900",
    color: "#111",
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
    lineHeight: 1.15,
  },
  subtitle: {
    fontSize: "clamp(13px, 1.3vw, 17px)",
    color: "#777",
    fontWeight: "600",
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto",
    alignItems: "stretch",   // all cards in a row stretch to same height
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "28px 24px",
    border: "1.5px solid #efefef",
    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
    cursor: "default",
    boxSizing: "border-box",
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  iconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#fff5f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  emoji: {
    fontSize: "22px",
    lineHeight: 1,
  },
  cardTitle: {
    fontSize: "clamp(14px, 1.1vw, 18px)",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 10px",
    letterSpacing: "-0.2px",
  },
  cardDesc: {
    fontSize: "clamp(12px, 0.9vw, 14.5px)",
    color: "#777",
    lineHeight: "1.65",
    margin: 0,
    fontWeight: "500",
  },
}