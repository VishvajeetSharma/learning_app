import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animal, Mood } from '@/data/animals';
import { BACKGROUNDS, BgKey, DECOR } from '@/data/backgrounds';
import { ButtonKind, buttons, colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

/** Full-screen scene. Uses the bundled jungle image for `bg` when registered in data/backgrounds.ts, else a built-in foliage fallback. */
export function Scene({ children, bg, top = colors.skyTop, bottom = colors.skyBottom, foliage = true, pad = true }: { children: React.ReactNode; bg?: BgKey; top?: string; bottom?: string; foliage?: boolean; pad?: boolean }) {
  const i = useSafeAreaInsets(); const img = bg ? BACKGROUNDS[bg] : undefined;
  const content = <View style={{ flex: 1, paddingTop: i.top + 6, paddingBottom: i.bottom + 8, paddingHorizontal: pad ? scale(16) : 0 }}>{children}</View>;
  if (img) return <ImageBackground source={img} resizeMode="cover" style={{ flex: 1 }}>{content}</ImageBackground>;
  const blob = (s: ViewStyle, c: string) => <View pointerEvents="none" style={[{ position: 'absolute', backgroundColor: c }, s]} />;
  return (
    <View style={{ flex: 1, backgroundColor: bottom }}>
      {blob({ top: 0, left: 0, right: 0, height: '45%', opacity: 0.85 }, top)}
      {blob({ top: 70, left: 20, width: 70, height: 26, borderRadius: 13, opacity: 0.85 }, colors.cloud)}
      {blob({ top: 130, right: 16, width: 54, height: 20, borderRadius: 10, opacity: 0.75 }, colors.cloud)}
      {foliage && <>
        {blob({ top: -30, left: -40, width: 130, height: 90, borderRadius: 60 }, colors.leaf)}
        {blob({ top: -20, right: -50, width: 140, height: 80, borderRadius: 60 }, colors.leafDark)}
        {blob({ bottom: -30, left: -40, width: 170, height: 90, borderRadius: 70 }, colors.leafLight)}
        {blob({ bottom: -34, right: -40, width: 190, height: 90, borderRadius: 70 }, colors.leaf)}
        {blob({ bottom: 0, left: 0, right: 0, height: '9%', opacity: 0.55, borderTopLeftRadius: 120, borderTopRightRadius: 120 }, colors.grass)}
      </>}
      {content}
    </View>
  );
}

/** Animal picture; `mood` uses a dedicated expression image if one is registered, otherwise falls back to the base art. */
export const AnimalImg = ({ animal, size, dim, mood }: { animal: Animal; size: number; dim?: boolean; mood?: Mood }) => (
  <Image source={animal.expressions?.[mood as Mood] ?? animal.image} style={{ width: size, height: size, opacity: dim ? 0.55 : 1 }} contentFit="contain" transition={120} />
);

export function Btn({ label, onPress, kind = 'blue', icon, iconRight, style, disabled, small }: { label: string; onPress: () => void; kind?: ButtonKind; icon?: Icon; iconRight?: Icon; style?: ViewStyle; disabled?: boolean; small?: boolean }) {
  const p = buttons[kind]; const txt: TextStyle = { ...typography.button, fontSize: small ? 15 : 19, color: p.text };
  return (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => [{ backgroundColor: p.face, borderBottomWidth: pressed ? 2 : 5, borderBottomColor: p.edge, borderRadius: radius.lg, paddingVertical: small ? 9 : 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, overflow: 'hidden', opacity: disabled ? 0.55 : 1, ...shadows.button }, style]}>
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 10, right: 10, height: '42%', borderRadius: radius.lg, backgroundColor: colors.gloss }} />
      {icon && <Ionicons name={icon} size={small ? 18 : 22} color={p.text} />}
      <Text style={txt}>{label}</Text>
      {iconRight && <Ionicons name={iconRight} size={small ? 18 : 22} color={p.text} />}
    </Pressable>
  );
}

/** Round glossy icon button with an optional caption (Hear Pronunciation, Auto Play ...). */
export const RoundBtn = ({ icon, kind = 'green', size = 56, label, onPress }: { icon: Icon; kind?: ButtonKind; size?: number; label?: string; onPress: () => void }) => (
  <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={{ alignItems: 'center' }}>
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: buttons[kind].face, borderBottomWidth: 4, borderBottomColor: buttons[kind].edge, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.white, ...shadows.button }}>
      <Ionicons name={icon} size={size * 0.5} color={buttons[kind].text} />
    </View>
    {label ? <Text style={{ ...typography.small, fontWeight: '800', color: colors.ink, textAlign: 'center', marginTop: 2 }}>{label}</Text> : null}
  </Pressable>
);

