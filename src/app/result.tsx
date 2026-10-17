import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { attempt } from '@/lib/attempt';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
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
      <View style={{ alignItems: 'center', marginTop: scale(12) }}>
        {/* Screen 7 & 8: 3D Inflated Title */}
        <View
          style={{
            backgroundColor: good ? '#FEF3C7' : '#FFE4E6',
            paddingHorizontal: 22,
            paddingVertical: 6,
            borderRadius: radius.pill,
            borderWidth: 2.5,
            borderColor: good ? '#FCD34D' : '#FDA4AF',
            shadowColor: good ? '#D97706' : '#E11D48',
            shadowOpacity: 0.18,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
          }}
        >
          <Text
            style={{
              ...typography.hero,
              fontSize: scale(32),
              color: good ? '#D97706' : '#E11D48',
              fontWeight: '900',
              letterSpacing: 1,
            }}
          >
            {good ? 'Excellent! 🌟' : 'Almost There! 💪'}
          </Text>
        </View>

        {!good && (
          <Text
            style={{
              ...typography.title,
              textAlign: 'center',
              color: '#1E293B',
              fontSize: 16,
              fontWeight: '800',
              marginTop: 6,
            }}
          >
            That&apos;s not quite right.{'\n'}Let&apos;s practice again!
          </Text>
        )}

        {/* Animal Character */}
        <View style={{ marginTop: scale(8) }}>
          <AnimalImg
            animal={a}
            size={scale(good ? 220 : 180)}
            dim={!good}
            aura={good}
          />
        </View>

        {good && (
          <View
            style={{
              alignItems: 'center',
              marginTop: scale(6),
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderRadius: radius.xl,
              borderWidth: 2,
              borderColor: '#BBF7D0',
              ...shadows.card,
            }}
          >
            <Text style={{ ...typography.subheading, fontSize: 15, color: '#64748B', fontWeight: '800' }}>
              You wrote
            </Text>
            <Text
              style={{
                ...typography.hero,
                fontSize: scale(36),
                color: '#15803D',
                fontWeight: '900',
                letterSpacing: 2,
                marginVertical: 2,
              }}
            >
              {a.name.toUpperCase()}
            </Text>
            <Text style={{ ...typography.subheading, fontSize: 15, color: '#64748B', fontWeight: '800' }}>
              correctly! 🎉
            </Text>
          </View>
        )}
      </View>

      {/* Screen 8: Display Child's Handwriting attempt */}
      {!good && (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radius.xl,
              width: '92%',
              height: scale(96),
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2.5,
              borderColor: '#FECDD3',
              borderBottomWidth: 4,
              borderBottomColor: '#FDA4AF',
              ...shadows.card,
            }}
          >
            {showInk && attempt.strokes.length ? (
              <StrokePreview
                strokes={attempt.strokes}
                srcW={attempt.w}
                srcH={attempt.h}
                width={scale(280)}
                height={scale(80)}
                ink="#F43F5E"
              />
            ) : null}
          </View>
          {attempt.hint ? (
            <View
              style={{
                backgroundColor: '#FFF1F2',
                paddingHorizontal: 16,
                paddingVertical: 5,
                borderRadius: radius.pill,
                marginTop: 8,
                borderWidth: 1,
                borderColor: '#FECDD3',
              }}
            >
              <Text
                style={{
                  ...typography.small,
                  color: '#BE123C',
                  fontWeight: '800',
                  textAlign: 'center',
                }}
              >
                {attempt.hint}
              </Text>
            </View>
          ) : null}
        </View>
      )}

      <View style={{ flex: 1 }} />

      {/* Screen 7 & 8: Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
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
        <Btn label="Try Again" icon="refresh" kind="orange" onPress={retry} />
      )}
    </Scene>
  );
}
