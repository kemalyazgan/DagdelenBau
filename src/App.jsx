import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Shield,
  Hammer,
  Ruler,
  Clock,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ---- CONFIG ----
const COMPANY = {
  name: "Dagdelen Bau",
  ceo: "Ertugrul Dagdelen",
  tagline: "Trockenbau · Abriss · Vermittlung",
  phone: "+49176 56063469",
  email: "info@dagdelen-bau.de",
  address: "Honsberger Str. 93, 42857 Remscheid",
  city: "Remscheid",
};

const slides = [
  {
    title: "Trockenbau auf Meister-Niveau",
    text: "Trennwände, Decken und Raumaufteilungen - individuell und normgerecht.",
  },
  {
    title: "Handwerker-Vermittlung",
    text: "Die Besten der Besten für Ihr Projekt",
  },
  {
    title: "Abriss & Umbauservice",
    text: "Schnell, fachgerecht und gründlich – wir bringen frischen Wind in Ihre Räume.",
  },
  {
    title: "Hausmeisterservice",
    text: "Regelmäßig oder nach Bedarf – wir kümmern uns um Ihre Immobilie.",
  },
];

const services = [
  {
    key: "vermittlung",
    title: "Handwerker‑Vermittlungsservice",
    image: "/photos/handwerkervermittlung.jpg",
    description:
        "Wir vermitteln Ihnen qualifizierte Handwerksbetriebe für alle relevanten Gewerke – schnell, zuverlässig und passend zu Ihrem Projekt.",
    serviceInfo:
        "Auswahl passender Fachbetriebe aus unserem Netzwerk, Terminabstimmung und laufende Kommunikation – ein fester Ansprechpartner bis zur Abnahme.",
    facts: [
      "Geprüfte Fachbetriebe",
      "Schnelle Terminfindung",
      "Koordination durch uns",
    ],
  },
  {
    key: "entruempelung",
    title: "Entrümpelung & Haushaltsauflösungen",
    image: "/photos/entruempelung.jpg",
    description:
        "Wir räumen Wohnungen, Häuser und Baustellen zügig und gründlich – inkl. fachgerechter Entsorgung.",
    serviceInfo:
        "Schnelle, gründliche Räumung inkl. Sortierung und fachgerechter Entsorgung; auf Wunsch besenreine Übergabe und Dokumentation.",
    facts: [
      "Wohnung, Haus & Baustelle",
      "Fachgerechte Entsorgung",
      "Kurzfristige Termine",
    ],
  },
  {
    key: "hausmeister",
    title: "Hausmeisterservice",
    image: "/photos/hausmeister.jpg",
    description:
        "Regelmäßige Pflege, Kontrolle und kleine Reparaturen – wir halten Ihre Immobilie in Schuss.",
    serviceInfo:
        "Regelmäßige Objektkontrollen, Pflege der Außenanlagen, Kleinreparaturen und Koordination externer Dienste – planbar und zuverlässig.",
    facts: [
      "Objektpflege & Wartung",
      "Kleinreparaturen",
      "Winterdienst nach Bedarf",
    ],
  },
  {
    key: "abriss-umbau",
    title: "Abriss- & Umbauarbeiten",
    image: "/photos/abriss.jpg",
    description:
        "Vom Teilabbruch bis zur Entkernung: Wir schaffen Platz für Neues und setzen Umbauten sauber um.",
    serviceInfo:
        "Sichere Ausführung mit Staub- und Lärmschutz, Entkernung und Abtransport – wir bereiten alles für den reibungslosen Umbau vor.",
    facts: [
      "Teil-/Komplettabriss",
      "Entkernung",
      "Staubschutz & Entsorgung",
    ],
  },
  {
    key: "bodenverlegung",
    title: "Bodenverlegung",
    image: "/photos/bodenlegen.jpg",
    description:
        "Parkett, Laminat oder Teppich – fachgerechte Verlegung mit perfektem Finish.",
    serviceInfo:
        "Beratung zu Material und Aufbau, professionelle Verlegung inkl. Untergrundvorbereitung und sauberen Abschlüssen.",
    facts: [
      "Untergrundvorbereitung",
      "Parkett/Laminat/Teppich",
      "Sockelleisten & Abschlüsse",
    ],
  },
  {
    key: "trockenbau",
    title: "Trockenbau",
    image: "/photos/trockenbauS.jpg",
    description:
        "Trennwände, Decken, Verkleidungen und Raumaufteilungen – maßgeschneiderte Lösungen für Wohn- und Gewerbeobjekte.",
    serviceInfo:
        "Individuelle Raumaufteilung, Decken- und Wandverkleidungen inkl. Schall- und Brandschutz – sauber und termingerecht umgesetzt.",
    facts: [
      "Wände & Decken",
      "Schall- & Brandschutz",
      "Saubere Montage",
    ],
  },
  {
    key: "fugarbeiten",
    title: "Fugarbeiten",
    image: "/photos/fugarbeiten.jpg",
    description:
        "Sämtliche Fugarbeiten im Innen- und Außenbereich – technisch korrekt und optisch sauber.",
    serviceInfo:
        "Präzise elastische und mineralische Fugen für Bad, Küche und Fassade – optisch stimmig, technisch korrekt.",
    facts: [
      "Silikon/Acryl/Elastisch",
      "Innen & Außen",
      "Saubere Ausführung",
    ],
  },
  {
    key: "gebaeudereinigung",
    title: "Gebäudereinigung",
    image: "/photos/reinigung.jpg",
    description:
        "Gründliche Reinigung von Wohn- und Gewerbeimmobilien – von der Grundreinigung bis zur laufenden Unterhaltsreinigung.",
    serviceInfo:
        "Von Grund- bis Unterhaltsreinigung: feste Intervalle, klare Checklisten und zuverlässige Teams für dauerhaft gepflegte Objekte.",
    facts: [
      "Grund- & Unterhalt",
      "Bauendreinigung",
      "Gewerbe & Privat",
    ],
  },
  {
    key: "spachtelarbeiten",
    title: "Spachtelarbeiten",
    image: "/photos/spachtel.jpg",
    description:
        "Glatt, eben und bereit für das perfekte Finish – wir spachteln Wände und Decken fachgerecht.",
    serviceInfo:
        "Von der Fugenverspachtelung bis zur vollflächigen Glättung – wir sorgen für einwandfreie Oberflächen, die direkt für Maler- oder Tapezierarbeiten vorbereitet sind. Termingerecht, sauber und nach gewünschter Qualitätsstufe umgesetzt.",
    facts: [
      "Fugen & Schraubenlöcher",
      "Vollflächige Glättung (Q1-Q4)",
      "Saubere Oberflächenvorbereitung",
    ],
  },
];

