"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Crosshair,
  Droplets,
  Flame,
  Flag,
  Globe2,
  Leaf,
  MoonStar,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";
import { Starfield } from "./Starfield";

type FeatureId = "pokedex" | "captura" | "exploracao" | "canal" | "eventos";

type Feature = {
  id: FeatureId;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  color: string;
  secondary: string;
  assetPath: string;
  assetClassName?: string;
  orbit: {
    x: number;
    y: number;
  };
};

const brandLogoPath = "pokestor-assets/logo.png";
const coreAssetPath = "pokestor-assets/core.png";

const features: Feature[] = [
  {
    id: "pokedex",
    title: "Pokedex",
    eyebrow: "Arquivo estelar",
    description: "Descubra criaturas, raridades e tipos em um compendio vivo feito para treinadores curiosos.",
    detail: "Registre encontros, estude elementos e avance na sua colecao com visao estrategica.",
    color: "#d48cff",
    secondary: "#7c3aed",
    assetPath: "pokestor-assets/pokedex.png",
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
    assetPath: "pokestor-assets/captura.png",
    assetClassName: "scale-[0.94]",
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
    assetPath: "pokestor-assets/exploracao.png",
    assetClassName: "scale-[0.96]",
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
    assetPath: "pokestor-assets/canal.png",
    assetClassName: "scale-[1.06]",
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
    assetPath: "pokestor-assets/eventos.png",
    assetClassName: "scale-[1.06]",
    orbit: { x: 14, y: 43 },
  },
];

const orbitMarkers = [
  { x: 50, y: 15.5 },
  { x: 77, y: 27.5 },
  { x: 88, y: 54 },
  { x: 70, y: 83.5 },
  { x: 30, y: 83.5 },
  { x: 12, y: 54 },
  { x: 23, y: 27.5 },
];

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

const elementRunes = [
  { Icon: Leaf, color: "#7df9ae" },
  { Icon: Flame, color: "#ff875f" },
  { Icon: Droplets, color: "#67d7ff" },
  { Icon: Zap, color: "#ffd86d" },
  { Icon: Sparkles, color: "#ef8fff" },
  { Icon: MoonStar, color: "#d3b3ff" },
];

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
          className="pointer-events-auto inline-flex min-w-0 flex-1 items-center gap-3 text-white/90 transition-transform hover:scale-[1.02]"
        >
          <div className="relative h-10 w-[9.8rem] min-w-0 sm:h-12 sm:w-[12.5rem] lg:w-[14rem]">
            <img
              src={brandLogoPath}
              alt="Pokestor"
              draggable="false"
              className="absolute inset-0 h-full w-full object-contain object-left drop-shadow-[0_0_16px_rgba(137,92,246,0.28)]"
            />
          </div>
        </a>

        <div className="pointer-events-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#orbita"
            aria-label="Ir para a orbita principal"
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

      {orbitMarkers.map((marker, index) => (
        <motion.div
          key={`${marker.x}-${marker.y}`}
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            left: `${marker.x}%`,
            top: `${marker.y}%`,
            borderColor: "rgba(248, 250, 252, 0.75)",
            background: "rgba(11, 7, 22, 0.78)",
            boxShadow: "0 0 14px rgba(232, 121, 249, 0.22)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.22 }}
        >
          <span className="absolute inset-1 rounded-full bg-fuchsia-300/80" />
        </motion.div>
      ))}
    </div>
  );
}

function GalaxyCore({ compact = false }: { compact?: boolean }) {
  const wrapperClassName = compact
    ? "absolute left-1/2 top-[49%] h-[20rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 sm:h-[24rem] sm:w-[28rem]"
    : "absolute left-1/2 top-[42%] h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/2";

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
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="core-primary" x1="150" x2="850" y1="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5dc9ff" />
            <stop offset="0.22" stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#ff8ce1" />
            <stop offset="0.78" stopColor="#b95dff" />
            <stop offset="1" stopColor="#5dc9ff" />
          </linearGradient>
          <linearGradient id="core-secondary" x1="180" x2="820" y1="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5dd5ff" />
            <stop offset="0.34" stopColor="#f472b6" />
            <stop offset="0.66" stopColor="#c084fc" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <radialGradient
            id="core-glow"
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
          <filter id="soft-glow" x="-30%" y="-50%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="10" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>

        <ellipse
          cx="500"
          cy="280"
          rx="332"
          ry="112"
          stroke="url(#core-primary)"
          strokeWidth="18"
          filter="url(#soft-glow)"
          opacity="0.95"
        />
        <ellipse
          cx="500"
          cy="280"
          rx="308"
          ry="100"
          stroke="url(#core-secondary)"
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

        <ellipse cx="500" cy="280" rx="190" ry="72" fill="url(#core-glow)" />
      </motion.svg>
    </motion.div>
  );
}

function OrbitCore({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      className={`absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 ${
        compact ? "h-[13rem] w-[13rem]" : "h-[18rem] w-[18rem]"
      }`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.15 }}
    >
      <div
        className="absolute inset-[8%] rounded-full blur-[38px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 94, 247, 0.24) 0%, rgba(116, 64, 255, 0.18) 45%, transparent 76%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-[6%] rounded-full border border-fuchsia-300/25" />
        <div className="absolute inset-[11%] rounded-full border border-cyan-300/18" />
      </motion.div>
      <motion.div
        className="relative h-full w-full"
        animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={coreAssetPath}
          alt="Nucleo orbital"
          draggable="false"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_34px_rgba(230,120,255,0.34)]"
        />
      </motion.div>
    </motion.div>
  );
}

