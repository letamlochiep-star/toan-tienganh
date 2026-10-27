import React, { useEffect, useRef, useState } from "react";
import { usePronunciation } from "../hooks/usePronunciation";

interface SpeakableWordProps {
  /** English term to be spoken */
  text: string;
  /** Unique id for caching (e.g., kebab‑case of term) */
  audioId: string;
  /** Language code for fallback speechSynthesis */
  lang?: string;
}

/**
 * <SpeakableWord> renders the English term. When hovered / focused / touched it shows a small speaker icon.
 * Clicking the icon plays the pronunciation.
 * The component uses the `usePronunciation` hook which implements the priority chain:
 *   (a) pre‑generated file → (b) server‑side /api/tts → (c) browser speechSynthesis.
 */
export const SpeakableWord: React.FC<SpeakableWordProps> = ({ text, audioId, lang = "en-US" }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { play, loading, error, playing } = usePronunciation(audioId, text, lang);

  // Hover / focus handlers for desktop, always show on touch devices
  const handleMouseEnter = () => setShowIcon(true);
  const handleMouseLeave = () => setShowIcon(false);
  const handleFocus = () => setShowIcon(true);
  const handleBlur = () => setShowIcon(false);

  // Touch devices – show icon persistently (simplified detection)
  useEffect(() => {
    const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (mql.matches) setShowIcon(true);
  }, []);

  return (
    <span
      className="relative inline-flex items-center hover:underline focus:outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {text}
      {showIcon && (
        <button
          aria-label={`Nghe phát âm: ${text}`}
          className="ml-2 flex items-center justify-center rounded-full p-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
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
            <svg className="h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v18c-4.418 0-8-3.582-8-8s3.582-8 8-8z" />
            </svg>
          ))}
        </button>
      )}
      {error && (
        <span className="ml-1 text-sm text-red-500" title={error}>⚠️</span>
      )}
    </span>
  );
};
