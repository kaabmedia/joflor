"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LangSwitch } from "./LangSwitch";
import { ArrowR } from "./render";
import { SUB_NAV, MOBILE_NAV, UI, tNav } from "@/lib/nav";
import type { Lang } from "@/lib/locale";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SUBSET = new Set(["/floraxchange", "/showroom", "/verzorging"]);

export function Chrome({
  lang,
  settings,
  children,
}: {
  lang: Lang;
  settings: Record<string, any> | null | undefined;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLElement>(null);
  const mobRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  const menuOpen = useRef(false);
  const reduced = useRef(false);
  const covering = useRef(false);
  const transitioning = useRef(false);
  const coverDone = useRef(false);
  const navArrived = useRef(false);

  /* ---------- doek-helpers ---------- */
  function veilParts() {
    const v = veilRef.current;
    return {
      v,
      v1: v?.querySelector(".v1") ?? null,
      v2: v?.querySelector(".v2") ?? null,
      vw: v?.querySelector(".veil-word") ?? null,
    };
  }
  // Doek dichttrekken; navigatie loopt parallel (zie startTransition).
  function cover() {
    const { v, v1, v2, vw } = veilParts();
    if (!v) {
      coverDone.current = true;
      maybeReveal();
      return;
    }
    covering.current = true;
    coverDone.current = false;
    gsap.set(v, { visibility: "visible" });
    gsap.set([v1, v2], { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(vw, { opacity: 0, y: 12 });
    gsap
      .timeline({
        onComplete: () => {
          coverDone.current = true;
          maybeReveal();
        },
      })
      .to(v1, { scaleY: 1, duration: 0.32, ease: "power3.in" })
      .to(v2, { scaleY: 1, duration: 0.32, ease: "power3.in" }, "-=0.24")
      .to(vw, { opacity: 1, y: 0, duration: 0.22 }, "-=0.12");
  }
  // Pas onthullen als het doek dicht is én de nieuwe pagina geladen is.
  function maybeReveal() {
    if (coverDone.current && navArrived.current) reveal();
  }
  function reveal() {
    const { v, v1, v2, vw } = veilParts();
    if (!v) return;
    gsap.set([v1, v2], { transformOrigin: "50% 0%" });
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(v, { visibility: "hidden" });
          covering.current = false;
          coverDone.current = false;
          navArrived.current = false;
          transitioning.current = false;
        },
      })
      .to(vw, { opacity: 0, duration: 0.18 })
      .to(v2, { scaleY: 0, duration: 0.45, ease: "power3.out" }, "-=0.04")
      .to(v1, { scaleY: 0, duration: 0.45, ease: "power3.out" }, "-=0.34");
  }
  function startTransition(href: string) {
    if (transitioning.current) return;
    transitioning.current = true;
    coverDone.current = false;
    navArrived.current = false;
    cover();
    router.push(href); // parallel met de dichttrek-animatie
  }

  /* ---------- mobiel menu ---------- */
  function openMenu() {
    const mob = mobRef.current;
    if (!mob || menuOpen.current) return;
    menuOpen.current = true;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
    burgerRef.current?.setAttribute("aria-expanded", "true");
    if (!reduced.current) {
      gsap.killTweensOf(mob);
      gsap.set(mob, { visibility: "visible" });
      gsap.to(mob, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power4.out" });
      gsap.fromTo(
        mob.querySelectorAll("ul a"),
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.05, delay: 0.12, clearProps: "all" }
      );
    } else {
      mob.style.visibility = "visible";
      mob.style.clipPath = "inset(0% 0% 0% 0%)";
    }
  }
  function closeMenu() {
    const mob = mobRef.current;
    if (!mob || !menuOpen.current) return;
    menuOpen.current = false;
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    burgerRef.current?.setAttribute("aria-expanded", "false");
    if (!reduced.current) {
      gsap.killTweensOf(mob);
      gsap.to(mob, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          // alleen verbergen als het menu intussen niet weer geopend is
          if (!menuOpen.current) gsap.set(mob, { visibility: "hidden" });
        },
      });
    } else {
      mob.style.clipPath = "inset(0 0 100% 0)";
      mob.style.visibility = "hidden";
    }
  }

  /* ---------- listeners: scroll, beeld-terugval, link-onderschepping ---------- */
  useEffect(() => {
    reduced.current = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    const nav = navRef.current;
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onErr = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t && t.tagName === "IMG" && t.closest(".ph")) {
        (t as HTMLElement).style.display = "none";
        t.closest(".ph")?.classList.add("ph-fb");
      }
    };
    document.addEventListener("error", onErr, true);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || a.target === "_blank") return;
      if (!href.startsWith("/") || href.startsWith("/studio") || href.startsWith("/api")) return;

      const path = href.split("#")[0].split("?")[0];
      if (path === pathname) {
        e.preventDefault();
        closeMenu();
        return;
      }
      e.preventDefault();
      closeMenu();
      if (reduced.current) {
        router.push(href);
        return;
      }
      startTransition(href);
    };
    document.addEventListener("click", onClick);

    // Prefetch interne links bij hover/focus, zodat de volgende pagina al
    // klaarstaat op het moment dat erop geklikt wordt.
    const prefetched = new Set<string>();
    const onPrefetch = (e: Event) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("/studio") || href.startsWith("/api")) return;
      const path = href.split("#")[0].split("?")[0];
      if (path === pathname || prefetched.has(path)) return;
      prefetched.add(path);
      try {
        router.prefetch(path);
      } catch {}
    };
    document.addEventListener("pointerover", onPrefetch, { passive: true });
    document.addEventListener("focusin", onPrefetch);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("error", onErr, true);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onPrefetch);
      document.removeEventListener("focusin", onPrefetch);
    };
  }, [pathname, router]);

  /* ---------- animaties per pagina (en bij taalwissel) ---------- */
  useEffect(() => {
    // Nieuwe pagina geladen: doek onthullen zodra de dichttrek-animatie klaar is.
    if (transitioning.current) {
      navArrived.current = true;
      maybeReveal();
    }
    window.scrollTo(0, 0);
    if (reduced.current) return;

    const root = document.getElementById("inhoud") || document.body;
    const ctx = gsap.context(() => {
      const lns = root.querySelectorAll(".ln > span");
      if (lns.length) gsap.to(lns, { y: 0, duration: 1.05, ease: "power4.out", stagger: 0.09, delay: 0.1 });

      root.querySelectorAll("[data-dye]").forEach((el) =>
        gsap.to(el, {
          backgroundPosition: "0% 0",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      );

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".rv")).forEach((el) =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } })
      );
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".rv-l")).forEach((el) =>
        gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } })
      );
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".rv-r")).forEach((el) =>
        gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } })
      );

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".dye-img")).forEach((img) =>
        gsap.fromTo(
          img,
          { filter: "grayscale(1)" },
          { filter: "grayscale(0)", ease: "none", scrollTrigger: { trigger: img, start: "top 92%", end: "top 38%", scrub: true } }
        )
      );

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".px")).forEach((img) => {
        img.style.transition = "none";
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.14 },
          { yPercent: 6, scale: 1.14, ease: "none", scrollTrigger: { trigger: img.closest(".ph") || img, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-count]")).forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      const mq = document.getElementById("mq") as HTMLElement | null;
      if (mq && !mq.dataset.dup) {
        mq.dataset.dup = "1";
        mq.innerHTML += mq.innerHTML;
        gsap.to(mq, { xPercent: -50, duration: 34, ease: "none", repeat: -1 });
      }
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname, lang]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <a className="skip" href="#inhoud">
        {lang === "en" ? UI.skip.en : UI.skip.nl}
      </a>

      {/* verfdoek */}
      <div className="veil" aria-hidden="true" ref={veilRef}>
        <i className="v1" />
        <i className="v2">
          <span className="veil-word">Joflor</span>
        </i>
      </div>

      {/* navigatie */}
      <header className="nav" id="nav" ref={navRef}>
        <div className="nav-in">
          <a className="brand" href="/" aria-label="Joflor, naar de homepagina">
            <img
              src="https://joflor.nl/img/logo.png"
              alt="Joflor"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (sib) sib.style.display = "inline-block";
              }}
            />
            <span className="brand-word">
              Jo<b>flor</b>
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a className={isActive("/") ? "active" : ""} href="/" data-page-link="home">
                Home
              </a>
            </li>
            <li>
              <a className={isActive("/over-ons") ? "active" : ""} href="/over-ons" data-page-link="over-ons">
                {lang === "en" ? "About us" : "Over ons"}
              </a>
            </li>
            <li className="has-sub">
              <button className="navbtn" type="button" aria-haspopup="true">
                {lang === "en" ? UI.assortiment.en : UI.assortiment.nl}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="sub">
                {SUB_NAV.map((item) => (
                  <a key={item.href} href={item.href}>
                    {tNav(item, lang)} <span>›</span>
                  </a>
                ))}
              </div>
            </li>
            <li>
              <a className={isActive("/certificaten") ? "active" : ""} href="/certificaten" data-page-link="certificaten">
                {lang === "en" ? "Certificates" : "Certificaten"}
              </a>
            </li>
            <li>
              <a className={isActive("/contact") ? "active" : ""} href="/contact" data-page-link="contact">
                Contact
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <LangSwitch lang={lang} />
            <a className="btn btn-ink" href="/showroom">
              {lang === "en" ? UI.planVisit.en : UI.planVisit.nl}
              <ArrowR />
            </a>
            <button className="burger" id="burger" ref={burgerRef} aria-label="Menu openen" aria-expanded="false" onClick={() => (menuOpen.current ? closeMenu() : openMenu())}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* mobiel menu */}
      <nav className="mob" id="mob" aria-label="Mobiel menu" ref={mobRef}>
        <ul>
          {MOBILE_NAV.map((item) => (
            <li key={item.href}>
              <a className={SUBSET.has(item.href) ? "subline" : "big"} href={item.href}>
                {tNav(item, lang)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mob-foot">
          <span>{settings?.addressLine1 ? `${settings.addressLine1} · Naaldwijk` : "Naaldwijk"}</span>
          <LangSwitch lang={lang} />
        </div>
      </nav>

      <main id="inhoud">{children}</main>
    </>
  );
}
