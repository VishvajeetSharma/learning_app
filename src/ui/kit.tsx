import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animal, Mood } from '@/data/animals';
import { BACKGROUNDS, BgKey, DECOR } from '@/data/backgrounds';
import { ButtonKind, buttons, colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

/**
 * Full-screen scene with a warm, cheerful, baby-friendly atmosphere:
 * Radiant smiling sun, layered fluffy clouds, floating stars/bubbles,
 * lush rolling hills with little flower blossoms, and smooth screen entrance transitions.
 */
export function Scene({
  children,
  bg,
  top = colors.skyTop,
  bottom = colors.skyBottom,
  foliage = true,
  pad = true,
}: {
  children: React.ReactNode;
  bg?: BgKey;
  top?: string;
  bottom?: string;
  foliage?: boolean;
  pad?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const img = bg ? BACKGROUNDS[bg] : undefined;

  // Smooth entrance transition for screen content (React 19 friendly lazy state)
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(14));
  const [cloudAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnim, {
            toValue: 8,
            duration: 2600,
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnim, {
            toValue: -8,
            duration: 2600,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, [fadeAnim, slideAnim, cloudAnim]);

  const content = (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: insets.top + 6,
        paddingBottom: insets.bottom + 8,
        paddingHorizontal: pad ? scale(16) : 0,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {children}
    </Animated.View>
  );

  if (img) {
    return (
      <ImageBackground source={img} resizeMode="cover" style={{ flex: 1 }}>
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bottom }}>
      {/* Sky backdrop */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '55%',
          backgroundColor: top,
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
          opacity: 0.92,
        }}
      />

      {/* Radiant Sun in top corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 24,
          right: 20,
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: colors.sunGlow,
          opacity: 0.65,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.sun,
            ...shadows.glow,
          }}
        />
      </View>

      {/* Animated fluffy clouds */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 55,
          left: 20,
          transform: [{ translateX: cloudAnim }],
        }}
      >
        <View
          style={{
            width: 82,
            height: 28,
            borderRadius: 16,
            backgroundColor: colors.cloud,
            opacity: 0.9,
            ...shadows.soft,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -12,
            left: 18,
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: colors.cloud,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -8,
            left: 44,
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: colors.cloud,
          }}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 110,
          right: 40,
          transform: [
            {
              translateX: cloudAnim.interpolate({
                inputRange: [-8, 8],
                outputRange: [6, -6],
              }),
            },
          ],
        }}
      >
        <View
          style={{
            width: 68,
            height: 24,
            borderRadius: 12,
            backgroundColor: colors.cloud,
            opacity: 0.85,
            ...shadows.soft,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 16,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: colors.cloud,
          }}
        />
      </Animated.View>

      {/* Playful floating sparkle dots / stars */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 96,
          left: 135,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.white,
          opacity: 0.75,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 150,
          left: 45,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.yellowGlow,
          opacity: 0.8,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 170,
          right: 32,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.white,
          opacity: 0.7,
        }}
      />

      {/* Foliage framing (canopy leaves & grassy hills) */}
      {foliage && (
        <>
          {/* Top leaves */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: -30,
              left: -35,
              width: 140,
              height: 90,
              borderRadius: 65,
              backgroundColor: colors.leaf,
              transform: [{ rotate: '-12deg' }],
              opacity: 0.95,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: -24,
              right: -40,
              width: 150,
              height: 85,
              borderRadius: 65,
              backgroundColor: colors.leafDark,
              transform: [{ rotate: '15deg' }],
              opacity: 0.9,
            }}
          />

          {/* Rolling grass hills with little blossoms */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -20,
              left: -50,
              width: 210,
              height: 100,
              borderRadius: 80,
              backgroundColor: colors.grassLight,
              opacity: 0.85,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -24,
              right: -50,
              width: 220,
              height: 105,
              borderRadius: 85,
              backgroundColor: colors.grass,
              opacity: 0.9,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8%',
              backgroundColor: colors.grassDark,
              opacity: 0.35,
              borderTopLeftRadius: 160,
              borderTopRightRadius: 160,
            }}
          />

          {/* Little blossoms dotting the bottom */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 12,
              left: 36,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.pinkHot,
              opacity: 0.8,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 18,
              left: 48,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.yellow,
              opacity: 0.9,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 14,
              right: 44,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.yellow,
              opacity: 0.85,
            }}
          />
        </>
      )}

      {content}
    </View>
  );
}

