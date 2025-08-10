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
            <div className="h-12 flex items-center justify-center">
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
            poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
      </div>

      {/* Overlay Content */}
      <Container>
        <div className="relative z-10 flex h-[68vh] flex-col items-start justify-end pb-10">
          <div className="mb-2 flex items-center gap-2">
            <Badge>Meisterbetrieb</Badge>
            <Badge>Zuverlässig & sauber</Badge>
          </div>
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
                <article key={s.key} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                  <div className="relative h-56 w-full">
                    <img
                        src={s.image}
                        alt={s.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow">
                      {s.title}
                    </div>
                  </div>
                  <div className="grid gap-0 md:grid-cols-[1fr_320px]">
                    <div className="p-5">
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
    { label: "Jahre Erfahrung", value: "10+" },
    { label: "abgeschl. Projekte/Jahr", value: "80+" },
    { label: "Mitarbeitende", value: "15" },
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
              Wir stehen für saubere Arbeit, verlässliche Absprachen und
              transparente Kalkulation. Ob Ausbau im Bestand, Gewerbe oder
              Neubau – wir liefern Qualität, die bleibt.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
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
                src="https://source.unsplash.com/1200x900/?construction,team"
                alt="Team am Bau"
                className="h-72 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <h3 className="text-lg font-bold">Unsere Mission</h3>
                <p className="text-slate-700">
                  Handwerk mit Anspruch: Wir verbinden fachliche Präzision mit
                  freundlicher Kommunikation und einem Auge fürs Detail. So
                  entstehen Räume, in denen man sich wohlfühlt.
                </p>
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Mitgliedschaften & Qualifikationen</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Brandschutzschulungen (Hersteller)</li>
                    <li>DGUV & Arbeitssicherheit unterwiesen</li>
                    <li>Nachweis Q3/Q4-Oberflächenverarbeitung</li>
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
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const payload = Object.fromEntries(data.entries());
                alert(
                  `Danke! Wir melden uns.\\n\\n${JSON.stringify(payload, null, 2)}`
                );
                e.currentTarget.reset();
              }}
              className="mt-6 space-y-4"
            >
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
                  className="inline-flex items-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                >
                  <Mail className="mr-2 h-4 w-4" /> Nachricht senden
                </button>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Oder per E-Mail
                </a>
              </div>
            </form>

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
          </div>

          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <iframe
              title="Karte"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${COMPANY.name} ${COMPANY.city}`
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
            />
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
            <p className="mt-2 text-slate-500">
              Platzhalter für Impressum & Datenschutz. (Ersetzen vor Livegang.)
            </p>
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
                    src="/public/photos/handshake.jpg"
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

      <Footer setRoute={setRoute} />
    </Root>
  );
}
