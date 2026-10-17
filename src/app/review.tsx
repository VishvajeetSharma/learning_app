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

      {/* Screen 11: 3-column Grid of Animal Cards with gamified badges */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 12,
          columnGap: 8,
          paddingBottom: 28,
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
                height: scale(116),
                backgroundColor: done ? '#FFF' : '#F8FAFC',
                borderRadius: radius.card,
                borderWidth: 2,
                borderBottomWidth: 3.5,
                borderColor: done ? '#BBF7D0' : '#E2E8F0',
                borderBottomColor: done ? '#86EFAC' : '#CBD5E1',
                padding: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Soft halo for learned animals */}
              {done ? (
                <View
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    top: 8,
                    width: scale(56),
                    height: scale(56),
                    borderRadius: scale(28),
                    backgroundColor: '#DCFCE7',
                    opacity: 0.75,
                  }}
                />
              ) : null}

              <AnimalImg animal={a} size={scale(64)} dim={!done} />
              <View
                style={{
                  backgroundColor: done ? '#F0FDF4' : '#F1F5F9',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: radius.pill,
                  marginTop: 4,
                  borderWidth: 1,
                  borderColor: done ? '#DCFCE7' : '#E2E8F0',
                }}
              >
                <Text
                  style={{
                    ...typography.small,
                    fontSize: 12.5,
                    fontWeight: '900',
                    color: done ? '#15803D' : '#64748B',
                  }}
                >
                  {a.name}
                </Text>
              </View>

              {/* Status Badges */}
              {done ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: '#16A34A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1.5,
                    borderColor: colors.white,
                    shadowColor: '#16A34A',
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 2,
                  }}
                >
                  <Ionicons name="checkmark" size={13} color={colors.white} />
                </View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: '#E2E8F0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1.5,
                    borderColor: colors.white,
                  }}
                >
                  <Ionicons name="lock-closed" size={12} color="#64748B" />
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </Scene>
  );
}
