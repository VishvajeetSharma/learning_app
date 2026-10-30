import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, View, useWindowDimensions } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { setAttempt } from '@/lib/attempt';
import type { Pt } from '@/lib/letters';
import { recognizeWord } from '@/lib/recognizer';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { CanvasHandle, DrawCanvas } from '@/ui/Canvas';
import { Btn, Gradient, Header, Scene } from '@/ui/kit';

export default function Write() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = getAnimal(id);
  const idx = ANIMALS.indexOf(a);
  const { record, voice } = useStore();
  const strokes = useRef<Pt[][]>([]);
  const cv = useRef<CanvasHandle>(null);
  const { width } = useWindowDimensions();
  const w = Math.min(width, 480) - scale(32) - 16;
  const [h, setH] = useState(scale(270));

  const check = () => {
    if (!strokes.current.length) {
      return Alert.alert(
        'Write the word first!',
        `Use your finger to write ${a.name.toUpperCase()} on the board.`
      );
    }
    const res = recognizeWord(strokes.current, a.name);
    const hint =
      res.reason === 'count'
        ? `I see ${res.groups} letter${res.groups === 1 ? '' : 's'}, but ${a.name.toUpperCase()} has ${a.name.length}.`
        : undefined;

    setAttempt({
      strokes: strokes.current,
      w,
      h,
      hint,
    });

    record(a.id, res.ok);
    speak(res.ok ? 'Excellent!' : 'Not quite. Try again!', voice);
    router.replace({ pathname: '/result', params: { id: a.id, ok: res.ok ? '1' : '0' } });
  };

  return (
    <Scene bg="writing">
      <Header title="Write the Word" sub={`${idx + 1} of ${ANIMALS.length}`} home={true} back={true} />

      {/* Wooden-framed whiteboard */}
      <View
        style={{
          flex: 1,
          borderRadius: radius.xl,
          backgroundColor: colors.white,
          ...shadows.soft,
        }}
        onLayout={(e) => setH(e.nativeEvent.layout.height)}
      >
        <View style={{ flex: 1, borderRadius: radius.xl, overflow: 'hidden', alignItems: 'center' }}>
          <Gradient stops={['#FFFFFF', '#FFFDF3']} />

          {/* faint handwriting lines */}
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: h }}>
            {[0.34, 0.5, 0.66].map((f, k) => (
              <View
                key={k}
                style={{
                  position: 'absolute',
                  left: 22,
                  right: 22,
                  top: h * f - 1,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: k === 2 ? ui.paperLineStrong : ui.paperLine,
                }}
              />
            ))}
          </View>

          <DrawCanvas
            ref={cv}
            width={w}
            height={h}
            ink={[colors.ink1, colors.ink2, colors.ink3, colors.ink4, colors.ink5]}
            thickness={10}
            onChange={(s) => {
              strokes.current = s;
            }}
          />
        </View>

        {/* wooden frame on top */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.xl,
            borderWidth: 9,
            borderColor: '#D9A066',
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 9,
            left: 9,
            right: 9,
            bottom: 9,
            borderRadius: radius.xl - 9,
            borderWidth: 2,
            borderColor: '#F6D9AE',
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.xl,
            borderWidth: 1.5,
            borderColor: '#A8703A',
          }}
        />
      </View>

      {/* Clear & Hear Again */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 14, marginBottom: 12 }}>
        <Btn
          label="Clear"
          icon="refresh"
          kind="red"
          onPress={() => {
            cv.current?.clear();
            strokes.current = [];
          }}
          style={{ flex: 1 }}
          small
        />
        <Btn label="Hear Again" icon="volume-high" kind="blue" onPress={() => speak(a.name, true)} style={{ flex: 1 }} small />
      </View>

      {/* Check Answer */}
      <Btn label="Check Answer" icon="checkmark-circle" kind="green" onPress={check} style={{ marginBottom: 6 }} />
    </Scene>
  );
}
