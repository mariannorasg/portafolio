import React, { useState, useMemo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarImg from "/avatar.png"; // 👉 agrega tu imagen en la carpeta correspondiente y ajusta la ruta si hace falta

// =====================
// 🔧 Personaliza acá
// =====================
const NAME = "Mariano Rasgido";
const TITLE = "Pentesting & Desarrollo Web";
const TAGLINE =
  "Creo soluciones limpias y seguras. Me enfoco en pentesting, desarrollo front‑end y automatización.";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mariannorasg", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mariano-rasgido-a48213297/", icon: Linkedin },
  { label: "Email", href: "mailto:mariano.rasggido@gmail.com", icon: Mail },
];

const EXPERIENCE = [
  { period: "2023 — 2025", title: "Pentester en formación", place: "Laboratorio personal (Kali + Metasploitable)" },
  { period: "2021 — 2023", title: "Front‑End Developer", place: "Freelance" },
];

const EDUCATION = [
  { period: "2025 — 2026", title: "Tecnicatura En Programacion (en curso)", place: "UTN" },
  { period: "Cursos", title: "Seguridad Ofensiva, Redes, Linux", place: "Autodidacta / Plataformas online" },
];

const TECHS = [
  "Kali Linux",
  "Nmap",
  "Hydra",
  "Metasploit",
  "Burp Suite",
  "Dirb / Gobuster",
  "SMB / FTP",
  "Python",
  "Bash",
  "Git / GitHub",
  "React",
  "TailwindCSS",
  "Framer Motion",
];

const PROJECTS = [
  {
    title: "Lab de Pentesting – Metasploitable 2",
    description: "Reconocimiento (Nmap), explotación (vsftpd, Samba), post‑explotación y reporte.",
    tags: ["Nmap", "Hydra", "SMB", "Metasploit"],
    href: "https://github.com/mariannorasg/metasploitable2-pentesting-lab",
  },
  {
    title: "Password Hashing CLI",
    description: "Herramienta en Python para generar y verificar hashes PBKDF2‑SHA256.",
    tags: ["Python", "CLI", "Criptografía"],
    href: "https://github.com/mariannorasg/passhash",
  },
  {
    title: "Landing minimalista",
    description: "Plantilla responsive oscura con Tailwind y animaciones.",
    tags: ["Tailwind", "React", "UI"],
    href: "https://github.com/tuusuario/landing-dark-grid",
  },
];

// ================
// 🔹 Animaciones base
// ================
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// =====================
// 🔳 Card básica (hover‑lift)
// =====================
function Card({ children, className = "", innerClass = "" }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      whileTap={{ y: -2 }}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black via-neutral-900 to-purple-900/30 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className={`relative z-10 ${innerClass}`}>{children}</div>
    </motion.div>
  );
}

