"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Crosshair,
  FileText,
  Flag,
  Globe2,
  MessageCircle,
  Radio,
  ScrollText,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { siteWhatsAppUrl } from "@/lib/site";
import { elementRuneIcons } from "./ElementIcons";
import { Starfield } from "./Starfield";

type FeatureId = "pokedex" | "captura" | "exploracao" | "canal" | "eventos";
type FooterPanelId = "privacy" | "terms" | "safety";

type Feature = {
  id: FeatureId;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  color: string;
  secondary: string;
  surface: string;
  assetPath: string;
  assetClassName?: string;
  orbit: {
    x: number;
    y: number;
  };
};

const brandLogoPath = "pokestor-assets/logo.webp";
const coreAssetPath = "pokestor-assets/core.webp";

const features: Feature[] = [
  {
    id: "pokedex",
    title: "Pokedex",
    eyebrow: "Arquivo estelar",
    description: "Descubra criaturas, raridades e tipos em um compendio vivo feito para treinadores curiosos.",
    detail: "Registre encontros, estude elementos e avance na sua colecao com visao estrategica.",
    color: "#d48cff",
    secondary: "#7c3aed",
    surface: "#2d1452",
    assetPath: "pokestor-assets/pokedex.webp",
    assetClassName: "scale-[0.94]",
    orbit: { x: 50, y: 15 },
  },
  {
    id: "captura",
    title: "Captura",
    eyebrow: "Cacada mistica",
    description: "Aprenda a ler padroes, escolher o momento certo e cercar monstros dificeis com precisao.",
    detail: "Rotas, iscas e combinacoes raras se conectam para deixar sua jornada mais afiada.",
    color: "#7df9ae",
    secondary: "#0f9f6e",
    surface: "#0d4941",
    assetPath: "pokestor-assets/captura.webp",
    orbit: { x: 86, y: 43 },
  },
  {
    id: "exploracao",
    title: "Exploracao",
    eyebrow: "Mapa dourado",
    description: "Viaje por regioes secretas, ruinas cintilantes e zonas lendarias escondidas na orbita.",
    detail: "Cada nova area abre encontros, reliquias e objetivos para continuar expandindo o universo.",
    color: "#ffcf6d",
    secondary: "#c58620",
    surface: "#62410e",
    assetPath: "pokestor-assets/exploracao.webp",
    assetClassName: "scale-[1.06]",
    orbit: { x: 74, y: 79 },
  },
  {
    id: "canal",
    title: "Canal",
    eyebrow: "Transmissao ativa",
    description: "Entre na frequencia da comunidade e acompanhe avisos, drops e novidades sem perder nada.",
    detail: "O canal reune treinadores, guias rapidos e convites para os momentos mais importantes.",
    color: "#5bd9ff",
    secondary: "#1d8fd6",
    surface: "#0f3774",
    assetPath: "pokestor-assets/canal.webp",
    assetClassName: "scale-[0.96]",
    orbit: { x: 26, y: 79 },
  },
  {
    id: "eventos",
    title: "Eventos",
    eyebrow: "Alertas raros",
    description: "Fique por dentro de desafios temporarios, recompensas especiais e cacadas comemorativas.",
    detail: "Quando a orbita muda, os eventos trazem itens exclusivos e encontros que nao se repetem.",
    color: "#ff875f",
    secondary: "#d9485c",
    surface: "#742415",
    assetPath: "pokestor-assets/eventos.webp",
    assetClassName: "scale-[1.06]",
    orbit: { x: 14, y: 43 },
  },
];

const footerPanels: Record<
  FooterPanelId,
  {
    title: string;
    eyebrow: string;
    paragraphs: string[];
    bullets: string[];
  }
> = {
  privacy: {
    title: "Politica de privacidade",
    eyebrow: "Privacidade visivel",
    paragraphs: [
      "Esta landing apresenta o universo Pokestor e, no estado atual, nao solicita senha, documento ou pagamento direto para navegar.",
      "Em publicacao, qualquer coleta de navegacao deve ficar restrita a metricas essenciais, desempenho e melhoria da experiencia. Se formularios forem adicionados depois, a finalidade, o armazenamento e o canal oficial de contato precisam ficar explicitos.",
    ],
    bullets: [
      "Sem coleta de senha nesta versao da pagina",
      "Dados sensiveis nao sao exigidos para explorar a landing",
      "Analytics e cookies devem ser informados quando ativos",
    ],
  },
  terms: {
    title: "Termos de uso",
    eyebrow: "Uso da pagina",
    paragraphs: [
      "O conteudo desta pagina apresenta a proposta, os modulos e a identidade visual do projeto. A navegacao deve ser usada apenas para consulta, descoberta e acesso aos canais oficiais publicados pelo projeto.",
      "Ao abrir publicamente, vale manter este bloco atualizado com regras de uso, limites de responsabilidade, propriedade visual/textual e orientacoes sobre canais oficiais para evitar duvidas e imitacoes.",
    ],
    bullets: [
      "O WhatsApp oficial deve ficar visivel no rodape",
      "Conteudos e artes precisam ter autoria clara",
      "Atualize regras e contatos sempre que mudar a operacao",
    ],
  },
  safety: {
    title: "Seguranca e confianca",
    eyebrow: "Boas praticas",
    paragraphs: [
      "A forma mais forte de transmitir confianca aqui nao e usar selo decorativo, e sim mostrar informacao verificavel: HTTPS ativo, politicas acessiveis, canal oficial visivel e nenhuma promessa falsa de seguranca.",
      "Como esta landing nao faz checkout, o melhor bloco de confianca e direto: sem pagamento nesta pagina, sem pedido de senha e com WhatsApp oficial e documentos institucionais sempre ao alcance.",
    ],
    bullets: [
      "Sem pagamento ou checkout nesta pagina",
      "Sem pedido de senha para navegar",
      "WhatsApp oficial e politicas devem ficar visiveis",
    ],
  },
};

const galaxyParticles = Array.from({ length: 90 }, (_, index) => {
  const angle = (index / 90) * Math.PI * 2;
  const radiusX = 300 + Math.sin(index * 1.7) * 26 + (index % 5) * 8;
  const radiusY = 120 + Math.cos(index * 1.2) * 18 + (index % 3) * 6;
  const fill = index % 3 === 0 ? "#60a5fa" : index % 2 === 0 ? "#f472b6" : "#c084fc";

  return {
    cx: 500 + Math.cos(angle) * radiusX,
    cy: 280 + Math.sin(angle) * radiusY,
    r: 1.2 + (index % 4) * 0.45,
    fill,
    opacity: 0.4 + (index % 5) * 0.08,
  };
});

