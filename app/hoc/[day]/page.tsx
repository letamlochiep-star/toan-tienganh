'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import WordCard from "@/components/WordCard";

export default function LearnDay() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const day = params?.day as string;
  const wrongOnly = searchParams?.get('wrongOnly');
  const [words, setWords] = useState<any[]>([]);
  const [filterWrong, setFilterWrong] = useState<boolean>(false);

  useEffect(() => {
    setFilterWrong(wrongOnly === "true");
  }, [wrongOnly]);

  useEffect(() => {
    if (!day) return;
    async function load() {
      try {
        const res = await fetch("/data/words.json");
        const data = await res.json();
        const dayNum = Number(day);
        let filtered = (data.words || []).filter((w: any) => w.day === dayNum);
        if (filterWrong) {
          filtered = filtered.filter((w: any) => w.lastResult === false);
        }
        setWords(filtered);
      } catch (e) {
        console.error("Error loading words:", e);
      }
    }
    load();
  }, [day, filterWrong]);

  if (!day) return null;

  return (
    <main className="p-4 max-w-3xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Ngày {day} – Học từ</h1>
        <button
          className="text-sm text-primary-600 hover:underline"
          onClick={() => router.push('/')}
        >
          ← Về trang chủ
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {words.length > 0 ? (
          words.map((w, i) => (
            <WordCard key={w.id || i} word={w} />
          ))
        ) : (
          <p className="text-gray-500">Đang tải danh sách từ vựng...</p>
        )}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition"
          onClick={() => router.push(`/`)}
        >
          Về danh sách bài học
        </button>
      </div>
    </main>
  );
}
