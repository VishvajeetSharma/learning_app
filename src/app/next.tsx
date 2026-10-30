import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, useWindowDimensions } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Btn, Confetti, Pill, Ribbon, RoundBtn, Scene, WoodSign } from '@/ui/kit';

export default function NextAnimal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { voice } = useStore();
  const a = getAnimal(id);
  const idx = ANIMALS.indexOf(a);
  const { height } = useWindowDimensions();
  const animalSize = Math.max(160, Math.min(250, height * 0.28));

  const to = (n: number) => {
    router.replace({
      pathname: '/next',
      params: { id: ANIMALS[(n + ANIMALS.length) % ANIMALS.length].id },
    });
  };

  const arrow = (name: 'chevron-back' | 'chevron-forward', n: number) => (
    <RoundBtn
      icon={name}
      kind="blue"
      size={56}
      a11y={name === 'chevron-back' ? 'Previous animal' : 'Next animal'}
      onPress={() => to(n)}
    />
  );

  return (
    <Scene bg="nextAnimal" overlay={<Confetti count={14} />}>
      {/* Great Job! & subtitle */}
      <View style={{ alignItems: 'center', marginTop: scale(8) }}>
        <Ribbon text="Great Job!" kind="green" stars />
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 18,
            paddingVertical: 8,
            borderRadius: radius.pill,
            backgroundColor: ui.panel,
            borderWidth: 2.5,
            borderColor: colors.white,
            ...shadows.card,
          }}
        >
          <Ionicons name="paw" size={18} color={colors.green} />
          <Text style={{ ...typography.bodyStrong, fontSize: 17, color: colors.title }}>
            Let&apos;s meet the next animal!
          </Text>
        </View>
      </View>

      {/* Animal with carousel arrows */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: scale(8),
        }}
      >
        {arrow('chevron-back', idx - 1)}
        <AnimalImg key={a.id} animal={a} size={animalSize} aura bounce />
        {arrow('chevron-forward', idx + 1)}
      </View>

      {/* Wooden sign */}
      <View style={{ alignItems: 'center', marginTop: -scale(14), zIndex: 2 }}>
        <WoodSign text={a.name} />
      </View>

      {/* Hear Pronunciation */}
      <Pill bg={colors.white} onPress={() => speak(a.name, voice)} style={{ alignSelf: 'center', marginTop: 12 }}>
        <Ionicons name="volume-high" size={24} color={colors.green} />
        <Text style={{ ...typography.bodyStrong, color: colors.ink }}>Hear Pronunciation</Text>
      </Pill>

      <View style={{ flex: 1 }} />

      {/* Start Learning */}
      <Btn
        label="Start Learning"
        iconRight="arrow-forward"
        kind="blue"
        onPress={() => router.replace({ pathname: '/learn', params: { id: a.id } })}
        style={{ marginBottom: 6 }}
      />
    </Scene>
  );
}
