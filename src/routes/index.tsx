import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Instagram,
  Clock,
  ArrowRight,
  Scissors,
} from "lucide-react";


const BOOKSY_URL =
  "https://booksy.com/pt-br/326046_barbearia-bodevan_barbearias_459592_belo-horizonte";
const INSTAGRAM_URL = "https://instagram.com/barbeariabodevan";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Santo+Ant%C3%B4nio,+195,+S%C3%A3o+Tomaz,+Belo+Horizonte,+MG,+31741-150";
const PHONE_DISPLAY = "+55 31 9963-3339";
const PHONE_TEL = "https://wa.me/553199633339";

const SITE_URL = "https://bodevan-s-barber-lounge.vercel.app/";
const OG_IMAGE = "https://bodevan-s-barber-lounge.vercel.app/images/og-bodevan.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Barbearia Bodevan | Belo Horizonte" },
      {
        name: "description",
        content:
          "Barbearia Bodevan — since 2023. Corte masculino, barboterapia, combos e planos mensais na Rua Santo Antônio, 195, São Tomaz, Belo Horizonte — MG. Agende pelo Booksy.",
      },
      { property: "og:title", content: "Barbearia Bodevan | Belo Horizonte" },
      {
        property: "og:description",
        content:
          "Encontre a sua melhor versão. Barba, cabelo e bigode em Belo Horizonte — MG. Agende seu horário pelo Booksy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Logo da Barbearia Bodevan" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Barbearia Bodevan | Belo Horizonte" },
      {
        name: "twitter:description",
        content:
          "Encontre a sua melhor versão. Barba, cabelo e bigode em Belo Horizonte — MG. Agende seu horário pelo Booksy.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

/* ---------- scroll reveal ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- shared bits ---------- */
function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm text-primary">{index}</span>
      <span className="h-px w-10 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function BooksyButton({
  children = "Agendar horário",
  className = "",
  large = false,
}: {
  children?: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <a
      href={BOOKSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 bg-primary font-display uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/85 ${
        large ? "px-10 py-4 text-xl" : "px-6 py-3 text-base"
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function GhostButton({
  href,
  children,
  external = false,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center gap-2 border border-foreground/25 px-6 py-3 font-display text-base uppercase tracking-[0.15em] text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}

/* ---------- header ---------- */
const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "A Bodevan", href: "#a-bodevan" },
  { label: "Galeria", href: "#galeria" },
  { label: "Localização", href: "#localizacao" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/95 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src={"/images/bodevan-image-5.jpg"}
            alt="Logo Barbearia Bodevan"
            className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
          />
          <span className="font-display text-xl tracking-[0.12em] md:text-2xl">
            BODEVAN
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <BooksyButton className="!px-5 !py-2.5">Agendar</BooksyButton>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 font-display text-2xl uppercase tracking-[0.1em] text-foreground"
              >
                {item.label}
              </a>
            ))}
            <BooksyButton className="mt-4 w-full" large>
              Agendar horário
            </BooksyButton>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ---------- data ---------- */
const SERVICES = [
  { name: "Corte de cabelo masculino", price: "R$ 35", time: "30 min", desc: "Corte clássico ou moderno, finalizado do seu jeito." },
  { name: "Barboterapia", price: "R$ 35", time: "30 min", desc: "Barba completa com toalha quente e acabamento preciso." },
  { name: "Corte infantil", price: "R$ 40", time: "40 min", desc: "Atendimento paciente e caprichado para os pequenos." },
  { name: "Sobrancelhas", price: "R$ 10", time: "10 min", desc: "Alinhamento e design na navalha." },
  { name: "Limpeza de pele", price: "R$ 40", time: "40 min", desc: "Cuidado facial para renovar a pele." },
  { name: "Relaxamento capilar", price: "R$ 30", time: "20 min", desc: "Fios alinhados e com aspecto natural." },
  { name: "Platinado", price: "R$ 120", time: "2h", desc: "Descoloração completa com acabamento profissional." },
  { name: "Luzes", price: "R$ 120", time: "2h", desc: "Mechas iluminadas com técnica e precisão." },
  { name: "Tintura — preto", price: "R$ 30", time: "30 min", desc: "Cobertura uniforme e resultado natural." },
];

const COMBOS = [
  { name: "Corte Pai & Filho", price: "R$ 70", time: "1h", featured: false },
  { name: "Corte + Barboterapia", price: "R$ 65", time: "1h", featured: false },
  { name: "Corte + Sobrancelhas", price: "R$ 45", time: "30 min", featured: false },
  { name: "Corte + Barboterapia + Sobrancelhas", price: "R$ 65", time: "1h", featured: true },
];

const PLANS = [
  { name: "Corte + Barboterapia", tag: "Plano mensal" },
  { name: "Corte de cabelo", tag: "Plano mensal" },
  { name: "Barboterapia", tag: "Plano mensal" },
];

/* ---------- page ---------- */
function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ===== HERO ===== */}
      <section id="inicio" className="relative flex min-h-svh items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={"/images/bodevan-image.jpg"}
            alt="Cadeira de barbeiro da Barbearia Bodevan"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-40 md:px-8 md:pb-36">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Barbearia Bodevan • Since 2023
          </p>
          <h1 className="reveal mt-6 font-display text-[17vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl">
            Encontre a sua
            <br />
            <span className="text-primary">melhor versão.</span>
          </h1>
          <p className="reveal mt-6 max-w-md text-lg text-muted-foreground">
            Barba, cabelo e bigode.
          </p>
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BooksyButton large>Agendar horário</BooksyButton>
            <GhostButton href="#servicos">Conhecer serviços</GhostButton>
          </div>
          <p className="reveal mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Belo Horizonte • MG
          </p>
        </div>

        {/* circular logo detail */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-primary/20" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-primary/10" />
      </section>

      {/* ===== IMPACT STRIP ===== */}
      <section className="overflow-hidden border-y border-border bg-secondary py-5">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8" aria-hidden={dup === 1}>
              {["Corte", "Barba", "Estilo", "Experiência"].map((word) => (
                <span key={word} className="flex items-center gap-8">
                  <span className="font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
                    {word}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="servicos" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="reveal">
          <SectionTag index="01" label="Serviços" />
          <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            Seu estilo, <span className="text-primary">do seu jeito.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Escolha o serviço que combina com você.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.name}
              className="reveal group flex flex-col bg-card p-6 transition-colors hover:bg-secondary"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">
                  {s.name}
                </h3>
                <span className="font-display text-2xl text-primary">{s.price}</span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Clock className="h-3 w-3" /> {s.time}
              </p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.desc}</p>
              <a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors group-hover:text-primary"
              >
                Agendar <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ===== COMBOS ===== */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionTag index="02" label="Combos" />
              <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
                Combos <span className="text-primary">Bodevan</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Mais cuidado em uma única visita.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMBOS.map((c) => (
              <article
                key={c.name}
                className={`reveal relative flex flex-col border p-6 transition-colors ${
                  c.featured
                    ? "border-primary bg-card"
                    : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                {c.featured && (
                  <span className="absolute -top-px right-6 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                    Completo
                  </span>
                )}
                <Scissors className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-wide">
                  {c.name}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {c.time}
                </p>
                <span className="mt-6 font-display text-4xl text-foreground">{c.price}</span>
                <a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 font-display text-sm uppercase tracking-[0.15em] transition-colors ${
                    c.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/85"
                      : "border border-foreground/25 text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  Agendar
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionTag index="03" label="Planos mensais" />
            <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              Vire <span className="text-primary">mensalista.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Transforme seus cuidados em parte da sua rotina.
            </p>
            <BooksyButton className="mt-8">Conhecer planos</BooksyButton>
          </div>
          <div className="flex flex-col divide-y divide-border border border-border">
            {PLANS.map((p, i) => (
              <div key={p.name} className="reveal flex items-center gap-6 bg-card p-6">
                <span className="font-display text-3xl text-primary">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide">{p.name}</h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {p.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="a-bodevan" className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="reveal relative order-2 lg:order-1">
            <div className="overflow-hidden border border-border">
              <img
                src={"/images/bodevan-image-4.jpg"}
                alt="Interior da Barbearia Bodevan"
                className="img-editorial aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 flex h-28 w-28 items-center justify-center rounded-full border border-primary/40 bg-background md:-right-5 md:h-36 md:w-36">
              <span className="text-center font-display text-sm uppercase leading-tight tracking-[0.2em] text-primary">
                Since
                <br />
                2023
              </span>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <SectionTag index="04" label="A Bodevan" />
            <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              Mais que <span className="text-primary">um corte.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Barba, cabelo e bigode em um ambiente pensado para você.
            </p>
            <div className="rule-red mt-10 w-40" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Barbearia Bodevan • Barbershop
            </p>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="galeria" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="reveal">
          <SectionTag index="05" label="Galeria" />
          <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            Conheça <span className="text-primary">o ambiente.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="reveal col-span-2 row-span-2 overflow-hidden border border-border">
            <img src={"/images/bodevan-image.jpg"} alt="Cadeira de barbeiro" className="img-editorial h-full w-full object-cover" />
          </div>
          <div className="reveal overflow-hidden border border-border">
            <img src={"/images/bodevan-image-2.jpg"} alt="Sofá da recepção" className="img-editorial aspect-square w-full object-cover" />
          </div>
          <div className="reveal overflow-hidden border border-border">
            <img src={"/images/bodevan-image-3.jpg"} alt="Área de atendimento" className="img-editorial aspect-square w-full object-cover" />
          </div>
          <div className="reveal col-span-2 overflow-hidden border border-border">
            <img src={"/images/bodevan-image-4.jpg"} alt="Espaço da barbearia" className="img-editorial aspect-[2/1] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section id="localizacao" className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-2">
          <div className="reveal">
            <SectionTag index="06" label="Localização" />
            <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              Encontre <span className="text-primary">a Bodevan.</span>
            </h2>
            <div className="mt-8 space-y-5">
              <p className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  Rua Santo Antônio, 195 — São Tomaz
                  <br />
                  Belo Horizonte — MG • 31741-150
                </span>
              </p>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={PHONE_TEL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <GhostButton href={MAPS_URL} external>
                Como chegar
              </GhostButton>
              <GhostButton href={INSTAGRAM_URL} external>
                Ver Instagram
              </GhostButton>
            </div>
          </div>
          <div className="reveal overflow-hidden border border-border">
            <iframe
              title="Mapa da Barbearia Bodevan"
              src="https://www.google.com/maps?q=Rua%20Santo%20Ant%C3%B4nio%2C%20195%2C%20S%C3%A3o%20Tomaz%2C%20Belo%20Horizonte%20-%20MG%2C%2031741-150&output=embed"
              className="h-full min-h-[320px] w-full grayscale invert-[0.9] contrast-[0.9]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-primary/20" />
        <div className="pointer-events-none absolute -left-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-primary/10" />
        <div className="mx-auto max-w-7xl px-4 py-28 text-center md:px-8 md:py-40">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Barbearia Bodevan • Since 2023
          </p>
          <h2 className="reveal mx-auto mt-6 max-w-4xl font-display text-6xl leading-[0.9] md:text-8xl">
            Seu próximo corte <span className="text-primary">começa aqui.</span>
          </h2>
          <p className="reveal mt-6 text-lg text-muted-foreground">
            Escolha seu serviço e agende seu horário.
          </p>
          <div className="reveal mt-10">
            <BooksyButton large>Agendar horário</BooksyButton>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <img src={"/images/bodevan-image-5.jpg"} alt="Logo Barbearia Bodevan" className="h-12 w-12 rounded-full object-cover" />
                <span className="font-display text-2xl tracking-[0.12em]">BODEVAN</span>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Barbershop • Since 2023
              </p>
            </div>
            <nav className="flex flex-col gap-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Instagram className="h-4 w-4 text-primary" /> @barbeariabodevan
              </a>
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Scissors className="h-4 w-4 text-primary" /> Agendar pelo Booksy
              </a>
              <a href={PHONE_TEL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Phone className="h-4 w-4 text-primary" /> {PHONE_DISPLAY}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Rua Santo Antônio, 195 — São Tomaz, Belo Horizonte — MG
              </span>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} Barbearia Bodevan. Todos os direitos reservados.</span>
            <span className="uppercase tracking-[0.25em]">Belo Horizonte • MG</span>
          </div>
        </div>
      </footer>

      {/* ===== MOBILE STICKY BAR ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <BooksyButton className="w-full" large>
          Agendar horário
        </BooksyButton>
      </div>
      <div className="h-20 lg:hidden" />
    </div>
  );
}
