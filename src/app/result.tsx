import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { attempt } from '@/lib/attempt';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { StrokePreview } from '@/ui/Canvas';
import { AnimalImg, Btn, Card, Confetti, Rays, Ribbon, Scene } from '@/ui/kit';

export default function Result() {
  const { id, ok } = useLocalSearchParams<{ id: string; ok: string }>();
  const a = getAnimal(id);
  const good = ok === '1';
  const idx = ANIMALS.indexOf(a);
  const last = idx === ANIMALS.length - 1;
  const { voice } = useStore();
  const [showInk, setShowInk] = useState(true);
  const { height } = useWindowDimensions();
  const animalSize = Math.max(150, Math.min(good ? 240 : 200, height * (good ? 0.27 : 0.22)));

  // gentle "uh-oh" shake for the wrong-answer screen (decorative)
  const [shake] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (good) return;
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(shake, { toValue: 1, duration: 70, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 110, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 110, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 70, useNativeDriver: true }),
    ]).start();
  }, [good, shake]);

  const retry = () => router.replace({ pathname: '/write', params: { id: a.id } });
  const rainbow = [colors.coral, colors.orange, colors.green, colors.blue, colors.purple];

  return (
    <Scene bg={good ? 'success' : 'wrong'} overlay={good ? <Confetti count={24} /> : null}>
      <View style={{ alignItems: 'center', marginTop: scale(10) }}>
        <Ribbon text={good ? 'Excellent!' : 'Not quite!'} kind={good ? 'orange' : 'red'} stars={good} />

        {!good && (
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: radius.xl,
              backgroundColor: ui.panel,
              borderWidth: 2.5,
              borderColor: colors.white,
              ...shadows.card,
            }}
          >
            <Text style={{ ...typography.bodyStrong, textAlign: 'center', color: colors.ink, fontSize: 18 }}>
              That&apos;s not correct.{'\n'}Try again!
            </Text>
          </View>
        )}

        {/* Animal character (sunburst + halo when correct) */}
        <View
          style={{
            marginTop: scale(good ? 8 : 12),
            width: animalSize,
            height: animalSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {good && (
            <View style={{ position: 'absolute' }}>
              <Rays size={animalSize * 1.9} />
            </View>
          )}
          <Animated.View
            style={{
              transform: [{ translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] }) }],
            }}
          >
            <AnimalImg animal={a} size={animalSize} dim={!good} aura={good} bounce={good} />
          </Animated.View>
        </View>

        {good && (
          <View
            style={{
              marginTop: scale(10),
              alignItems: 'center',
              paddingHorizontal: 26,
              paddingVertical: 8,
              borderRadius: radius.xl,
              backgroundColor: ui.panel,
              borderWidth: 3,
              borderColor: colors.white,
              ...shadows.lift,
            }}
          >
            <Text style={{ ...typography.heading, fontSize: 18, color: colors.title }}>You wrote</Text>
            <Text style={{ ...typography.hero, fontSize: scale(40), letterSpacing: 3 }}>
              {a.name
                .toUpperCase()
                .split('')
                .map((c, i) => (
                  <Text key={i} style={{ color: rainbow[i % rainbow.length] }}>
                    {c}
                  </Text>
                ))}
            </Text>
            <Text style={{ ...typography.heading, fontSize: 18, color: colors.title }}>correctly!</Text>
          </View>
        )}
      </View>

      {/* Child's handwriting attempt */}
      {!good && (
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Card tone="white" r={radius.lg} style={{ width: '94%', height: scale(108) }}>
            {showInk && attempt.strokes.length ? (
              <StrokePreview
                strokes={attempt.strokes}
                srcW={attempt.w}
                srcH={attempt.h}
                width={scale(280)}
                height={scale(86)}
                ink={colors.red}
              />
            ) : null}
          </Card>
          {attempt.hint ? (
            <View
              style={{
                marginTop: 8,
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: radius.lg,
                backgroundColor: ui.dangerBg,
                borderWidth: 2,
                borderColor: ui.dangerEdge,
              }}
            >
              <Text style={{ ...typography.bodyStrong, color: colors.redDark, textAlign: 'center', fontSize: 15 }}>
                {attempt.hint}
              </Text>
            </View>
          ) : null}
        </View>
      )}

      <View style={{ flex: 1 }} />

      {/* Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
        {!good && (
          <Btn label="Clear" icon="refresh" kind="red" onPress={() => setShowInk(false)} style={{ flex: 1 }} small />
        )}
        <Btn
          label="Hear Again"
          icon="volume-high"
          kind="blue"
          onPress={() => speak(a.name, voice)}
          style={{ flex: 1 }}
          small
        />
      </View>

      {good ? (
        <Btn
          label={last ? 'See My Progress' : 'Next Animal'}
          iconRight="arrow-forward"
          kind="green"
          onPress={() =>
            last
              ? router.replace('/progress')
              : router.replace({ pathname: '/next', params: { id: ANIMALS[idx + 1].id } })
          }
        />
      ) : (
        <Btn label="Try Again" icon="refresh" kind="orange" onPress={retry} />
      )}
    </Scene>
  );
}
