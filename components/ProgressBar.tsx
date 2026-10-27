import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
      <div
        className="bg-primary-600 h-4 rounded-full"
        style={{ width: `${percent}%` }}
        aria-label={`Progress: ${percent}%`}
      ></div>
    </div>
  );
}
