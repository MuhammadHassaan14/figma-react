import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import whitelogo from '../assets/whitelogo.png';
import Timeline11 from '../assets/Timeline11.jpg';
import Timeline2 from '../assets/Timeline2.jpg';

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [appleHovered, setAppleHovered] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    gsap.from(".footer-cta-text", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    })

    gsap.from(".footer-phone-back", {
      x: 60,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    })

    gsap.from(".footer-phone-front", {
      x: 80,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
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

      <footer ref={sectionRef} style={styles.footer}>

        {/* ── CTA BANNER ── */}
        <div style={{
          ...styles.ctaBanner,
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
          alignItems: isMobile ? "center" : "flex-end",
          padding: isMobile ? "48px 6vw 0" : "56px 6vw 0",
          overflow: "hidden",
        }}>

          {/* Left: text + store buttons */}
          <div className="footer-cta-text" style={{
            ...styles.ctaLeft,
            alignItems: isMobile ? "center" : "flex-start",
            paddingBottom: isMobile ? "24px" : "56px",
            maxWidth: isMobile ? "100%" : "480px",
          }}>
            <h2 style={styles.ctaHeading}>
              Join the Fun – Download<br />MyBindle Now!
            </h2>
            <p style={styles.ctaTagline}>
              Your Social Network, Your Way<br />
              Download MyBindle Now and Be a Part<br />
              of a Community That's Always Evolving!
            </p>

            {/* Store buttons */}
            <div style={{
              ...styles.storeButtons,
              justifyContent: isMobile ? "center" : "flex-start",
            }}>
              <button
                style={styles.storeBtn}
                onMouseEnter={e => {
                  setAppleHovered(true)
                  e.currentTarget.style.background = "#111"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.querySelectorAll("span.sub").forEach(el => el.style.color = "rgba(255,255,255,0.6)")
                  e.currentTarget.querySelectorAll("span.main").forEach(el => el.style.color = "white")
                }}
                onMouseLeave={e => {
                  setAppleHovered(false)
                  e.currentTarget.style.background = "white"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.querySelectorAll("span.sub").forEach(el => el.style.color = "#555")
                  e.currentTarget.querySelectorAll("span.main").forEach(el => el.style.color = "#111")
                }}
              >
                <span style={styles.storeBtnIcon}>
                  <img
                    src={appleHovered ? whitelogo : logo2}
                    alt="Apple"
                    style={{ width: "22px", height: "22px", objectFit: "contain", transition: "opacity 0.2s" }}
                  />
                </span>
                <div style={styles.storeBtnText}>
                  <span className="sub" style={styles.storeBtnSub}>DOWNLOAD ON THE</span>
                  <span className="main" style={styles.storeBtnMain}>App Store</span>
                </div>
              </button>

              <button
                style={styles.storeBtn}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#111"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.querySelectorAll("span.sub").forEach(el => el.style.color = "rgba(255,255,255,0.6)")
                  e.currentTarget.querySelectorAll("span.main").forEach(el => el.style.color = "white")
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "white"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.querySelectorAll("span.sub").forEach(el => el.style.color = "#555")
                  e.currentTarget.querySelectorAll("span.main").forEach(el => el.style.color = "#111")
                }}
              >
                <span style={styles.storeBtnIcon}>
                  <img src={logo} alt="Google Play" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
                </span>
                <div style={styles.storeBtnText}>
                  <span className="sub" style={styles.storeBtnSub}>GET IT ON</span>
                  <span className="main" style={styles.storeBtnMain}>Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop: two phones */}
          {!isMobile && (
            <div style={styles.phonesArea}>
              {/* Back phone */}
              <div className="footer-phone-back" style={styles.phoneBack}>
                <div style={styles.phoneFrame}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Timeline11} alt="App screen 1" style={styles.phoneImg} />
                  </div>
                </div>
                {sideButtons}
              </div>

              {/* Front phone */}
              <div className="footer-phone-front" style={styles.phoneFront}>
                <div style={styles.phoneFrame}>
                  <div style={styles.phoneScreen}>
                    <div style={styles.notch} />
                    <img src={Timeline2} alt="App screen 2" style={styles.phoneImg} />
                  </div>
                </div>
                {sideButtons}
              </div>
            </div>
          )}

          {/* Mobile: single centered phone WITH screenshot */}
          {isMobile && (
            <div style={styles.mobilePhoneWrap}>
              <div style={styles.phoneFrame}>
                <div style={styles.phoneScreen}>
                  <div style={styles.notch} />
                  <img src={Timeline2} alt="App screen" style={styles.phoneImg} />
                </div>
              </div>
              {sideButtons}
            </div>
          )}

        </div>

        {/* ── FOOTER BOTTOM ── */}
        <div style={styles.footerBottom}>
          <div style={{
            ...styles.footerInner,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "0",
            textAlign: isMobile ? "center" : "left",
          }}>

            {/* Brand */}
            <div style={{
              ...styles.brand,
              alignItems: isMobile ? "center" : "flex-start",
            }}>
              <div style={styles.logo}>
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <polygon points="14,2 26,10 14,18 2,10" fill="white" opacity="0.9"/>
                  <polygon points="14,10 26,18 14,26 2,18" fill="white" opacity="0.5"/>
                </svg>
                <span style={styles.logoText}>Mybindle</span>
              </div>
              <p style={styles.brandDesc}>
                Your Social Network, Your Way.<br />Connect, Share, and Grow Together.
              </p>
            </div>

            {/* Links */}
            <div style={{
              ...styles.linksRow,
              justifyContent: isMobile ? "center" : "flex-end",
              flexWrap: "wrap",
              gap: isMobile ? "32px" : "60px",
            }}>
              <div style={styles.linkCol}>
                <h4 style={styles.linkColTitle}>Company</h4>
                {["About Us", "Careers", "Press", "Blog"].map(l => (
                  <a key={l} href="#" style={styles.link}>{l}</a>
                ))}
              </div>

              <div style={styles.linkCol}>
                <h4 style={styles.linkColTitle}>Support</h4>
                {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map(l => (
                  <a key={l} href="#" style={styles.link}>{l}</a>
                ))}
              </div>

              <div style={styles.linkCol}>
                <h4 style={styles.linkColTitle}>Follow Us</h4>
                {["Instagram", "Twitter / X", "Facebook", "LinkedIn"].map(l => (
                  <a key={l} href="#" style={styles.link}>{l}</a>
                ))}
              </div>
            </div>

          </div>

          {/* Divider + copyright */}
          <div style={styles.divider} />
          <p style={styles.copyright}>
            © {new Date().getFullYear()} MyBindle. All rights reserved.
          </p>
        </div>

      </footer>
    </>
  )
}

