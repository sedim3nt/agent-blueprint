"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────── Intersection Observer Hook ───────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ───────────────────────── Navigation ───────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-card-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest to-gold flex items-center justify-center">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <span className="font-semibold text-foreground group-hover:text-gold transition-colors">
              Agent Blueprint
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="px-5 py-2 rounded-full bg-gold text-soil font-semibold text-sm hover:bg-gold-light transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-muted hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-block px-5 py-2 rounded-full bg-gold text-soil font-semibold text-sm"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ───────────────────────── Hero Section ───────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_70%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-card-border bg-card/50 text-sm text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            90-Minute Implementation Sessions Now Open
          </div>
        </div>

        <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Stop Using AI Manually.
          <br />
          <span className="text-gradient">Start Running It.</span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a done-with-you 90-minute session that turns your chaotic AI usage
          into a structured, automated multi-agent system — built for your
          specific business.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="group px-8 py-4 rounded-full bg-gold text-soil font-semibold text-lg hover:bg-gold-light transition-all hover:scale-105 animate-pulse-glow"
          >
            Book Your Blueprint Session
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full border border-card-border text-foreground hover:border-gold/50 transition-all hover:scale-105"
          >
            See How It Works
          </a>
        </div>

        <div className="animate-fade-in-up delay-500 mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Live 1-on-1 session
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Custom-built for you
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Ship same day
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Problem Section ───────────────────────── */
function Problem() {
  const { ref, inView } = useInView();

  const painPoints = [
    {
      icon: "⏰",
      title: "10-20 hours/week wasted",
      desc: "Copy-pasting between ChatGPT tabs, re-prompting the same tasks, manually doing what agents could automate.",
    },
    {
      icon: "🔄",
      title: "No system, just chaos",
      desc: "Every AI interaction starts from scratch. No memory, no handoffs, no coordination between tools.",
    },
    {
      icon: "📉",
      title: "Falling behind competitors",
      desc: "While you prompt one task at a time, others are running entire workflows on autopilot with agent systems.",
    },
    {
      icon: "🤯",
      title: "Overwhelmed by options",
      desc: "GPT, Claude, Gemini, n8n, Make, Zapier — too many tools, no strategy for how they fit together.",
    },
  ];

  return (
    <section id="problem" className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            You&rsquo;re spending 10-20 hours/week
            <br />
            <span className="text-muted">on tasks AI could do</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className={`group p-6 rounded-2xl bg-card border border-card-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 ${
                inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Solution Section ───────────────────────── */
function Solution() {
  const { ref, inView } = useInView();

  const deliverables = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      title: "Multi-Agent Org Chart",
      desc: "A visual map of every AI agent your business needs, how they connect, and what each one owns.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      title: "Custom Prompt Packs",
      desc: "Production-ready prompts tailored to your workflows — not generic templates from a course.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      title: "Handoff Templates",
      desc: "Structured formats so agents pass context cleanly — no dropped balls, no lost information.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cron Schedules",
      desc: "Automated timing for every recurring task — your agents work while you sleep.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Tool & Stack Config",
      desc: "We configure your exact toolchain — Claude, GPT, n8n, Make, or whatever fits your needs.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      title: "Training Walkthrough",
      desc: "A recorded session walkthrough so you (and your team) can reference it anytime.",
    },
  ];

  return (
    <section id="solution" className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            The Solution
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            What you get in{" "}
            <span className="text-gradient">90 minutes</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A complete, personalized AI agent system — designed, built, and
            shipped in a single live session.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <div
              key={i}
              className={`group p-6 rounded-2xl bg-card border border-card-border hover:border-forest/50 transition-all duration-300 hover:-translate-y-1 ${
                inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-forest/20 text-forest flex items-center justify-center mb-4 group-hover:bg-forest/30 transition-colors">
                {d.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Pricing Section ───────────────────────── */
function Pricing() {
  const { ref, inView } = useInView();

  const tiers = [
    {
      name: "Entry",
      price: "$497",
      desc: "Perfect for solo founders getting started with AI automation.",
      href: "https://buy.stripe.com/00wfZa2qE1AZ09F70z2Nq01",
      features: [
        "90-minute live session",
        "Multi-agent org chart",
        "3 custom prompt packs",
        "Basic handoff templates",
        "Session recording",
      ],
      highlight: false,
    },
    {
      name: "Premium",
      price: "$997",
      desc: "For founders ready to fully automate their core workflows.",
      href: "https://buy.stripe.com/9B63co8P2a7v3lRfx52Nq02",
      features: [
        "Everything in Entry, plus:",
        "6 custom prompt packs",
        "Advanced handoff templates",
        "Cron schedule setup",
        "Tool & stack configuration",
        "30-day async support",
      ],
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Full Deploy",
      price: "$1,997",
      desc: "White-glove setup — we build and deploy the entire system for you.",
      href: "https://buy.stripe.com/6oU00c0iw2F3aOj2Kj2Nq03",
      features: [
        "Everything in Premium, plus:",
        "Full system deployment",
        "n8n / Make automation build",
        "Custom integrations setup",
        "Training walkthrough video",
        "60-day priority support",
        "1 follow-up optimization call",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            Choose your level
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            One session. Lifetime value. Pick the depth that fits your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-[1px] ${
                tier.highlight
                  ? "bg-gradient-to-b from-gold via-forest to-gold"
                  : "bg-card-border"
              } ${inView ? `animate-fade-in-up delay-${(i + 1) * 200}` : "opacity-0"}`}
            >
              <div className="rounded-2xl p-8 h-full flex flex-col bg-card">
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gold text-soil text-xs font-bold uppercase tracking-wider">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gradient">
                      {tier.price}
                    </span>
                    <span className="text-muted text-sm">one-time</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{tier.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-forest shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] ${
                    tier.highlight
                      ? "bg-gold text-soil hover:bg-gold-light"
                      : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                  }`}
                >
                  Get {tier.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted mt-8">
          All plans are one-time payments. No subscriptions. No hidden fees.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── How It Works ───────────────────────── */
function HowItWorks() {
  const { ref, inView } = useInView();

  const steps = [
    {
      num: "01",
      title: "Book",
      desc: "Choose your tier and pick a time that works. You'll get a quick intake form to share your current tools, workflows, and goals.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Build",
      desc: "In a live 90-minute session, we map your workflows, design your agent system, write your prompts, and configure your automations.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.385-5.385a2.625 2.625 0 113.712-3.712L12 8.33l2.253-2.257a2.625 2.625 0 113.712 3.712L12 15.17z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.196 9.553c.427 1.167.612 2.412.553 3.655C17.284 18.336 12.91 21 12 21c-.91 0-5.284-2.664-5.75-7.792a8.126 8.126 0 01.553-3.655" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Ship",
      desc: "Walk away with a complete agent system, ready to deploy. Your AI team starts working for you the same day.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            Three steps to your{" "}
            <span className="text-gradient">AI-powered business</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`text-center ${
                inView ? `animate-fade-in-up delay-${(i + 1) * 200}` : "opacity-0"
              }`}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-forest/10 text-forest mb-6 relative">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-soil text-xs font-bold flex items-center justify-center">
                  {s.num}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ Section ───────────────────────── */
function FAQ() {
  const { ref, inView } = useInView();

  const faqs = [
    {
      q: "Who is this for?",
      a: "Solo founders, agency owners, and content creators who are already using AI but want to turn scattered usage into a structured, automated system.",
    },
    {
      q: "What happens during the 90-minute session?",
      a: "We audit your current workflows, design a multi-agent org chart, write custom prompts, set up handoff templates, and configure automation schedules — all live, together.",
    },
    {
      q: "Do I need technical skills?",
      a: "No. We handle the technical setup. You just need to know your business workflows and what you want to automate.",
    },
    {
      q: "What tools do you support?",
      a: "Claude, GPT, Gemini, n8n, Make, Zapier, and more. We pick the right tools for your specific needs and budget.",
    },
    {
      q: "What if I'm not satisfied?",
      a: "If we can't deliver a working agent system in your session, we'll extend the session at no extra charge until we do.",
    },
    {
      q: "How soon can I book?",
      a: "Most sessions are scheduled within 3-5 business days. After payment, you'll receive a booking link immediately.",
    },
    {
      q: "What's the difference between tiers?",
      a: "Entry gets you the core blueprint. Premium adds automation setup and 30-day support. Full Deploy means we build and deploy everything for you with 60-day support.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes! You can upgrade to a higher tier at any time and only pay the difference.",
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            Common questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, i, inView }: { q: string; a: string; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border border-card-border overflow-hidden transition-all ${
        open ? "bg-card" : "bg-transparent hover:bg-card/50"
      } ${inView ? `animate-fade-in-up delay-${Math.min((i + 1) * 100, 700)}` : "opacity-0"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold pr-4">{q}</span>
        <svg
          className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 pb-5" : "max-h-0"
        }`}
      >
        <p className="px-5 text-muted leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Social Proof ───────────────────────── */
function SocialProof() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      quote:
        "I went from spending 15 hours a week on content to having a full agent pipeline that does it in 2. This session paid for itself in the first week.",
      name: "Alex R.",
      role: "Agency Owner",
    },
    {
      quote:
        "I was skeptical about fitting this into 90 minutes, but we built an entire client onboarding system with 4 agents. Wild.",
      name: "Priya K.",
      role: "SaaS Founder",
    },
    {
      quote:
        "The org chart alone was worth the price. I finally understand how all my AI tools should work together instead of in silos.",
      name: "Marcus T.",
      role: "Content Creator",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Results
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            What founders are saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-card border border-card-border ${
                inView ? `animate-fade-in-up delay-${(i + 1) * 200}` : "opacity-0"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className={`mt-16 text-center ${inView ? "animate-fade-in-up delay-700" : "opacity-0"}`}>
          <p className="text-sm text-muted mb-6 uppercase tracking-widest">
            Trusted by founders using
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted/50 text-lg font-semibold">
            <span>Claude</span>
            <span className="text-card-border">|</span>
            <span>ChatGPT</span>
            <span className="text-card-border">|</span>
            <span>n8n</span>
            <span className="text-card-border">|</span>
            <span>Make</span>
            <span className="text-card-border">|</span>
            <span>Zapier</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
function FinalCTA() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="section-divider mb-24" />
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-3xl overflow-hidden ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-soil to-forest-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,67,0.15),transparent_50%)]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to stop doing AI
              <br />
              <span className="text-gradient">the hard way?</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto mb-10">
              Book your 90-minute blueprint session and walk away with a
              complete AI agent system — designed, built, and ready to deploy.
            </p>

            <a
              href="https://buy.stripe.com/9B63co8P2a7v3lRfx52Nq02"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex px-8 py-4 rounded-full bg-gold text-soil font-semibold text-lg hover:bg-gold-light transition-all hover:scale-105"
            >
              Book Your Blueprint Session
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <p className="mt-6 text-sm text-foreground/40">
              Starting at $497 · One-time payment · No subscription
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  return (
    <footer className="py-12 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-forest to-gold flex items-center justify-center">
              <span className="text-white font-bold text-xs">AB</span>
            </div>
            <span className="text-sm text-muted">
              Agent Blueprint © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#pricing" className="hover:text-gold transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-gold transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