/** Animal picture with cute halo glow and smooth expression transitions */
export const AnimalImg = ({
  animal,
  size,
  dim,
  mood,
  aura = false,
}: {
  animal: Animal;
  size: number;
  dim?: boolean;
  mood?: Mood;
  aura?: boolean;
}) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {aura && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: size * 1.12,
            height: size * 1.12,
            borderRadius: (size * 1.12) / 2,
            backgroundColor: colors.yellowGlow,
            opacity: 0.5,
          }}
        />
      )}
      <Image
        source={animal.expressions?.[mood as Mood] ?? animal.image}
        style={{
          width: size,
          height: size,
          opacity: dim ? 0.55 : 1,
        }}
        contentFit="contain"
        transition={150}
      />
    </View>
  );
};

/**
 * Bouncy candy button with satisfying 3D press feel and glossy sheen.
 */
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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const txt: TextStyle = {
    ...typography.button,
    fontSize: small ? 15 : 18,
    color: p.text,
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [
          {
            backgroundColor: p.face,
            borderBottomWidth: pressed ? 2 : small ? 4 : 5,
            borderBottomColor: p.edge,
            borderRadius: radius.lg,
            paddingVertical: small ? 10 : 14,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            overflow: 'hidden',
            opacity: disabled ? 0.55 : 1,
            ...shadows.button,
          },
          style,
        ]}
      >
        {/* Gloss highlight on top half */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 8,
            right: 8,
            height: '44%',
            borderRadius: radius.lg,
            backgroundColor: colors.gloss,
          }}
        />
        {icon && <Ionicons name={icon} size={small ? 18 : 22} color={p.text} />}
        <Text style={txt}>{label}</Text>
        {iconRight && <Ionicons name={iconRight} size={small ? 18 : 22} color={p.text} />}
      </Pressable>
    </Animated.View>
  );
}

/** Round glossy icon button with bouncy feedback */
export const RoundBtn = ({
  icon,
  kind = 'green',
  size = 58,
  label,
  onPress,
}: {
  icon: Icon;
  kind?: ButtonKind;
  size?: number;
  label?: string;
  onPress: () => void;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={{ alignItems: 'center' }}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: buttons[kind].face,
            borderBottomWidth: 4,
            borderBottomColor: buttons[kind].edge,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2.5,
            borderColor: colors.white,
            ...shadows.button,
          }}
        >
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 2,
              left: size * 0.18,
              right: size * 0.18,
              height: size * 0.35,
              borderRadius: size / 2,
              backgroundColor: colors.gloss,
            }}
          />
          <Ionicons name={icon} size={size * 0.5} color={buttons[kind].text} />
        </View>
        {label ? (
          <Text
            style={{
              ...typography.small,
              fontWeight: '800',
              color: colors.ink,
              textAlign: 'center',
              marginTop: 4,
              fontSize: 12,
            }}
          >
            {label}
          </Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};

const Circle = ({
  icon,
  onPress,
  label,
}: {
  icon: Icon;
  onPress: () => void;
  label: string;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start()
        }
        accessibilityRole="button"
        accessibilityLabel={label}
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: colors.blue,
          borderWidth: 2.5,
          borderColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.button,
        }}
      >
        <Ionicons name={icon} size={22} color={colors.white} />
      </Pressable>
    </Animated.View>
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
  return (
    <View
      style={{
        minHeight: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}
    >
      {back && (
        <View style={{ position: 'absolute', left: 0, zIndex: 10 }}>
          <Circle icon="arrow-back" onPress={goBack} label="Back" />
        </View>
      )}
      <View style={{ alignItems: 'center', paddingHorizontal: 48 }}>
        <Text
          style={{
            ...typography.heading,
            fontSize: scale(22),
            color: light ? colors.white : colors.title,
            textShadowColor: light ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.7)',
            textShadowRadius: 3,
            textShadowOffset: { width: 0, height: 1 },
          }}
        >
          {title}
        </Text>
        {sub ? (
          <View
            style={{
              backgroundColor: colors.scrim,
              paddingHorizontal: 12,
              paddingVertical: 3,
              borderRadius: radius.pill,
              marginTop: 3,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              ...shadows.card,
            }}
          >
            <Text
              style={{
                ...typography.small,
                fontWeight: '800',
                color: colors.title,
                fontSize: 12,
              }}
            >
              {sub}
            </Text>
          </View>
        ) : null}
      </View>
      {home && (
        <View style={{ position: 'absolute', right: 0, zIndex: 10 }}>
          <Circle icon="home" onPress={() => router.replace('/home')} label="Home" />
        </View>
      )}
    </View>
  );
}

