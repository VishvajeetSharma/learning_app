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
 * Full-screen scene with a warm, cheerful, child-friendly atmosphere.
 * Blends rich background art with soft ambient lighting, floating clouds,
 * gentle sunbeams, and smooth screen entrance animations.
 */
export function Scene({
  children,
  bg,
  top = colors.skyTop,
  bottom = colors.skyBottom,
  foliage = true,
  pad = true,
  scrim,
}: {
  children: React.ReactNode;
  bg?: BgKey;
  top?: string;
  bottom?: string;
  foliage?: boolean;
  pad?: boolean;
  scrim?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const img = bg ? BACKGROUNDS[bg] : undefined;

  // Screen entrance transitions
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(12));
  const [cloudAnim] = useState(() => new Animated.Value(0));
  const [sparkleAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 85,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudAnim, {
            toValue: 10,
            duration: 2800,
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnim, {
            toValue: -10,
            duration: 2800,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0.3,
            duration: 1600,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, [fadeAnim, slideAnim, cloudAnim, sparkleAnim]);

  // Content screens benefit from a subtle translucent scrim to ensure card contrast
  const needsScrim =
    scrim !== undefined
      ? scrim
      : bg === 'animals' ||
        bg === 'review' ||
        bg === 'tracing' ||
        bg === 'writing';

  const content = (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: Math.max(insets.top, 10) + 4,
        paddingBottom: Math.max(insets.bottom, 12) + 6,
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
        {/* Subtle atmospheric vignette and softening for legibility */}
        {needsScrim ? (
          <View
            pointerEvents="none"
            style={{
              ...ViewStyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(255, 255, 255, 0.42)',
            }}
          />
        ) : null}

        {/* Ambient sparkling motes for fairytale game feel */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 45,
            left: 28,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#FFF',
            opacity: sparkleAnim,
          }}
        />
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 110,
            right: 42,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.yellowGlow,
            opacity: sparkleAnim,
          }}
        />
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 180,
            left: 65,
            width: 7,
            height: 7,
            borderRadius: 3.5,
            backgroundColor: '#FFF',
            opacity: sparkleAnim,
          }}
        />

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
          height: '56%',
          backgroundColor: top,
          borderBottomLeftRadius: 44,
          borderBottomRightRadius: 44,
          opacity: 0.94,
        }}
      />

      {/* Radiant Sun in top corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 26,
          right: 22,
          width: 76,
          height: 76,
          borderRadius: 38,
          backgroundColor: colors.sunGlow,
          opacity: 0.65,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
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
            width: 88,
            height: 30,
            borderRadius: 15,
            backgroundColor: colors.cloud,
            opacity: 0.92,
            ...shadows.soft,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -14,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.cloud,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -9,
            left: 48,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.cloud,
          }}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 110,
          right: 36,
          transform: [
            {
              translateX: cloudAnim.interpolate({
                inputRange: [-10, 10],
                outputRange: [8, -8],
              }),
            },
          ],
        }}
      >
        <View
          style={{
            width: 72,
            height: 26,
            borderRadius: 13,
            backgroundColor: colors.cloud,
            opacity: 0.88,
            ...shadows.soft,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -11,
            left: 18,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.cloud,
          }}
        />
      </Animated.View>

      {/* Foliage framing (canopy leaves & grassy hills) */}
      {foliage && (
        <>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: -30,
              left: -35,
              width: 145,
              height: 95,
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
              width: 155,
              height: 90,
              borderRadius: 65,
              backgroundColor: colors.leafDark,
              transform: [{ rotate: '15deg' }],
              opacity: 0.9,
            }}
          />

          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -20,
              left: -50,
              width: 220,
              height: 105,
              borderRadius: 85,
              backgroundColor: colors.grassLight,
              opacity: 0.9,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: -24,
              right: -50,
              width: 230,
              height: 110,
              borderRadius: 90,
              backgroundColor: colors.grass,
              opacity: 0.92,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '9%',
              backgroundColor: colors.grassDark,
              opacity: 0.35,
              borderTopLeftRadius: 180,
              borderTopRightRadius: 180,
            }}
          />
        </>
      )}

      {content}
    </View>
  );
}

const ViewStyleSheet = {
  absoluteFillObject: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

/** Animal picture with cute grounding shadow, halo aura, and smooth expressions */
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
      {/* Soft circular aura glow */}
      {aura && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: size * 1.14,
            height: size * 1.14,
            borderRadius: (size * 1.14) / 2,
            backgroundColor: colors.yellowGlow,
            opacity: 0.6,
          }}
        />
      )}

      {/* Grounding contact shadow */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: size * 0.04,
          width: size * 0.68,
          height: size * 0.14,
          borderRadius: size * 0.34,
          backgroundColor: 'rgba(15, 23, 42, 0.18)',
        }}
      />

      <Image
        source={animal.expressions?.[mood as Mood] ?? animal.image}
        style={{
          width: size,
          height: size,
          opacity: dim ? 0.5 : 1,
        }}
        contentFit="contain"
        transition={150}
      />
    </View>
  );
};

