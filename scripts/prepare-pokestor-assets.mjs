import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceMap = new Map([
  ["eventos", "c:/Users/natan/Downloads/Design sem nome/2.png"],
  ["exploracao", "c:/Users/natan/Downloads/Design sem nome/3.png"],
  ["canal", "c:/Users/natan/Downloads/Design sem nome/4.png"],
  ["pokedex", "c:/Users/natan/Downloads/Design sem nome/1.png"],
  ["captura", "c:/Users/natan/Downloads/Design sem nome/5.png"],
  ["core", "c:/Users/natan/Downloads/Design sem nome (3).png"],
  ["logo", "c:/Users/natan/Downloads/cab5cf29-41ce-4ec5-a472-b6c1e88ddd9b (1).png"],
]);

const outputDirectory = path.resolve(__dirname, "../public/pokestor-assets");

function isBackgroundPixel(red, green, blue, alpha) {
  if (alpha === 0) {
    return true;
  }

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const average = (red + green + blue) / 3;
  const neutralSpread = max - min;

  const lightBackground = average >= 210 && neutralSpread <= 26;
  const darkBackground = average <= 22 && neutralSpread <= 20;

  return lightBackground || darkBackground;
}

function encodeIndex(x, y, width) {
  return y * width + x;
}

await fs.mkdir(outputDirectory, { recursive: true });

for (const [name, sourcePath] of sourceMap) {
  const image = sharp(sourcePath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const addSeed = (x, y) => {
    const encoded = encodeIndex(x, y, width);
    if (visited[encoded]) {
      return;
    }

    const offset = encoded * channels;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = data[offset + 3];

    if (isBackgroundPixel(red, green, blue, alpha)) {
      visited[encoded] = 1;
      queue[tail++] = encoded;
    }
  };

  for (let x = 0; x < width; x += 1) {
    addSeed(x, 0);
    addSeed(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    addSeed(0, y);
    addSeed(width - 1, y);
  }

  while (head < tail) {
    const encoded = queue[head++];
    const x = encoded % width;
    const y = Math.floor(encoded / width);

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (const [nextX, nextY] of neighbors) {
      if (nextX < 0 || nextY < 0 || nextX >= width || nextY >= height) {
        continue;
      }

      const nextEncoded = encodeIndex(nextX, nextY, width);
      if (visited[nextEncoded]) {
        continue;
      }

      const offset = nextEncoded * channels;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const alpha = data[offset + 3];

      if (isBackgroundPixel(red, green, blue, alpha)) {
        visited[nextEncoded] = 1;
        queue[tail++] = nextEncoded;
      }
    }
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const encoded = encodeIndex(x, y, width);
      const offset = encoded * channels;

      if (visited[encoded]) {
        data[offset + 3] = 0;
        continue;
      }

      if (data[offset + 3] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < 0 || maxY < 0) {
    throw new Error(`Nenhum conteudo detectado para ${name}`);
  }

  const padding = name === "logo" ? 40 : name === "core" ? 50 : 36;
  const left = Math.max(0, minX - padding);
  const top = Math.max(0, minY - padding);
  const extractWidth = Math.min(width - left, maxX - minX + 1 + padding * 2);
  const extractHeight = Math.min(height - top, maxY - minY + 1 + padding * 2);

  const outputPath = path.join(outputDirectory, `${name}.png`);

  await sharp(data, { raw: info })
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .png()
    .toFile(outputPath);

  console.log(`Salvo em ${outputPath}`);
}
