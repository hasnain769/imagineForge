"use client"

import { useEffect, useRef, useState } from "react"

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    // Load scripts dynamically
    const loadScripts = async () => {
      // First, load p5.js
      const p5Script = document.createElement("script")
      p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
      p5Script.async = true
      document.body.appendChild(p5Script)

      // Wait for p5.js to load before loading Vanta
      p5Script.onload = () => {
        const vantaScript = document.createElement("script")
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
        vantaScript.async = true
        document.body.appendChild(vantaScript)

        // Initialize Vanta after the script loads
        vantaScript.onload = () => {
          // Make sure VANTA exists and is properly initialized
          if (
            typeof window !== "undefined" &&
            window.VANTA &&
            window.VANTA.TOPOLOGY &&
            vantaRef.current &&
            !vantaEffect
          ) {
            const effect = window.VANTA.TOPOLOGY({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              color: 0x3f5926,
              backgroundColor: 0x11e0b
            })

            setVantaEffect(effect)
          }
        }
      }
    }

    loadScripts()

    // Cleanup function
    return () => {
      if (vantaEffect) vantaEffect.destroy()

      // Remove scripts when component unmounts
      const scripts = document.querySelectorAll("script")
      scripts.forEach((script) => {
        if (script.src.includes("p5.min.js") || script.src.includes("vanta.topology.min.js")) {
          document.body.removeChild(script)
        }
      })
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="fixed inset-0 -z-10 pointer-events-none " aria-hidden="true" />
}
