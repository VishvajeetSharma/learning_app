import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { attempt } from '@/lib/attempt';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { StrokePreview } from '@/ui/Canvas';
import { AnimalImg, Btn, Scene } from '@/ui/kit';

export default function Result() {
  const { id, ok } = useLocalSearchParams<{ id: string; ok: string }>();
  const a = getAnimal(id);
  const good = ok === '1';
  const idx = ANIMALS.indexOf(a);
  const last = idx === ANIMALS.length - 1;
  const { voice } = useStore();
  const [showInk, setShowInk] = useState(true);

  const retry = () => router.replace({ pathname: '/write', params: { id: a.id } });

  return (
    <Scene bg={good ? 'success' : 'wrong'}>
      <View style={{ alignItems: 'center', marginTop: scale(14) }}>
        {/* Screen 7 & 8: 3D Inflated Title */}
        <Text
          style={{
            ...typography.hero,
            fontSize: scale(38),
            color: good ? '#FF9A00' : '#FF4757',
            fontWeight: '900',
            letterSpacing: 1,
            textShadowColor: good ? '#8E4E00' : '#8A1521',
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 2 },
          }}
        >
          {good ? 'Excellent!' : 'Not quite!'}
        </Text>

        {!good && (
          <Text
            style={{
              ...typography.title,
              textAlign: 'center',
              color: colors.ink,
              fontSize: 17,
              fontWeight: '800',
              marginTop: 4,
            }}
          >
            That&apos;s not correct.{'\n'}Try again!
          </Text>
        )}

        {/* Animal Character */}
        <View style={{ marginTop: scale(10) }}>
          <AnimalImg
            animal={a}
            size={scale(good ? 230 : 190)}
            dim={!good}
          />
        </View>

        {good && (
          <View style={{ alignItems: 'center', marginTop: scale(8) }}>
            <Text style={{ ...typography.title, fontSize: 18, color: colors.ink, fontWeight: '800' }}>
              You wrote
            </Text>
            <Text
              style={{
                ...typography.hero,
                fontSize: scale(38),
                color: '#28A745',
                fontWeight: '900',
                letterSpacing: 2,
              }}
            >
              {a.name.toUpperCase()}
            </Text>
            <Text style={{ ...typography.title, fontSize: 18, color: colors.ink, fontWeight: '800' }}>
              correctly!
            </Text>
          </View>
        )}
      </View>

      {/* Screen 8: Display Child's Handwriting attempt */}
      {!good && (
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radius.lg,
              width: '92%',
              height: scale(96),
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#FFCCD5',
            }}
          >
            {showInk && attempt.strokes.length ? (
              <StrokePreview
                strokes={attempt.strokes}
                srcW={attempt.w}
                srcH={attempt.h}
                width={scale(280)}
                height={scale(80)}
                ink="#FF4757"
              />
            ) : null}
          </View>
          {attempt.hint ? (
            <Text
              style={{
                ...typography.body,
                color: colors.redDark,
                marginTop: 6,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              {attempt.hint}
            </Text>
          ) : null}
        </View>
      )}

      <View style={{ flex: 1 }} />

      {/* Screen 7 & 8: Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
        {!good && (
          <Btn
            label="Clear"
            icon="refresh"
            kind="red"
            onPress={() => setShowInk(false)}
            style={{ flex: 1 }}
            small
          />
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
          label={last ? 'See My Progress →' : 'Next Animal →'}
          kind="green"
          onPress={() =>
            last
              ? router.replace('/progress')
              : router.replace({ pathname: '/next', params: { id: ANIMALS[idx + 1].id } })
          }
        />
      ) : (
        <Btn label="Try Again" icon="refresh" kind="red" onPress={retry} />
      )}
    </Scene>
  );
}
