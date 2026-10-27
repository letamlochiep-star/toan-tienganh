'use client';

import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const totalDays = 40;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentDay");
      if (stored) setCurrentDay(Number(stored));
    } catch (_) {}
  }, []);

  const startLearning = () => {
    window.location.href = `/hoc/${currentDay}`;
  };

  return (
    <main className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
      <Header title="Từ vựng Toán mỗi ngày" />
      <section className="w-full max-w-3xl text-center mt-6">
        <p className="text-gray-700 mb-4">Ứng dụng giúp bạn học từ vựng Toán qua 40 ngày luyện tập, mỗi ngày có các từ mới và âm thanh phát âm.</p>
        <ProgressBar current={currentDay} total={totalDays} />
        <h2 className="text-xl font-semibold mt-6 mb-2">Ngày học hôm nay</h2>
        <h1 className="text-2xl font-bold mb-4">Ngày {currentDay}</h1>
        <button
          onClick={startLearning}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Bắt đầu học
        </button>
      </section>
      <section className="w-full max-w-3xl mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Chọn ngày học</h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
            <Link
              key={day}
              href={`/hoc/${day}`}
              className={`p-2 text-center border rounded ${day === currentDay ? "bg-primary-100" : "bg-white"}`}
            >
              Ngày {day}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
