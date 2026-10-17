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
  const { id } = useLocalSearchParams<{ id: string }>(); const { voice } = useStore();
  const a = getAnimal(id); const idx = ANIMALS.indexOf(a);
  const to = (n: number) => router.replace({ pathname: '/next', params: { id: ANIMALS[(n + ANIMALS.length) % ANIMALS.length].id } });
  const arrow = (name: 'chevron-back' | 'chevron-forward', n: number) => (
    <Pressable onPress={() => to(n)} accessibilityLabel={name === 'chevron-back' ? 'Previous animal' : 'Next animal'} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.blue, alignItems: 'center', justifyContent: 'center', ...shadows.card }}>
      <Ionicons name={name} size={24} color={colors.blue} />
    </Pressable>);
  return (
    <Scene bg="nextAnimal">
      <View style={{ alignItems: 'center', marginTop: scale(8) }}>
        <Text style={{ ...typography.display, color: colors.green, textShadowColor: colors.greenDark, textShadowRadius: 2, textShadowOffset: { width: 0, height: 2 } }}>Great Job!</Text>
        <Text style={{ ...typography.title, fontSize: 16, color: colors.title }}>Let's meet the next animal!</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        {arrow('chevron-back', idx - 1)}
        <AnimalImg animal={a} size={scale(250)} />
        {arrow('chevron-forward', idx + 1)}
      </View>
      <View style={{ alignItems: 'center', marginTop: -scale(10) }}><WoodSign text={a.name} /></View>
      <Pill onPress={() => speak(a.name, voice)} style={{ alignSelf: 'center', marginTop: 14 }}>
        <Ionicons name="volume-high" size={20} color={colors.green} /><Text style={{ ...typography.body, fontWeight: '800', color: colors.ink }}>Hear Pronunciation</Text>
      </Pill>
      <View style={{ flex: 1 }} />
      <Btn label="Start Learning" iconRight="arrow-forward" onPress={() => router.replace({ pathname: '/learn', params: { id: a.id } })} />
    </Scene>
  );
}
