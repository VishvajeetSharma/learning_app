import type { Pt } from './letters';

/** The most recent handwriting attempt, handed from Write -> Result without serialising through route params. */
export const attempt: { strokes: Pt[][]; w: number; h: number; hint?: string } = {
  strokes: [],
  w: 1,
  h: 1,
};

export const setAttempt = (data: {
  strokes: Pt[][];
  w: number;
  h: number;
  hint?: string;
}) => {
  attempt.strokes = data.strokes;
  attempt.w = data.w;
  attempt.h = data.h;
  attempt.hint = data.hint;
};
