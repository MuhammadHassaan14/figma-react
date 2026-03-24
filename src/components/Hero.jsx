import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import appScreenshot from '../assets/appScreenshot.jpg';

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef()
  const headingRef = useRef()
  const subTextRef = useRef()
  const btnRef = useRef()
  const imageSlotRef = useRef()
  const badge1Ref = useRef()
  const badge2Ref = useRef()
  const navRef = useRef()

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [isSmall, setIsSmall] = useState(() => window.innerWidth < 480)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmall(window.innerWidth < 480)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Nav
    tl.from(navRef.current, { y: -40, opacity: 0, duration: 0.6 })

    // Heading lines stagger
    tl.from(".hero-line", {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
    }, "-=0.3")

    // Subtext
    tl.from(subTextRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")

    // Button
    tl.from(btnRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")

    // Phone image slot
    tl.from(imageSlotRef.current, {
      x: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6")

    // Badges float in
    tl.from(badge1Ref.current, {
      x: -30,
      opacity: 0,
      duration: 0.5,
    }, "-=0.4")

    tl.from(badge2Ref.current, {
      x: 30,
      opacity: 0,
      duration: 0.5,
    }, "-=0.3")

    // Floating animation on badges (looping)
    gsap.to(badge1Ref.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(badge2Ref.current, {
      y: 8,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, { scope: containerRef })

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section ref={containerRef} style={styles.section}>
        {/* NAV */}
        <nav ref={navRef} style={styles.nav}>
          <div style={styles.logo}>
            {/* Simple stacked-diamond icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,10 14,18 2,10" fill="white" opacity="0.9"/>
              <polygon points="14,10 26,18 14,26 2,18" fill="white" opacity="0.5"/>
            </svg>
            <span style={styles.logoText}>Mybindle</span>
          </div>
        </nav>

        {/* CONTENT GRID */}
        <div style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          alignItems: isMobile ? "center" : "center",
          paddingBottom: isMobile ? "20px" : "0",
        }}>
          {/* LEFT */}
          <div style={{
            ...styles.left,
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}>
            <h1 style={styles.heading}>
              <span className="hero-line" style={styles.headingLine}>Stay Connected</span>
              <span className="hero-line" style={styles.headingLine}>Stay Social</span>
              <span className="hero-line" style={styles.headingLine}>Stay You!</span>
            </h1>

            <p ref={subTextRef} style={{
              ...styles.sub,
              maxWidth: isMobile ? "100%" : "420px",
              fontSize: isMobile ? "14px" : "clamp(13px, 1.2vw, 15px)",
            }}>
              A place where friendships grow, communities thrive, and moments turn
              into unforgettable experiences. Whether you're looking to reconnect with
              old friends, build new relationships, or share what matters most to you —
              MyBindle is your home on the internet.
            </p>

            <button
              ref={btnRef}
              style={{
                ...styles.btn,
                alignSelf: isMobile ? "center" : "flex-start",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "white"
                e.currentTarget.style.color = "#e8432d"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "white"
              }}
            >
              Get Started
            </button>
          </div>

          {/* RIGHT — Phone */}
          <div style={{
            ...styles.right,
            minHeight: isSmall ? "280px" : isMobile ? "360px" : "500px",
            marginTop: isMobile ? "16px" : "0",
            display: isSmall ? "flex" : "flex",
          }}>
            {/* Badge 1 */}
            <div ref={badge1Ref} style={{
              ...styles.badge,
              top: isMobile ? "2%" : "8%",
              left: isMobile ? "2%" : "-5%",
              padding: isMobile ? "6px 12px" : "10px 18px",
              display: isSmall ? "none" : "flex",
            }}>
              <span style={styles.badgeIcon}>🔥</span>
              <span style={{ ...styles.badgeText, fontSize: isMobile ? "11px" : "13px" }}>
                Seamless Connections
              </span>
            </div>

            {/* Phone Device Frame */}
            <div ref={imageSlotRef} style={{
              ...styles.phoneDevice,
              width: isSmall
                ? "clamp(120px, 55vw, 170px)"
                : isMobile
                  ? "clamp(160px, 42vw, 200px)"
                  : "clamp(220px, 26vw, 290px)",
              marginBottom: isSmall ? "-60px" : isMobile ? "-80px" : "-120px",
            }}>
              <div style={styles.volUp} />
              <div style={styles.volDown} />
              <div style={styles.powerBtn} />
              <div style={styles.phoneFrame}>
                <div style={styles.phoneScreen}>
                  <div style={styles.notch} />
                    <img
                      src={appScreenshot}
                      alt="App preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px" }}
                    />
                  <div style={styles.screenContent}>
                    <span style={styles.placeholderText}>Insert App Screenshot Here</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div ref={badge2Ref} style={{
              ...styles.badge,
              bottom: isMobile ? "2%" : "10%",
              right: isMobile ? "2%" : "-5%",
              padding: isMobile ? "6px 12px" : "10px 18px",
              display: isSmall ? "none" : "flex",
            }}>
              <span style={styles.badgeIcon}>🌐</span>
              <span style={{ ...styles.badgeText, fontSize: isMobile ? "11px" : "13px" }}>
                Discover &amp; Explore
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  section: {
    background: "#e8432d",
    fontFamily: "'Nunito', sans-serif",
    display: "flex",
    flexDirection: "column",
    margin: -8,
    padding: "0 5vw",
    boxSizing: "border-box",
    overflow: "visible",   // CRITICAL — allows phone to bleed below
    position: "relative",
    zIndex: 1,
  },

  // NAV
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 0 8px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoText: {
    color: "white",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "-0.3px",
  },

  // GRID
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "40px",
    paddingBottom: "0",
  },

  // LEFT
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 1,
    paddingBottom: "80px",
    paddingTop: "40px",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    gap: "2px",
  },
  headingLine: {
    display: "block",
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: "900",
    color: "white",
    lineHeight: 1.1,
    letterSpacing: "-1px",
  },
  sub: {
    color: "rgba(255,255,255,0.88)",
    fontSize: "clamp(13px, 1.2vw, 15px)",
    lineHeight: "1.7",
    maxWidth: "420px",
    margin: 0,
    fontWeight: "500",
  },
  btn: {
    alignSelf: "flex-start",
    padding: "12px 28px",
    border: "2px solid white",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    transition: "background 0.25s, color 0.25s",
    letterSpacing: "0.2px",
  },

  // RIGHT
  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: "40px",
  },
  // PHONE DEVICE FRAME
  phoneDevice: {
    position: "relative",
    width: "clamp(220px, 26vw, 290px)",
    zIndex: 10,
    marginBottom: "-120px",  // bleeds 120px below the red section
  },
  phoneFrame: {
    background: "linear-gradient(145deg, #2a2a2a, #111)",
    borderRadius: "44px",
    padding: "10px",
    boxShadow: `
      0 0 0 1px #444,
      0 30px 80px rgba(0,0,0,0.5),
      0 10px 30px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.08)
    `,
  },
  phoneScreen: {
    background: "#f5f5f5",
    borderRadius: "36px",
    overflow: "hidden",
    position: "relative",
    aspectRatio: "9/19.5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notch: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "22px",
    background: "#111",
    borderRadius: "20px",
    zIndex: 10,
  },
  screenContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(160deg, #e0e0e0, #f8f8f8)",
  },
  placeholderText: {
    color: "#999",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    padding: "16px",
  },
  // Side buttons
  volUp: {
    position: "absolute",
    left: "-4px",
    top: "22%",
    width: "4px",
    height: "36px",
    background: "#333",
    borderRadius: "2px 0 0 2px",
    boxShadow: "-1px 0 2px rgba(0,0,0,0.4)",
  },
  volDown: {
    position: "absolute",
    left: "-4px",
    top: "34%",
    width: "4px",
    height: "36px",
    background: "#333",
    borderRadius: "2px 0 0 2px",
    boxShadow: "-1px 0 2px rgba(0,0,0,0.4)",
  },
  powerBtn: {
    position: "absolute",
    right: "-4px",
    top: "28%",
    width: "4px",
    height: "52px",
    background: "#333",
    borderRadius: "0 2px 2px 0",
    boxShadow: "1px 0 2px rgba(0,0,0,0.4)",
  },

  // BADGES
  badge: {
    position: "absolute",
    background: "white",
    borderRadius: "50px",
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: 2,
    whiteSpace: "nowrap",
  },
  badgeIcon: {
    fontSize: "16px",
  },
  badgeText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
}