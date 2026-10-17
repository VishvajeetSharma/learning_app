import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

export default function Review() {
  const { stats } = useStore();
  return (
    <Scene bg="review">
      <Header title="Review Animals" sub="Tap an animal to practice again" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 30 }}>
        {ANIMALS.map((a) => { const done = isLearned(stats[a.id]);
          return (
            // every animal can be reviewed; the badge only shows learned vs not-yet-learned
            <Card key={a.id} onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })} style={{ width: '31.5%', height: scale(108), backgroundColor: done ? colors.yellowSoft : colors.white, borderColor: done ? colors.yellow : colors.border }}>
              <AnimalImg animal={a} size={scale(66)} dim={!done} />
              <Text style={{ ...typography.small, fontSize: 12, fontWeight: '800', color: colors.ink }}>{a.name}</Text>
              <View style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: done ? colors.green : colors.grey, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={done ? 'checkmark' : 'lock-closed'} size={13} color={done ? colors.white : colors.muted} />
              </View>
            </Card>); })}
      </ScrollView>
    </Scene>
  );
}
