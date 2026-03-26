import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import thankYouScreen from '../assets/thankYouScreen.jpg';
import paymentScreen from '../assets/paymentScreen.jpg';

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    gsap.from(".cta-text", {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })

    gsap.from(".cta-phone-back", {
      x: 60,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })

    gsap.from(".cta-phone-front", {
      x: 80,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    })
  }, { scope: sectionRef })

  const sideButtons = (
    <>
      <div style={{ ...styles.sideBtn, left: "-4px", top: "22%", height: "28px", borderRadius: "2px 0 0 2px" }} />
      <div style={{ ...styles.sideBtn, left: "-4px", top: "32%", height: "28px", borderRadius: "2px 0 0 2px" }} />
      <div style={{ ...styles.sideBtn, right: "-4px", top: "27%", height: "42px", borderRadius: "0 2px 2px 0" }} />
    </>
  )

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section ref={sectionRef} style={styles.section}>
        <div style={{
          ...styles.inner,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "16px" : "40px",
        }}>

          {/* LEFT: text + button */}
          <div className="cta-text" style={{
            ...styles.left,
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
            maxWidth: isMobile ? "100%" : "460px",
            paddingBottom: isMobile ? "20px" : "70px",
          }}>
            <h2 style={styles.heading}>
              Be the Reason<br />Someone Smiles Today!
            </h2>
            <p style={styles.tagline}>
              Your generosity can change lives every donation brings hope, support, and a brighter
              future. Give today and make a difference!
            </p>
            <button
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
              Donate Now
            </button>
          </div>

          {/* PHONES */}
          <div style={{
            ...styles.phonesArea,
            height: isMobile ? "240px" : "420px",
            flex: isMobile ? "unset" : 1,
            width: isMobile ? "100%" : "auto",
          }}>

            {/* Back phone */}
            <div className="cta-phone-back" style={{
              position: "absolute",
              width: isMobile ? "120px" : "200px",
              left: isMobile ? "5%" : "0%",
              top: isMobile ? "60%" : "60%",
              transform: isMobile ? "translateY(-16%)" : "translateY(-10%)",
              zIndex: 1,
            }}>
              <div style={styles.phoneFrame}>
                <div style={styles.phoneScreen}>
                  <div style={styles.notch} />
                  <img
                    src={paymentScreen}
                    alt="Payment screen"
                    style={{
                      width: "200%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "left center",
                      borderRadius: "28px"
                    }}
                  />
                </div>
              </div>
              {sideButtons}
            </div>

            {/* Front phone */}
            <div className="cta-phone-front" style={{
              position: "absolute",
              width: isMobile ? "145px" : "230px",
              left: isMobile ? "38%" : "36%",
              top: isMobile ? "10%" : "5%",
              transform: "translateY(0%)",
              zIndex: 10,
            }}>
              <div style={styles.phoneFrame}>
                <div style={styles.phoneScreen}>
                  <div style={styles.notch} />
                  <img
                    src={thankYouScreen}
                    alt="Thank you screen"
                    style={{
                      width: "200%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "right center",
                      borderRadius: "28px"
                    }}
                  />
                </div>
              </div>
              {sideButtons}
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
    padding: "70px 6vw 0",   // zero bottom padding so section ends flush
    boxSizing: "border-box",
    overflow: "hidden",       // clips phones below section bottom edge
    position: "relative",
  },

  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 1,
    flexShrink: 0,
  },

  heading: {
    fontSize: "clamp(28px, 3.5vw, 52px)",
    fontWeight: "800",
    color: "white",
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: "-0.5px",
  },

  tagline: {
    fontSize: "clamp(13px, 1vw, 15px)",
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.7",
    margin: 0,
    fontWeight: "800",
    maxWidth: "400px",
  },

  btn: {
    padding: "13px 32px",
    border: "2px solid white",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    fontSize: "15px",
    fontWeight: "800",
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    transition: "background 0.25s, color 0.25s",
    letterSpacing: "0.2px",
  },

  // Phones container — anchored to bottom of section
  // overflow:hidden on section does the clipping
  phonesArea: {
    position: "relative",
    alignSelf: "flex-end",   // stick to section bottom so bleed goes downward
  },

  phoneFrame: {
    background: "linear-gradient(145deg, #2a2a2a, #111)",
    borderRadius: "40px",
    padding: "5px",
    boxShadow: `
      0 0 0 1px #444,
      0 24px 60px rgba(0,0,0,0.45),
      0 8px 20px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.07)
    `,
  },

  phoneScreen: {
    background: "#f0f0f0",
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
    width: "58px",
    height: "6px",
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
}