function coreFieldWrapperClass(compact: boolean) {
  return compact
    ? "absolute left-1/2 top-[49%] h-[18rem] w-full max-w-[18.75rem] -translate-x-1/2 -translate-y-1/2 sm:h-[24rem] sm:max-w-[28rem]"
    : "absolute left-1/2 top-1/2 h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/2";
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => value + value)
          .join("")
      : normalized;

  const numeric = Number.parseInt(expanded, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function featureIcon(featureId: FeatureId, className: string) {
  switch (featureId) {
    case "pokedex":
      return <BookOpen className={className} strokeWidth={1.65} />;
    case "captura":
      return <Crosshair className={className} strokeWidth={1.65} />;
    case "exploracao":
      return <Award className={className} strokeWidth={1.65} />;
    case "canal":
      return <Radio className={className} strokeWidth={1.65} />;
    case "eventos":
      return <Flag className={className} strokeWidth={1.65} />;
  }
}

function FeatureArt({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <img
        src={feature.assetPath}
        alt={feature.title}
        draggable="false"
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_26px_rgba(255,255,255,0.14)] ${feature.assetClassName ?? ""}`}
      />
    </div>
  );
}

function TopNav() {
  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[rgba(4,2,12,0.82)] shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212, 140, 255, 0.4) 30%, rgba(103, 215, 255, 0.35) 70%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4 lg:px-10">
        <a
          href="#universo"
          onClick={() => trackEvent("cta_click", { cta: "header_logo", section: "header", target: "universo" })}
          className="pointer-events-auto inline-flex min-w-0 flex-1 items-center gap-3 text-white/90 transition-transform hover:scale-[1.02]"
        >
          <div className="relative h-11 w-[11rem] min-w-0 overflow-visible sm:h-[3.35rem] sm:w-[13.9rem] lg:w-[15.4rem]">
            <img
              src={brandLogoPath}
              alt="Pokestor"
              draggable="false"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full origin-left scale-[1.05] object-contain object-left drop-shadow-[0_0_12px_rgba(212,140,255,0.18)] contrast-[1.02] saturate-[1.02] sm:scale-[1.32] lg:scale-[1.5]"
            />
          </div>
        </a>

        <div className="pointer-events-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#orbita"
            aria-label="Ir para a orbita principal"
            onClick={() => trackEvent("cta_click", { cta: "header_orbita", section: "header", target: "orbita" })}
            className="pixel-cut hidden h-10 w-10 items-center justify-center border bg-black/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/80 min-[390px]:flex sm:h-12 sm:w-12"
            style={{
              borderColor: "rgba(218, 170, 255, 0.45)",
              boxShadow: "0 0 20px rgba(180, 99, 255, 0.18)",
            }}
          >
            <Globe2 className="h-4 w-4 text-fuchsia-100 sm:h-5 sm:w-5" strokeWidth={1.65} />
          </a>
          <a
            href="#jornada"
            onClick={() => trackEvent("cta_click", { cta: "header_entrar", section: "header", target: "jornada" })}
            className="pixel-cut inline-flex h-10 items-center gap-2 border px-3 text-[0.54rem] uppercase tracking-[0.16em] text-fuchsia-50 transition-all duration-300 hover:-translate-y-0.5 min-[400px]:px-4 min-[400px]:text-[0.58rem] sm:h-12 sm:gap-3 sm:px-5 sm:text-[0.64rem] sm:tracking-[0.2em]"
            style={{
              borderColor: "rgba(240, 171, 252, 0.6)",
              background:
                "linear-gradient(180deg, rgba(22, 10, 37, 0.92) 0%, rgba(8, 5, 22, 0.78) 100%)",
              boxShadow: "0 0 24px rgba(236, 72, 153, 0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <span className="font-display">Entrar</span>
            <ArrowRight className="h-3.5 w-3.5 text-fuchsia-100 sm:h-4 sm:w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function NebulaClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div
        className="absolute left-[-12rem] top-[12rem] h-[22rem] w-[30rem] rotate-[-8deg] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 40% 50%, rgba(159, 84, 255, 0.28) 0%, rgba(111, 43, 180, 0.22) 25%, rgba(14, 4, 26, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-7rem] left-[-6rem] h-[20rem] w-[24rem] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(138, 92, 246, 0.25) 0%, rgba(93, 31, 123, 0.18) 34%, rgba(11, 3, 22, 0) 72%)",
        }}
      />
      <div
        className="absolute right-[-6rem] top-[12rem] h-[24rem] w-[19rem] rounded-full blur-[95px]"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.24) 0%, rgba(37, 99, 235, 0.15) 38%, rgba(7, 8, 30, 0) 74%)",
        }}
      />
      <div
        className="absolute bottom-[8rem] right-[-2rem] h-[26rem] w-[16rem] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 25% 50%, rgba(59, 130, 246, 0.18) 0%, rgba(31, 73, 168, 0.14) 30%, rgba(8, 8, 23, 0) 72%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-[18%] mx-auto h-32 w-[min(80vw,38rem)] blur-[70px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(236, 72, 153, 0.16) 0%, rgba(168, 85, 247, 0.12) 42%, rgba(0, 0, 0, 0) 72%)",
        }}
      />
    </div>
  );
}

function OrbitBackdrop() {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 860" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-line" x1="150" x2="1050" y1="430" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(244,114,182,0.45)" />
            <stop offset="0.3" stopColor="rgba(196,181,253,0.55)" />
            <stop offset="0.65" stopColor="rgba(168,85,247,0.75)" />
            <stop offset="1" stopColor="rgba(96,165,250,0.45)" />
          </linearGradient>
        </defs>
        <ellipse
          cx="600"
          cy="430"
          rx="408"
          ry="287"
          stroke="url(#orbit-line)"
          strokeWidth="2"
          strokeDasharray="2.5 11"
          opacity="0.7"
        />
        <ellipse
          cx="600"
          cy="430"
          rx="312"
          ry="217"
          stroke="rgba(192, 132, 252, 0.18)"
          strokeWidth="1.2"
          strokeDasharray="2 16"
        />
      </svg>

    </div>
  );
}

function GalaxyCore({ compact = false }: { compact?: boolean }) {
  const wrapperClassName = coreFieldWrapperClass(compact);
  const scope = compact ? "compact" : "desktop";

  return (
    <motion.div
      className={wrapperClassName}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <motion.svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 1000 560"
        fill="none"
        aria-hidden="true"
        animate={compact ? undefined : { rotate: [0, 2, 0, -2, 0] }}
        transition={compact ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient
            id={`core-primary-${scope}`}
            x1="150"
            x2="850"
            y1="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5dc9ff" />
            <stop offset="0.22" stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#ff8ce1" />
            <stop offset="0.78" stopColor="#b95dff" />
            <stop offset="1" stopColor="#5dc9ff" />
          </linearGradient>
          <linearGradient
            id={`core-secondary-${scope}`}
            x1="180"
            x2="820"
            y1="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5dd5ff" />
            <stop offset="0.34" stopColor="#f472b6" />
            <stop offset="0.66" stopColor="#c084fc" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <radialGradient
            id={`core-glow-${scope}`}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(500 280) rotate(90) scale(280 430)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgba(30, 41, 59, 0.2)" />
            <stop offset="0.56" stopColor="rgba(12, 7, 28, 0.95)" />
            <stop offset="1" stopColor="rgba(4, 2, 13, 0)" />
          </radialGradient>
          <filter id={`soft-glow-${scope}`} x="-30%" y="-50%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="10" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
          <clipPath id={`core-back-clip-${scope}`}>
            <rect x="0" y="0" width="1000" height="282" />
            <rect x="0" y="282" width="310" height="278" />
            <rect x="690" y="282" width="310" height="278" />
          </clipPath>
        </defs>

        <g clipPath={`url(#core-back-clip-${scope})`}>
          <ellipse
            cx="500"
            cy="280"
            rx="332"
            ry="112"
            stroke={`url(#core-primary-${scope})`}
            strokeWidth="18"
            filter={`url(#soft-glow-${scope})`}
            opacity="0.95"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="308"
            ry="100"
            stroke={`url(#core-secondary-${scope})`}
            strokeWidth="8"
            opacity="0.85"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="352"
            ry="122"
            stroke="rgba(196, 181, 253, 0.12)"
            strokeWidth="2"
            strokeDasharray="2 18"
          />
        </g>

        {galaxyParticles.map((particle, index) => (
          <circle
            key={`${particle.cx}-${particle.cy}-${index}`}
            cx={particle.cx}
            cy={particle.cy}
            r={particle.r}
            fill={particle.fill}
            opacity={particle.opacity}
          />
        ))}

        <ellipse cx="500" cy="280" rx="190" ry="72" fill={`url(#core-glow-${scope})`} />
      </motion.svg>
    </motion.div>
  );
}

function CoreOrbitForeground({ compact = false }: { compact?: boolean }) {
  const wrapperClassName = coreFieldWrapperClass(compact);
  const scope = compact ? "compact-front" : "desktop-front";

  return (
    <motion.div
      className={`pointer-events-none ${wrapperClassName}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <motion.svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 1000 560"
        fill="none"
        aria-hidden="true"
        animate={compact ? undefined : { rotate: [0, 2, 0, -2, 0] }}
        transition={compact ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient
            id={`core-front-primary-${scope}`}
            x1="150"
            x2="850"
            y1="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5dc9ff" />
            <stop offset="0.22" stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#ff8ce1" />
            <stop offset="0.78" stopColor="#b95dff" />
            <stop offset="1" stopColor="#5dc9ff" />
          </linearGradient>
          <linearGradient
            id={`core-front-secondary-${scope}`}
            x1="180"
            x2="820"
            y1="280"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5dd5ff" />
            <stop offset="0.34" stopColor="#f472b6" />
            <stop offset="0.66" stopColor="#c084fc" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <filter id={`core-front-glow-${scope}`} x="-30%" y="-50%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="10" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id={`core-front-hot-glow-${scope}`} x="-30%" y="-60%" width="160%" height="240%">
            <feGaussianBlur stdDeviation="16" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.2 0"
            />
          </filter>
          <clipPath id={`core-front-clip-${scope}`}>
            <ellipse cx="500" cy="296" rx="390" ry="66" />
          </clipPath>
        </defs>

        <g clipPath={`url(#core-front-clip-${scope})`}>
          <ellipse
            cx="500"
            cy="280"
            rx="332"
            ry="112"
            stroke={`url(#core-front-primary-${scope})`}
            strokeWidth="28"
            filter={`url(#core-front-hot-glow-${scope})`}
            opacity="0.3"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="332"
            ry="112"
            stroke={`url(#core-front-primary-${scope})`}
            strokeWidth="20"
            filter={`url(#core-front-glow-${scope})`}
            opacity="1"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="308"
            ry="100"
            stroke={`url(#core-front-secondary-${scope})`}
            strokeWidth="10"
            opacity="0.98"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="281"
            ry="88"
            stroke="rgba(250, 245, 255, 0.55)"
            strokeWidth="2.6"
            opacity="0.72"
          />
        </g>
      </motion.svg>
    </motion.div>
  );
}

function OrbitCore({ compact = false }: { compact?: boolean }) {
  const shellClassName = compact ? "top-[49%] h-[13rem] w-[13rem]" : "top-1/2 h-[18rem] w-[18rem]";
  const beltClassName = compact ? "h-[1.2rem]" : "h-[1.65rem]";

  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${shellClassName}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.15 }}
    >
      <div
        className="absolute inset-[6%] rounded-full blur-[48px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 94, 247, 0.34) 0%, rgba(116, 64, 255, 0.24) 42%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-[2.6%] rounded-full"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255, 232, 255, 0.28), 0 0 34px rgba(232, 102, 255, 0.24), 0 0 58px rgba(113, 82, 255, 0.14), inset 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      />
      <div
        className="absolute inset-[6.5%] rounded-full"
        style={{
          border: "1px solid rgba(251, 190, 255, 0.28)",
          boxShadow:
            "inset 0 0 22px rgba(210, 84, 255, 0.22), inset 0 -14px 22px rgba(0,0,0,0.32), inset 0 14px 18px rgba(255,255,255,0.05)",
        }}
      />
      <div
        className="absolute inset-[10.5%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 12%, rgba(18,8,34,0) 54%)",
        }}
      />
      <div
        className={`absolute inset-x-[13%] top-1/2 ${beltClassName} -translate-y-1/2 rounded-full`}
        style={{
          background:
            "linear-gradient(90deg, rgba(6,4,18,0) 0%, rgba(10,7,26,0.28) 12%, rgba(5,4,16,0.6) 28%, rgba(0,0,0,0.72) 50%, rgba(5,4,16,0.6) 72%, rgba(10,7,26,0.28) 88%, rgba(6,4,18,0) 100%)",
          boxShadow: "0 0 16px rgba(8, 6, 20, 0.32)",
        }}
      />
      <div
        className={`absolute inset-x-[18%] top-1/2 ${beltClassName} -translate-y-1/2 rounded-full blur-[6px]`}
        style={{
          background:
            "linear-gradient(90deg, rgba(96,165,250,0) 0%, rgba(122,92,255,0.16) 22%, rgba(255,135,245,0.22) 50%, rgba(122,92,255,0.16) 78%, rgba(96,165,250,0) 100%)",
          opacity: 0.9,
        }}
      />
      <motion.div
        className="relative h-full w-full"
        animate={compact ? undefined : { scale: [1, 1.01, 1], rotate: [0, 0.75, 0, -0.75, 0] }}
        transition={compact ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={coreAssetPath}
          alt="Nucleo orbital"
          draggable="false"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_42px_rgba(230,120,255,0.38)] saturate-[1.06] contrast-[1.03]"
        />
      </motion.div>
    </motion.div>
  );
}

