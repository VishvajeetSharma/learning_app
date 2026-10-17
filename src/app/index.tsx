import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { typography } from '@/theme/typography';
import { scale } from '@/theme/spacing';
import { AnimalImg, Logo, Scene } from '@/ui/kit';

export default function Splash() {
  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(w, { toValue: 1, duration: 2200, useNativeDriver: false }).start(({ finished }) => finished && router.replace('/home')); }, [w]);
  const group = [ANIMALS[4], ANIMALS[0], ANIMALS[1], ANIMALS[6], ANIMALS[8], ANIMALS[5]];
  return (
    <Scene bg="splash">
      <View style={{ alignItems: 'center', marginTop: scale(40) }}>
        <View style={{ backgroundColor: colors.woodLight, borderWidth: 6, borderColor: colors.woodDark, borderRadius: radius.xl, paddingHorizontal: 28, paddingVertical: 14, alignItems: 'center' }}>
          <Logo size={scale(48)} />
          <Text style={{ ...typography.small, fontWeight: '800', color: colors.woodDark, marginTop: 4 }}>Play • Learn • Grow</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: scale(24) }}>
        {group.map((a) => <AnimalImg key={a.id} animal={a} size={scale(104)} />)}
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ alignItems: 'center', marginBottom: scale(24) }}>
        <View style={{ width: '70%', height: 16, borderRadius: 8, backgroundColor: colors.scrim, overflow: 'hidden', borderWidth: 2, borderColor: colors.white }}>
          <Animated.View style={{ height: '100%', backgroundColor: colors.blue, width: w.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }} />
        </View>
        <Text style={{ ...typography.body, marginTop: 6, fontWeight: '800', color: colors.ink }}>Loading...</Text>
      </View>
    </Scene>
  );
}