const Circle = ({ icon, onPress, label }: { icon: Icon; onPress: () => void; label: string }) => (
  <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.blue, borderWidth: 2, borderColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadows.button }}>
    <Ionicons name={icon} size={20} color={colors.white} />
  </Pressable>
);

export function Header({ title, sub, home = true, back = true, light = false }: { title: string; sub?: string; home?: boolean; back?: boolean; light?: boolean }) {
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));
  return (
    <View style={{ minHeight: 56, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      {back && <View style={{ position: 'absolute', left: 0 }}><Circle icon="arrow-back" onPress={goBack} label="Back" /></View>}
      <Text style={{ ...typography.heading, fontSize: 22, color: light ? colors.white : colors.title, textShadowColor: light ? colors.title : 'transparent', textShadowRadius: 3 }}>{title}</Text>
      {sub ? <Text style={{ ...typography.small, color: colors.title, backgroundColor: colors.scrim, paddingHorizontal: 12, paddingVertical: 2, borderRadius: radius.pill, marginTop: 2, overflow: 'hidden' }}>{sub}</Text> : null}
      {home && <View style={{ position: 'absolute', right: 0 }}><Circle icon="home" onPress={() => router.replace('/home')} label="Home" /></View>}
    </View>
  );
}

export const Card = ({ children, style, onPress }: { children: React.ReactNode; style?: ViewStyle; onPress?: () => void }) => (
  <Pressable disabled={!onPress} onPress={onPress} style={[{ backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', ...shadows.card }, style]}>{children}</Pressable>
);

export const WoodSign = ({ text }: { text: string }) => {
  if (DECOR.woodBoard) return <ImageBackground source={DECOR.woodBoard} resizeMode="contain" style={{ paddingVertical: 14, paddingHorizontal: 40, alignItems: 'center' }}><Text style={{ ...typography.hero, fontSize: 38, color: colors.woodDark }}>{text.toUpperCase()}</Text></ImageBackground>;
  return (
    <View style={{ backgroundColor: colors.woodLight, borderColor: colors.woodDark, borderWidth: 4, borderRadius: radius.lg, paddingVertical: 4, paddingHorizontal: 36, ...shadows.soft }}>
      <View pointerEvents="none" style={{ position: 'absolute', left: 10, right: 10, top: 8, height: 2, backgroundColor: colors.woodGrain, opacity: 0.5 }} />
      <View pointerEvents="none" style={{ position: 'absolute', left: 10, right: 10, bottom: 8, height: 2, backgroundColor: colors.woodGrain, opacity: 0.5 }} />
      <Text style={{ ...typography.hero, fontSize: scale(38), color: colors.woodDark, letterSpacing: 1 }}>{text.toUpperCase()}</Text>
    </View>
  );
};

/** Colourful wordmark. Uses branding/little_learners_logo.png when registered in DECOR.logo. */
export function Logo({ size = 46 }: { size?: number }) {
  if (DECOR.logo) return <Image source={DECOR.logo} style={{ width: size * 6, height: size * 3.2 }} contentFit="contain" />;
  const rainbow = [colors.coral, colors.orange, colors.green, colors.blue, colors.purple];
  const o = { textShadowColor: colors.woodDark, textShadowRadius: 2, textShadowOffset: { width: 0, height: 2 } };
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ ...typography.hero, fontSize: size, color: colors.yellow, lineHeight: size * 1.05, ...o }}>Little</Text>
      <Text style={{ ...typography.hero, fontSize: size, lineHeight: size * 1.05 }}>
        {'Learners'.split('').map((c, i) => <Text key={i} style={{ color: rainbow[i % 5], ...o }}>{c}</Text>)}
      </Text>
    </View>
  );
}

export const Stars = ({ n, size = 16 }: { n: number; size?: number }) => (
  <View style={{ flexDirection: 'row' }}>{[0, 1, 2].map((i) => <Ionicons key={i} name={i < n ? 'star' : 'star-outline'} size={size} color={colors.star} />)}</View>
);

export const Pill = ({ children, bg = colors.scrim, onPress, style }: { children: React.ReactNode; bg?: string; onPress?: () => void; style?: ViewStyle }) => (
  <Pressable onPress={onPress} style={[{ backgroundColor: bg, borderRadius: radius.pill, paddingHorizontal: 18, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8, ...shadows.card }, style]}>{children}</Pressable>
);
