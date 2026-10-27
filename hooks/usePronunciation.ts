import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook to play pronunciation audio for a term.
 * Priority chain:
 *   1️⃣ Pre‑generated local file (public/audio/words or sentences).
 *   2️⃣ Server‑side Gemini TTS via /api/tts (fallback & caching).
 *   3️⃣ Browser SpeechSynthesis as last resort.
 */
export function usePronunciation(audioId: string, text: string, lang: string = 'en-US') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Build possible local URLs
  const localWordUrl = `/audio/words/${audioId}.mp3`;
  const localSentenceUrl = `/audio/sentences/${audioId}.mp3`;

  // Helper: play an HTMLAudioElement and handle state
  const playAudio = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const audio = new Audio(src);
    audioRef.current = audio;
    setPlaying(true);
    audio.play().catch((e) => {
      setError(String(e));
    });
    audio.onended = () => setPlaying(false);
    audio.onerror = () => {
      setError('Failed to load audio');
      setPlaying(false);
    };
  }, []);

  const fetchFromServer = useCallback(async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, kind: 'word' }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      playAudio(url);
    } catch (e) {
      throw e;
    }
  }, [text, playAudio]);

  const fallbackSpeechSynthesis = useCallback(() => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.onstart = () => setPlaying(true);
    utter.onend = () => setPlaying(false);
    utter.onerror = (ev) => setError('SpeechSynthesis error');
    speechSynthesis.speak(utter);
  }, [text, lang]);

  const play = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // 1️⃣ Try local file (word first, then sentence) – verify non‑empty file
      const testUrl = async (url: string) => {
        const res = await fetch(url, { method: 'HEAD' });
        const length = Number(res.headers.get('content-length'));
        return res.ok && length > 0;
      };
      const existsWord = await testUrl(localWordUrl);
      if (existsWord) {
        playAudio(localWordUrl);
        setLoading(false);
        return;
      }
      const existsSentence = await testUrl(localSentenceUrl);
      if (existsSentence) {
        playAudio(localSentenceUrl);
        setLoading(false);
        return;
      }
      // 2️⃣ Server fallback
      try {
        await fetchFromServer();
        setLoading(false);
        return;
      } catch (e) {
        // continue to next fallback
      }
      // 3️⃣ Browser TTS
      fallbackSpeechSynthesis();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [localWordUrl, localSentenceUrl, fetchFromServer, fallbackSpeechSynthesis, playAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      speechSynthesis.cancel();
    };
  }, []);

  return { play, loading, error, playing };
}
