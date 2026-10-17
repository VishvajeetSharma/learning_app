import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

export default function Animals() {
  const { stats } = useStore();
  return (
    <Scene bg="animals" top={colors.animalsSky} bottom={colors.animalsBottom}>
      <Header title="Animals" sub="Tap an animal to learn and practice" home={false} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 30 }}>
        {ANIMALS.map((a) => { const done = isLearned(stats[a.id]);
          return (
            <Card key={a.id} onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })} style={{ width: '31.5%', height: scale(104), backgroundColor: done ? colors.yellowSoft : colors.white, borderColor: done ? colors.yellow : colors.border }}>
              <AnimalImg animal={a} size={scale(66)} />
              <Text style={{ ...typography.small, fontSize: 12, fontWeight: '800', color: colors.ink }}>{a.name}</Text>
              {done && <View style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="checkmark" size={14} color={colors.white} /></View>}
            </Card>); })}
      </ScrollView>
    </Scene>
  );
}
