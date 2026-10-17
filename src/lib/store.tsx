import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Stat = { correct: number; attempts: number; stars: number; wrongStreak: number; last?: string };
export type Settings = { sound: boolean; voice: boolean; music: boolean };
export type State = { stats: Record<string, Stat> } & Settings;
const EMPTY: State = { stats: {}, sound: true, voice: true, music: false };
const KEY = 'little-learners-v1';

type Ctx = State & {
  ready: boolean;
  record: (id: string, ok: boolean) => void;
  set: (k: keyof Settings, v: boolean) => void;
  reset: () => void;
};
const C = createContext<Ctx>(null as never);
export const useStore = () => useContext(C);

/** Old saves only had {correct, attempts}; fill the new fields so nothing crashes. */
const migrate = (raw: Partial<State>): State => {
  const stats: Record<string, Stat> = {};
  for (const [k, v] of Object.entries(raw.stats ?? {})) {
    const o = v as Partial<Stat>;
    stats[k] = { correct: o.correct ?? 0, attempts: o.attempts ?? 0, stars: o.stars ?? o.correct ?? 0, wrongStreak: o.wrongStreak ?? 0, last: o.last };
  }
  return { ...EMPTY, ...raw, stats };
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);
  const latest = useRef(s);
  useEffect(() => {
    latest.current = s;
  }, [s]);
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => { if (v) setS(migrate(JSON.parse(v))); }).catch(() => {}).finally(() => setReady(true));
  }, []);
  const save = (n: State) => { latest.current = n; setS(n); AsyncStorage.setItem(KEY, JSON.stringify(n)).catch(() => {}); };
  const value = useMemo<Ctx>(() => ({
    ...s, ready,
    // reads latest.current so two quick calls can never overwrite each other with stale state
    record: (id, ok) => {
      const cur = latest.current; const p = cur.stats[id] ?? { correct: 0, attempts: 0, stars: 0, wrongStreak: 0 };
      const gained = ok ? Math.max(1, 3 - p.wrongStreak) : 0; // 3 stars first try, 2 after one miss, else 1
      save({ ...cur, stats: { ...cur.stats, [id]: { correct: p.correct + (ok ? 1 : 0), attempts: p.attempts + 1, stars: p.stars + gained, wrongStreak: ok ? 0 : p.wrongStreak + 1, last: new Date().toISOString() } } });
    },
    set: (k, v) => save({ ...latest.current, [k]: v }),
    reset: () => save({ ...latest.current, stats: {} }), // settings are kept; only learning progress is cleared
  }), [s, ready]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export const isLearned = (st?: Stat) => !!st && st.correct >= 1;
export const totals = (stats: Record<string, Stat>) => {
  const v = Object.values(stats);
  const attempts = v.reduce((n, x) => n + x.attempts, 0), correct = v.reduce((n, x) => n + x.correct, 0);
  return { attempts, correct, wrong: attempts - correct, stars: v.reduce((n, x) => n + x.stars, 0), accuracy: attempts ? Math.round((correct / attempts) * 100) : 0 };
};