/** Bouncy tactile card with rounded pillowy corners and soft pastel border */
export const Card = ({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        disabled={!onPress}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          {
            backgroundColor: colors.white,
            borderRadius: radius.xl,
            borderWidth: 2.5,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            ...shadows.card,
          },
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export const WoodSign = ({ text }: { text: string }) => {
  if (DECOR.woodBoard) {
    return (
      <View
        style={{
          width: scale(320),
          height: scale(80),
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.card,
        }}
      >
        <Image
          source={DECOR.woodBoard}
          style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: radius.lg }}
          contentFit="fill"
        />
        <Text
          style={{
            ...typography.hero,
            fontSize: scale(36),
            color: '#4A2805',
            fontWeight: '900',
            letterSpacing: 2,
            textShadowColor: 'rgba(255, 235, 200, 0.8)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        >
          {text.toUpperCase()}
        </Text>
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
      {/* Wood grain highlights */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          top: 6,
          height: 2,
          backgroundColor: colors.woodGrain,
          opacity: 0.45,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 6,
          height: 2,
          backgroundColor: colors.woodGrain,
          opacity: 0.45,
        }}
      />
      {/* Golden screws in the four corners */}
      <View
        style={{
          position: 'absolute',
          top: 6,
          left: 8,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.yellowGlow,
          borderWidth: 1,
          borderColor: colors.woodDark,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 6,
          right: 8,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.yellowGlow,
          borderWidth: 1,
          borderColor: colors.woodDark,
        }}
      />
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

/** Colourful, bubbly wordmark for toddlers with rainbow letters */
export function Logo({ size = 44 }: { size?: number }) {
  if (DECOR.logo) {
    return (
      <Image
        source={DECOR.logo}
        style={{ width: size * 6, height: size * 3.2 }}
        contentFit="contain"
      />
    );
  }
  const rainbow = [colors.coral, colors.orange, colors.green, colors.blue, colors.purple];
  const textShadow = {
    textShadowColor: colors.woodDark,
    textShadowRadius: 2,
    textShadowOffset: { width: 0, height: 2 },
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: size * 0.7 }}>⭐</Text>
        <Text
          style={{
            ...typography.hero,
            fontSize: size,
            color: colors.yellow,
            lineHeight: size * 1.05,
            ...textShadow,
          }}
        >
          Little
        </Text>
        <Text style={{ fontSize: size * 0.7 }}>⭐</Text>
      </View>
      <Text
        style={{
          ...typography.hero,
          fontSize: size,
          lineHeight: size * 1.05,
        }}
      >
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
        <Ionicons
          name={i < n ? 'star' : 'star-outline'}
          size={size}
          color={colors.star}
        />
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
        onPressIn={() =>
          Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start()
        }
        style={[
          {
            backgroundColor: bg,
            borderRadius: radius.pill,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderWidth: 1.5,
            borderColor: colors.white,
            ...shadows.card,
          },
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
