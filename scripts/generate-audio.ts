import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TTS_MODEL, TTS_VOICE } from '../lib/tts-config';

// Helper: sleep
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Load Gemini client lazily
let genAI: any;
async function getGenAI() {
  if (!genAI) {
    try {
      const {GoogleGenerativeAI} = await import('@google/generative-ai');
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY not set');
      }
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (e) {
      console.error('Failed to load @google/generative-ai:', e);
      throw e;
    }
  }
  return genAI;
}

// Simple rate‑limit: 1 request per 800 ms (~1.25 req/s)
let lastCall = 0;
async function rateLimited<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const wait = Math.max(0, 800 - (now - lastCall));
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  return fn();
}

async function generateAudio(text: string, outputPath: string) {
  const genAI = await getGenAI();
  const model = genAI.getGenerativeModel({
    model: TTS_MODEL,
    generationConfig: { responseMimeType: 'audio/mp3' },
    // voice config according to latest Gemini TTS API
    systemInstruction: `Speak the following text in clear American English using voice ${TTS_VOICE}.`,
  });
  try {
    const result = await rateLimited(() => model.generateContent(text));
    const blob = await result.response.audio?.blob();
    if (!blob) throw new Error('No audio returned');
    const buffer = Buffer.from(await blob.arrayBuffer());
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.promises.writeFile(outputPath, buffer);
    console.log(`✅ ${outputPath}`);
  } catch (e) {
    console.error(`❌ Failed ${outputPath}:`, e);
    // log error to file for later review
    const errLog = path.resolve('scripts/audio-errors.json');
    let errData: any = {};
    try { errData = JSON.parse(await fs.promises.readFile(errLog, 'utf8')); } catch {}
    errData[text] = (e as any).message || String(e);
    await fs.promises.writeFile(errLog, JSON.stringify(errData, null, 2));
    throw e;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dayArg = args.find((a) => a === '--day' || a.startsWith('--day='));
  let day: number | undefined;
  if (dayArg) {
    const idx = args.indexOf(dayArg);
    if (dayArg === '--day') day = Number(args[idx + 1]);
    else day = Number(dayArg.split('=')[1]);
  }
  if (!day) {
    console.error('Provide --day <number>');
    process.exit(1);
  }

  const wordsPath = path.resolve('data', 'words.json');
  if (!fs.existsSync(wordsPath)) {
    console.error('words.json not found, fallback to CSV');
    process.exit(1);
  }
  const raw = await fs.promises.readFile(wordsPath, 'utf8');
  const data = JSON.parse(raw);
  const entries = data.words.filter((w: any) => w.day === day);
  if (!entries.length) {
    console.error(`No entries for day ${day}`);
    process.exit(1);
  }

  for (const entry of entries) {
    const wordId = entry.term.replace(/\s+/g, '-').toLowerCase();
    const wordAudio = path.resolve('public', 'audio', 'words', `${wordId}.wav`);
    if (!fs.existsSync(wordAudio)) {
      await generateAudio(entry.term, wordAudio);
    } else {
      console.log(`🔁 Skipping existing word audio: ${wordAudio}`);
    }
    // sentence example
    if (entry.example_en) {
      const sentId = `${wordId}-sentence`;
      const sentAudio = path.resolve('public', 'audio', 'sentences', `${sentId}.wav`);
      if (!fs.existsSync(sentAudio)) {
        await generateAudio(entry.example_en, sentAudio);
      } else {
        console.log(`🔁 Skipping existing sentence audio: ${sentAudio}`);
      }
    }
  }
}

main().catch((e) => {
  console.error('Script terminated with error:', e);
  process.exit(1);
});
