'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WordCard from "../../components/WordCard";

export default function LearnDay() {
  const router = useRouter();
  const { day, wrongOnly } = router.query as { day: string; wrongOnly?: string };
  const [words, setWords] = useState<any[]>([]);
  const [filterWrong, setFilterWrong] = useState<boolean>(false);

  // Determine if we should filter only wrong words
  useEffect(() => {
    setFilterWrong(wrongOnly === "true");
  }, [wrongOnly]);

  // Load words for the selected day (apply filter if needed)
  useEffect(() => {
    if (!day) return;
    async function load() {
      const res = await fetch("/data/words.json");
      const data = await res.json();
      const dayNum = Number(day);
      let filtered = data.words.filter((w: any) => w.day === dayNum);
      if (filterWrong) {
        filtered = filtered.filter((w: any) => w.lastResult === false);
      }
      setWords(filtered);
    }
    load();
  }, [day, filterWrong]);

  if (!day) return null;

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Ngày {day} – Học từ</h1>
      <div className="grid grid-cols-1 gap-4">
        {words.map((w, i) => (
          <WordCard key={i} word={w} />
        ))}
      </div>
      <button
        className="mt-6 bg-primary-600 text-white px-4 py-2 rounded"
        onClick={() => router.push(`/kiem-tra/${day}`)}
      >
        Bắt đầu kiểm tra
      </button>
    </main>
  );
}
