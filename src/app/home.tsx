import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ANIMALS } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { categoryTints, colors } from '@/theme/colors';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Logo, Scene } from '@/ui/kit';

type CatIcon = React.ComponentProps<typeof Ionicons>['name'];
// Ionicons are PLACEHOLDERS until categories/*.png (3D) are registered in DECOR.categories.
const SOON: { key: string; name: string; icon: CatIcon; tint: string }[] = [
  { key: 'fruits', name: 'Fruits', icon: 'nutrition', tint: colors.red },
  { key: 'vegetables', name: 'Vegetables', icon: 'leaf', tint: colors.orange },
  { key: 'body_parts', name: 'Body Parts', icon: 'body', tint: colors.lion },
  { key: 'flowers', name: 'Flowers', icon: 'flower', tint: colors.pinkHot },
  { key: 'numbers', name: 'Numbers', icon: 'calculator', tint: colors.blue },
];

export default function Home() {
  const h = scale(128);
  return (
    <Scene bg="home" top={colors.homeSky} bottom={colors.screenCream} foliage={false}>
      <Pressable onPress={() => router.push('/settings')} accessibilityLabel="Settings" style={{ position: 'absolute', right: 0, top: 6, width: 38, height: 38, borderRadius: 19, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <Ionicons name="settings" size={20} color={colors.white} />
      </Pressable>
      <View style={{ alignItems: 'center' }}>
        <Logo size={scale(34)} />
        <Text style={{ ...typography.body, color: colors.title, marginVertical: 8 }}>Choose a category to start learning</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 }}>
        <Card onPress={() => router.push('/animals')} style={{ width: '48%', height: h, backgroundColor: categoryTints[0], borderColor: colors.yellow }}>
          <AnimalImg animal={ANIMALS[0]} size={scale(78)} />
          <Text style={{ ...typography.heading, fontSize: 16, color: colors.ink }}>Animals</Text>
          <Text style={{ ...typography.small, color: colors.title }}>10 Animals</Text>
        </Card>
        {SOON.map((c, i) => (
          <Card key={c.key} style={{ width: '48%', height: h, backgroundColor: categoryTints[i + 1] }}>
            <View style={{ opacity: 0.55, alignItems: 'center' }}>
              {DECOR.categories?.[c.key] ? <Image source={DECOR.categories[c.key]!} style={{ width: scale(70), height: scale(70) }} contentFit="contain" /> : <Ionicons name={c.icon} size={scale(52)} color={c.tint} />}
              <Text style={{ ...typography.heading, fontSize: 15, color: colors.ink }}>{c.name}</Text>
            </View>
            <Ionicons name="lock-closed" size={18} color={colors.muted} style={{ position: 'absolute', top: '38%' }} />
            <Text style={{ ...typography.small, color: colors.muted }}>Coming Soon</Text>
          </Card>
        ))}
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 28 }}>
        <Pressable onPress={() => router.push('/progress')}><Text style={{ ...typography.body, fontWeight: '800', color: colors.blue }}>My Progress</Text></Pressable>
        <Pressable onPress={() => router.push('/review')}><Text style={{ ...typography.body, fontWeight: '800', color: colors.blue }}>Review</Text></Pressable>
      </View>
    </Scene>
  );
}
