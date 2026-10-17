import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { PanResponder, View, ViewStyle } from 'react-native';
import Svg, { Circle, G, Path, Polygon, Text as SvgText } from 'react-native-svg';
import { LETTERS, Pt } from '@/lib/letters';
import { colors } from '@/theme/colors';

export type CanvasHandle = { clear: () => void; undo: () => void };
type P = {
  width: number; height: number; guide?: string; ink?: string | string[]; thickness?: number;
  /** Fired when a stroke is finished / cleared / undone (NOT on every move), with strokes in canvas pixels. */
  onChange?: (strokes: Pt[][]) => void; style?: ViewStyle;
};

/** Square region of the canvas the guide letter is drawn in; trace verification normalises against this. */
export const guideBox = (w: number, h: number) => { const s = Math.min(w, h) * 0.8; return { x: (w - s) / 2, y: (h - s) / 2, s }; };
export const toGuideUnits = (strokes: Pt[][], w: number, h: number): Pt[][] => { const b = guideBox(w, h); return strokes.map((st) => st.map((p) => ({ x: (p.x - b.x) / b.s, y: (p.y - b.y) / b.s }))); };

/** Quadratic-midpoint smoothing -> a single SVG path string. */
const toPath = (pts: Pt[]) => {
  if (!pts.length) return '';
  if (pts.length < 3) return pts.length === 1 ? `M${pts[0].x} ${pts[0].y} l0.01 0` : `M${pts[0].x} ${pts[0].y} L${pts[1].x} ${pts[1].y}`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) d += ` Q${pts[i].x} ${pts[i].y} ${(pts[i].x + pts[i + 1].x) / 2} ${(pts[i].y + pts[i + 1].y) / 2}`;
  return d + ` L${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
};

const Committed = memo(function Committed({ strokes, ink, t }: { strokes: Pt[][]; ink: string[]; t: number }) {
  return <>{strokes.map((s, i) => <Path key={i} d={toPath(s)} stroke={ink[i % ink.length]} strokeWidth={t} strokeLinecap="round" strokeLinejoin="round" fill="none" />)}</>;
});

const Guide = memo(function Guide({ letter, w, h }: { letter: string; w: number; h: number }) {
  const b = guideBox(w, h); const strokes = LETTERS[letter] ?? [];
  const px = (p: Pt) => ({ x: b.x + p.x * b.s, y: b.y + p.y * b.s });
  return (
    <G>
      {strokes.map((st, i) => {
        const pts = st.map(px); const a = pts[0]; const e = pts[pts.length - 1]; const q = pts[Math.max(0, pts.length - 3)];
        const ang = Math.atan2(e.y - q.y, e.x - q.x); const L = 14;
        const tri = [[e.x + Math.cos(ang) * L, e.y + Math.sin(ang) * L], [e.x + Math.cos(ang + 2.5) * L, e.y + Math.sin(ang + 2.5) * L], [e.x + Math.cos(ang - 2.5) * L, e.y + Math.sin(ang - 2.5) * L]].map((p) => p.join(',')).join(' ');
        return (
          <G key={i}>
            <Path d={'M' + pts.map((p) => `${p.x} ${p.y}`).join(' L')} stroke={colors.dotGuide} strokeWidth={7} strokeDasharray="0.1 14" strokeLinecap="round" fill="none" />
            <Polygon points={tri} fill={colors.blue} />
            <Circle cx={a.x} cy={a.y} r={13} fill={i === 0 ? colors.red : colors.blue} />
            <SvgText x={a.x} y={a.y + 5} fontSize={15} fontWeight="bold" fill={colors.white} textAnchor="middle">{i + 1}</SvgText>
          </G>
        );
      })}
    </G>
  );
});

export const DrawCanvas = forwardRef<CanvasHandle, P>(({ width, height, guide, ink = colors.blue, thickness = 10, onChange, style }, ref) => {
  const inks = Array.isArray(ink) ? ink : [ink];
  const [done, setDone] = useState<Pt[][]>([]);
  const [live, setLive] = useState<Pt[] | null>(null);
  const doneRef = useRef<Pt[][]>([]);
  const curRef = useRef<Pt[] | null>(null);
  const cb = useRef(onChange);
  useEffect(() => {
    cb.current = onChange;
  }, [onChange]);

  const commit = (n: Pt[][]) => { doneRef.current = n; setDone(n); cb.current?.(n); };
  useImperativeHandle(ref, () => ({ clear: () => { curRef.current = null; setLive(null); commit([]); }, undo: () => commit(doneRef.current.slice(0, -1)) }), []);

  // eslint-disable-next-line react-hooks/refs
  const [panResponder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        curRef.current = [{ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }];
        setLive(curRef.current);
      },
      onPanResponderMove: (e) => {
        const c = curRef.current;
        if (!c) return;
        const p = { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY };
        const l = c[c.length - 1];
        if (Math.hypot(p.x - l.x, p.y - l.y) < 3) return;
        curRef.current = [...c, p];
        setLive(curRef.current);
      },
      onPanResponderRelease: () => {
        const c = curRef.current;
        curRef.current = null;
        setLive(null);
        if (c) commit([...doneRef.current, c]);
      },
      onPanResponderTerminate: () => {
        const c = curRef.current;
        curRef.current = null;
        setLive(null);
        if (c) commit([...doneRef.current, c]);
      },
    })
  );

  return (
    <View {...panResponder.panHandlers} style={[{ width, height }, style]}>
      <Svg width={width} height={height} pointerEvents="none">
        {guide ? <Guide letter={guide} w={width} h={height} /> : null}
        <Committed strokes={done} ink={inks} t={thickness} />
        {live ? <Path d={toPath(live)} stroke={inks[done.length % inks.length]} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" fill="none" /> : null}
      </Svg>
    </View>
  );
});
DrawCanvas.displayName = 'DrawCanvas';

/** Read-only replay of a recorded attempt, scaled to fit (used on the Not Quite screen). */
export const StrokePreview = ({ strokes, srcW, srcH, width, height, ink = colors.red }: { strokes: Pt[][]; srcW: number; srcH: number; width: number; height: number; ink?: string | string[] }) => {
  const inks = Array.isArray(ink) ? ink : [ink];
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${srcW} ${srcH}`}>
      {strokes.map((s, i) => <Path key={i} d={toPath(s)} stroke={inks[i % inks.length]} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" />)}
    </Svg>
  );
};
