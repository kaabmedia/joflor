"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Botanische decoratie: de SVG wordt inline geladen en path-voor-path
 * "getekend", gesorteerd van onder (wortels) naar boven. Respecteert
 * reduced-motion. Verwacht het bestand in /public/roots-1.svg.
 */
export function RootsGrow({
  className = "",
  style,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    fetch("/roots-1.svg")
      .then((r) => r.text())
      .then((markup) => {
        if (cancelled || !el) return;
        el.innerHTML = markup;

        const svg = el.querySelector("svg");
        if (svg) {
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          svg.style.width = "100%";
          svg.style.height = "auto";
          svg.style.display = "block";
        }

        const paths = Array.from(el.querySelectorAll<SVGPathElement>("path"));
        if (!paths.length) return;

        const col = color || "#1C3326";

        if (reduce) {
          // geen animatie: gewoon gevuld tonen
          paths.forEach((p) => (p.style.fill = col));
          return;
        }

        // Elke path klaarzetten als "nog niet getekend": lijn die zich uittekent
        // (stroke-dashoffset) en een vulling die daarna invloeit.
        paths.forEach((p) => {
          let len = 0;
          try {
            len = p.getTotalLength();
          } catch {}
          p.style.fill = col;
          p.style.fillOpacity = "0";
          p.style.stroke = col;
          p.style.strokeWidth = "0.7";
          (p.style as any).vectorEffect = "non-scaling-stroke";
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
        });

        // Sorteer van onder (wortels, grootste y) naar boven (kruin).
        const ordered = paths
          .map((p) => {
            let y = 0;
            try {
              const b = p.getBBox();
              y = b.y + b.height;
            } catch {}
            return { p, y };
          })
          .sort((a, b) => b.y - a.y)
          .map((o) => o.p);

        const draw = () => {
          // 1) de lijn tekent zich uit, path voor path
          gsap.to(ordered, {
            strokeDashoffset: 0,
            duration: 0.55,
            ease: "power1.inOut",
            stagger: { each: 0.018 },
          });
          // 2) de vulling vloeit er net achteraan in
          gsap.to(ordered, {
            fillOpacity: 1,
            duration: 0.5,
            ease: "power1.out",
            delay: 0.35,
            stagger: { each: 0.018 },
          });
        };

        const inView = () => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.9 && r.bottom > 0;
        };

        if (inView()) {
          draw();
        } else {
          const io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                draw();
                io.disconnect();
              }
            },
            { threshold: 0, rootMargin: "0px 0px -10% 0px" }
          );
          io.observe(el);
        }
      })
      .catch(() => {
        if (el) el.style.display = "none";
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <div className={`roots ${className}`.trim()} aria-hidden="true" style={style} ref={ref} />;
}
