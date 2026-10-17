import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Card, Scene } from '@/ui/kit';

const CATEGORIES = [
  { key: 'fruits', name: 'Fruits', emoji: '🍎', sub: 'Coming Soon' },
  { key: 'vegetables', name: 'Vegetables', emoji: '🥕', sub: 'Coming Soon' },
  { key: 'body_parts', name: 'Body Parts', emoji: '👦', sub: 'Coming Soon' },
  { key: 'flowers', name: 'Flowers', emoji: '🌸', sub: 'Coming Soon' },
  { key: 'numbers', name: 'Numbers', emoji: '🔢', sub: 'Coming Soon' },
];

export default function Home() {
  const cardHeight = scale(126);

  return (
    <Scene bg="home">
      {/* Settings Button in top right */}
      <Pressable
        onPress={() => router.push('/settings')}
        accessibilityLabel="Settings"
        style={{
          position: 'absolute',
          right: 0,
          top: 6,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#2F8BFF',
          borderWidth: 2.5,
          borderColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        }}
      >
        <Ionicons name="settings" size={22} color={colors.white} />
      </Pressable>

      {/* Screen 2: 3D Little Learners Logo */}
      <View style={{ alignItems: 'center', marginTop: scale(4) }}>
        {DECOR.logo ? (
          <Image
            source={DECOR.logo}
            style={{ width: scale(220), height: scale(96) }}
            contentFit="contain"
          />
        ) : (
          <Text style={{ ...typography.hero, color: colors.orange }}>Little Learners</Text>
        )}
        <Text
          style={{
            ...typography.body,
            fontWeight: '700',
            color: '#2B3A4A',
            marginTop: 4,
            marginBottom: 10,
            textShadowColor: 'rgba(255,255,255,0.7)',
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 1 },
          }}
        >
          Choose a category to start learning
        </Text>
      </View>

      {/* 2x3 Grid of Category Cards */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: 12,
        }}
      >
        {/* Animals Card */}
        <Card
          onPress={() => router.push('/animals')}
          style={{
            width: '48%',
            height: cardHeight,
            backgroundColor: '#FFF8E1',
            borderRadius: radius.xl,
            borderWidth: 2,
            borderColor: '#FFE082',
            padding: 8,
          }}
        >
          <Image
            source={ANIMALS[0].image}
            style={{ width: scale(62), height: scale(62) }}
            contentFit="contain"
          />
          <Text
            style={{
              ...typography.heading,
              fontSize: 16,
              fontWeight: '900',
              color: colors.ink,
              marginTop: 4,
            }}
          >
            Animals
          </Text>
          <Text
            style={{
              ...typography.small,
              fontWeight: '800',
              color: '#34A853',
              marginTop: 1,
            }}
          >
            {ANIMALS.length} Animals
          </Text>
        </Card>

        {/* Other 5 Categories (Coming Soon) */}
        {CATEGORIES.map((c) => (
          <Card
            key={c.key}
            style={{
              width: '48%',
              height: cardHeight,
              backgroundColor: colors.white,
              borderRadius: radius.xl,
              borderWidth: 1.5,
              borderColor: colors.border,
              padding: 8,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: scale(42), lineHeight: scale(50) }}>{c.emoji}</Text>
              <Text
                style={{
                  ...typography.heading,
                  fontSize: 16,
                  fontWeight: '800',
                  color: colors.ink,
                  marginTop: 2,
                }}
              >
                {c.name}
              </Text>
              <Text
                style={{
                  ...typography.small,
                  fontWeight: '700',
                  color: colors.muted,
                  marginTop: 1,
                }}
              >
                {c.sub}
              </Text>
            </View>
          </Card>
        ))}
      </View>
    </Scene>
  );
}
