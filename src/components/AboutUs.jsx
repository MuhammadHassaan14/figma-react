import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Timeline from '../assets/Timeline.jpg';
import Scrolling from '../assets/Scrolling.jpg';

gsap.registerPlugin(ScrollTrigger)

const featureList = [
  {
    emoji: "🎬",
    title: "Short Videos & Reels",
    desc: "Share engaging, bite-sized content that keeps everyone entertained.",
  },
  {
    emoji: "🔔",
    title: "Smart Notifications",
    desc: "Stay updated on what matters without the noise.",
  },
  {
    emoji: "👥",
    title: "Interest-Based Communities",
    desc: "Join groups and discussions that match your passion.",
  },
]

export default function AboutUs() {
  const sectionRef = useRef()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    gsap.from(".about-blob", {
      scale: 0.7,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })

    gsap.from(".about-phone-back", {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })

    gsap.from(".about-phone-front", {
      x: 60,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })

    gsap.from(".about-heading", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
    })

    gsap.from(".about-tagline", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".about-tagline", start: "top 85%" },
    })

    gsap.from(".about-feature-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".about-features-list", start: "top 80%" },
    })

    gsap.to(".about-phone-front", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(".about-phone-back", {
      y: -8,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.8,
    })
  }, { scope: sectionRef })

  const imgStyleBack = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "right center",
    borderRadius: "28px",
    position: "absolute",
    top: 0,
    left: 67,
    transform: "translateX(-50%)"
  }

  const imgStyleFront = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "left center",
    borderRadius: "28px",
    position: "absolute",
    top: 0,
    left: 0
  }

  const sideButtons = (
    <>
      <div style={{ ...styles.sideBtn, left: "-4px", top: "22%", height: "32px", borderRadius: "2px 0 0 2px" }} />
      <div style={{ ...styles.sideBtn, left: "-4px", top: "33%", height: "32px", borderRadius: "2px 0 0 2px" }} />
      <div style={{ ...styles.sideBtn, right: "-4px", top: "28%", height: "46px", borderRadius: "0 2px 2px 0" }} />
    </>
  )

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section ref={sectionRef} style={styles.section}>

        {/* ── DESKTOP LAYOUT ── */}
        {!isMobile && (
          <div style={styles.inner}>
            {/* Left: phones */}
            <div style={styles.left}>
              <div className="about-blob" style={styles.blob} />

              <div className="about-phone-back" style={styles.phoneBack}>
                <div style={styles.phoneFrame}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Timeline} style={imgStyleBack} />
                  </div>
                </div>
                {sideButtons}
              </div>

              <div className="about-phone-front" style={styles.phoneFront}>
                <div style={{ ...styles.phoneFrame, borderColor: "#3b82f6", borderWidth: "3px", borderStyle: "solid" }}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Scrolling} style={imgStyleFront} />
                  </div>
                </div>
                {sideButtons}
              </div>
            </div>

            {/* Right: text + cards */}
            <div style={styles.right}>
              <h2 className="about-heading" style={styles.heading}>
                Where Every Click<br />Sparks a Connection!
              </h2>
              <p className="about-tagline" style={styles.tagline}>
                A small act of kindness today can create a lifetime of impact for someone in
                need. Give from the heart and change a life!
              </p>
              <div className="about-features-list" style={styles.featuresList}>
                {featureList.map((item, i) => (
                  <div
                    key={i}
                    className="about-feature-item"
                    style={{ ...styles.featureItem, transition: "box-shadow 0.25s ease, border-color 0.25s ease" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,67,45,0.18), 0 2px 8px rgba(232,67,45,0.10)"
                      e.currentTarget.style.borderColor = "#e8432d"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)"
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"
                    }}
                  >
                    <div style={styles.featureIcon}>
                      <span style={{ fontSize: "18px" }}>{item.emoji}</span>
                    </div>
                    <div>
                      <h4 style={styles.featureTitle}>{item.title}</h4>
                      <p style={styles.featureDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT ── */}
        {isMobile && (
          <div style={styles.mobileWrapper}>

            {/* 1. Heading + tagline */}
            <div style={styles.mobileHeader}>
              <h2 className="about-heading" style={{ ...styles.heading, textAlign: "center" }}>
                Where Every Click<br />Sparks a Connection!
              </h2>
              <p className="about-tagline" style={{ ...styles.tagline, textAlign: "center", maxWidth: "100%", marginTop: "10px" }}>
                A small act of kindness today can create a lifetime of impact for someone in
                need. Give from the heart and change a life!
              </p>
            </div>

            {/* 2. Phones — fixed height container, phones sized relative to it */}
            <div style={styles.mobilePhoneContainer}>
              <div className="about-blob" style={styles.mobilBlob} />

              <div className="about-phone-back" style={styles.mobilePhoneBack}>
                <div style={styles.phoneFrame}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Timeline} style={imgStyleBack} />
                  </div>
                </div>
                {sideButtons}
              </div>

              <div className="about-phone-front" style={styles.mobilePhoneFront}>
                <div style={{ ...styles.phoneFrame, borderColor: "#3b82f6", borderWidth: "3px", borderStyle: "solid" }}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Scrolling} style={imgStyleFront} />
                  </div>
                </div>
                {sideButtons}
              </div>
            </div>

            {/* 3. Feature cards */}
            <div className="about-features-list" style={styles.featuresList}>
              {featureList.map((item, i) => (
                <div
                  key={i}
                  className="about-feature-item"
                  style={{ ...styles.featureItem, transition: "box-shadow 0.25s ease, border-color 0.25s ease" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,67,45,0.18), 0 2px 8px rgba(232,67,45,0.10)"
                    e.currentTarget.style.borderColor = "#e8432d"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)"
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"
                  }}
                >
                  <div style={styles.featureIcon}>
                    <span style={{ fontSize: "18px" }}>{item.emoji}</span>
                  </div>
                  <div>
                    <h4 style={styles.featureTitle}>{item.title}</h4>
                    <p style={styles.featureDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </section>
    </>
  )
}

const styles = {
  section: {
    background: "#F2F2F2",
    fontFamily: "'Nunito', sans-serif",
    padding: "60px 6vw",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  // ── DESKTOP ──
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "60px",
  },

  left: {
    position: "relative",
    height: "520px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  blob: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "#e8432d",
    opacity: 0.92,
    top: "50%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  },

  phoneBack: {
    position: "absolute",
    width: "155px",
    left: "0%",
    top: "30%",
    transform: "translateY(-16%) rotate(-12deg)",
    zIndex: 1,
  },

  phoneFront: {
    position: "absolute",
    width: "210px",
    left: "38%",
    top: "50%",
    transform: "translateY(-50%) rotate(5deg)",
    zIndex: 2,
  },

  // ── MOBILE ──
  mobileWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    maxWidth: "480px",
    margin: "0 auto",
  },

  mobileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // Fixed-height box — phones are absolutely positioned inside it
  mobilePhoneContainer: {
    position: "relative",
    height: "280px",        // tight fixed height — phones are clipped here
    overflow: "visible",    // phones can slightly overflow for depth feel
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mobilBlob: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "#e8432d",
    opacity: 0.92,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  },

  mobilePhoneBack: {
    position: "absolute",
    width: "115px",
    left: "5%",
    top: "20%",
    transform: "translateY(-16%) rotate(-12deg)",
    zIndex: 1,
  },

  mobilePhoneFront: {
    position: "absolute",
    width: "150px",           // larger front phone
    left: "36%",
    top: "50%",
    transform: "translateY(-50%) rotate(5deg)",
    zIndex: 2,
  },

  // ── SHARED ──
  phoneFrame: {
    background: "linear-gradient(145deg, #2a2a2a, #111)",
    borderRadius: "40px",
    padding: "9px",
    boxShadow: `
      0 0 0 1px #444,
      0 24px 60px rgba(0,0,0,0.5),
      0 8px 20px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.07)
    `,
  },

  phoneScreen: {
    background: "#e8e8e8",
    borderRadius: "32px",
    overflow: "hidden",
    position: "relative",
    aspectRatio: "9/19.5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  notch: {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "10px",
    height: "10px",
    background: "#111",
    borderRadius: "16px",
    zIndex: 10,
  },

  sideBtn: {
    position: "absolute",
    width: "4px",
    background: "#333",
    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  heading: {
    fontSize: "clamp(28px, 3vw, 46px)",
    fontWeight: "800",
    color: "#111",
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: "-0.5px",
  },

  tagline: {
    fontSize: "clamp(13px, 1vw, 15px)",
    color: "#888",
    lineHeight: "1.7",
    margin: 0,
    fontWeight: "700",
    maxWidth: "460px",
  },

  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    background: "white",
    borderRadius: "14px",
    padding: "16px 20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.06)",
  },

  featureIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "10px",
    background: "#fff5f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: "clamp(13px, 1vw, 15px)",
    fontWeight: "850",
    color: "#111",
    margin: "0 0 4px",
  },

  featureDesc: {
    fontSize: "clamp(11px, 0.85vw, 13px)",
    color: "#888",
    margin: 0,
    lineHeight: "1.6",
    fontWeight: "700",
  },
}