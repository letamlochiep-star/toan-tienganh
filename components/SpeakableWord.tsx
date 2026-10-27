'use client';

import React, { useEffect, useState } from "react";
import { usePronunciation } from "@/hooks/usePronunciation";

interface SpeakableWordProps {
  /** English term to be spoken */
  text: string;
  /** Unique id for caching (e.g., kebab‑case of term) */
  audioId: string;
  /** Language code for fallback speechSynthesis */
  lang?: string;
}

/**
 * <SpeakableWord> renders the English term with a speaker icon.
 */
export const SpeakableWord: React.FC<SpeakableWordProps> = ({ text, audioId, lang = "en-US" }) => {
  const [showIcon, setShowIcon] = useState(true);
  const { play, loading, error, playing } = usePronunciation(audioId, text, lang);

  return (
    <span
      className="relative inline-flex items-center gap-1 hover:underline focus:outline-none"
      tabIndex={0}
    >
      <span>{text}</span>
      {showIcon && (
        <button
          type="button"
          aria-label={`Nghe phát âm: ${text}`}
          className="inline-flex items-center justify-center rounded-full p-1.5 min-w-[32px] min-h-[32px] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary-600"
          onClick={(e) => {
            e.stopPropagation();
            play();
          }}
          disabled={loading}
        >
          {loading ? (
            <svg className="h-4 w-4 animate-spin text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
            </svg>
          ) : playing ? (
            <svg className="h-4 w-4 text-primary-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
      {error && (
        <span className="ml-1 text-xs text-red-500" title={error}>⚠️</span>
      )}
    </span>
  );
};
