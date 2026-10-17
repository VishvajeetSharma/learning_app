import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Card, Circle, Scene } from '@/ui/kit';

const CATEGORIES = [
  {
    key: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    sub: 'Coming Soon',
    bg: '#FFF1F2',
    border: '#FECDD3',
    badgeBg: '#FFE4E6',
    badgeText: '#E11D48',
  },
  {
    key: 'vegetables',
    name: 'Vegetables',
    emoji: '🥕',
    sub: 'Coming Soon',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    badgeBg: '#DCFCE7',
    badgeText: '#16A34A',
  },
  {
    key: 'body_parts',
    name: 'Body Parts',
    emoji: '👦',
    sub: 'Coming Soon',
    bg: '#FFF7ED',
    border: '#FED7AA',
    badgeBg: '#FFEDD5',
    badgeText: '#EA580C',
  },
  {
    key: 'flowers',
    name: 'Flowers',
    emoji: '🌸',
    sub: 'Coming Soon',
    bg: '#FAF5FF',
    border: '#E9D5FF',
    badgeBg: '#F3E8FF',
    badgeText: '#9333EA',
  },
  {
    key: 'numbers',
    name: 'Numbers',
    emoji: '🔢',
    sub: 'Coming Soon',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    badgeBg: '#E0F2FE',
    badgeText: '#0284C7',
  },
];

export default function Home() {
  const cardHeight = scale(132);

  return (
    <Scene bg="home">
      {/* Settings Button in top right */}
      <View style={{ position: 'absolute', right: scale(16), top: 12, zIndex: 10 }}>
        <Circle
          icon="settings"
          onPress={() => router.push('/settings')}
          label="Settings"
          kind="yellow"
        />
      </View>

      {/* Screen 2: 3D Little Learners Logo */}
      <View style={{ alignItems: 'center', marginTop: scale(-15) }}>
        {DECOR.logo ? (
          <Image
            source={DECOR.logo}
            style={{ width: scale(250), height: scale(120) }}
            contentFit="contain"
          />
        ) : (
          <Text style={{ ...typography.hero, color: colors.orange }}>Little Learners</Text>
        )}

        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            paddingHorizontal: 16,
            paddingVertical: 5,
            borderRadius: radius.pill,
            marginTop: 4,
            marginBottom: 12,
            borderWidth: 1.5,
            borderColor: colors.white,
            ...shadows.subtle,
          }}
        >
          <Text
            style={{
              ...typography.small,
              fontWeight: '900',
              color: '#1E293B',
              fontSize: 13,
            }}
          >
            Choose a category to start learning ✨
          </Text>
        </View>
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
        {/* Animals Card - Premier Active Category */}
        <Card
          onPress={() => router.push('/animals')}
          style={{
            width: '48%',
            height: cardHeight,
            backgroundColor: '#FFFBEB',
            borderRadius: radius.xl,
            borderWidth: 2.5,
            borderColor: '#FCD34D',
            padding: 8,
            ...shadows.card,
          }}
        >
          {/* Top gloss strip */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 2,
              left: 10,
              right: 10,
              height: 18,
              borderRadius: radius.xl,
              backgroundColor: colors.gloss,
            }}
          />

          <Image
            source={ANIMALS[0].image}
            style={{ width: scale(64), height: scale(64) }}
            contentFit="contain"
          />
          <Text
            style={{
              ...typography.heading,
              fontSize: 17,
              fontWeight: '900',
              color: '#1E293B',
              marginTop: 3,
            }}
          >
            Animals
          </Text>
          <View
            style={{
              backgroundColor: '#DCFCE7',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: radius.pill,
              marginTop: 3,
              borderWidth: 1,
              borderColor: '#86EFAC',
            }}
          >
            <Text
              style={{
                ...typography.micro,
                fontWeight: '900',
                color: '#15803D',
              }}
            >
              {ANIMALS.length} Animals • Play! ⭐
            </Text>
          </View>
        </Card>

        {/* Other 5 Categories (Coming Soon) */}
        {CATEGORIES.map((c) => (
          <Card
            key={c.key}
            style={{
              width: '48%',
              height: cardHeight,
              backgroundColor: c.bg,
              borderRadius: radius.xl,
              borderWidth: 2,
              borderColor: c.border,
              padding: 8,
              ...shadows.card,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: scale(38), lineHeight: scale(46) }}>{c.emoji}</Text>
              <Text
                style={{
                  ...typography.heading,
                  fontSize: 16,
                  fontWeight: '800',
                  color: '#1E293B',
                  marginTop: 2,
                }}
              >
                {c.name}
              </Text>
              <View
                style={{
                  backgroundColor: c.badgeBg,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: radius.pill,
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    ...typography.micro,
                    fontWeight: '800',
                    color: c.badgeText,
                  }}
                >
                  {c.sub} 🔒
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Scene>
  );
}
