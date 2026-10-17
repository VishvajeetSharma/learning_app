import type { Pt } from './letters';
/** The most recent handwriting attempt, handed from Write -> Result without serialising through route params. */
export const attempt: { strokes: Pt[][]; w: number; h: number; hint?: string } = { strokes: [], w: 1, h: 1 };
