import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
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

      {/* Screen 3: 3-column Grid of 10 Animal Cards */}
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
        {ANIMALS.map((a) => (
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
            <AnimalImg animal={a} size={scale(62)} />
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
          </Card>
        ))}
      </ScrollView>
    </Scene>
  );
}