const styles = {
  footer: {
    fontFamily: "'Nunito', sans-serif",
    background: "#111",
    margin: -8
  },

  // ── CTA BANNER ──
  ctaBanner: {
    background: "#e8432d",
    display: "flex",
    justifyContent: "space-between",
    boxSizing: "border-box",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    margin: "0px 24px 0",
  },

  ctaLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    zIndex: 1,
    flexShrink: 0,
  },

  ctaHeading: {
    fontSize: "clamp(24px, 3vw, 44px)",
    fontWeight: "800",
    color: "white",
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: "-0.5px",
    fontFamily: "'Nunito', sans-serif",
  },

  ctaTagline: {
    fontSize: "clamp(13px, 1vw, 15px)",
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.75",
    margin: 0,
    fontWeight: "600",
    fontFamily: "'Nunito', sans-serif",
  },

  storeButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "4px",
  },

  storeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "background 0.25s ease, transform 0.2s ease",
  },

  storeBtnIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  storeBtnText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1px",
  },

  storeBtnSub: {
    fontSize: "8px",
    fontWeight: "700",
    color: "#555",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    fontFamily: "'Nunito', sans-serif",
  },

  storeBtnMain: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#111",
    letterSpacing: "-0.3px",
    fontFamily: "'Nunito', sans-serif",
  },

  // Phones in banner
  phonesArea: {
    position: "relative",
    width: "500px",
    flexShrink: 0,
    alignSelf: "flex-end",
    height: "350px",
  },

  phoneBack: {
    position: "absolute",
    width: "170px",
    right: "70%",
    top: "35%",
    transform: "translateY(0)",
    zIndex: 1,
  },

  phoneFront: {
    position: "absolute",
    width: "195px",
    left: "38%",
    top: "5%",
    zIndex: 2,
  },

  mobilePhoneWrap: {
    position: "relative",
    width: "160px",
    flexShrink: 0,
    padding: "0.5px"
  },

  phoneFrame: {
    background: "linear-gradient(145deg, #2a2a2a, #111)",
    borderRadius: "38px",
    padding: "4px",
    boxShadow: `
      0 0 0 1px #555,
      0 20px 50px rgba(0,0,0,0.4),
      inset 0 1px 1px rgba(255,255,255,0.06)
    `,
  },

  phoneScreen: {
    background: "#f0f0f0",
    borderRadius: "30px",
    overflow: "hidden",
    position: "relative",
    aspectRatio: "9/19.5",
  },

  phoneImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "28px",
    position: "absolute",
    top: 0,
    left: 0,
  },

  notch: {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "4px",
    background: "#111",
    borderRadius: "14px",
    zIndex: 10,
  },

  sideBtn: {
    position: "absolute",
    width: "4px",
    background: "#333",
    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
  },

  // ── FOOTER BOTTOM ──
  footerBottom: {
    background: "#111",
    padding: "56px 6vw 32px",
    boxSizing: "border-box",
  },

  footerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "240px",
    padding: "40px"
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoText: {
    color: "white",
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "-0.3px",
    fontFamily: "'Nunito', sans-serif",
  },

  brandDesc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    lineHeight: "1.7",
    margin: 0,
    fontWeight: "500",
    fontFamily: "'Nunito', sans-serif",
  },

  linksRow: {
    display: "flex",
    alignItems: "flex-start",
  },

  linkCol: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  linkColTitle: {
    fontSize: "13px",
    fontWeight: "900",
    color: "white",
    margin: "0 0 4px",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    fontFamily: "'Nunito', sans-serif",
  },

  link: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
    fontFamily: "'Nunito', sans-serif",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    maxWidth: "1100px",
    margin: "40px auto 20px",
  },

  copyright: {
    textAlign: "center",
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
    fontWeight: "500",
    fontFamily: "'Nunito', sans-serif",
  },
}