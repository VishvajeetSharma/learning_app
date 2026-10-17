import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
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
      accessibilityLabel={name === 'chevron-back' ? 'Previous animal' : 'Next animal'}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        borderWidth: 2.5,
        borderColor: '#2F8BFF',
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.card,
      }}
    >
      <Ionicons name={name} size={26} color="#2F8BFF" />
    </Pressable>
  );

  return (
    <Scene bg="nextAnimal">
      {/* Screen 9: 3D "Great Job!" & Subtitle */}
      <View style={{ alignItems: 'center', marginTop: scale(10) }}>
        <Text
          style={{
            ...typography.hero,
            fontSize: scale(38),
            color: '#28A745',
            fontWeight: '900',
            letterSpacing: 1,
            textShadowColor: '#1B6B2E',
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 2 },
          }}
        >
          Great Job!
        </Text>
        <Text
          style={{
            ...typography.title,
            fontSize: 17,
            color: '#243B7A',
            fontWeight: '800',
            marginTop: 2,
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
          marginTop: scale(10),
        }}
      >
        {arrow('chevron-back', idx - 1)}
        <AnimalImg animal={a} size={scale(240)} />
        {arrow('chevron-forward', idx + 1)}
      </View>

      {/* Screen 9: 3D Wooden sign: ELEPHANT */}
      <View style={{ alignItems: 'center', marginTop: -scale(16) }}>
        <WoodSign text={a.name} />
      </View>

      {/* Screen 9: Hear Pronunciation Pill Button */}
      <Pill
        bg={colors.white}
        onPress={() => speak(a.name, voice)}
        style={{ alignSelf: 'center', marginTop: 14 }}
      >
        <Ionicons name="volume-high" size={22} color="#28A745" />
        <Text style={{ ...typography.body, fontWeight: '800', color: colors.ink }}>
          Hear Pronunciation
        </Text>
      </Pill>

      <View style={{ flex: 1 }} />

      {/* Screen 9: Big Blue "Start Learning →" Button */}
      <Btn
        label="Start Learning →"
        kind="blue"
        onPress={() => router.replace({ pathname: '/learn', params: { id: a.id } })}
        style={{ marginBottom: 6 }}
      />
    </Scene>
  );
}
