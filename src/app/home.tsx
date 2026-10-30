import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { Tone, colors, tones, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { font, typography } from '@/theme/typography';
import { Card, Chip, Glow, Pop, RoundBtn, Scene } from '@/ui/kit';

const CATEGORIES: { key: string; name: string; emoji: string; sub: string; tone: Tone }[] = [
  { key: 'fruits', name: 'Fruits', emoji: '🍎', sub: 'Coming Soon', tone: 'pink' },
  { key: 'vegetables', name: 'Vegetables', emoji: '🥕', sub: 'Coming Soon', tone: 'orange' },
  { key: 'body_parts', name: 'Body Parts', emoji: '👦', sub: 'Coming Soon', tone: 'blue' },
  { key: 'flowers', name: 'Flowers', emoji: '🌸', sub: 'Coming Soon', tone: 'purple' },
  { key: 'numbers', name: 'Numbers', emoji: '🔢', sub: 'Coming Soon', tone: 'mint' },
];

export default function Home() {
  const { height } = useWindowDimensions();
  const heroH = Math.max(132, Math.min(176, height * 0.2));
  const smallH = Math.max(112, Math.min(132, height * 0.15));
  const logoW = Math.min(scale(290), 340);
  const logoH = (logoW * 634) / 1194;

  return (
    <Scene bg="home">
      <View style={{ flex: 1 }}>
        {/* Settings button in top right */}
        <View style={{ position: 'absolute', right: 0, top: 0, zIndex: 10 }}>
          <RoundBtn icon="settings" kind="blue" size={52} a11y="Settings" onPress={() => router.push('/settings')} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        >
          {/* Logo */}
          <View style={{ alignItems: 'center', marginTop: 2 }}>
            {DECOR.logo ? (
              <Image source={DECOR.logo} style={{ width: logoW, height: logoH }} contentFit="contain" />
            ) : (
              <Text style={{ ...typography.hero, color: colors.orange }}>Little Learners</Text>
            )}
            <View
              style={{
                marginTop: 6,
                marginBottom: 14,
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: radius.pill,
                backgroundColor: ui.panel,
                borderWidth: 2.5,
                borderColor: colors.white,
                ...shadows.card,
              }}
            >
              <Text style={{ ...typography.bodyStrong, fontFamily: font.semi, fontSize: 16, color: colors.title }}>
                Choose a category to start learning
              </Text>
            </View>
          </View>

          {/* Hero: Animals (the only playable category) */}
          <Card
            tone="yellow"
            r={radius.xxl}
            onPress={() => router.push('/animals')}
            style={{ width: '100%', height: heroH, flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start', gap: 6 }}>
              <Text style={{ ...typography.display, fontSize: scale(36), color: tones.yellow.label }}>Animals</Text>
              <Chip text={`${ANIMALS.length} Animals`} tone="green" icon="paw" />
              <View
                style={{
                  marginTop: 4,
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: colors.green,
                  borderWidth: 3,
                  borderColor: colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...shadows.button,
                }}
              >
                <Ionicons name="play" size={22} color={colors.white} style={{ marginLeft: 2 }} />
              </View>
            </View>
            <View style={{ width: heroH * 0.95, height: heroH * 0.95, alignItems: 'center', justifyContent: 'center' }}>
              <Glow size={heroH * 1.2} color={colors.white} opacity={0.95} style={{ position: 'absolute' }} />
              <Image
                source={ANIMALS[0].image}
                style={{ width: heroH * 0.88, height: heroH * 0.88 }}
                contentFit="contain"
              />
            </View>
          </Card>

          {/* Coming soon categories */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 14 }}>
            {CATEGORIES.map((c, i) => (
              <Pop key={c.key} index={i + 1} style={{ width: '31%' }}>
                <Card tone={c.tone} r={radius.xl} style={{ width: '100%', height: smallH, padding: 6 }}>
                  <View style={{ opacity: 0.88, alignItems: 'center' }}>
                    <Text style={{ fontSize: scale(38), lineHeight: scale(46) }}>{c.emoji}</Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.75}
                      style={{ ...typography.bodyStrong, fontSize: 15, color: tones[c.tone].label, marginTop: 2 }}
                    >
                      {c.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: radius.pill,
                      backgroundColor: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <Ionicons name="time" size={11} color={tones[c.tone].accent} />
                    <Text style={{ ...typography.caption, fontFamily: font.semi, fontSize: 11, color: tones[c.tone].label }}>
                      {c.sub}
                    </Text>
                  </View>
                </Card>
              </Pop>
            ))}
          </View>
        </ScrollView>
      </View>
    </Scene>
  );
}