function HeroBrand({ activeFeature, compact = false }: { activeFeature: Feature; compact?: boolean }) {
  const heroLogoWrapperClass = compact
    ? "h-[7.8rem] w-full max-w-[18.5rem] sm:h-[8.8rem] sm:max-w-[20.5rem]"
    : "h-[12.6rem] w-[min(96vw,58rem)]";
  const heroLogoImageClass = compact
    ? "scale-[1.1] -translate-x-[1.1%] translate-y-[1.4%]"
    : "scale-[1.18] -translate-x-[1.2%] translate-y-[4.8%]";
  const heroLogoShadowClass = compact
    ? "drop-shadow-[0_0_12px_rgba(212,140,255,0.2)] contrast-[1.03] saturate-[1.02]"
    : "drop-shadow-[0_0_28px_rgba(122,92,255,0.28)]";

  return (
    <motion.div
      className={`relative z-10 mx-auto flex max-w-[48rem] flex-col items-center text-center ${
        compact ? "w-full px-3" : "px-6"
      }`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25 }}
    >
      <div
        className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.56rem] uppercase tracking-[0.22em]"
        style={{
          borderColor: hexToRgba(activeFeature.color, 0.4),
          background: "rgba(12, 8, 24, 0.7)",
          color: activeFeature.color,
          boxShadow: `0 0 18px ${hexToRgba(activeFeature.color, 0.12)}`,
        }}
      >
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
        <span className="font-display">{activeFeature.eyebrow}</span>
      </div>

      <div className={`relative overflow-visible ${heroLogoWrapperClass}`}>
        <img
          src={brandLogoPath}
          alt="Pokestor"
          draggable="false"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-contain ${heroLogoShadowClass} ${heroLogoImageClass}`}
        />
      </div>

      <div className="mt-3 flex items-center gap-3 text-fuchsia-200/75">
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent" />
        <div className="relative h-7 w-7 overflow-hidden rounded-full border border-fuchsia-300/45 bg-fuchsia-300/8 p-1">
          <FeatureArt feature={activeFeature} className="h-full w-full" />
        </div>
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      </div>

      <p className="mt-6 max-w-[36rem] font-display text-[0.64rem] uppercase tracking-[0.28em] text-cyan-200/75 sm:text-[0.72rem]">
        SUA AVENTURA. SEUS MONSTROS. SUA HISTORIA.
      </p>

      {!compact && (
        <p className="mt-6 max-w-[44rem] text-balance text-lg leading-8 text-slate-200/76">
          Agora a home usa seus simbolos reais e um nucleo central proprio, com o sistema orbital mais proximo da
          direcao que voce imaginou.
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {elementRuneIcons.map(({ Icon, color }, index) => (
          <motion.span
            key={color}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border"
            style={{
              borderColor: hexToRgba(color, 0.36),
              background: hexToRgba(color, 0.08),
              boxShadow: `0 0 16px ${hexToRgba(color, 0.16)}`,
              color,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 + index * 0.06, type: "spring", stiffness: 180, damping: 12 }}
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function WelcomeModule({ activeFeature, className = "" }: { activeFeature: Feature; className?: string }) {
  return (
    <motion.section
      id="jornada"
      className={`pixel-cut relative overflow-hidden border px-6 py-6 text-center ${className}`}
      style={{
        borderColor: hexToRgba(activeFeature.color, 0.52),
        background: "linear-gradient(180deg, rgba(14, 10, 29, 0.96) 0%, rgba(7, 6, 19, 0.9) 100%)",
        boxShadow: `0 0 34px ${hexToRgba(activeFeature.color, 0.16)}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.5 }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 26px 26px",
        }}
      />
      <div
        className="absolute inset-x-10 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(activeFeature.color, 0.74)} 50%, transparent 100%)`,
        }}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-center gap-2" style={{ color: activeFeature.color }}>
          <Sparkles className="h-4 w-4" strokeWidth={1.85} />
          <p className="font-display text-[0.62rem] uppercase tracking-[0.22em]">Bem-vindo, treinador</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mx-auto max-w-[22rem] font-terminal text-[1.9rem] leading-[1.02] text-slate-50 sm:text-[2.15rem]">
              {activeFeature.description}
            </p>
            <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-6 text-slate-200/72 sm:text-base">
              {activeFeature.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-center gap-3 text-fuchsia-100/70">
          <span className="h-px w-12 bg-fuchsia-300/35" />
          <div
            className="relative h-8 w-8 overflow-hidden rounded-full border p-1"
            style={{
              borderColor: hexToRgba(activeFeature.color, 0.5),
              background: hexToRgba(activeFeature.color, 0.08),
            }}
          >
            <FeatureArt feature={activeFeature} className="h-full w-full" />
          </div>
          <span className="h-px w-12 bg-cyan-300/35" />
        </div>

        <div className="mt-6">
          <a
            href={siteWhatsAppUrl ?? "#orbita"}
            target={siteWhatsAppUrl ? "_blank" : undefined}
            rel={siteWhatsAppUrl ? "noreferrer" : undefined}
            onClick={() =>
              trackEvent("cta_click", {
                cta: "welcome_comecar_jornada",
                section: "welcome",
                target: siteWhatsAppUrl ? "whatsapp_channel" : "orbita",
              })
            }
            className="pixel-cut inline-flex items-center gap-3 border px-5 py-4 text-fuchsia-50 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: hexToRgba(activeFeature.color, 0.66),
              background: `linear-gradient(180deg, ${hexToRgba(activeFeature.color, 0.22)} 0%, rgba(7, 8, 22, 0.95) 100%)`,
              boxShadow: `0 0 22px ${hexToRgba(activeFeature.color, 0.2)}, inset 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.85} />
            <span className="font-display text-[0.64rem] uppercase tracking-[0.16em]">Comecar jornada</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

function OrbitSymbol({
  feature,
  active,
  className = "",
  animated = true,
  showRings = true,
}: {
  feature: Feature;
  active: boolean;
  className?: string;
  animated?: boolean;
  showRings?: boolean;
}) {
  const clipScope = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const frontClipId = `${clipScope}-${feature.id}-ring-front`;
  const ringDuration = active ? 10 : 13;

  return (
    <div className={`relative h-[10.6rem] w-[10.6rem] ${className}`}>
      <div
        className="absolute inset-[18%] rounded-full blur-[34px]"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(feature.color, active ? 0.38 : 0.24)} 0%, ${hexToRgba(
            feature.secondary,
            0.12
          )} 55%, transparent 78%)`,
        }}
      />

      {showRings ? (
        <motion.div
          className="absolute inset-0 z-0"
          animate={animated ? { rotate: 360 } : undefined}
          transition={animated ? { duration: ringDuration, repeat: Infinity, ease: "linear" } : undefined}
        >
          <svg className="absolute inset-0 z-0 h-full w-full overflow-visible" viewBox="0 0 220 220" aria-hidden="true">
            <ellipse
              cx="110"
              cy="114"
              rx="82"
              ry="30"
              fill="none"
              stroke={hexToRgba(feature.color, active ? 0.46 : 0.34)}
              strokeWidth="4"
            />
            <ellipse
              cx="110"
              cy="114"
              rx="66"
              ry="22"
              fill="none"
              stroke={hexToRgba(feature.secondary, active ? 0.28 : 0.2)}
              strokeWidth="2"
              strokeDasharray="9 11"
            />
          </svg>
        </motion.div>
      ) : null}

      <motion.div
        className="absolute inset-[12%] z-10 rounded-full"
        animate={
          animated ? { y: [0, -10, 0], rotate: active ? [0, -2, 2, 0] : [0, -1.5, 1.5, 0] } : undefined
        }
        transition={
          animated
            ? {
                y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 7.2, repeat: Infinity, ease: "easeInOut" },
              }
            : undefined
        }
      >
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: hexToRgba(feature.color, active ? 0.74 : 0.45),
            background: `radial-gradient(circle at 34% 24%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 7%, ${hexToRgba(
              feature.color,
              active ? 0.17 : 0.11
            )} 18%, ${hexToRgba(feature.surface, active ? 0.56 : 0.47)} 44%, rgba(4, 4, 14, 0.78) 100%)`,
            boxShadow: `0 0 30px ${hexToRgba(feature.color, 0.24)}, inset -16px -16px 26px rgba(0,0,0,0.26), inset 7px 7px 18px rgba(255,255,255,0.05), inset 0 0 22px ${hexToRgba(
              feature.color,
              0.1
            )}`,
          }}
        />
        <div
          className="absolute inset-[2.5%] rounded-full"
          style={{
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -18px 28px rgba(0,0,0,0.16), inset 18px 18px 26px rgba(255,255,255,0.03)`,
          }}
        />
        <div
          className="absolute inset-[6%] rounded-full opacity-90"
          style={{
            background: `radial-gradient(circle at 29% 21%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.14) 10%, rgba(255,255,255,0) 28%), radial-gradient(circle at 70% 76%, ${hexToRgba(
              feature.color,
              active ? 0.16 : 0.1
            )} 0%, rgba(255,255,255,0) 46%)`,
          }}
        />
        <div
          className="absolute left-[18%] top-[15%] z-[11] h-[21%] w-[37%] rounded-full blur-[7px]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.05) 100%)",
            opacity: active ? 0.9 : 0.72,
            transform: "rotate(-18deg)",
          }}
        />
        <div
          className="absolute inset-[13%] rounded-full border"
          style={{
            borderColor: hexToRgba(feature.color, active ? 0.34 : 0.22),
            boxShadow: `inset 0 0 14px ${hexToRgba(feature.color, 0.14)}`,
          }}
        />
        <div
          className="absolute inset-[20%] rounded-full blur-[24px]"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(feature.color, active ? 0.18 : 0.1)} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-x-[16%] top-[52%] z-[11] h-[0.95rem] -translate-y-1/2 rounded-full blur-[8px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(feature.color, 0.12)} 18%, rgba(0,0,0,0.22) 50%, ${hexToRgba(
              feature.color,
              0.12
            )} 82%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-[12.5%] overflow-hidden rounded-full border"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 44%, rgba(6,6,18,0.08) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 50% 56%, ${hexToRgba(feature.color, 0.18)} 0%, transparent 62%)`,
            }}
          />
          <FeatureArt feature={feature} className="h-full w-full scale-[0.9] opacity-[0.96]" />
        </div>
        <div
          className="pointer-events-none absolute inset-[8%] z-[12] rounded-full backdrop-blur-[1px]"
          style={{
            background:
              "radial-gradient(circle at 32% 23%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.045) 16%, rgba(255,255,255,0) 34%), linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 48%, rgba(0,0,0,0.08) 100%)",
          }}
        >
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              boxShadow: `inset 0 0 10px rgba(255,255,255,0.04), inset 0 -12px 16px rgba(0,0,0,0.12)`,
            }}
          />
        </div>
      </motion.div>

      {showRings ? (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          animate={animated ? { rotate: 360 } : undefined}
          transition={animated ? { duration: ringDuration, repeat: Infinity, ease: "linear" } : undefined}
        >
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 220 220" aria-hidden="true">
            <defs>
              <clipPath id={frontClipId}>
                <rect x="20" y="96" width="180" height="36" rx="18" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${frontClipId})`}>
              <ellipse
                cx="110"
                cy="114"
                rx="82"
                ry="30"
                fill="none"
                stroke={hexToRgba(feature.color, active ? 0.94 : 0.84)}
                strokeWidth="5"
              />
              <ellipse
                cx="110"
                cy="114"
                rx="66"
                ry="22"
                fill="none"
                stroke={hexToRgba(feature.secondary, active ? 0.84 : 0.72)}
                strokeWidth="2.5"
                strokeDasharray="10 12"
              />
            </g>
          </svg>
        </motion.div>
      ) : null}
    </div>
  );
}

function FeatureNode({
  feature,
  active,
  onSelect,
}: {
  feature: Feature;
  active: boolean;
  onSelect: (featureId: FeatureId) => void;
}) {
  const border = hexToRgba(feature.color, active ? 0.8 : 0.56);
  const labelGlow = hexToRgba(feature.color, active ? 0.28 : 0.16);

  return (
    <motion.button
      type="button"
      className="absolute hidden -translate-x-1/2 -translate-y-1/2 text-left lg:block"
      style={{ left: `${feature.orbit.x}%`, top: `${feature.orbit.y}%` }}
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: active ? 1.05 : 1 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      onClick={() => onSelect(feature.id)}
    >
      <div className="flex flex-col items-center">
        <OrbitSymbol feature={feature} active={active} />

        <div
          className="pixel-cut mt-3 inline-flex min-w-[10.8rem] items-center justify-center gap-2 border px-4 py-3 text-center"
          style={{
            borderColor: border,
            background:
              "linear-gradient(180deg, rgba(16, 12, 30, 0.94) 0%, rgba(7, 6, 18, 0.82) 100%)",
            boxShadow: `0 0 20px ${labelGlow}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
          }}
        >
          <div className="relative h-5 w-5 overflow-hidden rounded-full border" style={{ borderColor: border }}>
            <FeatureArt feature={feature} className="h-full w-full" />
          </div>
          <span className="font-display text-[0.56rem] uppercase tracking-[0.2em]" style={{ color: "#f8ebff" }}>
            {feature.title}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function FeatureDialog({
  activeFeature,
  onClose,
}: {
  activeFeature: Feature;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center px-0 pt-20 sm:px-4 sm:pt-24 lg:items-start lg:px-6 lg:pb-10 lg:pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-[rgba(3,2,12,0.62)] backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 flex max-h-[84vh] w-full max-w-[34rem] flex-col overflow-hidden rounded-t-[1.35rem] border sm:rounded-[1.35rem] lg:pixel-cut lg:rounded-none"
        style={{
          borderColor: hexToRgba(activeFeature.color, 0.5),
          background: "linear-gradient(180deg, rgba(12, 9, 26, 0.97) 0%, rgba(7, 6, 17, 0.92) 100%)",
          boxShadow: `0 0 36px ${hexToRgba(activeFeature.color, 0.18)}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute inset-0 opacity-24"
          style={{
            background: `radial-gradient(circle at top center, ${hexToRgba(activeFeature.color, 0.18)} 0%, transparent 58%)`,
          }}
        />
        <div
          className="relative flex items-center justify-between gap-4 border-b px-4 py-4 sm:px-5"
          style={{ borderColor: hexToRgba(activeFeature.color, 0.18) }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2" style={{ color: activeFeature.color }}>
              {featureIcon(activeFeature.id, "h-4 w-4")}
              <p className="font-display text-[0.52rem] uppercase tracking-[0.18em]">{activeFeature.eyebrow}</p>
            </div>
            <h3 className="mt-2 font-terminal text-[1.5rem] leading-none text-white">{activeFeature.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Fechar detalhes"
            className="pixel-cut inline-flex h-10 w-10 shrink-0 items-center justify-center border text-fuchsia-50 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: hexToRgba(activeFeature.color, 0.34),
              background: "rgba(9, 8, 22, 0.58)",
              boxShadow: `0 0 18px ${hexToRgba(activeFeature.color, 0.1)}`,
            }}
            onClick={onClose}
          >
            <X className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </div>

        <div className="relative min-h-0 overflow-y-auto px-5 pb-6 pt-5 text-center sm:px-6">
          <div className="mb-4 flex items-center justify-center">
            <div
              className="rounded-full border p-2"
              style={{
                borderColor: hexToRgba(activeFeature.color, 0.28),
                background: `radial-gradient(circle, ${hexToRgba(activeFeature.color, 0.12)} 0%, rgba(4, 4, 14, 0.06) 100%)`,
              }}
            >
              <FeatureArt feature={activeFeature} className="h-18 w-18" />
            </div>
          </div>

          <p className="mx-auto max-w-[26rem] font-terminal text-[2rem] leading-[1.02] text-slate-50">
            {activeFeature.description}
          </p>
          <p className="mx-auto mt-4 max-w-[27rem] text-base leading-7 text-slate-200/78">{activeFeature.detail}</p>

          <div className="mt-6 flex items-center justify-center gap-3 text-fuchsia-100/70">
            <span className="h-px w-16 bg-fuchsia-300/35" />
            <div
              className="relative h-9 w-9 overflow-hidden rounded-full border p-1"
              style={{
                borderColor: hexToRgba(activeFeature.color, 0.5),
                background: hexToRgba(activeFeature.color, 0.08),
              }}
            >
              <FeatureArt feature={activeFeature} className="h-full w-full" />
            </div>
            <span className="h-px w-16 bg-cyan-300/35" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FooterPanelDialog({
  panelId,
  onClose,
}: {
  panelId: FooterPanelId;
  onClose: () => void;
}) {
  const panel = footerPanels[panelId];

  return (
    <motion.div
      className="fixed inset-0 z-[72] flex items-end justify-center px-0 pt-20 sm:px-4 sm:pt-24 lg:items-start lg:px-6 lg:pb-10 lg:pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-[rgba(3,2,12,0.68)] backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 flex max-h-[84vh] w-full max-w-[38rem] flex-col overflow-hidden rounded-t-[1.35rem] border sm:rounded-[1.35rem] lg:pixel-cut lg:rounded-none"
        style={{
          borderColor: "rgba(212, 140, 255, 0.26)",
          background: "linear-gradient(180deg, rgba(12, 9, 26, 0.98) 0%, rgba(7, 6, 17, 0.94) 100%)",
          boxShadow: "0 0 34px rgba(168,85,247,0.14), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex items-center justify-between gap-4 border-b px-4 py-4 sm:px-5" style={{ borderColor: "rgba(212, 140, 255, 0.16)" }}>
          <div className="min-w-0">
            <p className="font-display text-[0.52rem] uppercase tracking-[0.18em] text-fuchsia-200/80">{panel.eyebrow}</p>
            <h3 className="mt-2 font-terminal text-[1.5rem] leading-none text-white">{panel.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Fechar painel"
            className="pixel-cut inline-flex h-10 w-10 shrink-0 items-center justify-center border text-fuchsia-50 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(212, 140, 255, 0.28)",
              background: "rgba(9, 8, 22, 0.58)",
              boxShadow: "0 0 16px rgba(168,85,247,0.1)",
            }}
            onClick={onClose}
          >
            <X className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </div>

        <div className="relative min-h-0 overflow-y-auto px-5 pb-6 pt-5 sm:px-6">
          <div className="grid gap-4 text-slate-200/80">
            {panel.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 sm:text-[0.98rem]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {panel.bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-2xl border px-4 py-3 text-sm leading-6 text-slate-100/88"
                style={{
                  borderColor: "rgba(212, 140, 255, 0.18)",
                  background: "linear-gradient(180deg, rgba(18, 13, 34, 0.82) 0%, rgba(8, 7, 19, 0.72) 100%)",
                }}
              >
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SiteFooter({
  onOpenPanel,
}: {
  onOpenPanel: (panelId: FooterPanelId) => void;
}) {
  const factualNotes = [
    "Esta pagina nao processa pagamento.",
    "Nenhuma senha e exigida para navegar.",
    siteWhatsAppUrl ? "O contato oficial aponta para o WhatsApp." : "Defina o WhatsApp oficial antes de publicar.",
  ];

  return (
    <footer className="mt-18 w-full max-w-[1280px]">
      <div
        className="relative isolate overflow-hidden rounded-[2rem] border [contain:paint]"
        style={{
          borderColor: "rgba(212, 140, 255, 0.2)",
          background: "linear-gradient(180deg, rgba(10, 8, 24, 1) 0%, rgba(7, 6, 18, 1) 100%)",
          boxShadow: "0 0 36px rgba(90, 32, 144, 0.12), inset 0 0 0 1px rgba(255,255,255,0.04)",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212, 140, 255, 0.42) 30%, rgba(103, 215, 255, 0.35) 70%, transparent 100%)",
          }}
        />

        <div className="grid gap-8 px-5 py-7 sm:px-7 lg:grid-cols-[1.08fr_0.72fr_0.9fr_0.92fr] lg:px-9">
          <div>
            <p className="font-display text-[0.56rem] uppercase tracking-[0.22em] text-fuchsia-200/78">
              Encerramento da jornada
            </p>
            <h3 className="mt-3 font-terminal text-[2rem] leading-none text-white sm:text-[2.35rem]">
              Publicacao com base real
            </h3>
            <p className="mt-4 max-w-[34rem] text-sm leading-7 text-slate-200/76 sm:text-[0.98rem]">
              Este bloco fecha a landing com navegacao util, documentos acessiveis e um contato oficial verificavel,
              sem depender de selo decorativo ou promessa vaga.
            </p>

            <div className="mt-5 grid gap-2.5">
              {factualNotes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border px-4 py-3 text-sm leading-6 text-slate-100/84"
                  style={{
                    borderColor: "rgba(212, 140, 255, 0.22)",
                    background: "linear-gradient(180deg, rgba(17, 12, 33, 0.92) 0%, rgba(9, 8, 21, 0.88) 100%)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-[0.52rem] uppercase tracking-[0.2em] text-cyan-200/74">Navegacao</p>
            <div className="mt-4 grid gap-2.5">
              {[
                { href: "#universo", label: "Topo do universo" },
                { href: "#jornada", label: "Resumo da jornada" },
                { href: "#orbita", label: "Sistema orbital" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta:
                        item.href === "#universo"
                          ? "footer_nav_universo"
                          : item.href === "#jornada"
                            ? "footer_nav_jornada"
                            : "footer_nav_orbita",
                      section: "footer",
                      target: item.href.replace("#", ""),
                    })
                  }
                  className="inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-sm text-slate-100/86 transition-[transform,border-color,background-color] duration-300 lg:hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(103, 215, 255, 0.16)",
                    background: "linear-gradient(180deg, rgba(14, 12, 30, 0.92) 0%, rgba(8, 7, 20, 0.9) 100%)",
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-cyan-200/80" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-[0.52rem] uppercase tracking-[0.2em] text-fuchsia-200/74">Institucional</p>
            <div className="mt-4 grid gap-2.5">
              {[
                { id: "privacy" as const, label: "Privacidade", Icon: FileText },
                { id: "terms" as const, label: "Termos de uso", Icon: ScrollText },
                { id: "safety" as const, label: "Seguranca e confianca", Icon: Shield },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    trackEvent("footer_panel_open", { panel: id, section: "footer" });
                    onOpenPanel(id);
                  }}
                  className="inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm text-slate-100/88 transition-[transform,border-color,background-color] duration-300 lg:hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(212, 140, 255, 0.18)",
                    background: "linear-gradient(180deg, rgba(18, 13, 34, 0.92) 0%, rgba(8, 7, 20, 0.9) 100%)",
                  }}
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-4 w-4 text-fuchsia-200/82" strokeWidth={1.75} />
                    <span>{label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-fuchsia-100/70" strokeWidth={1.7} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-[0.52rem] uppercase tracking-[0.2em] text-emerald-200/74">Contato oficial</p>
            <div className="mt-4 grid gap-3">
              {siteWhatsAppUrl ? (
                <a
                  href={siteWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta: "footer_whatsapp",
                      section: "footer",
                      target: "whatsapp",
                    })
                  }
                  className="inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-sm text-slate-100/88 transition-[transform,border-color,background-color] duration-300 lg:hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(94, 234, 212, 0.24)",
                    background: "linear-gradient(180deg, rgba(10, 37, 33, 0.92) 0%, rgba(7, 19, 18, 0.9) 100%)",
                  }}
                >
                  <span className="inline-flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-emerald-200/84" strokeWidth={1.8} />
                    <span>WhatsApp oficial</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-emerald-100/76" strokeWidth={1.7} />
                </a>
              ) : (
                <div
                  className="rounded-2xl border px-4 py-3 text-sm leading-6 text-slate-100/76"
                  style={{
                    borderColor: "rgba(94, 234, 212, 0.18)",
                    background: "linear-gradient(180deg, rgba(10, 37, 33, 0.82) 0%, rgba(7, 19, 18, 0.78) 100%)",
                  }}
                >
                  Defina o link do WhatsApp antes da publicacao final para este bloco virar o contato oficial.
                </div>
              )}

              <p className="text-sm leading-7 text-slate-200/72">
                Use esse canal para avisos, direcionamento e primeiro contato. Se depois voce abrir outros canais,
                adicione-os somente quando estiverem realmente ativos.
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 border-t px-5 py-4 text-[0.68rem] uppercase tracking-[0.18em] text-slate-200/60 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-9"
          style={{ borderColor: "rgba(212, 140, 255, 0.12)" }}
        >
          <p className="font-display">Pokestor pronta para publicar com contato, politicas e confianca verificavel</p>
          <p>{siteWhatsAppUrl ? "Sem pagamento / Sem senha / WhatsApp oficial ativo" : "Sem pagamento / Sem senha / Falta ligar o WhatsApp oficial"}</p>
        </div>
      </div>
    </footer>
  );
}

function MobileFeatureCard({
  feature,
  active,
  onSelect,
}: {
  feature: Feature;
  active: boolean;
  onSelect: (featureId: FeatureId) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(feature.id)}
      className="pixel-cut relative overflow-hidden border p-4 text-left"
      style={{
        borderColor: hexToRgba(feature.color, active ? 0.72 : 0.3),
        background:
          "linear-gradient(180deg, rgba(15, 11, 30, 0.95) 0%, rgba(6, 5, 16, 0.88) 100%)",
        boxShadow: active ? `0 0 26px ${hexToRgba(feature.color, 0.2)}` : "none",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at top right, ${hexToRgba(feature.color, 0.18)} 0%, transparent 55%)`,
        }}
      />
      <div className="relative flex items-center gap-3">
        <div className="shrink-0">
          <OrbitSymbol
            feature={feature}
            active={active}
            className="h-[5.15rem] w-[5.15rem]"
            animated={false}
            showRings={false}
          />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[0.52rem] uppercase tracking-[0.24em]" style={{ color: feature.color }}>
            {feature.eyebrow}
          </p>
          <h3 className="mt-2 font-display text-[0.64rem] uppercase tracking-[0.18em] text-fuchsia-50">
            {feature.title}
          </h3>
          <p className="mt-3 text-sm leading-5 text-slate-200/82">{feature.detail}</p>
        </div>
      </div>
    </motion.button>
  );
}

