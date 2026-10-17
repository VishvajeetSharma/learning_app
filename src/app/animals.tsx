import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

export default function Animals() {
  return (
    <Scene bg="animals">
      <Header
        title="Animals"
        sub="Tap an animal to learn and practice"
        home={true}
        back={true}
      />

      {/* Screen 3: 3-column Grid of Animal Cards */}
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
        {ANIMALS.map((a) => (
          <Card
            key={a.id}
            onPress={() => router.push({ pathname: '/learn', params: { id: a.id } })}
            style={{
              width: '31.5%',
              height: scale(116),
              backgroundColor: colors.white,
              borderRadius: radius.card,
              borderWidth: 2,
              borderBottomWidth: 3.5,
              borderColor: '#E2E8F0',
              borderBottomColor: '#CBD5E1',
              padding: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Soft circular halo glow behind animal */}
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 10,
                width: scale(56),
                height: scale(56),
                borderRadius: scale(28),
                backgroundColor: '#FEF9C3',
                opacity: 0.65,
              }}
            />

            <AnimalImg animal={a} size={scale(66)} />
            <View
              style={{
                backgroundColor: '#F8FAFC',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: radius.pill,
                marginTop: 4,
                borderWidth: 1,
                borderColor: '#E2E8F0',
              }}
            >
              <Text
                style={{
                  ...typography.small,
                  fontSize: 12.5,
                  fontWeight: '900',
                  color: '#1E293B',
                }}
              >
                {a.name}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </Scene>
  );
}
