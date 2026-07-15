"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    if (threeLoaded && vantaLoaded && !vantaEffect && vantaRef.current) {
      if ((window as any).VANTA && (window as any).VANTA.CLOUDS) {
        setVantaEffect(
          (window as any).VANTA.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            backgroundColor: 0xffffff,
            skyColor: 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: 0x183550,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            speed: 2,
          })
        );
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, threeLoaded, vantaLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="lazyOnload"
        onLoad={() => setThreeLoaded(true)}
      />
      {threeLoaded && (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js"
          strategy="lazyOnload"
          onLoad={() => setVantaLoaded(true)}
        />
      )}
      <div
        ref={vantaRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      {/* Semi-transparent dark overlay to make white text readable against bright clouds */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: "rgba(3, 3, 8, 0.7)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
