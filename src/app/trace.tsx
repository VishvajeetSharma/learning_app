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
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { CanvasHandle, DrawCanvas, toGuideUnits } from '@/ui/Canvas';
import { Btn, Header, Scene } from '@/ui/kit';

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

  return (
    <Scene bg="tracing">
      <Header
        title="Trace & Write"
        sub={`${i + 1} of ${letters.length}`}
        home={true}
        back={true}
      />

      {/* Screen 5: Magic Tablet Drawing Board */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderRadius: radius.xl,
          padding: 6,
          borderWidth: 4,
          borderBottomWidth: 6,
          borderColor: '#BFDBFE',
          borderBottomColor: '#93C5FD',
          overflow: 'hidden',
          ...shadows.soft,
        }}
        onLayout={(e) => setH(e.nativeEvent.layout.height)}
      >
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

        {/* Top-Right Speaker Bubble Button */}
        <Pressable
          onPress={() => speak(letters[i], true)}
          accessibilityLabel="Hear letter pronunciation"
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#DBEAFE',
            borderWidth: 2,
            borderColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#2563EB',
            shadowOpacity: 0.18,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Ionicons name="volume-high" size={22} color={colors.blue} />
        </Pressable>

        {DECOR.tracingFinger ? (
          <View
            pointerEvents="none"
            style={{ position: 'absolute', right: 8, bottom: 8 }}
          >
            <Image
              source={DECOR.tracingFinger}
              style={{ width: scale(88), height: scale(88) }}
              contentFit="contain"
            />
          </View>
        ) : null}
      </View>

      {/* Screen 5: Chunky Candy Letter Blocks Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 14,
          gap: 6,
        }}
      >
        {letters.map((l, k) => {
          const isDone = k < i;
          const isCurrent = k === i;

          return (
            <View
              key={k}
              style={{
                flex: 1,
                height: scale(60),
                borderRadius: radius.md,
                backgroundColor: isDone
                  ? '#DCFCE7'
                  : isCurrent
                  ? '#EFF6FF'
                  : colors.white,
                borderWidth: isCurrent ? 3 : 2,
                borderBottomWidth: isCurrent ? 4.5 : 3.5,
                borderColor: isDone
                  ? '#86EFAC'
                  : isCurrent
                  ? '#3B82F6'
                  : '#E2E8F0',
                borderBottomColor: isDone
                  ? '#4ADE80'
                  : isCurrent
                  ? '#1D4ED8'
                  : '#CBD5E1',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ translateY: isCurrent ? -2 : 0 }],
                ...shadows.card,
              }}
            >
              <Text
                style={{
                  ...typography.title,
                  fontSize: 26,
                  fontWeight: '900',
                  color: isDone
                    ? '#15803D'
                    : isCurrent
                    ? '#1D4ED8'
                    : '#64748B',
                }}
              >
                {l}
              </Text>
              {isDone && (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 3,
                  }}
                >
                  <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Screen 5: Action Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
        <Btn
          label="Clear"
          icon="refresh"
          kind="red"
          onPress={() => cv.current?.clear()}
          style={{ flex: 1 }}
          small
        />
        <Btn
          label="Hear Again"
          icon="volume-high"
          kind="blue"
          onPress={() => speak(a.name, true)}
          style={{ flex: 1.2 }}
          small
        />
      </View>
    </Scene>
  );
}
