import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { toneCycle, tones } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Pop, Scene } from '@/ui/kit';

export default function Animals() {
  const cardH = scale(132);
  return (
    <Scene bg="animals">
      <Header title="Animals" sub="Tap an animal to learn and practice" home={true} back={true} />

      {/* 3-column grid of animal cards */}
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
          const tone = toneCycle[i % toneCycle.length];
          return (
            <Pop key={a.id} index={i} style={{ width: '31.2%' }}>
              <Card
                tone={tone}
                r={radius.xl}
                onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })}
                style={{ width: '100%', height: cardH, paddingTop: 8, paddingBottom: 6, justifyContent: 'space-between' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <AnimalImg animal={a} size={scale(72)} />
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
              </Card>
            </Pop>
          );
        })}
      </ScrollView>
    </Scene>
  );
}
