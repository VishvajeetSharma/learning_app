import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useId, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Circle as SvgCircle,
  Defs,
  LinearGradient as SvgLinear,
  Polygon,
  RadialGradient as SvgRadial,
  Rect,
  Stop,
} from 'react-native-svg';
import { Animal, Mood } from '@/data/animals';
import { BACKGROUNDS, BgKey, DECOR } from '@/data/backgrounds';
import { ButtonKind, Tone, buttons, colors, tones, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { font, typography } from '@/theme/typography';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const LAYOUT_KEYS = new Set([
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'width', 'height', 'minWidth', 'minHeight',
  'maxWidth', 'maxHeight', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'marginHorizontal', 'marginVertical', 'marginStart', 'marginEnd', 'alignSelf', 'position',
  'top', 'left', 'right', 'bottom', 'zIndex', 'aspectRatio',
]);

/** Splits a style into outer "where am I placed" keys and inner "how do I look" keys. */
export function splitStyle(style?: StyleProp<ViewStyle>) {
  const flat = (StyleSheet.flatten(style) || {}) as Record<string, unknown>;
  const outer: Record<string, unknown> = {};
  const inner: Record<string, unknown> = {};
  for (const k of Object.keys(flat)) (LAYOUT_KEYS.has(k) ? outer : inner)[k] = flat[k];
  return { outer: outer as ViewStyle, inner: inner as ViewStyle };
}

export type GStop = string | [string, number];

/** Linear gradient that fills its parent (react-native-svg, no extra dependency). */
export function Gradient({
  stops,
  from = { x: 0, y: 0 },
  to = { x: 0, y: 1 },
  radius: r = 0,
  style,
}: {
  stops: GStop[];
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const id = 'g' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { borderRadius: r, overflow: 'hidden' }, style]}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <SvgLinear id={id} x1={from.x} y1={from.y} x2={to.x} y2={to.y}>
            {stops.map((s, i) => {
              const [c, o] = Array.isArray(s) ? s : [s, 1];
              return (
                <Stop
                  key={i}
                  offset={stops.length === 1 ? 0 : i / (stops.length - 1)}
                  stopColor={c}
                  stopOpacity={o}
                />
              );
            })}
          </SvgLinear>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/** Soft radial glow / halo. */
export function Glow({
  size,
  color = colors.yellowGlow,
  opacity = 0.7,
  style,
}: {
  size: number;
  color?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const id = 'r' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View pointerEvents="none" style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgRadial id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={opacity} />
            <Stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.45} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </SvgRadial>
        </Defs>
        <SvgCircle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/** Glossy highlight over the top part of a rounded surface. */
const Gloss = ({
  r = radius.lg,
  amount = 0.55,
  bottom = '52%',
}: {
  r?: number;
  amount?: number;
  bottom?: `${number}%`;
}) => <Gradient stops={[['#FFFFFF', amount], ['#FFFFFF', 0]]} radius={r} style={{ bottom }} />;

/** Slowly rotating sunburst, used behind celebrating characters. */
export function Rays({
  size,
  color = '#FFFFFF',
  opacity = 0.55,
}: {
  size: number;
  color?: string;
  opacity?: number;
}) {
  const [spin] = useState(() => new Animated.Value(0));
  const id = 'y' + useId().replace(/[^a-zA-Z0-9]/g, '');
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 26000, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);
  const c = size / 2;
  const n = 14;
  const wedges = Array.from({ length: n }, (_, i) => {
    const a1 = (i / n) * Math.PI * 2;
    const a2 = a1 + (Math.PI * 2) / n / 2;
    return `${c},${c} ${c + Math.cos(a1) * c},${c + Math.sin(a1) * c} ${c + Math.cos(a2) * c},${c + Math.sin(a2) * c}`;
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        width: size,
        height: size,
        transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
      }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <SvgRadial id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={opacity} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </SvgRadial>
        </Defs>
        {wedges.map((pts, i) => (
          <Polygon key={i} points={pts} fill={`url(#${id})`} />
        ))}
      </Svg>
    </Animated.View>
  );
}

/* ---- ambient sparkles (decorative, native-driven) ---- */
const SPARKS: { l: `${number}%`; t: `${number}%`; s: number; d: number; c: string }[] = [
  { l: '8%', t: '14%', s: 7, d: 0, c: '#FFFFFF' },
  { l: '86%', t: '20%', s: 9, d: 600, c: '#FFF3A6' },
  { l: '22%', t: '38%', s: 6, d: 1200, c: '#FFFFFF' },
  { l: '76%', t: '46%', s: 8, d: 300, c: '#FFF3A6' },
  { l: '12%', t: '62%', s: 7, d: 900, c: '#FFFFFF' },
  { l: '90%', t: '70%', s: 6, d: 1500, c: '#FFFFFF' },
  { l: '52%', t: '9%', s: 6, d: 2000, c: '#FFF3A6' },
];

function Spark({ l, t, s, d, c }: (typeof SPARKS)[number]) {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(d),
        Animated.timing(v, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [v, d]);
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: l,
        top: t,
        width: s,
        height: s,
        borderRadius: s / 2,
        backgroundColor: c,
        opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.95] }),
        transform: [
          { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -12] }) },
          { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.3] }) },
        ],
        shadowColor: c,
        shadowOpacity: 0.9,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
      }}
    />
  );
}

