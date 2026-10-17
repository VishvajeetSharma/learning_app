import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

export default function Review() {
  const { stats } = useStore();

  return (
    <Scene bg="review">
      <Header
        title="Review Animals"
        sub="Tap an animal to practice again"
        home={true}
        back={true}
      />

      {/* Screen 11: 3-column Grid of 10 Animal Cards with lock badges */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 10,
          columnGap: 8,
          paddingBottom: 24,
        }}
      >
        {ANIMALS.map((a) => {
          const done = isLearned(stats[a.id]);

          return (
            <Card
              key={a.id}
              onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })}
              style={{
                width: '31.5%',
                height: scale(106),
                backgroundColor: colors.white,
                borderRadius: radius.lg,
                borderWidth: 1.5,
                borderColor: colors.border,
                padding: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimalImg animal={a} size={scale(60)} dim={!done} />
              <Text
                style={{
                  ...typography.small,
                  fontSize: 13,
                  fontWeight: '800',
                  color: colors.ink,
                  marginTop: 4,
                }}
              >
                {a.name}
              </Text>

              {/* Screen 11: Lock Badge on locked items */}
              {!done && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#CBD5E1',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="lock-closed" size={11} color={colors.white} />
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </Scene>
  );
}
