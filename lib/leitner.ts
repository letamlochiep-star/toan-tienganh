// lib/leitner.ts
/**
 * Simple Leitner box implementation for review scheduling.
 * We keep three boxes (1, 2, 3) in localStorage.
 * - Box 1: newly learned / wrong answers → review next day.
 * - Box 2: answered correctly once → review after 2 days.
 * - Box 3: answered correctly twice → review after 4 days.
 *
 * The functions operate purely on the client side (no DB). They
 * expose utilities that can be used by the quiz/result screens.
 */
export type LeitnerBox = 1 | 2 | 3;

export interface LeitnerState {
  [box: number]: string[]; // store term IDs (e.g., "natural-number")
}

const STORAGE_KEY = "leitner_state";

function loadState(): LeitnerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LeitnerState;
  } catch (e) {
    // ignore parsing errors
  }
  // default empty boxes
  return { 1: [], 2: [], 3: [] };
}

function saveState(state: LeitnerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore storage errors
  }
}

/** Put a term into box 1 (new or wrong). */
export function pushToBox1(termId: string) {
  const state = loadState();
  // remove term from any other box first
  for (const b of [1, 2, 3] as LeitnerBox[]) {
    state[b] = state[b].filter((id) => id !== termId);
  }
  state[1].push(termId);
  saveState(state);
}

/** Promote a term to the next box after a correct answer. */
export function promoteTerm(termId: string) {
  const state = loadState();
  if (state[1].includes(termId)) {
    state[1] = state[1].filter((id) => id !== termId);
    state[2].push(termId);
  } else if (state[2].includes(termId)) {
    state[2] = state[2].filter((id) => id !== termId);
    state[3].push(termId);
  } else if (state[3].includes(termId)) {
    // already in highest box – keep there
  } else {
    // not in any box, treat as new
    state[1].push(termId);
  }
  saveState(state);
}

/** Retrieve terms that should be reviewed today.
 *  Simple schedule: Box1 → every day, Box2 → every 2 days, Box3 → every 4 days.
 *  We compute based on the stored day index (saved in localStorage as "review_day").
 */
export function getTodayReviewTerms(): string[] {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); // days since epoch
  const state = loadState();
  const result: string[] = [];
  if (dayIndex % 1 === 0) result.push(...state[1]); // every day
  if (dayIndex % 2 === 0) result.push(...state[2]); // every 2 days
  if (dayIndex % 4 === 0) result.push(...state[3]); // every 4 days
  return result;
}

/** Reset all Leitner data (useful for testing). */
export function resetLeitner() {
  const empty: LeitnerState = { 1: [], 2: [], 3: [] };
  saveState(empty);
}
