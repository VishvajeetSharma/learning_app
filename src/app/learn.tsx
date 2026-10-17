import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { scale } from '@/theme/spacing';
import { AnimalImg, Btn, Header, RoundBtn, Scene, WoodSign } from '@/ui/kit';

export default function Learn() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = getAnimal(id); const idx = ANIMALS.indexOf(a); const { voice } = useStore();
  const [auto, setAuto] = useState(false); const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const go = (n: number) => router.replace({ pathname: '/learn', params: { id: ANIMALS[n].id } });
  useEffect(() => { speak(a.name, voice); }, [a.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (auto && idx < ANIMALS.length - 1) t.current = setTimeout(() => go(idx + 1), 3000); else if (auto) setAuto(false); return () => { if (t.current) clearTimeout(t.current); }; }, [auto, a.id]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Scene bg="learning">
      <Header title="Learn" sub={`${idx + 1} of ${ANIMALS.length}`} />
      <View style={{ alignItems: 'center', marginTop: scale(4) }}><AnimalImg animal={a} size={scale(270)} /></View>
      <View style={{ alignItems: 'center', marginTop: -scale(24) }}><WoodSign text={a.name} /></View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: scale(16) }}>
        <RoundBtn icon="volume-high" kind="green" label={'Hear\nPronunciation'} onPress={() => speak(a.name)} />
        <RoundBtn icon={auto ? 'pause' : 'play'} kind="orange" label="Auto Play" onPress={() => setAuto(!auto)} />
      </View>
      <View style={{ flex: 1 }} />
      <Btn label="Trace & Write" icon="pencil" kind="orange" onPress={() => router.push({ pathname: '/trace', params: { id: a.id } })} style={{ marginBottom: 10 }} />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Btn label="Previous" icon="arrow-back" kind="grey" disabled={idx === 0} onPress={() => go(idx - 1)} style={{ flex: 1 }} small />
        <Btn label="Next" iconRight="arrow-forward" disabled={idx === ANIMALS.length - 1} onPress={() => go(idx + 1)} style={{ flex: 1.3 }} small />
      </View>
    </Scene>
  );
}
