import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse/sync';

// Load CSV
const csvPath = path.resolve('knowledge', 'tu-vung-toan-6-9.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (first line header)
const records = csvParse.parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

// Map each record to word object structure
const words = records.map((row: any) => {
  const term = row.term.trim();
  const termId = term.replace(/\s+/g, '-').toLowerCase();
  return {
    day: Number(row.day),
    grade: Number(row.grade),
    topic: row.topic.trim(),
    term: term,
    ipa_us: row.ipa_us.trim(),
    meaning_vi: row.meaning_vi.trim(),
    example_en: `An example sentence using ${term}.`,
    example_vi: `Câu ví dụ cho ${term}.`,
    memory_tip: '',
    image_hint: '',
    image_file: `${termId}.svg`,
    status: 'draft',
  };
});

// Write JSON
const outPath = path.resolve('data', 'words.json');
fs.writeFileSync(outPath, JSON.stringify({ words }, null, 2), 'utf8');
console.log(`✅ Generated ${words.length} word entries to ${outPath}`);
