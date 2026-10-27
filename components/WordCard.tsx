'use client';

import React from 'react';
import { SpeakableWord } from '@/components/SpeakableWord';

interface Word {
  term: string;
  ipa_us?: string;
  meaning_vi?: string;
  example_en?: string;
  example_vi?: string;
  audioId?: string;
}

export default function WordCard({ word }: { word: Word }) {
  const audioId = word.audioId ?? word.term.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="border rounded p-3">
      <h2 className="font-semibold text-lg mb-1">
        <SpeakableWord text={word.term} audioId={audioId} />
      </h2>
      {word.ipa_us && <p className="text-sm text-gray-600 mb-1">{word.ipa_us}</p>}
      {word.meaning_vi && <p className="mb-1">{word.meaning_vi}</p>}
      {word.example_en && <p className="italic text-sm mb-1">{word.example_en}</p>}
      {word.example_vi && <p className="text-sm mb-1">{word.example_vi}</p>}
    </div>
  );
}