const Sparkles = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    {SPARKS.map((p, i) => (
      <Spark key={i} {...p} />
    ))}
  </View>
);

/** Falling confetti for celebration screens. */
export function Confetti({ count = 20 }: { count?: number }) {
  const { height } = useWindowDimensions();
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
      {Array.from({ length: count }, (_, i) => (
        <ConfettiPiece key={i} i={i} h={height} />
      ))}
    </View>
  );
}

function ConfettiPiece({ i, h }: { i: number; h: number }) {
  const [v] = useState(() => new Animated.Value(0));
  const left = (i * 53 + 7) % 96;
  const delay = (i * 173) % 1900;
  const dur = 3200 + ((i * 211) % 1800);
  const size = 8 + ((i * 7) % 6);
  const round = i % 3 === 0;
  const turns = 1 + (i % 3);
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration: dur, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [v, delay, dur]);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: -24,
        left: `${left}%`,
        width: size,
        height: round ? size : size * 1.6,
        borderRadius: round ? size / 2 : 3,
        backgroundColor: ui.confetti[i % ui.confetti.length],
        opacity: v.interpolate({ inputRange: [0, 0.08, 0.85, 1], outputRange: [0, 1, 1, 0] }),
        transform: [
          { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, h + 40] }) },
          { translateX: v.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, i % 2 ? 22 : -22, 0] }) },
          { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${360 * turns}deg`] }) },
        ],
      }}
    />
  );
}

/** Staggered "pop in" entrance for grid items. */
export function Pop({
  children,
  index = 0,
  style,
}: {
  children: React.ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.sequence([
      Animated.delay(Math.min(index, 14) * 45),
      Animated.spring(v, { toValue: 1, friction: 6, tension: 90, useNativeDriver: true }),
    ]).start();
  }, [v, index]);
  return (
    <Animated.View
      style={[
        {
          opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
          transform: [
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Full-screen jungle scene: photo backdrop, soft top scrim (keeps the status bar readable),
 * twinkling sparkles and a gentle entrance transition for the screen content.
 */
export function Scene({
  children,
  bg,
  top = colors.skyTop,
  bottom = colors.skyBottom,
  foliage = true,
  pad = true,
  overlay,
}: {
  children: React.ReactNode;
  bg?: BgKey;
  top?: string;
  bottom?: string;
  foliage?: boolean;
  pad?: boolean;
  /** Decorative full-screen layer drawn behind the content (e.g. confetti). */
  overlay?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const img = bg ? BACKGROUNDS[bg] : undefined;

  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(16));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const content = (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom + 10,
        paddingHorizontal: pad ? scale(16) : 0,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {children}
    </Animated.View>
  );

  if (img) {
    const ambient = bg !== 'splash';
    return (
      <ImageBackground source={img} resizeMode="cover" style={{ flex: 1 }}>
        {ambient && (
          <Gradient
            stops={[ui.scrimTop, ['#083022', 0]]}
            style={{ height: insets.top + 90, bottom: undefined }}
          />
        )}
        {ambient && <Sparkles />}
        {overlay}
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bottom }}>
      <Gradient stops={[top, bottom]} />
      <Glow size={200} color={colors.sunGlow} opacity={0.9} style={{ position: 'absolute', top: -40, right: -40 }} />
      {foliage && (
        <>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -30,
              left: -50,
              width: 240,
              height: 120,
              borderRadius: 100,
              backgroundColor: colors.grassLight,
              opacity: 0.9,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -34,
              right: -50,
              width: 250,
              height: 125,
              borderRadius: 100,
              backgroundColor: colors.grass,
            }}
          />
        </>
      )}
      <Sparkles />
      {overlay}
      {content}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animal picture                                                            */
/* -------------------------------------------------------------------------- */

/** Animal picture with ground shadow, optional glowing halo, idle "breathing" and pop-in entrance. */
export const AnimalImg = ({
  animal,
  size,
  dim,
  mood,
  aura = false,
  bounce = false,
  idle,
}: {
  animal: Animal;
  size: number;
  dim?: boolean;
  mood?: Mood;
  aura?: boolean;
  bounce?: boolean;
  idle?: boolean;
}) => {
  const doIdle = idle ?? (size >= 140 && !dim);
  const [pop] = useState(() => new Animated.Value(bounce ? 0 : 1));
  const [bob] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!bounce) return;
    Animated.spring(pop, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
  }, [bounce, pop]);

  useEffect(() => {
    if (!doIdle) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [doIdle, bob]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {aura && (
        <Glow size={size * 1.45} color={colors.yellowGlow} opacity={0.85} style={{ position: 'absolute' }} />
      )}
      {size >= 56 && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: size * 0.02,
            width: size * 0.62,
            height: Math.max(6, size * 0.075),
            borderRadius: size,
            backgroundColor: 'rgba(8, 40, 24, 0.3)',
            transform: [{ scaleX: bob.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }) }],
          }}
        />
      )}
      <Animated.View
        style={{
          width: size,
          height: size,
          transform: [
            { scale: pop },
            { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.022] }) },
          ],
        }}
      >
        <Image
          source={animal.expressions?.[mood as Mood] ?? animal.image}
          style={{ width: size, height: size, opacity: dim ? 0.55 : 1 }}
          contentFit="contain"
          transition={150}
        />
      </Animated.View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                   */
/* -------------------------------------------------------------------------- */

/** Candy button: gradient face, glossy highlight, chunky 3D edge that sinks when pressed. */
export function Btn({
  label,
  onPress,
  kind = 'blue',
  icon,
  iconRight,
  style,
  disabled,
  small,
}: {
  label: string;
  onPress: () => void;
  kind?: ButtonKind;
  icon?: Icon;
  iconRight?: Icon;
  style?: ViewStyle;
  disabled?: boolean;
  small?: boolean;
}) {
  const p = buttons[kind];
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const { outer, inner } = splitStyle(style);
  const EDGE = small ? 5 : 7;
  const light = p.text === colors.white;

  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }).start();

  const txt: TextStyle = {
    ...typography.button,
    fontSize: small ? 18 : 22,
    color: p.text,
    ...(light
      ? { textShadowColor: ui.textShadow, textShadowRadius: 2, textShadowOffset: { width: 0, height: 2 } }
      : null),
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, outer]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: !!disabled }}
        style={{
          borderRadius: radius.xl,
          backgroundColor: p.edge,
          paddingBottom: EDGE,
          opacity: disabled ? 0.5 : 1,
          ...shadows.button,
        }}
      >
        {({ pressed }) => (
          <View
            style={[
              {
                minHeight: small ? 54 : 64,
                borderRadius: radius.xl,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingHorizontal: 18,
                backgroundColor: p.face,
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.55)',
                transform: [{ translateY: pressed ? EDGE - 2 : 0 }],
              },
              inner,
            ]}
          >
            <Gradient stops={[p.top, p.face]} radius={radius.xl} />
            <Gloss r={radius.xl} amount={light ? 0.38 : 0.55} />
            {icon && <Ionicons name={icon} size={small ? 22 : 26} color={p.text} />}
            <Text style={txt} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75}>
              {label}
            </Text>
            {iconRight && <Ionicons name={iconRight} size={small ? 22 : 26} color={p.text} />}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

/** Round glossy icon button with bouncy feedback and (optional) readable label pill. */
export const RoundBtn = ({
  icon,
  kind = 'green',
  size = 64,
  label,
  a11y,
  onPress,
}: {
  icon: Icon;
  kind?: ButtonKind;
  size?: number;
  label?: string;
  a11y?: string;
  onPress: () => void;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const p = buttons[kind];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 40 }).start()}
        onPressOut={() =>
          Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }).start()
        }
        accessibilityRole="button"
        accessibilityLabel={a11y ?? label?.replace('\n', ' ')}
        style={{ alignItems: 'center' }}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: p.edge,
            paddingBottom: 5,
            ...shadows.button,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: size / 2,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: colors.white,
              backgroundColor: p.face,
            }}
          >
            <Gradient stops={[p.top, p.face]} radius={size / 2} />
            <Gloss r={size / 2} amount={0.4} bottom="50%" />
            <Ionicons name={icon} size={size * 0.46} color={p.text} />
          </View>
        </View>
        {label ? (
          <View
            style={{
              marginTop: 8,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: radius.pill,
              backgroundColor: ui.panel,
              ...shadows.card,
            }}
          >
            <Text
              style={{
                ...typography.caption,
                fontFamily: font.semi,
                fontSize: 13,
                color: colors.title,
                textAlign: 'center',
              }}
            >
              {label}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};

/** Small round glossy button used in headers. */
const Circle = ({ icon, onPress, label }: { icon: Icon; onPress: () => void; label: string }) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const p = buttons.blue;
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }).start()}
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={6}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: p.edge,
          paddingBottom: 4,
          ...shadows.button,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 26,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: p.face,
          }}
        >
          <Gradient stops={[p.top, p.face]} radius={26} />
          <Gloss r={26} amount={0.4} bottom="50%" />
          <Ionicons name={icon} size={25} color={colors.white} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

/* -------------------------------------------------------------------------- */
/*  Chips, header, banners                                                    */
/* -------------------------------------------------------------------------- */

export const Chip = ({
  text,
  tone = 'blue',
  icon,
  style,
}: {
  text: string;
  tone?: Tone;
  icon?: Icon;
  style?: StyleProp<ViewStyle>;
}) => {
  const t = tones[tone];
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: radius.pill,
          backgroundColor: t.bottom,
          borderWidth: 1.5,
          borderColor: t.edge,
        },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={14} color={t.accent} />}
      <Text style={{ ...typography.caption, fontFamily: font.semi, fontSize: 13, color: t.label }}>{text}</Text>
    </View>
  );
};

export function Header({
  title,
  sub,
  home = true,
  back = true,
  light = false,
}: {
  title: string;
  sub?: string;
  home?: boolean;
  back?: boolean;
  light?: boolean;
}) {
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));
  const sides = back || home;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      {back ? <Circle icon="arrow-back" onPress={goBack} label="Back" /> : sides ? <View style={{ width: 52 }} /> : null}

      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            alignSelf: 'stretch',
            minHeight: 58,
            borderRadius: radius.xl,
            backgroundColor: light ? buttons.blue.edge : ui.bannerEdge,
            paddingBottom: 4,
            ...shadows.card,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: radius.xl,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 14,
              paddingVertical: sub ? 6 : 10,
              borderWidth: 2.5,
              borderColor: colors.white,
              backgroundColor: light ? colors.blue : ui.banner,
            }}
          >
            <Gradient stops={light ? [buttons.blue.top, colors.blue] : ['#FFFFFF', '#EAF4FF']} radius={radius.xl} />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              style={{
                ...typography.title,
                fontSize: scale(24),
                color: light ? colors.white : colors.title,
              }}
            >
              {title}
            </Text>
            {sub ? (
              <Text
                numberOfLines={1}
                style={{
                  ...typography.small,
                  fontFamily: font.semi,
                  fontSize: 13,
                  color: light ? colors.blueSoft : colors.blueDark,
                  marginTop: -1,
                }}
              >
                {sub}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {home ? (
        <Circle icon="home" onPress={() => router.replace('/home')} label="Home" />
      ) : sides ? (
        <View style={{ width: 52 }} />
      ) : null}
    </View>
  );
}

/** Big celebratory / gentle title ribbon (e.g. "Excellent!", "Not quite!", "Great Job!"). */
export function Ribbon({ text, kind = 'orange', stars = false }: { text: string; kind?: ButtonKind; stars?: boolean }) {
  const p = buttons[kind];
  const [pop] = useState(() => new Animated.Value(0.6));
  useEffect(() => {
    Animated.spring(pop, { toValue: 1, friction: 4, tension: 90, useNativeDriver: true }).start();
  }, [pop]);
  return (
    <Animated.View style={{ transform: [{ scale: pop }], alignItems: 'center' }}>
      <View
        style={{
          borderRadius: radius.xxl,
          backgroundColor: p.edge,
          paddingBottom: 6,
          ...shadows.lift,
        }}
      >
        <View
          style={{
            borderRadius: radius.xxl,
            overflow: 'hidden',
            paddingHorizontal: scale(28),
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderWidth: 3.5,
            borderColor: colors.white,
            backgroundColor: p.face,
          }}
        >
          <Gradient stops={[p.top, p.face]} radius={radius.xxl} />
          <Gloss r={radius.xxl} amount={0.4} />
          {stars && <Ionicons name="star" size={scale(26)} color={colors.yellowGlow} />}
          <Text
            style={{
              ...typography.hero,
              fontSize: scale(38),
              color: colors.white,
              letterSpacing: 1,
              textShadowColor: 'rgba(0,0,0,0.28)',
              textShadowRadius: 0,
              textShadowOffset: { width: 0, height: 3 },
            }}
          >
            {text}
          </Text>
          {stars && <Ionicons name="star" size={scale(26)} color={colors.yellowGlow} />}
        </View>
      </View>
    </Animated.View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Pillowy candy card: pastel gradient, glossy top light, chunky bottom edge and soft shadow.
 * Layout keys of `style` (size / margin / flex …) go to the outer wrapper; everything else
 * (padding, flexDirection, alignment …) styles the card surface itself.
 */
export const Card = ({
  children,
  style,
  onPress,
  tone = 'white',
  r = radius.xl,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  tone?: Tone;
  r?: number;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const { outer, inner } = splitStyle(style);
  const t = tones[tone];
  const fixedH = outer.height != null || outer.flex != null;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true, speed: 40 }).start();
  };
  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[{ transform: [{ scale: scaleAnim }], borderRadius: r, backgroundColor: t.edge, ...shadows.card }, outer]}
    >
      <Pressable
        disabled={!onPress}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole={onPress ? 'button' : undefined}
        style={[
          {
            width: '100%',
            height: fixedH ? '100%' : undefined,
            borderRadius: r,
            overflow: 'hidden',
            backgroundColor: t.bottom,
            borderWidth: 2.5,
            borderColor: colors.white,
            borderBottomWidth: 5,
            borderBottomColor: t.edge,
            alignItems: 'center',
            justifyContent: 'center',
          },
          inner,
        ]}
      >
        <Gradient stops={[t.top, t.bottom]} radius={r} />
        <Gloss r={r} amount={0.5} bottom="60%" />
        {children}
      </Pressable>
    </Animated.View>
  );
};

/* -------------------------------------------------------------------------- */
/*  Wooden sign, logo, stars, pill                                            */
/* -------------------------------------------------------------------------- */

const SIGN_RATIO = 521 / 1006; // height / width of assets/decorations/wood_sign_wide.png

export const WoodSign = ({ text }: { text: string }) => {
  const w = Math.min(scale(310), 360);
  const h = w * SIGN_RATIO;
  if (DECOR.woodBoard) {
    return (
      <View style={{ width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={DECOR.woodBoard} style={{ position: 'absolute', width: w, height: h }} contentFit="fill" />
        <View
          style={{
            position: 'absolute',
            left: '22%',
            right: '14%',
            top: '31%',
            bottom: '37%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
            style={{
              ...typography.hero,
              fontSize: scale(33),
              color: ui.woodText,
              letterSpacing: 3,
              textShadowColor: ui.woodTextHighlight,
              textShadowOffset: { width: 0, height: 1.5 },
              textShadowRadius: 1,
            }}
          >
            {text.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.woodLight,
        borderColor: colors.woodDark,
        borderWidth: 4,
        borderRadius: radius.lg,
        paddingVertical: 6,
        paddingHorizontal: scale(32),
        alignItems: 'center',
        ...shadows.button,
      }}
    >
      <Text
        style={{
          ...typography.hero,
          fontSize: scale(36),
          color: colors.woodDark,
          letterSpacing: 2,
          textShadowColor: colors.woodHighlight,
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        }}
      >
        {text.toUpperCase()}
      </Text>
    </View>
  );
};

const LOGO_RATIO = 634 / 1194;

/** Brand logo (hanging jungle sign). Falls back to a bubbly wordmark if the asset is missing. */
export function Logo({ size = 44 }: { size?: number }) {
  if (DECOR.logo) {
    const w = size * 6;
    return <Image source={DECOR.logo} style={{ width: w, height: w * LOGO_RATIO }} contentFit="contain" />;
  }
  const rainbow = [colors.coral, colors.orange, colors.green, colors.blue, colors.purple];
  const textShadow = {
    textShadowColor: colors.woodDark,
    textShadowRadius: 2,
    textShadowOffset: { width: 0, height: 2 },
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ ...typography.hero, fontSize: size, color: colors.yellow, lineHeight: size * 1.05, ...textShadow }}>
        Little
      </Text>
      <Text style={{ ...typography.hero, fontSize: size, lineHeight: size * 1.05 }}>
        {'Learners'.split('').map((c, i) => (
          <Text key={i} style={{ color: rainbow[i % rainbow.length], ...textShadow }}>
            {c}
          </Text>
        ))}
      </Text>
    </View>
  );
}

export const Stars = ({ n, size = 18 }: { n: number; size?: number }) => (
  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
    {[0, 1, 2].map((i) => (
      <View key={i} style={{ ...shadows.glow }}>
        <Ionicons name={i < n ? 'star' : 'star-outline'} size={size} color={colors.star} />
      </View>
    ))}
  </View>
);

export const Pill = ({
  children,
  bg = colors.scrim,
  onPress,
  style,
}: {
  children: React.ReactNode;
  bg?: string;
  onPress?: () => void;
  style?: ViewStyle;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }).start()}
        accessibilityRole={onPress ? 'button' : undefined}
        style={{
          minHeight: 54,
          backgroundColor: bg,
          borderRadius: radius.pill,
          paddingHorizontal: 22,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 3,
          borderColor: colors.white,
          borderBottomWidth: 5,
          borderBottomColor: ui.bannerEdge,
          ...shadows.card,
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
