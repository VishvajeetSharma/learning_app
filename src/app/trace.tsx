import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { getAnimal } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { Pt, verifyTrace } from '@/lib/letters';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { Tone, colors, tones, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { CanvasHandle, DrawCanvas, guideBox, toGuideUnits } from '@/ui/Canvas';
import { Btn, Card, Gradient, Header, Scene } from '@/ui/kit';

export default function Trace() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = getAnimal(id);
  const letters = a.name.toUpperCase().split('');
  const { voice } = useStore();
  const [i, setI] = useState(0);
  const [h, setH] = useState(scale(290));
  const cv = useRef<CanvasHandle>(null);
  const { width } = useWindowDimensions();
  const w = Math.min(width, 480) - scale(32) - 8;

  const onChange = (px: Pt[][]) => {
    if (!px.length) return;
    if (verifyTrace(letters[i], toGuideUnits(px, w, h))) {
      speak(letters[i], voice);
      cv.current?.clear();
      if (i + 1 >= letters.length) {
        router.replace({ pathname: '/write', params: { id: a.id } });
      } else {
        setI(i + 1);
      }
    }
  };

  const box = guideBox(w, h);

  return (
    <Scene bg="tracing">
      <Header title="Trace & Write" sub={`${i + 1} of ${letters.length}`} home={true} back={true} />

      {/* Drawing tablet */}
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
          <Gradient stops={['#FFFFFF', '#EEF6FF']} />

          {/* writing lines: top line, mid line and baseline of the guide letter */}
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: h }}>
            {[
              { y: box.y, c: ui.paperLine },
              { y: box.y + box.s / 2, c: ui.paperLine },
              { y: box.y + box.s, c: ui.paperLineStrong },
            ].map((l, k) => (
              <View
                key={k}
                style={{ position: 'absolute', left: 18, right: 18, top: l.y - 1, height: 3, borderRadius: 2, backgroundColor: l.c }}
              />
            ))}
          </View>

          <DrawCanvas
            key={i}
            ref={cv}
            width={w}
            height={h}
            guide={letters[i]}
            ink={colors.blue}
            thickness={12}
            onChange={onChange}
          />

          {/* Speaker button (whole circle is tappable) */}
          <Pressable
            onPress={() => speak(letters[i], true)}
            accessibilityRole="button"
            accessibilityLabel="Hear the letter"
            hitSlop={6}
            style={{
              position: 'absolute',
              right: 16,
              top: 16,
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: colors.blueSoft,
              borderWidth: 3,
              borderColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.card,
            }}
          >
            <Ionicons name="volume-high" size={26} color={colors.blue} />
          </Pressable>

          {DECOR.tracingFinger ? (
            <View pointerEvents="none" style={{ position: 'absolute', right: 8, bottom: 8 }}>
              <Image source={DECOR.tracingFinger} style={{ width: scale(88), height: scale(88) }} contentFit="contain" />
            </View>
          ) : null}
        </View>

        {/* tablet bezel drawn on top so strokes never spill over the frame */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.xl,
            borderWidth: 6,
            borderColor: '#9CCBFF',
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            right: 6,
            bottom: 6,
            borderRadius: radius.xl - 6,
            borderWidth: 2,
            borderColor: colors.white,
          }}
        />
      </View>

      {/* Letter tiles: done = green, current = blue + bigger, upcoming = white */}
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, marginBottom: 12 }}>
        {letters.map((l, k) => {
          const isDone = k < i;
          const isCurrent = k === i;
          const tone: Tone = isDone ? 'green' : isCurrent ? 'blue' : 'white';

          return (
            <Card
              key={k}
              tone={tone}
              r={radius.md}
              style={{ flex: 1, height: scale(isCurrent ? 68 : 60), alignSelf: 'flex-end' }}
            >
              <Text
                style={{
                  ...typography.title,
                  fontSize: isCurrent ? 32 : 28,
                  color: isDone ? colors.greenDark : tones[tone].label,
                }}
              >
                {l}
              </Text>
              {isDone && (
                <View style={{ position: 'absolute', top: 3, right: 3 }}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.green} />
                </View>
              )}
            </Card>
          );
        })}
      </View>

      {/* Clear & Hear Again */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 6 }}>
        <Btn label="Clear" icon="refresh" kind="red" onPress={() => cv.current?.clear()} style={{ flex: 1 }} small />
        <Btn label="Hear Again" icon="volume-high" kind="blue" onPress={() => speak(a.name, true)} style={{ flex: 1 }} small />
      </View>
    </Scene>
  );
}