function DesktopLanding({
  activeFeature,
  onSelect,
}: {
  activeFeature: Feature;
  onSelect: (featureId: FeatureId) => void;
}) {
  return (
    <div className="hidden w-full flex-col items-center lg:flex">
      <section className="flex w-full max-w-[1080px] flex-col items-center px-6 pb-10 pt-10 text-center">
        <HeroBrand activeFeature={activeFeature} />

        <WelcomeModule activeFeature={activeFeature} className="mt-10 w-full max-w-[34rem]" />

        <a
          href="#orbita"
          onClick={() => trackEvent("cta_click", { cta: "desktop_ver_orbita", section: "hero", target: "orbita" })}
          className="mt-8 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-cyan-200/72 transition-colors hover:text-cyan-100"
        >
          <span className="font-display">Ver orbita</span>
          <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
        </a>
      </section>

      <section id="orbita" className="relative h-[58rem] w-full max-w-[1240px]">
        <OrbitBackdrop />
        <GalaxyCore />
        <OrbitCore />
        <CoreOrbitForeground />

        {features.map((feature) => (
          <FeatureNode
            key={feature.id}
            feature={feature}
            active={feature.id === activeFeature.id}
            onSelect={onSelect}
          />
        ))}
      </section>
    </div>
  );
}

function MobileLanding({
  activeFeature,
  onSelect,
}: {
  activeFeature: Feature;
  onSelect: (featureId: FeatureId) => void;
}) {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 lg:hidden">
      <section className="flex w-full flex-col items-center pt-4 text-center">
        <HeroBrand activeFeature={activeFeature} compact />
        <WelcomeModule activeFeature={activeFeature} className="mt-8 w-full" />
      </section>

      <div className="relative w-full overflow-hidden px-2 pt-2">
        <div className="relative h-[24rem] w-full">
          <GalaxyCore compact />
          <OrbitCore compact />
          <CoreOrbitForeground compact />
        </div>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <MobileFeatureCard
            key={feature.id}
            feature={feature}
            active={feature.id === activeFeature.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function PokestorLanding() {
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>("pokedex");
  const [dialogFeatureId, setDialogFeatureId] = useState<FeatureId | null>(null);
  const [footerPanelId, setFooterPanelId] = useState<FooterPanelId | null>(null);
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];
  const dialogFeature = features.find((feature) => feature.id === dialogFeatureId) ?? null;

  useEffect(() => {
    if (!dialogFeatureId) {
      return;
    }

    trackEvent("feature_dialog_open", {
      feature: dialogFeatureId,
      section: "feature_dialog",
    });
  }, [dialogFeatureId]);

  useEffect(() => {
    if (!dialogFeatureId && !footerPanelId) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialogFeatureId(null);
        setFooterPanelId(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogFeatureId, footerPanelId]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04010b] text-white">
      <Starfield />
      <NebulaClouds />
      <TopNav />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(9, 8, 24, 0) 0%, rgba(6, 5, 16, 0.42) 58%, rgba(3, 2, 12, 0.88) 100%)",
        }}
      />

      <div
        id="universo"
        className="relative z-10 mx-auto flex w-full max-w-[1580px] flex-col px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10"
      >
        <DesktopLanding
          activeFeature={activeFeature}
          onSelect={(featureId) => {
            trackEvent("feature_select", { feature: featureId, surface: "desktop" });
            setActiveFeatureId(featureId);
            setDialogFeatureId(featureId);
          }}
        />
        <MobileLanding
          activeFeature={activeFeature}
          onSelect={(featureId) => {
            trackEvent("feature_select", { feature: featureId, surface: "mobile" });
            setActiveFeatureId(featureId);
            setDialogFeatureId(featureId);
          }}
        />
        <SiteFooter
          onOpenPanel={(panelId) => {
            trackEvent("overlay_open", { overlay: panelId, surface: "footer" });
            setDialogFeatureId(null);
            setFooterPanelId(panelId);
          }}
        />
      </div>
      <AnimatePresence>
        {dialogFeature ? <FeatureDialog activeFeature={dialogFeature} onClose={() => setDialogFeatureId(null)} /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {footerPanelId ? <FooterPanelDialog panelId={footerPanelId} onClose={() => setFooterPanelId(null)} /> : null}
      </AnimatePresence>
    </main>
  );
}
