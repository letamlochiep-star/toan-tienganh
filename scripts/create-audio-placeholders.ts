// Script to create placeholder audio files (empty .mp3) for all words and example sentences
import fs from 'fs';
import path from 'path';

const wordsPath = path.resolve('data', 'words.json');
if (!fs.existsSync(wordsPath)) {
  console.error('words.json not found');
  process.exit(1);
}
const raw = fs.readFileSync(wordsPath, 'utf8');
const data = JSON.parse(raw);

function ensureFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    // Write a 0-byte placeholder (could be a short silent mp3 later)
    fs.writeFileSync(filePath, Buffer.alloc(0));
    console.log(`📁 placeholder created: ${filePath}`);
  }
}

for (const word of data.words) {
  const wordId = word.term.replace(/\s+/g, '-').toLowerCase();
  const wordAudio = path.resolve('public', 'audio', 'words', `${wordId}.mp3`);
  ensureFile(wordAudio);
  if (word.example_en) {
    const sentId = `${wordId}-sentence`;
    const sentenceAudio = path.resolve('public', 'audio', 'sentences', `${sentId}.mp3`);
    ensureFile(sentenceAudio);
  }
}

console.log('✅ All placeholder audio files ensured.');