// ---- UI PRIMITIVES ----
const Container = ({ children }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
    {children}
  </span>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-xl bg-primary/10 p-2">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

// Tailwind color helpers via CSS variables
const Root = ({ children }) => (
  <div
    className="min-h-screen text-slate-900"
    style={{
      // Elegant brand palette (adjust freely)
      // Using CSS vars to keep Tailwind happy in preview
      // Primary: slate -> emerald gradient accents
    }}
  >
    {children}
  </div>
);

// ---- NAVIGATION ----
function Nav({ route, setRoute }) {
  const [open, setOpen] = useState(false);
  const NavLink = ({ id, label }) => (
    <button
      onClick={() => {
        setRoute(id);
        setOpen(false);
      }}
      className={`rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-slate-100 ${
        route === id ? "text-emerald-700" : "text-slate-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 flex items-center justify-center cursor-pointer" onClick={() => setRoute("home")}>
              <img
                src="/navbarLogoFix.png"
                alt={COMPANY.name}
                className="h-full w-auto object-contain mb-3"
              />
            </div>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <NavLink id="home" label="Start" />
            <NavLink id="leistungen" label="Leistungen" />
            <NavLink id="unternehmen" label="Unternehmen" />
            <NavLink id="kontakt" label="Kontakt" />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${COMPANY.phone}`}
              className="hidden rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 md:inline-flex"
            >
              <Phone className="mr-2 h-4 w-4" /> Angebot anfragen
            </a>
            <button
              className="inline-flex rounded-xl p-2 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Navigation öffnen"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="flex flex-col gap-1 pb-4">
                <button
                  className="rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => {
                    setRoute("home");
                    setOpen(false);
                  }}
                >
                  Start
                </button>
                <button
                  className="rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => {
                    setRoute("leistungen");
                    setOpen(false);
                  }}
                >
                  Leistungen
                </button>
                <button
                  className="rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => {
                    setRoute("unternehmen");
                    setOpen(false);
                  }}
                >
                  Unternehmen
                </button>
                <button
                  className="rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => {
                    setRoute("kontakt");
                    setOpen(false);
                  }}
                >
                  Kontakt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}

