import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Btn, Pill, Scene, WoodSign } from '@/ui/kit';

export default function NextAnimal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { voice } = useStore();
  const a = getAnimal(id);
  const idx = ANIMALS.indexOf(a);

  const to = (n: number) => {
    router.replace({
      pathname: '/next',
      params: { id: ANIMALS[(n + ANIMALS.length) % ANIMALS.length].id },
    });
  };

  const arrow = (name: 'chevron-back' | 'chevron-forward', n: number) => (
    <Pressable
      onPress={() => to(n)}
      accessibilityRole="button"
      accessibilityLabel={name === 'chevron-back' ? 'Previous animal' : 'Next animal'}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.white,
        borderWidth: 2.5,
        borderBottomWidth: pressed ? 2 : 4,
        borderColor: '#93C5FD',
        borderBottomColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: pressed ? 2 : 0 }],
        ...shadows.card,
      })}
    >
      <Ionicons name={name} size={28} color="#2563EB" />
    </Pressable>
  );

  return (
    <Scene bg="nextAnimal">
      {/* Screen 9: 3D "Great Job!" & Subtitle */}
      <View style={{ alignItems: 'center', marginTop: scale(8) }}>
        <View
          style={{
            backgroundColor: '#DCFCE7',
            paddingHorizontal: 22,
            paddingVertical: 6,
            borderRadius: radius.pill,
            borderWidth: 2.5,
            borderColor: '#86EFAC',
            shadowColor: '#16A34A',
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
              color: '#15803D',
              fontWeight: '900',
              letterSpacing: 1,
            }}
          >
            Great Job! 🌟
          </Text>
        </View>

        <Text
          style={{
            ...typography.title,
            fontSize: 16,
            color: '#1E293B',
            fontWeight: '800',
            marginTop: 4,
            textShadowColor: 'rgba(255,255,255,0.8)',
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 1 },
          }}
        >
          Let&apos;s meet the next animal!
        </Text>
      </View>

      {/* Screen 9: Center Animal with carousel arrows */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: scale(8),
          paddingHorizontal: 4,
        }}
      >
        {arrow('chevron-back', idx - 1)}
        <AnimalImg animal={a} size={scale(230)} aura={true} />
        {arrow('chevron-forward', idx + 1)}
      </View>

      {/* Screen 9: 3D Wooden sign: Animal Name */}
      <View style={{ alignItems: 'center', marginTop: -scale(14) }}>
        <WoodSign text={a.name} />
      </View>

      {/* Screen 9: Hear Pronunciation Pill Button */}
      <Pill
        bg="rgba(255, 255, 255, 0.94)"
        onPress={() => speak(a.name, voice)}
        style={{ alignSelf: 'center', marginTop: 12 }}
      >
        <Ionicons name="volume-high" size={22} color="#16A34A" />
        <Text style={{ ...typography.body, fontWeight: '800', color: colors.ink }}>
          Hear Pronunciation
        </Text>
      </Pill>

      <View style={{ flex: 1 }} />

      {/* Screen 9: Big Blue "Start Learning →" Button */}
      <Btn
        label="Start Learning →"
        iconRight="arrow-forward"
        kind="blue"
        onPress={() => router.replace({ pathname: '/learn', params: { id: a.id } })}
        style={{ marginBottom: 6 }}
      />
    </Scene>
  );
}
