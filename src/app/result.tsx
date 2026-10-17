import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { Image } from 'expo-image';
import { attempt } from '@/lib/attempt';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { StrokePreview } from '@/ui/Canvas';
import { AnimalImg, Btn, Scene, Stars } from '@/ui/kit';

export default function Result() {
  const { id, ok } = useLocalSearchParams<{ id: string; ok: string }>();
  const a = getAnimal(id); const good = ok === '1'; const idx = ANIMALS.indexOf(a); const last = idx === ANIMALS.length - 1;
  const { voice, stats } = useStore(); const [showInk, setShowInk] = useState(true);
  const retry = () => router.replace({ pathname: '/write', params: { id: a.id } });
  return (
    <Scene bg={good ? 'success' : 'wrong'} top={good ? colors.correctTop : colors.pinkBg} bottom={good ? colors.greenLight : colors.pinkSoft} foliage={good}>
      {good && DECOR.confetti ? <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%' }}><Image source={DECOR.confetti} style={{ width: '100%', height: '100%' }} contentFit="cover" /></View> : null}
      <View style={{ alignItems: 'center', marginTop: scale(14) }}>
        <Text style={{ ...typography.hero, color: good ? colors.orange : colors.red, textShadowColor: good ? colors.woodDark : colors.redDark, textShadowRadius: 2, textShadowOffset: { width: 0, height: 2 } }}>{good ? 'Excellent!' : 'Not quite!'}</Text>
        {!good && <Text style={{ ...typography.title, textAlign: 'center', color: colors.ink }}>That's not correct.{'\n'}Try again!</Text>}
        {good && <Stars n={Math.max(1, 3 - (stats[a.id]?.wrongStreak ?? 0))} size={28} />}
        <AnimalImg animal={a} size={scale(good ? 220 : 190)} mood={good ? 'celebrating' : 'sad'} dim={!good} />
        {good && <>
          <Text style={{ ...typography.title, color: colors.ink }}>You wrote</Text>
          <Text style={{ ...typography.hero, color: colors.greenDark }}>{a.name.toUpperCase()}</Text>
          <Text style={{ ...typography.title, color: colors.ink }}>correctly!</Text>
        </>}
      </View>
      {!good && (
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <View style={{ backgroundColor: colors.white, borderRadius: radius.lg, width: '100%', height: scale(96), alignItems: 'center', justifyContent: 'center' }}>
            {showInk && attempt.strokes.length ? <StrokePreview strokes={attempt.strokes} srcW={attempt.w} srcH={attempt.h} width={scale(300)} height={scale(90)} /> : null}
          </View>
          {attempt.hint ? <Text style={{ ...typography.body, color: colors.redDark, marginTop: 6, textAlign: 'center' }}>{attempt.hint}</Text> : null}
        </View>
      )}
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        {!good && <Btn label="Clear" icon="refresh" kind="soft" onPress={() => setShowInk(false)} style={{ flex: 1 }} small />}
        <Btn label="Hear Again" icon="volume-high" kind="soft" onPress={() => speak(a.name, voice)} style={{ flex: 1 }} small />
      </View>
      {good
        ? <Btn label={last ? 'See My Progress' : 'Next Animal'} iconRight="arrow-forward" kind="green" onPress={() => (last ? router.replace('/progress') : router.replace({ pathname: '/next', params: { id: ANIMALS[idx + 1].id } }))} />
        : <Btn label="Try Again" icon="refresh" kind="red" onPress={retry} />}
    </Scene>
  );
}
