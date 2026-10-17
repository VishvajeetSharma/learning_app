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
      <View style={{ alignItems: 'center', marginBottom: scale(38) }}>
        <View
          style={{
            width: '65%',
            height: 18,
            borderRadius: 9,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            overflow: 'hidden',
            borderWidth: 2.5,
            borderColor: colors.white,
            padding: 2,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
          }}
        >
          <Animated.View
            style={{
              height: '100%',
              backgroundColor: '#2F8BFF',
              borderRadius: 6,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
        <Text
          style={{
            ...typography.body,
            marginTop: 6,
            fontWeight: '900',
            color: '#4E2A0A',
            fontSize: 14,
            textShadowColor: 'rgba(255,255,255,0.7)',
            textShadowRadius: 2,
            textShadowOffset: { width: 0, height: 1 },
          }}
        >
          Loading...
        </Text>
      </View>
    </Scene>
  );
}
