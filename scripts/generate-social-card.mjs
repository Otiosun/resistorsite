import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const outputPath = path.join(publicDir, "social-card.png");
const logoPath = path.join(publicDir, "pokestor-assets", "logo.webp");
const corePath = path.join(publicDir, "pokestor-assets", "core.webp");

const width = 1200;
const height = 630;

const backgroundSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#04010b"/>
      <stop offset="55%" stop-color="#0b0420"/>
      <stop offset="100%" stop-color="#05010e"/>
    </linearGradient>
    <radialGradient id="leftGlow" cx="0" cy="0" r="1" gradientTransform="translate(220 160) rotate(90) scale(250 380)">
      <stop offset="0%" stop-color="rgba(212,140,255,0.34)"/>
      <stop offset="100%" stop-color="rgba(212,140,255,0)"/>
    </radialGradient>
    <radialGradient id="rightGlow" cx="0" cy="0" r="1" gradientTransform="translate(940 420) rotate(90) scale(240 300)">
      <stop offset="0%" stop-color="rgba(91,217,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(91,217,255,0)"/>
    </radialGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(212,140,255,0)"/>
      <stop offset="32%" stop-color="rgba(212,140,255,0.58)"/>
      <stop offset="68%" stop-color="rgba(103,215,255,0.52)"/>
      <stop offset="100%" stop-color="rgba(103,215,255,0)"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="104" width="1200" height="2" fill="url(#line)"/>
  <circle cx="230" cy="180" r="220" fill="url(#leftGlow)"/>
  <circle cx="930" cy="430" r="220" fill="url(#rightGlow)"/>

  <g opacity="0.28">
    <circle cx="90" cy="82" r="2.2" fill="#ffffff"/>
    <circle cx="180" cy="126" r="1.8" fill="#ffffff"/>
    <circle cx="1060" cy="84" r="2.4" fill="#ffffff"/>
    <circle cx="1138" cy="132" r="1.7" fill="#ffffff"/>
    <circle cx="925" cy="206" r="2" fill="#ffffff"/>
    <circle cx="1012" cy="246" r="1.6" fill="#ffffff"/>
    <circle cx="128" cy="510" r="2.1" fill="#ffffff"/>
    <circle cx="262" cy="554" r="1.6" fill="#ffffff"/>
    <circle cx="1088" cy="522" r="2.1" fill="#ffffff"/>
    <circle cx="980" cy="558" r="1.8" fill="#ffffff"/>
  </g>

  <rect x="92" y="388" width="308" height="60" rx="30" fill="rgba(11,7,24,0.78)" stroke="rgba(212,140,255,0.34)"/>
  <text x="246" y="425" text-anchor="middle" font-size="20" font-family="Arial, Helvetica, sans-serif" letter-spacing="5" fill="#ef8fff">JORNADA COSMICA</text>

  <text x="94" y="494" font-size="44" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#ffffff">Pokedex, captura, exploracao,</text>
  <text x="94" y="548" font-size="44" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#ffffff">eventos e canal em uma so orbita.</text>

  <text x="95" y="592" font-size="22" font-family="Arial, Helvetica, sans-serif" fill="rgba(232,226,255,0.78)">Landing neon-retro pronta para publicacao em desktop e mobile.</text>
</svg>
`;

const background = sharp(Buffer.from(backgroundSvg)).png();

const logo = await sharp(logoPath).resize({ width: 470, fit: "inside", withoutEnlargement: true }).toBuffer();
const core = await sharp(corePath).resize({ width: 460, fit: "inside", withoutEnlargement: true }).toBuffer();

await background
  .composite([
    {
      input: logo,
      left: 78,
      top: 92,
    },
    {
      input: core,
      left: 716,
      top: 130,
    },
  ])
  .png()
  .toFile(outputPath);

console.log(`Social card salvo em ${outputPath}`);
