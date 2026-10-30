import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { colors, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { font, typography } from '@/theme/typography';
import { Gradient, Scene } from '@/ui/kit';

export default function Splash() {
  const [progressAnim] = useState(() => new Animated.Value(0));
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) router.replace('/home');
    });
  }, [progressAnim]);

  // purely decorative: the paw/star pulses while loading
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Scene bg="splash">
      <View style={{ flex: 1 }} />

      {/* Chunky capsule loading bar on a soft leafy panel */}
      <View style={{ alignItems: 'center', marginBottom: scale(34) }}>
        <View
          style={{
            width: '78%',
            borderRadius: radius.xl,
            backgroundColor: ui.panel,
            borderWidth: 3,
            borderColor: colors.white,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 10,
            alignItems: 'center',
            ...shadows.lift,
          }}
        >
          <View
            style={{
              width: '100%',
              height: 24,
              borderRadius: 12,
              backgroundColor: '#DCE8F7',
              overflow: 'hidden',
              padding: 3,
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                borderRadius: 9,
                overflow: 'hidden',
                width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              }}
            >
              <Gradient stops={['#7BEA9E', '#22C468']} />
              <Gradient stops={[['#FFFFFF', 0.55], ['#FFFFFF', 0]]} style={{ bottom: '50%' }} />
            </Animated.View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <Animated.View
              style={{
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.25] }) }],
              }}
            >
              <Ionicons name="star" size={18} color={colors.star} />
            </Animated.View>
            <Text style={{ ...typography.bodyStrong, fontFamily: font.semi, color: colors.title, fontSize: 17 }}>
              Loading...
            </Text>
            <Animated.View
              style={{
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1.25, 0.85] }) }],
              }}
            >
              <Ionicons name="star" size={18} color={colors.star} />
            </Animated.View>
          </View>
        </View>
      </View>
    </Scene>
  );
}