function HeroBrand({ activeFeature, compact = false }: { activeFeature: Feature; compact?: boolean }) {
  return (
    <motion.div
      className={`relative z-10 mx-auto flex max-w-[48rem] flex-col items-center text-center ${
        compact ? "px-4" : "px-6"
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

      <div className={`relative ${compact ? "h-[6.3rem] w-[min(92vw,22rem)]" : "h-[9.5rem] w-[min(92vw,45rem)]"}`}>
        <img
          src={brandLogoPath}
          alt="Pokestor"
          draggable="false"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_28px_rgba(122,92,255,0.28)]"
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
        {elementRunes.map(({ Icon, color }, index) => (
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
            <Icon className="h-4 w-4" strokeWidth={1.9} />
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
            href="#orbita"
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

function OrbitSymbol({ feature, active }: { feature: Feature; active: boolean }) {
  const backClipId = `${feature.id}-ring-back`;
  const frontClipId = `${feature.id}-ring-front`;

  return (
    <div className="relative h-[10.6rem] w-[10.6rem]">
      <div
        className="absolute inset-[18%] rounded-full blur-[34px]"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(feature.color, active ? 0.38 : 0.24)} 0%, ${hexToRgba(
            feature.secondary,
            0.12
          )} 55%, transparent 78%)`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 10 : 13, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 z-0 h-full w-full overflow-visible" viewBox="0 0 220 220" aria-hidden="true">
          <defs>
            <clipPath id={backClipId}>
              <rect x="0" y="0" width="220" height="110" />
            </clipPath>
            <clipPath id={frontClipId}>
              <rect x="0" y="110" width="220" height="110" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${backClipId})`}>
            <ellipse
              cx="110"
              cy="114"
              rx="82"
              ry="30"
              fill="none"
              stroke={hexToRgba(feature.color, 0.38)}
              strokeWidth="4"
            />
            <ellipse
              cx="110"
              cy="114"
              rx="66"
              ry="22"
              fill="none"
              stroke={hexToRgba(feature.secondary, 0.24)}
              strokeWidth="2"
              strokeDasharray="9 11"
            />
          </g>
          <g clipPath={`url(#${frontClipId})`}>
            <ellipse
              cx="110"
              cy="114"
              rx="82"
              ry="30"
              fill="none"
              stroke={hexToRgba(feature.color, 0.9)}
              strokeWidth="4.8"
            />
            <ellipse
              cx="110"
              cy="114"
              rx="66"
              ry="22"
              fill="none"
              stroke={hexToRgba(feature.secondary, 0.72)}
              strokeWidth="2.4"
              strokeDasharray="10 12"
            />
          </g>
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-[12%] z-10 rounded-full"
        animate={{ y: [0, -10, 0], rotate: active ? [0, -2, 2, 0] : [0, -1.5, 1.5, 0] }}
        transition={{
          y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: hexToRgba(feature.color, active ? 0.74 : 0.45),
            background: `radial-gradient(circle at 30% 28%, ${hexToRgba(feature.color, 0.22)} 0%, rgba(12, 8, 28, 0.84) 58%, rgba(5, 4, 15, 0.96) 100%)`,
            boxShadow: `0 0 30px ${hexToRgba(feature.color, 0.24)}, inset -14px -14px 26px rgba(0,0,0,0.36), inset 6px 6px 16px ${hexToRgba(
              feature.color,
              0.16
            )}`,
          }}
        />
        <div className="absolute inset-[7%] overflow-hidden rounded-full border border-white/8 bg-black/15">
          <FeatureArt feature={feature} className="h-full w-full" />
        </div>
      </motion.div>
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

function OrbitFocusPanel({ activeFeature }: { activeFeature: Feature }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 hidden w-[24rem] -translate-x-1/2 lg:block"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div
        className="pixel-cut relative overflow-hidden border px-5 py-5 text-center"
        style={{
          borderColor: hexToRgba(activeFeature.color, 0.44),
          background: "linear-gradient(180deg, rgba(12, 9, 26, 0.95) 0%, rgba(7, 6, 17, 0.86) 100%)",
          boxShadow: `0 0 26px ${hexToRgba(activeFeature.color, 0.12)}`,
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at top center, ${hexToRgba(activeFeature.color, 0.18)} 0%, transparent 58%)`,
          }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center justify-center">
            <FeatureArt feature={activeFeature} className="h-14 w-14" />
          </div>
          <div className="flex items-center justify-center gap-2" style={{ color: activeFeature.color }}>
            {featureIcon(activeFeature.id, "h-4 w-4")}
            <p className="font-display text-[0.52rem] uppercase tracking-[0.18em]">{activeFeature.eyebrow}</p>
          </div>
          <h3 className="mt-3 font-terminal text-[1.6rem] leading-none text-white">{activeFeature.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-200/74">{activeFeature.detail}</p>
        </div>
      </div>
    </motion.div>
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
      <div className="relative flex items-start gap-3">
        <div
          className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border"
          style={{
            borderColor: hexToRgba(feature.color, 0.52),
            background: `radial-gradient(circle, ${hexToRgba(feature.color, 0.18)} 0%, rgba(5, 5, 16, 0.2) 100%)`,
            boxShadow: `0 0 14px ${hexToRgba(feature.color, 0.18)}`,
          }}
        >
          <FeatureArt feature={feature} className="h-full w-full" />
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

        {features.map((feature) => (
          <FeatureNode
            key={feature.id}
            feature={feature}
            active={feature.id === activeFeature.id}
            onSelect={onSelect}
          />
        ))}

        <OrbitFocusPanel activeFeature={activeFeature} />
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
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];

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
        <DesktopLanding activeFeature={activeFeature} onSelect={setActiveFeatureId} />
        <MobileLanding activeFeature={activeFeature} onSelect={setActiveFeatureId} />
      </div>
    </main>
  );
}