// ---- HERO / SLIDESHOW ----
function Hero({ setRoute }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[68vh] w-full overflow-hidden bg-slate-900">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
      </div>
      {/* Overlay Content */}

      <Container>
        <div className="relative z-10 flex h-[68vh] flex-col items-start justify-end pb-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl"
            >
              {slides[index].title}
            </motion.h1>
          </AnimatePresence>
          <p className="mt-3 max-w-2xl text-base text-slate-200 sm:text-lg">
            {slides[index].text}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setRoute("leistungen")}
              className="inline-flex items-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold shadow hover:shadow-md"
            >
              Unsere Leistungen <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <Phone className="mr-2 h-4 w-4" /> Jetzt anrufen
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---- LEISTUNGEN PAGE ----
function Leistungen() {
  return (
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Leistungen
              </h2>
              <div className="mt-2 max-w-3xl space-y-3 text-slate-700">
                <p>
                  Wir bieten Ihnen ein umfassendes Serviceangebot, das sämtliche
                  Gewerke umfasst. Dabei arbeiten wir eng mit erfahrenen
                  Partnerunternehmen zusammen, um eine schnelle und professionelle
                  Ausführung aller Arbeiten zu garantieren. Als zentraler
                  Ansprechpartner übernehmen wir die gesamte Organisation und
                  Kommunikation – Sie müssen sich um nichts kümmern.
                </p>
                <p>Unsere Leistungen im Überblick:</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((s) => (
                <article key={s.key} className="overflow-hidden rounded-2xl border bg-white shadow-sm flex flex-col h-full">
                  <div className="relative h-56 w-full">
                    <img
                        src={s.image}
                        alt={s.title}
                        className="block h-full w-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow">
                      {s.title}
                    </div>
                  </div>
                  <div className="grid gap-0 md:grid-cols-[1fr_320px] flex-grow">
                    <div className="p-5 flex flex-col h-full">
                      <p className="text-slate-700">{s.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.facts.map((f, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium"
                            >
<CheckCircle2 className="h-3.5 w-3.5" /> {f}
</span>
                        ))}
                      </div>
                    </div>
                    {/* Infobox */}
                    <div className="flex flex-col gap-3 border-t bg-slate-50 p-5 md:border-l md:border-t-0">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Shield className="h-4 w-4" />
                        <p className="text-sm font-semibold">Service-Info</p>
                      </div>
                      <div className="text-sm text-slate-700">
                        <p>{s.serviceInfo}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
                        <div className="rounded-xl border bg-white p-3">
                          <Hammer className="mx-auto mb-1 h-4 w-4" />
                          <p>Qualifiziert</p>
                        </div>
                        <div className="rounded-xl border bg-white p-3">
                          <Ruler className="mx-auto mb-1 h-4 w-4" />
                          <p>Transparent</p>
                        </div>
                        <div className="rounded-xl border bg-white p-3">
                          <Clock className="mx-auto mb-1 h-4 w-4" />
                          <p>Termintreu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
            ))}
          </div>

          {/* Partnergewerke Hinweis */}
          <div className="mt-12 rounded-2xl border bg-emerald-50 p-6">
            <p className="font-semibold text-emerald-900">Komplettsanierung aus einer Hand</p>
            <p className="mt-2 text-sm text-emerald-900/80">
              Unsere Partnerunternehmen – z. B. Fliesenleger, Elektriker, Verputzer, Fensterbauer und Klempner –
              unterstützen uns bei Spezialaufgaben. So erhalten Sie alle Leistungen koordiniert aus einer Hand.
            </p>
          </div>
        </Container>
      </section>
  );
}

