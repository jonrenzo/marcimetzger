"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import useEmblaCarousel from "embla-carousel-react";
import { Arrow, ImageSlot, Ridge } from "./visuals";

const links = [
  { href: "#search", label: "Find your dream home" },
  { href: "#about", label: "Meet Marci" },
  { href: "#selling", label: "Selling your home" },
  { href: "#contact", label: "Contact Marci" },
];

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
  }
  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    function update() {
      const y = Math.max(0, window.scrollY);
      header.current?.classList.toggle("is-scrolled", y > 150);
      if (Math.abs(y - previous) > 12 || y <= 150) {
        const focused = header.current?.contains(document.activeElement);
        header.current?.classList.toggle(
          "is-hidden",
          y > 150 && y > previous && !dialog.current?.open && !focused,
        );
        previous = y;
      }
      frame = 0;
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width:992px)");
    const onResize = () => {
      if (desktop.matches) close();
    };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header
      className="header"
      ref={header}
      onFocusCapture={() => header.current?.classList.remove("is-hidden")}
    >
      <div className="header-inner">
        <a className="brand" href="#" aria-label="Marci Metzger home">
          <Ridge />
          <span>
            MARCI METZGER<small>The Ridge Realty Group</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#contact">Contact Marci</a>
          <a className="nav-pill" href="#search">
            Find your dream home <Arrow />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <dialog
          id="mobile-navigation"
          ref={dialog}
          className="mobile-menu"
          aria-label="Navigation"
          onClose={() => setOpen(false)}
        >
          <div className="mobile-menu-content">
            <div className="mobile-menu-top">
              <a className="brand" href="#" onClick={close}>
                <Ridge />
                <span>
                  MARCI METZGER<small>The Ridge Realty Group</small>
                </span>
              </a>
              <button
                className="menu-close"
                onClick={close}
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={close}>
                  {link.label}
                  <Arrow />
                </a>
              ))}
            </nav>
            <a className="menu-phone" href="tel:+12069196886" onClick={close}>
              (206) 919-6886
            </a>
            <div className="menu-art" aria-hidden="true">
              <Ridge />
            </div>
          </div>
        </dialog>
      </div>
    </header>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion:reduce)");
    if (!el || motion.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (!motion.matches) {
          animations.push(
            el.animate(
              [
                { opacity: 0, transform: "translateY(32px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 850, delay, fill: "backwards", easing: "cubic-bezier(.22,1,.36,1)" },
            ),
          );
          el.querySelectorAll(".heading-accent em").forEach((accent) =>
            animations.push(
              accent.animate(
                [
                  { opacity: 0, transform: "translateY(48px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 1100, delay: delay + 80, fill: "backwards", easing: "cubic-bezier(.16,1,.3,1)" },
              ),
            ),
          );
        }
        observer.disconnect();
      },
      { threshold: 0.04, rootMargin: "0px 0px 64px 0px" },
    );
    const cancel = () => {
      if (motion.matches) animations.forEach((a) => a.cancel());
    };
    const finish = () => animations.forEach((a) => a.finish());
    observer.observe(el);
    el.addEventListener("focusin", finish);
    motion.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      el.removeEventListener("focusin", finish);
      motion.removeEventListener("change", cancel);
    };
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScrollMotion() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion:reduce)");
    const desktop = window.matchMedia("(min-width:992px)");
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -110, force: true },
      prevent: (node) => Boolean(node.closest("dialog, textarea, select")),
    });
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else if (lenis.isStopped) lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    syncLock();

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]")).map((el) => ({
      el, type: el.dataset.scroll, current: el.dataset.scroll === "image" ? 0 : 1, target: 0,
    }));
    const words = Array.from(document.querySelectorAll<HTMLElement>(".outline-word")).map((el) => ({ el, current: 0, target: 0 }));
    let hero = 0;
    let heroTarget = 0;
    let frame = 0;
    let lastTime = 0;
    let dirty = true;
    let snap = true;

    // Read geometry together, then animate compositor-friendly properties only.
    function measure() {
      const enabled = desktop.matches && !motion.matches;
      heroTarget = enabled ? Math.min(scrollY * 0.2, 160) : 0;
      for (const item of targets) {
        const anchor = item.type === "panel" ? item.el.parentElement! : item.el;
        const rect = anchor.getBoundingClientRect();
        const height = anchor.offsetHeight;
        // The growing photograph is center-scaled; remove that visual offset.
        const top = rect.top - (item.type === "grow" ? height * (1 - item.current) / 2 : 0);
        const progress = Math.max(0, Math.min(1, (innerHeight - top) / (innerHeight + height) * 2));
        const eased = progress * progress * (3 - 2 * progress);
        item.target = item.type === "image" ? (enabled ? (1 - eased) * 160 : 0) : enabled ? (item.type === "panel" ? 0.85 + 0.15 * eased : 0.9 + 0.1 * eased) : 1;
      }
      for (const item of words) {
        const top = item.el.parentElement!.getBoundingClientRect().top;
        item.target = enabled ? Math.max(0, Math.min(16, (innerHeight - top) / innerHeight * 16)) : 0;
      }
      if (!enabled) snap = true;
      dirty = false;
    }
    function update(time: number) {
      if (dirty) measure();
      const dt = lastTime ? Math.min(64, time - lastTime) : 16.67;
      const blend = snap ? 1 : 1 - Math.exp(-dt / 125);
      let moving = false;
      function settle(current: number, target: number, tolerance: number) {
        const next = current + (target - current) * blend;
        if (Math.abs(target - next) <= tolerance) return target;
        moving = true;
        return next;
      }
      hero = settle(hero, heroTarget, 0.02);
      document.documentElement.style.setProperty("--hero-shift", `${hero.toFixed(3)}px`);
      for (const item of targets) {
        item.current = settle(item.current, item.target, item.type === "image" ? 0.02 : 0.0001);
        item.el.style.setProperty(item.type === "image" ? "--media-shift" : "--panel-scale", item.type === "image" ? `${item.current.toFixed(3)}px` : String(item.current));
      }
      for (const item of words) {
        item.current = settle(item.current, item.target, 0.02);
        item.el.style.setProperty("--word-shift", `${item.current.toFixed(3)}px`);
      }
      snap = false;
      lastTime = moving ? time : 0;
      frame = moving ? requestAnimationFrame(update) : 0;
    }
    function schedule() {
      dirty = true;
      if (!frame) frame = requestAnimationFrame(update);
    }
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      lenis.destroy();
      lockObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--hero-shift");
      targets.forEach(({el}) => { el.style.removeProperty("--media-shift"); el.style.removeProperty("--panel-scale"); });
      words.forEach(({el}) => el.style.removeProperty("--word-shift"));
    };
  }, []);
  return null;
}
const gallery = [
  { name: "exterior", category: "Residential", title: "A place of your own" },
  { name: "interior", category: "Interiors", title: "Room for everyday life" },
  {
    name: "landscape",
    category: "Pahrump, Nevada",
    title: "A wider perspective",
  },
  {
    name: "details",
    category: "Architecture",
    title: "The details that matter",
  },
  { name: "living", category: "Living spaces", title: "Make yourself at home" },
  { name: "outdoor", category: "Outdoor living", title: "Space to breathe" },
] as const;

