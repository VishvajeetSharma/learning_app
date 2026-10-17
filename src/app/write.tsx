import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, View, useWindowDimensions } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { setAttempt } from '@/lib/attempt';
import type { Pt } from '@/lib/letters';
import { recognizeWord } from '@/lib/recognizer';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { CanvasHandle, DrawCanvas } from '@/ui/Canvas';
import { Btn, Header, Scene } from '@/ui/kit';

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
      <Header
        title="Write the Word"
        sub={`${idx + 1} of ${ANIMALS.length}`}
        home={true}
        back={true}
      />

      {/* Screen 6: Framed Easel Whiteboard */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderRadius: radius.xl,
          borderWidth: 8,
          borderColor: '#E8B97C',
          ...shadows.soft,
          overflow: 'hidden',
        }}
        onLayout={(e) => setH(e.nativeEvent.layout.height)}
      >
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

      {/* Screen 6: Red "Clear" & Blue "Hear Again" */}
      <View style={{ flexDirection: 'row', gap: 12, marginVertical: 12 }}>
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
        <Btn
          label="Hear Again"
          icon="volume-high"
          kind="blue"
          onPress={() => speak(a.name, true)}
          style={{ flex: 1 }}
          small
        />
      </View>

      {/* Screen 6: Giant Green "Check Answer ✓" */}
      <Btn
        label="Check Answer ✓"
        kind="green"
        onPress={check}
        style={{ marginBottom: 6 }}
      />
    </Scene>
  );
}