/**
 * Premium 3D Candy Button with authentic tactile spring push,
 * specular highlight reflection, chunky bottom bevel, and bold typography.
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
  const [pressedAnim] = useState(() => new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(pressedAnim, {
      toValue: 1,
      duration: 70,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressedAnim, {
      toValue: 0,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const bevel = small ? 4 : 5;
  const translateY = pressedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bevel - 1],
  });

  const txt: TextStyle = {
    ...typography.button,
    fontSize: small ? 15 : 18,
    color: p.text,
    textShadowColor: kind === 'yellow' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[
          {
            backgroundColor: p.face,
            borderBottomWidth: bevel,
            borderBottomColor: p.edge,
            borderRadius: radius.card,
            paddingVertical: small ? 10 : 14,
            paddingHorizontal: small ? 16 : 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            overflow: 'hidden',
            opacity: disabled ? 0.5 : 1,
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.45)',
            ...shadows.button,
          },
        ]}
      >
        {/* Specular gloss arc across upper half */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 1,
            left: 10,
            right: 10,
            height: '46%',
            borderRadius: radius.card,
            backgroundColor: colors.gloss,
          }}
        />

        {icon && (
          <Ionicons
            name={icon}
            size={small ? 19 : 23}
            color={p.text}
            style={{
              textShadowColor: kind === 'yellow' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          />
        )}
        <Text style={txt}>{label}</Text>
        {iconRight && (
          <Ionicons
            name={iconRight}
            size={small ? 19 : 23}
            color={p.text}
            style={{
              textShadowColor: kind === 'yellow' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

/** Round glossy 3D icon button with bouncy push feedback */
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
  const p = buttons[kind];
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.91,
      useNativeDriver: true,
      speed: 35,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 110,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
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
            backgroundColor: p.face,
            borderBottomWidth: 4,
            borderBottomColor: p.edge,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2.5,
            borderColor: colors.white,
            ...shadows.button,
          }}
        >
          {/* Top gloss specular bubble */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 2,
              left: size * 0.16,
              right: size * 0.16,
              height: size * 0.36,
              borderRadius: size / 2,
              backgroundColor: colors.gloss,
            }}
          />
          <Ionicons
            name={icon}
            size={size * 0.48}
            color={p.text}
            style={{
              textShadowColor: 'rgba(0,0,0,0.22)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          />
        </View>
        {label ? (
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: radius.pill,
              marginTop: 6,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.8)',
              ...shadows.subtle,
            }}
          >
            <Text
              style={{
                ...typography.small,
                fontWeight: '900',
                color: colors.ink,
                textAlign: 'center',
                fontSize: 12,
                lineHeight: 14,
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

export const Circle = ({
  icon,
  onPress,
  label,
  kind = 'blue',
}: {
  icon: Icon;
  onPress: () => void;
  label: string;
  kind?: ButtonKind;
}) => {
  const p = buttons[kind];
  const [scaleAnim] = useState(() => new Animated.Value(1));

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scaleAnim, { toValue: 0.88, useNativeDriver: true }).start()
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
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: p.face,
          borderBottomWidth: 3.5,
          borderBottomColor: p.edge,
          borderWidth: 2,
          borderColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.button,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 2,
            left: 6,
            right: 6,
            height: 14,
            borderRadius: 7,
            backgroundColor: colors.gloss,
          }}
        />
        <Ionicons name={icon} size={22} color={p.text} />
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
        marginBottom: 10,
      }}
    >
      {back && (
        <View style={{ position: 'absolute', left: 0, zIndex: 10 }}>
          <Circle icon="arrow-back" onPress={goBack} label="Back" kind="blue" />
        </View>
      )}

      <View style={{ alignItems: 'center', paddingHorizontal: 54 }}>
        <Text
          style={{
            ...typography.heading,
            fontSize: scale(22),
            color: light ? colors.white : colors.title,
            fontWeight: '900',
            textShadowColor: light ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.85)',
            textShadowRadius: 4,
            textShadowOffset: { width: 0, height: 1.5 },
          }}
        >
          {title}
        </Text>
        {sub ? (
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              paddingHorizontal: 12,
              paddingVertical: 3.5,
              borderRadius: radius.pill,
              marginTop: 3,
              borderWidth: 1.5,
              borderColor: 'rgba(255, 255, 255, 0.95)',
              ...shadows.subtle,
            }}
          >
            <Text
              style={{
                ...typography.small,
                fontWeight: '900',
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
          <Circle icon="home" onPress={() => router.replace('/home')} label="Home" kind="yellow" />
        </View>
      )}
    </View>
  );
}

/** Bouncy tactile card with pillowy corners, depth border, and subtle top gloss */
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
      toValue: 0.95,
      useNativeDriver: true,
      speed: 35,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 110,
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
            borderRadius: radius.card,
            borderWidth: 2,
            borderColor: colors.borderLight,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            ...shadows.card,
          },
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

/** 3D Carved Wooden Sign displaying animal name */
export const WoodSign = ({ text }: { text: string }) => {
  if (DECOR.woodBoard) {
    return (
      <View
        style={{
          width: scale(310),
          height: scale(82),
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.card,
        }}
      >
        <Image
          source={DECOR.woodBoard}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: radius.md,
          }}
          contentFit="fill"
        />
        <Text
          style={{
            ...typography.hero,
            fontSize: scale(34),
            color: '#3E1F03',
            fontWeight: '900',
            letterSpacing: 3,
            textShadowColor: 'rgba(255, 235, 195, 0.95)',
            textShadowOffset: { width: 0, height: 1.5 },
            textShadowRadius: 3,
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
        paddingVertical: 7,
        paddingHorizontal: scale(32),
        alignItems: 'center',
        ...shadows.button,
      }}
    >
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
          fontSize: scale(34),
          color: colors.woodDark,
          letterSpacing: 2,
          textShadowColor: colors.woodHighlight,
          textShadowOffset: { width: 0, height: 1.5 },
          textShadowRadius: 2,
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
        style={{ width: size * 5.6, height: size * 2.8 }}
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
  bg = 'rgba(255, 255, 255, 0.92)',
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
          Animated.spring(scaleAnim, { toValue: 0.94, useNativeDriver: true }).start()
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
            justifyContent: 'center',
            gap: 8,
            borderWidth: 2,
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
