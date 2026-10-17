import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Scene } from '@/ui/kit';

export default function Splash() {
  const [progressAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) router.replace('/home');
    });
  }, [progressAnim]);

  return (
    <Scene bg="splash">
      <View style={{ flex: 1 }} />

      {/* Screen 1: Capsule Loading Bar at the bottom */}
      <View style={{ alignItems: 'center', marginBottom: scale(42) }}>
        <View
          style={{
            width: '74%',
            height: 24,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderWidth: 3,
            borderColor: colors.white,
            padding: 3,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
            justifyContent: 'center',
          }}
        >
          {/* Top gloss strip across the capsule */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 2,
              left: 10,
              right: 10,
              height: 7,
              borderRadius: 4,
              backgroundColor: colors.gloss,
              zIndex: 5,
            }}
          />

          <Animated.View
            style={{
              height: '100%',
              backgroundColor: '#3B82F6',
              borderRadius: 8,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderRadius: 16,
            marginTop: 8,
            borderWidth: 1.5,
            borderColor: colors.white,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Text
            style={{
              ...typography.small,
              fontWeight: '900',
              color: '#0F294D',
              fontSize: 13,
            }}
          >
            Getting ready to play... ✨
          </Text>
        </View>
      </View>
    </Scene>
  );
}
