import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Download",
    desc: "Open Play Store or App Store",
  },
  {
    number: "02",
    title: "Install App",
    desc: "The app will install automatically.",
  },
  {
    number: "03",
    title: "Ready to Use",
    desc: "Sign up or log in to start exploring!",
  },
]

export default function HowItWorks() {
  const sectionRef = useRef()
  const line1Ref = useRef()
  const line2Ref = useRef()

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  const [hoveredStep, setHoveredStep] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    // Title
    gsap.from(".hiw-title", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".hiw-title", start: "top 85%" },
    })

    gsap.from(".hiw-subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".hiw-subtitle", start: "top 85%" },
    })

    // Connector lines draw in
    gsap.from(line1Ref.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: ".hiw-steps", start: "top 80%" },
    })

    gsap.from(line2Ref.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ".hiw-steps", start: "top 80%" },
    })

    // Step numbers pop in
    gsap.from(".hiw-number", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".hiw-steps", start: "top 80%" },
    })

    // Cards slide up
    gsap.from(".hiw-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".hiw-steps", start: "top 75%" },
    })
  }, { scope: sectionRef })

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section ref={sectionRef} style={styles.section}>
        <div style={styles.inner}>

          {/* Header */}
          <div style={styles.header}>
            <h2 className="hiw-title" style={styles.title}>
              How to Install Our App
            </h2>
            <p className="hiw-subtitle" style={styles.subtitle}>
              Getting started is quick and easy! Follow these simple steps to install and start using MyBindle today.
            </p>
          </div>

          {/* Steps */}
          <div className="hiw-steps" style={styles.stepsWrapper}>

            {/* ── DESKTOP: horizontal number row + cards grid ── */}
            {!isMobile && (
              <>
                <div style={styles.numberRow}>
                  <div style={styles.numberWrap}>
                    <span className="hiw-number" style={{ ...styles.number, color: hoveredStep === 0 ? "#e8432d" : "#222", transition: "color 0.2s" }}>01</span>
                  </div>
                  <div style={styles.lineTrack}>
                    <div ref={line1Ref} style={{ ...styles.line, background: "#ccc" }} />
                  </div>
                  <div style={styles.numberWrap}>
                    <span className="hiw-number" style={{ ...styles.number, color: hoveredStep === 1 ? "#e8432d" : "#222", transition: "color 0.2s" }}>02</span>
                  </div>
                  <div style={styles.lineTrack}>
                    <div ref={line2Ref} style={{ ...styles.line, background: "#ccc" }} />
                  </div>
                  <div style={styles.numberWrap}>
                    <span className="hiw-number" style={{ ...styles.number, color: hoveredStep === 2 ? "#e8432d" : "#222", transition: "color 0.2s" }}>03</span>
                  </div>
                </div>

                <div style={styles.cardsRow}>
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className="hiw-card"
                      style={styles.card}
                      onMouseEnter={e => {
                        setHoveredStep(i)
                        e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,67,45,0.15), 0 2px 8px rgba(232,67,45,0.08)"
                        e.currentTarget.style.borderColor = "#e8432d"
                      }}
                      onMouseLeave={e => {
                        setHoveredStep(null)
                        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"
                        e.currentTarget.style.borderColor = "#efefef"
                      }}
                    >
                      <h3 style={styles.cardTitle}>{step.title}</h3>
                      <p style={styles.cardDesc}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── MOBILE: vertical steps ── */}
            {isMobile && (
              <div style={styles.mobileSteps}>
                {steps.map((step, i) => (
                  <div key={i} className="hiw-card" style={styles.mobileStep}>
                    <div style={styles.mobileStepLeft}>
                      <span
                        className="hiw-number"
                        style={{
                          ...styles.mobileNumber,
                          color: hoveredStep === i ? "#e8432d" : "#222",
                          borderColor: hoveredStep === i ? "#e8432d" : "#ccc",
                          transition: "color 0.2s, border-color 0.2s",
                        }}
                      >
                        {step.number}
                      </span>
                      {i < steps.length - 1 && (
                        <div style={{ ...styles.verticalLine, background: "#ccc" }} />
                      )}
                    </div>
                    <div
                      style={styles.mobileCard}
                      onMouseEnter={e => {
                        setHoveredStep(i)
                        e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,67,45,0.15), 0 2px 8px rgba(232,67,45,0.08)"
                        e.currentTarget.style.borderColor = "#e8432d"
                      }}
                      onMouseLeave={e => {
                        setHoveredStep(null)
                        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"
                        e.currentTarget.style.borderColor = "#efefef"
                      }}
                    >
                      <h3 style={styles.cardTitle}>{step.title}</h3>
                      <p style={styles.cardDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  section: {
    background: "#ffffff",
    fontFamily: "'Nunito', sans-serif",
    padding: "90px 6vw",
    boxSizing: "border-box",
  },

  inner: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },

  header: {
    textAlign: "center",
  },

  title: {
    fontSize: "clamp(26px, 3.5vw, 48px)",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 14px",
    letterSpacing: "-0.5px",
    lineHeight: 1.15,
  },

  subtitle: {
    fontSize: "clamp(13px, 1.1vw, 16px)",
    color: "#888",
    fontWeight: "700",
    margin: 0,
    lineHeight: "1.6",
    maxWidth: "560px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  stepsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },

  // Number row: number — line — number — line — number
  numberRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0px",
  },

  numberWrap: {
    flexShrink: 0,
  },

  number: {
    fontSize: "clamp(22px, 2.5vw, 32px)",
    fontWeight: "800",
    letterSpacing: "-1px",
    lineHeight: 1,
  },

  lineTrack: {
    flex: 1,
    height: "2px",
    margin: "0 8px",
    overflow: "hidden",
  },

  line: {
    width: "100%",
    height: "2px",
  },

  // Cards row: equal width cards
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "16px",
  },

  // ── MOBILE ──
  mobileSteps: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },

  mobileStep: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },

  mobileStepLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    paddingTop: "4px",
  },

  mobileNumber: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    flexShrink: 0,
  },

  verticalLine: {
    width: "2px",
    flex: 1,
    minHeight: "24px",
    margin: "6px 0",
  },

  mobileCard: {
    background: "white",
    borderRadius: "14px",
    padding: "20px 18px",
    border: "1.5px solid #efefef",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
    boxSizing: "border-box",
    flex: 1,
    marginBottom: "16px",
  },

  card: {
    background: "white",
    borderRadius: "14px",
    padding: "28px 24px",
    border: "1.5px solid #efefef",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
    boxSizing: "border-box",
  },

  cardTitle: {
    fontSize: "clamp(15px, 1.2vw, 19px)",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 10px",
    letterSpacing: "-0.3px",
  },

  cardDesc: {
    fontSize: "clamp(12px, 0.95vw, 14.5px)",
    color: "#888",
    margin: 0,
    lineHeight: "1.65",
    fontWeight: "700",
  },
}