// =====================
// ✨ Card destacable (resaltado diagonal al navegar)
// =====================
function HighlightableCard({ highlightKey, activeKey, onAnimationEnd, children, className = "", innerClass = "" }) {
  const isActive = activeKey === highlightKey;
  return (
    <Card className={`is-highlightable ${className}`} innerClass={innerClass}>
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="sweep"
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute -inset-[30%] rotate-12"
              initial={{ x: "-60%" }}
              animate={{ x: "60%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              onAnimationComplete={onAnimationEnd}
              style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </Card>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-sm tracking-wider text-neutral-400">
      {Icon && <Icon size={16} className="opacity-80" />} <span>{children}</span>
    </div>
  );
}

// 👉 Avatar con PNG (usa object-cover y borde redondeado)
function AvatarImgBlock() {
  return (
    <div className="relative inline-flex h-29 w-29 items-center justify-center overflow-hidden rounded-2xl">
      <img src={AvatarImg} alt="Avatar" className="h-full w-full rounded-2xl object-cover" />
    </div>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="whitespace-nowrap rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
    >
      {children}
    </a>
  );
}

function Badge({ children }) {
  return <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">{children}</span>;
}

// =====================
// 🪟 Modal de proyecto (con carrusel + blur global)
// =====================
function ProjectModal({ openIndex, setOpenIndex, projects }) {
  const close = () => setOpenIndex(null);
  const count = projects.length;
  const go = (dir) => {
    if (openIndex === null) return;
    setOpenIndex((i) => (i === null ? 0 : (i + dir + count) % count));
  };
  const project = openIndex !== null ? projects[openIndex] : null;

  // Cerrar con ESC
  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[80] flex items-center justify-center" // 👈 CENTRADO CON FLEX
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fondo blur + oscuro */}
          <div onClick={close} className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            className="relative z-[90] w-[92vw] max-w-3xl mx-4" // 👈 centrado y con margen lateral
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black via-neutral-900 to-purple-900/30 p-6 shadow-2xl">
              <button
                onClick={close}
                className="absolute right-3 top-3 rounded-md border border-neutral-700/60 bg-neutral-900/70 p-2 text-neutral-300 hover:bg-neutral-800"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              <div className="flex items-center justify-between pb-4">
                <h3 className="text-xl font-semibold text-white/90">{project?.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    className="rounded-md border border-neutral-700/60 bg-neutral-900/70 p-2 hover:bg-neutral-800"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="rounded-md border border-neutral-700/60 bg-neutral-900/70 p-2 hover:bg-neutral-800"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-400">{project?.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project?.tags?.map((t) => (
                  <span key={t} className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
                href={project?.href}
                target="_blank"
                rel="noreferrer"
              >
                Ver repositorio <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// =====================
// 📩 Focus de Contacto (overlay centrado + blur global)
// =====================
function ContactBlock() {
  return (
    <>
      <SectionTitle icon={Mail}>CONTACTO</SectionTitle>
      <p className="mb-3 max-w-xl text-neutral-400">¿Tenés una idea o proyecto? Escribime y coordinamos una reunión.</p>
      <div className="flex flex-wrap gap-3">
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90">
            <Icon size={16} /> {label}
          </a>
        ))}
      </div>
    </>
  );
}