export function PhotoGallery() {
  const [viewportRef, carousel] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 36,
    breakpoints: {
      "(min-width: 768px)": { active: false },
      "(prefers-reduced-motion: reduce)": { duration: 0 },
    },
  });
  const subscribeToGallery = useCallback((notify: () => void) => {
    if (!carousel) return () => {};
    carousel.on("select", notify).on("reInit", notify);
    return () => { carousel.off("select", notify).off("reInit", notify); };
  }, [carousel]);
  const active = useSyncExternalStore(subscribeToGallery, () => carousel?.selectedScrollSnap() ?? 0, () => 0);
  const move = (step: number) => {
    const jump = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (step < 0) carousel?.scrollPrev(jump);
    else carousel?.scrollNext(jump);
  };
  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <Reveal className="gallery-card" key={item.name} delay={index * 100}>
            <ImageSlot name={item.name} />
            <p>{item.category}</p>
            <h3>{item.title}</h3>
          </Reveal>
        ))}
      </div>
      <div
        className="gallery-mobile"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photo gallery"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="gallery-window" ref={viewportRef}><div className="gallery-track">
            {gallery.map((item, index) => (
              <div
                className="gallery-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${gallery.length}`}
                aria-hidden={active !== index}
                key={item.name}
              >
                <ImageSlot name={item.name} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-controls">
          <button
            className="gallery-prev"
            aria-label="Previous photo"
            onClick={() => move(-1)}
          >
            <Arrow />
          </button>
          <div className="gallery-dots">
            {gallery.map((item, index) => (
              <button
                key={item.name}
                aria-label={`Show photo ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => carousel?.scrollTo(index, window.matchMedia("(prefers-reduced-motion: reduce)").matches)}
              >
                <span />
              </button>
            ))}
          </div>
          <button aria-label="Next photo" onClick={() => move(1)}>
            <Arrow />
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          Photo {active + 1} of {gallery.length}: {gallery[active].title}
        </span>
      </div>
    </>
  );
}

export function ContactDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <>
      <button
        className="button button-outline-dark"
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Send a message <Arrow />
      </button>
      <dialog
        className="contact-dialog"
        ref={dialog}
        aria-label="Contact Marci — form preview"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="contact-dialog-content">
          <button
            className="dialog-close"
            aria-label="Close contact form"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          <ContactForm />
        </div>
      </dialog>
    </>
  );
}
const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function PropertySearch() {
  const ready = useHydrated();
  const [summary, setSummary] = useState<string | null>(null);
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const min = String(data.get("minPrice") || "");
    const max = String(data.get("maxPrice") || "");
    if (min && max && Number(min) > Number(max)) {
      const input = form.elements.namedItem("maxPrice") as HTMLInputElement;
      input.setCustomValidity(
        "Maximum price must be greater than or equal to minimum price.",
      );
      input.reportValidity();
      return;
    }
    const currency = (value: string) =>
      Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    setSummary(
      `${data.get("location")} · ${data.get("type")} · ${data.get("beds")} bedrooms · ${data.get("baths")} bathrooms · ${min ? currency(min) : "$0"} to ${max ? currency(max) : "any price"} · ${data.get("sort")}`,
    );
  }
  return (
    <>
      <form
        className="search-form"
        onSubmit={search}
        onInput={(event) => {
          setSummary(null);
          const max = event.currentTarget.elements.namedItem(
            "maxPrice",
          ) as HTMLInputElement;
          max.setCustomValidity("");
        }}
        onReset={(event) => {
          setSummary(null);
          const max = event.currentTarget.elements.namedItem(
            "maxPrice",
          ) as HTMLInputElement;
          max.setCustomValidity("");
        }}
      >
        <div className="search-top">
          <label>
            Location
            <select name="location" defaultValue="Pahrump, NV">
              <option>Pahrump, NV</option>
              <option>All locations</option>
            </select>
          </label>
          <label>
            Property type
            <select name="type">
              <option>All property types</option>
              <option>Single-family home</option>
              <option>Condo / townhome</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>
          </label>
          <label>
            Sort by
            <select name="sort">
              <option>Newest first</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="search-bottom">
          <label>
            Bedrooms
            <select name="beds">
              <option value="Any">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}+</option>
              ))}
            </select>
          </label>
          <label>
            Bathrooms
            <select name="baths">
              <option value="Any">Any</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}+</option>
              ))}
            </select>
          </label>
          <label>
            Min price
            <input
              name="minPrice"
              type="number"
              min="0"
              step="1"
              placeholder="No minimum"
              inputMode="numeric"
            />
          </label>
          <label>
            Max price
            <input
              name="maxPrice"
              type="number"
              min="0"
              step="1"
              placeholder="No maximum"
              inputMode="numeric"
            />
          </label>
          <button className="button" type="submit" disabled={!ready}>
            Preview search <Arrow />
          </button>
        </div>
        <div className="search-disclaimer">
          <p>Try the search. This preview isn’t connected to live listings.</p>
          <button type="reset">Reset filters</button>
        </div>
      </form>
      <div className="search-feedback" role="status">
        {summary && (
          <div>
            <strong>Your search preview</strong>
            <p>{summary}</p>
            <p>
              No live listings are connected yet.{" "}
              <a href="tel:+12069196886">
                Call Marci to discuss available properties <Arrow />
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export function ContactForm() {
  const ready = useHydrated();
  const [preview, setPreview] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setPreview(true);
      }}
      onInput={() => setPreview(false)}
    >
      <div className="form-title">
        <h3>Send a little hello.</h3>
        <span className="preview-badge">Form preview</span>
      </div>
      <p className="form-note">
        Try the form below. Messages aren’t sent or saved in this preview.
      </p>
      <label htmlFor="contact-name">
        Your name
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="First and last name"
          required
          maxLength={100}
        />
      </label>
      <label htmlFor="contact-email">
        Email address
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={254}
        />
      </label>
      <label htmlFor="contact-message">
        What do you have in mind?
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me a little about your plans…"
          rows={4}
          required
          maxLength={5000}
        />
      </label>
      <button className="button" type="submit" disabled={!ready}>
        Preview message <Arrow />
      </button>
      <div className="contact-feedback" role="status">
        {preview && (
          <p>
            <strong>Your message preview is complete.</strong> Nothing was sent
            or saved. To get in touch, call{" "}
            <a href="tel:+12069196886">(206) 919-6886</a>.
          </p>
        )}
      </div>
    </form>
  );
}