// ---- UNTERNEHMEN PAGE ----
function Unternehmen() {
  const stats = [
    //{ label: "Jahre Erfahrung", value: "40+" },
    //{ label: "abgeschl. Projekte/Jahr", value: "10+" },
  ];

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {COMPANY.name} – Ihr Partner für Trockenbau
            </h2>
            <p className="mt-3 text-slate-700">
              Wir sind ein <strong>junges Bauunternehmen</strong>, das auf <em>über 40 Jahre Erfahrung</em> aus drei Generationen zurückgreift. Die Wurzeln von <strong>Dagdelen Bau</strong> reichen bis zu den Anfängen des Großvaters und Vaters in der Baubranche, deren Wissen, <em>handwerkliche Qualität</em> und Werte die Grundlage des heutigen Unternehmens bilden. Mit dieser <strong>starken Familientradition</strong> im Rücken wird Dagdelen Bau von der aktuellen Generation geführt und mit <em>frischem Unternehmergeist</em> in die Zukunft getragen.
              Die Verbindung aus jahrzehntelanger Erfahrung und der Dynamik eines jungen, motivierten Teams macht Dagdelen Bau zu einem zuverlässigen Partner für private, gewerbliche und kommunale Bauprojekte. Traditionelle Handwerkskunst, kombiniert mit modernen Methoden und innovativen Lösungen, garantiert maßgeschneiderte Ergebnisse in höchster Qualität.
            </p>
            <div className=" grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-extrabold text-emerald-700">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              <Feature
                icon={Shield}
                title="Zertifizierte Systeme"
                desc="Brandschutz- und Akustiklösungen nach Systemvorgaben – rechtssicher dokumentiert."
              />
              <Feature
                icon={Clock}
                title="Termin- & Kostensicherheit"
                desc="Verbindliche Zeitpläne und klare Angebote – ohne Überraschungen."
              />
              <Feature
                icon={Building2}
                title="Für Gewerbe & Privat"
                desc="Vom Büroausbau bis zur Wohnungssanierung – skalierbar und flexibel."
              />
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl border shadow-sm">
              <img
                src="/photos/ertugrul.jpg"
                alt="geschaeftsfuehrer"
                className="h-[32rem] w-full object-cover object-top"
              />
              <div className="space-y-4 p-6">
                <h3 className="text-lg font-bold">Unser Geschäftsführer</h3>
                <p className="text-slate-700">
                  Unser Geschäftsführer führt Dagdelen Bau mit der Erfahrung aus drei Generationen und klarem Fokus auf Qualität, Transparenz und Termintreue. Er ist Ihr zentraler Ansprechpartner von der ersten Idee bis zur Abnahme.
                </p>
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Qualifikationen & Zertifikate</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Brandschutzschulungen</li>
                    <li>DGUV & Arbeitssicherheit unterwiesen</li>
                    <li>Rauchmelder‑Zertifikat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---- KONTAKT PAGE ----
function Kontakt() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [mapConsent, setMapConsent] = useState(false);

  return (
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Kontakt
              </h2>
              <p className="mt-2 text-slate-700">
                Erzählen Sie uns kurz von Ihrem Projekt – wir melden uns zeitnah
                mit einem Vorschlag oder Angebot.
              </p>

              <form
                  name="kontakt"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="website"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus(null);
                    setSending(true);
                    const form = e.currentTarget;
                    const data = new FormData(form);

                    // Honeypot: wenn gefüllt, still ok
                    if (data.get("website")) {
                      setSending(false);
                      form.reset();
                      setStatus({ ok: true, msg: "Danke! Ihre Anfrage wurde versendet." });
                      return;
                    }

                    // Netlify Forms benötigt 'form-name'
                    if (!data.get("form-name")) data.append("form-name", "kontakt");

                    try {
                      const body = new URLSearchParams(data).toString();
                      const res = await fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body,
                      });
                      if (!res.ok) throw new Error("send-failed");
                      setStatus({ ok: true, msg: "Danke! Ihre Anfrage wurde versendet." });
                      form.reset();
                    } catch (err) {
                      setStatus({
                        ok: false,
                        msg:
                            "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.",
                      });
                    } finally {
                      setSending(false);
                    }
                  }}
                  className="mt-6 space-y-4"
              >
                {/* Netlify Forms: Hidden Form-Name */}
                <input type="hidden" name="form-name" value="kontakt" />
                {/* Honeypot-Feld gegen Spam: NICHT ausfüllen */}
                <input type="text" name="website" className="hidden" tabIndex="-1" autoComplete="off" />

                <div>
                  <label className="mb-1 block text-sm font-medium">Ihr Name</label>
                  <input
                      name="name"
                      required
                      className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-600 focus:ring"
                      placeholder="Vor- und Nachname"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-600 focus:ring"
                        placeholder="name@firma.de"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Telefon</label>
                    <input
                        name="phone"
                        className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-600 focus:ring"
                        placeholder="+49 …"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Projekt / Nachricht</label>
                  <textarea
                      name="message"
                      rows={5}
                      className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-600 focus:ring"
                      placeholder="Kurze Beschreibung, gewünschter Zeitraum, Ort …"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Mail className="mr-2 h-4 w-4" /> {sending ? "Senden…" : "Nachricht senden"}
                  </button>
                  <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                  >
                    Oder per E-Mail
                  </a>
                  {status && (
                      <p
                          className={`text-xs ${status.ok ? "text-emerald-700" : "text-red-600"}`}
                          aria-live="polite"
                      >
                        {status.msg}
                      </p>
                  )}
                </div>

                <div className="mt-10 grid gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="h-4 w-4" /> {COMPANY.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4" /> {COMPANY.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="h-4 w-4" /> {COMPANY.address}
                  </div>
                </div>
              </form>
            </div>

            <div className="overflow-hidden rounded-2xl border shadow-sm">
              {!mapConsent ? (
                  <div className="flex h-full min-h-[420px] w-full flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <p className="max-w-md text-sm text-slate-700">
                      Zur Anzeige der Karte von Google Maps benötigen wir Ihre Einwilligung. Erst danach wird eine Verbindung
                      zu Google hergestellt und es können personenbezogene Daten übertragen werden.
                    </p>
                    <button
                        onClick={() => setMapConsent(true)}
                        className="mt-4 inline-flex items-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                    >
                      Karte laden
                    </button>
                  </div>
              ) : (
                  <iframe
                      title="Karte"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(`${COMPANY.name} ${COMPANY.city}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      className="h-full min-h-[420px] w-full"
                      loading="lazy"
                  />
              )}
            </div>
        </div>
      </Container>
    </section>
  );
}
// ---- DATENSCHUTZ PAGE ----
function Datenschutz() {
  return (
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Datenschutzerklärung</h2>
            <p className="mt-2 text-sm text-slate-500">Informationen gemäß Art. 13, 14 DSGVO</p>

            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm text-slate-700">
              <h3 className="font-semibold">1. Verantwortlicher</h3>
              <p className="mt-2">
                Dagdelen Bau · Inhaber: Ertugrul Dagdelen · Honsberger Str. 93, 42857 Remscheid ·
                E-Mail: <a className="underline" href="mailto:info@dagdelen-bau.de">info@dagdelen-bau.de</a> ·
                Tel.: 0176 56063469
              </p>

              <h3 className="mt-6 font-semibold">2. Hosting</h3>
              <p className="mt-2">
                Unsere Website wird bei einem externen Anbieter gehostet. Mit dem Hoster besteht ein
                Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an sicherer, schneller Bereitstellung).
              </p>

              <h3 className="mt-6 font-semibold">3. Server-Logfiles</h3>
              <p className="mt-2">
                Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, User-Agent) vorübergehend gespeichert.
              </p>

              <h3 className="mt-6 font-semibold">4. Kontaktformular</h3>
              <p className="mt-2">
                Verarbeiten wir zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Keine Weitergabe ohne Einwilligung.
                Alternativ können Sie uns per E-Mail kontaktieren.
              </p>

              <h3 className="mt-6 font-semibold">5. Karten (Google Maps) – Zwei-Klick-Lösung</h3>
              <p className="mt-2">
                Karten laden wir erst nach Ihrer ausdrücklichen Einwilligung. Erst dann wird eine Verbindung zu Google aufgebaut
                und es können personenbezogene Daten (z. B. IP-Adresse) übertragen werden (Art. 6 Abs. 1 lit. a DSGVO).
              </p>

              <h3 className="mt-6 font-semibold">6. Cookies</h3>
              <p className="mt-2">
                Wir setzen derzeit keine Tracking-Cookies ein. Sollten künftig Dienste eingesetzt werden, die Cookies setzen,
                informieren wir vorab und holen Ihre Einwilligung ein (TTDSG, Art. 6 Abs. 1 lit. a DSGVO).
              </p>

              <h3 className="mt-6 font-semibold">7. Ihre Rechte</h3>
              <p className="mt-2">
                Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch
                (Art. 15–21 DSGVO) sowie Beschwerderecht bei einer Aufsichtsbehörde.
              </p>

              <h3 className="mt-6 font-semibold">8. TLS-Verschlüsselung</h3>
              <p className="mt-2">
                Unsere Website nutzt HTTPS/TLS. Erkennbar an „https://“ und Schloss-Symbol im Browser.
              </p>
            </div>
          </div>
        </Container>
      </section>
  );
}

// ---- IMPRESSUM PAGE ----
function Impressum() {
  return (
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Impressum</h2>
            <p className="mt-2 text-sm text-slate-500">Angaben gemäß § 5 TMG</p>


            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold">Dagdelen Bau</p>
                <p>Inhaber: Ertugrul Dagdelen</p>
                <p>Honsberger Str. 93</p>
                <p>42857 Remscheid</p>
              </div>


              <div className="mt-6 grid gap-1 text-slate-700">
                <p className="font-semibold">Kontakt</p>
                <p>Telefon: 0176 56063469</p>
                <p>E‑Mail: <a className="underline hover:no-underline" href="mailto:info@dagdelen-bau.de">info@dagdelen-bau.de</a></p>
              </div>


              <div className="mt-6 grid gap-1 text-slate-700">
                <p><span className="font-semibold">Steuernummer:</span> 126/5026/3397</p>
                <p><span className="font-semibold">Zuständige Kammer:</span> Handwerkskammer Düsseldorf</p>
                <p><span className="font-semibold">Betriebsnummer:</span> 1891787</p>
              </div>


              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Hinweis zu Qualifikationen & Zertifikaten</p>
                <p className="mt-2">Brandschutzschulungen (Hersteller) · DGUV & Arbeitssicherheit unterwiesen · Rauchmelder‑Zertifikat</p>
              </div>
            </div>


            <div className="prose prose-slate mt-8 max-w-none text-xs">
              <h3><strong>Haftung für Inhalte</strong></h3>
              <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich; nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>


              <h3><strong>Haftung für Links</strong></h3>
              <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten sind stets die jeweiligen Anbieter oder Betreiber verantwortlich.</p>


              <h3><strong>Urheberrecht</strong></h3>
              <p>Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der jeweiligen Rechteinhaber.</p>


              <h3><strong>Verbraucherstreitbeilegung</strong></h3>
              <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).</p>
              <h3><strong>EU-Streitschlichtung</strong></h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <a className="underline" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
                  https://ec.europa.eu/consumers/odr
                </a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </div>
        </Container>
      </section>
  );
}
// ---- FOOTER ----
function Footer({ setRoute }) {
  return (
      <footer className="border-t bg-white py-8 text-sm text-slate-600">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="font-bold text-slate-800">{COMPANY.name}</p>
              <p>{COMPANY.tagline}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {COMPANY.phone}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {COMPANY.email}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {COMPANY.address}</div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Sitemap</p>
              <div className="mt-2 grid gap-1">
                {[
                  { id: "home", label: "Start" },
                  { id: "leistungen", label: "Leistungen" },
                  { id: "unternehmen", label: "Unternehmen" },
                  { id: "kontakt", label: "Kontakt" },
                ].map((l) => (
                    <button
                        key={l.id}
                        onClick={() => setRoute(l.id)}
                        className="w-fit text-left text-slate-700 hover:underline"
                    >
                      {l.label}
                    </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Rechtliches</p>
              <div className="mt-2 grid gap-1">
                <button onClick={() => setRoute('impressum')} className="w-fit text-left text-slate-700 hover:underline">Impressum</button>
                <button onClick={() => setRoute('datenschutz')} className="w-fit text-left text-slate-700 hover:underline">Datenschutz</button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} {COMPANY.name}. Alle Rechte vorbehalten.
          </div>
        </Container>
      </footer>
  );
}

// ---- APP ----
export default function App() {
  const [route, setRoute] = useState("home");

  // Ensure fresh images if the tab stays open long
  const cacheKey = useMemo(() => Date.now(), []);

  return (
    <Root>
      <Nav route={route} setRoute={setRoute} />

      {route === "home" && (
        <>
          <Hero setRoute={setRoute} key={`hero-${cacheKey}`} />
          {/* Teaser Section */}
          <section className="bg-gradient-to-b from-white to-slate-50 py-12">
            <Container>
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Starker Innenausbau für Büro, Gewerbe & Wohnbau
                  </h2>
                  <p className="mt-3 text-slate-700">
                    Von der Planung bis zur Abnahme: {COMPANY.name} liefert
                    hochwertige Trockenbauarbeiten – sauber, schnell und
                    normkonform.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Feature
                      icon={Shield}
                      title="Geprüfte Systeme"
                      desc="Dokumentation & Nachweise inklusive"
                    />
                    <Feature
                      icon={Clock}
                      title="Schnelle Ausführung"
                      desc="Termine, auf die Verlass ist"
                    />
                    <Feature
                      icon={Hammer}
                      title="Saubere Baustelle"
                      desc="Schutz & Ordnung im Bestand"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                  <img
                    src="/photos/handshake_fix.jpg"
                    alt="Trockenbau Beispiel"
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-slate-700">
                      „Die Zusammenarbeit war reibungslos – Termine wurden
                      eingehalten und die Qualität stimmt.“ – <span className="font-medium">Kundenzitat</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => setRoute("leistungen")}
                  className="inline-flex items-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                >
                  Leistungen ansehen <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </Container>
          </section>
        </>
      )}

      {route === "leistungen" && <Leistungen />}
      {route === "unternehmen" && <Unternehmen />}
      {route === "kontakt" && <Kontakt />}
      {route === "impressum" && <Impressum />}
      {route === "datenschutz" && <Datenschutz />}

      <Footer setRoute={setRoute} />
    </Root>
  );
}