function ContactFocus({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-focus"
          className="fixed inset-0 z-[85] flex items-center justify-center"  // 👈 centra con flex
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Capa de fondo: blur + oscurecido */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Panel centrado */}
          <motion.div
            className="relative z-[90] w-[92vw] max-w-2xl mx-4"  // 👈 centrado y con margen lateral en mobile
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-black via-neutral-900 to-purple-900/30 p-6 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-md border border-neutral-700/60 bg-neutral-900/70 p-2 text-neutral-300 hover:bg-neutral-800"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
              <ContactBlock />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// =====================
// 🌑 Página principal
// =====================
export default function PortfolioLanding() {
  const [highlight, setHighlight] = useState(null);
  const [openProjectIndex, setOpenProjectIndex] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  const sections = useMemo(
    () => [
      { key: "sobremi", label: "Sobre Mi", selector: "#sobremi" },
      { key: "experiencia", label: "Experiencia", selector: "#experiencia" },
      { key: "educacion", label: "Educación", selector: "#educacion" },
      { key: "conocimientos", label: "Conocimientos", selector: "#conocimientos" },
      { key: "proyectos", label: "Proyectos", selector: "#projects" },
      { key: "contacto", label: "Contacto", selector: "#contact" },
      { key: "credenciales", label: "Credenciales", selector: "#credenciales" },
    ],
    []
  );

  const triggerHighlight = (key, target) => {
    setHighlight(key);
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 antialiased flex flex-col items-center">
      {/* HEADER: menú centrado, sin logo a la izquierda */}
      <header className="sticky top-0 z-[120] w-full border-b border-neutral-900/60 bg-gradient-to-b from-white/10 to-black/40 backdrop-blur">
  <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
    {/* Columna izquierda vacía (para centrar real) */}
    <div />

    {/* NAV centrado; nos aseguramos que esté arriba y reciba clics */}
    <nav className="relative z-[2] hidden md:flex justify-center gap-1 pointer-events-auto">
      {sections.map((s) => (
        <a
          key={s.key}
          href={s.selector}
          onClick={(e) => {
            e.preventDefault();
            triggerHighlight(s.key, s.selector);
          }}
          className="whitespace-nowrap rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
        >
          {s.label}
        </a>
      ))}
    </nav>

    {/* Botón a la derecha; le bajamos el z para no tapar el nav */}
    <div className="relative z-[1] flex justify-end pointer-events-auto">
      <button
        onClick={() => {
          setContactOpen(true);
          setHighlight("contacto");
        }}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
      >
        Contactame <ArrowRight size={16} />
      </button>
    </div>
  </div>
</header>


      {/* MAIN */}
      <main id="home" className="mx-auto w-full max-w-5xl px-4 pb-24 pt-10 md:pt-16">
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-3">
          {/* Avatar + Sobre mi con imagen */}
          <HighlightableCard
            highlightKey="sobremi"
            activeKey={highlight}
            onAnimationEnd={() => setHighlight(null)}
            className="md:col-span-1 flex items-center justify-center"
            innerClass="flex items-center justify-center"
            id="sobremi"
          >
            <AvatarImgBlock />
          </HighlightableCard>

          {/* Sobre mi */}
          <HighlightableCard highlightKey="sobremi" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-2" id="about">
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{NAME}</h1>
              <p className="text-lg text-neutral-300">{TITLE}</p>
              <p className="max-w-2xl text-neutral-400">{TAGLINE}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900 hover:text-white">
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </HighlightableCard>

          {/* Experiencia */}
          <HighlightableCard highlightKey="experiencia" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-1" id="experiencia">
            <SectionTitle icon={Briefcase}>EXPERIENCIA</SectionTitle>
            <ul className="space-y-4">
              {EXPERIENCE.map((exp, i) => (
                <li key={i} className="group">
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium text-white/90">{exp.title}</p>
                    <span className="text-xs text-neutral-400">{exp.period}</span>
                  </div>
                  <p className="text-sm text-neutral-400">{exp.place}</p>
                </li>
              ))}
            </ul>
          </HighlightableCard>

          {/* Educación */}
          <HighlightableCard highlightKey="educacion" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-1" id="educacion">
            <SectionTitle icon={GraduationCap}>EDUCACIÓN</SectionTitle>
            <ul className="space-y-4">
              {EDUCATION.map((ed, i) => (
                <li key={i}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium text-white/90">{ed.title}</p>
                    <span className="text-xs text-neutral-400">{ed.period}</span>
                  </div>
                  <p className="text-sm text-neutral-400">{ed.place}</p>
                </li>
              ))}
            </ul>
          </HighlightableCard>

          {/* Conocimientos */}
          <HighlightableCard highlightKey="conocimientos" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-1" id="conocimientos">
            <SectionTitle icon={Sparkles}>CONOCIMIENTOS</SectionTitle>
            <p className="mb-3 text-sm text-neutral-400">Tecnologías y herramientas que uso frecuentemente.</p>
            <div className="flex flex-wrap gap-2">
              {TECHS.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </HighlightableCard>

          {/* Proyectos */}
          <HighlightableCard highlightKey="proyectos" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-3" id="projects">
            <SectionTitle icon={ExternalLink}>PROYECTOS</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <div key={i} className="group block rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition hover:-translate-y-0.5 hover:border-neutral-700 hover:bg-neutral-900">
                  <div className="mb-2 flex items-center justify-between">
                    <button onClick={() => setOpenProjectIndex(i)} className="font-semibold text-left text-white/90 underline-offset-4 hover:underline">
                      {p.title}
                    </button>
                    <ExternalLink size={16} className="opacity-60 transition group-hover:opacity-100" />
                  </div>
                  <p className="mb-3 text-sm text-neutral-400">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </HighlightableCard>

          {/* Contacto */}
          <HighlightableCard highlightKey="contacto" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-2" id="contact">
            <ContactBlock />
          </HighlightableCard>

          {/* Credenciales */}
          <HighlightableCard highlightKey="credenciales" activeKey={highlight} onAnimationEnd={() => setHighlight(null)} className="md:col-span-1" id="credenciales">
            <SectionTitle icon={ExternalLink}>CREDENCIALES</SectionTitle>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Cert. Google Cybersecurity (en curso)</li>
              <li>• Curso Linux Essentials</li>
              <li>• Inglés B1/B2</li>
            </ul>
          </HighlightableCard>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900/60 py-10 w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} {NAME}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="text-neutral-400 transition hover:text-white">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* MODALES */}
      <ProjectModal openIndex={openProjectIndex} setOpenIndex={setOpenProjectIndex} projects={PROJECTS} />
      <ContactFocus open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
