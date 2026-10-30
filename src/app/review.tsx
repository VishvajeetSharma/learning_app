import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, useStore } from '@/lib/store';
import { colors, toneCycle, tones } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Pop, Scene } from '@/ui/kit';

export default function Review() {
  const { stats } = useStore();
  const cardH = scale(132);

  return (
    <Scene bg="review">
      <Header title="Review Animals" sub="Tap an animal to practice again" home={true} back={true} />

      {/* 3-column grid: learned animals are colourful, the rest are dimmed with a lock badge */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 12,
          columnGap: 10,
          paddingTop: 4,
          paddingBottom: 28,
        }}
      >
        {ANIMALS.map((a, i) => {
          const done = isLearned(stats[a.id]);
          const tone = done ? toneCycle[i % toneCycle.length] : 'locked';

          return (
            <Pop key={a.id} index={i} style={{ width: '31.2%' }}>
              <Card
                tone={tone}
                r={radius.xl}
                onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })}
                style={{ width: '100%', height: cardH, paddingTop: 8, paddingBottom: 6, justifyContent: 'space-between' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <AnimalImg animal={a} size={scale(70)} dim={!done} />
                </View>
                <View
                  style={{
                    marginTop: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                    borderRadius: radius.pill,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderWidth: 1.5,
                    borderColor: tones[tone].edge,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    style={{ ...typography.bodyStrong, fontSize: 15, color: tones[tone].label }}
                  >
                    {a.name}
                  </Text>
                </View>

                {/* status badge */}
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: done ? colors.green : '#94A3B8',
                    borderWidth: 2,
                    borderColor: colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...shadows.card,
                  }}
                >
                  <Ionicons name={done ? 'checkmark' : 'lock-closed'} size={done ? 16 : 13} color={colors.white} />
                </View>
              </Card>
            </Pop>
          );
        })}
      </ScrollView>
    </Scene>
  );
}
