import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ANIMALS, getAnimal } from '@/data/animals';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { scale } from '@/theme/spacing';
import { AnimalImg, Btn, Header, RoundBtn, Scene, WoodSign } from '@/ui/kit';

export default function Learn() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = getAnimal(id);
  const idx = ANIMALS.indexOf(a);
  const { voice } = useStore();
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { height } = useWindowDimensions();
  const animalSize = Math.max(170, Math.min(280, height * 0.31));

  const go = (n: number) => {
    router.replace({ pathname: '/learn', params: { id: ANIMALS[n].id } });
  };

  useEffect(() => {
    speak(a.name, voice);
  }, [a.name, a.id, voice]);

  useEffect(() => {
    if (auto) {
      if (idx < ANIMALS.length - 1) {
        timer.current = setTimeout(() => go(idx + 1), 3200);
      } else {
        const timeout = setTimeout(() => setAuto(false), 0);
        return () => clearTimeout(timeout);
      }
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [auto, a.id, idx]);

  return (
    <Scene bg="learning">
      <Header title="Learn" sub={`${idx + 1} of ${ANIMALS.length}`} home={true} back={true} />

      {/* Animal on a glowing stage (re-pops whenever the animal changes) */}
      <View style={{ alignItems: 'center', marginTop: scale(6) }}>
        <AnimalImg key={a.id} animal={a} size={animalSize} aura bounce />
      </View>

      {/* Carved wooden sign with the animal's name */}
      <View style={{ alignItems: 'center', marginTop: -scale(14), zIndex: 2 }}>
        <WoodSign text={a.name} />
      </View>

      {/* Hear Pronunciation & Auto Play */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 44,
          marginTop: scale(12),
        }}
      >
        <RoundBtn
          icon="volume-high"
          kind="green"
          size={68}
          label={'Hear\nPronunciation'}
          onPress={() => speak(a.name, true)}
        />
        <RoundBtn
          icon={auto ? 'pause' : 'play'}
          kind="orange"
          size={68}
          label="Auto Play"
          onPress={() => setAuto(!auto)}
        />
      </View>

      <View style={{ flex: 1 }} />

      {/* Previous / Next */}
      <View style={{ flexDirection: 'row', gap: 14, marginBottom: 6 }}>
        <Btn
          label="Previous"
          icon="arrow-back"
          kind="grey"
          disabled={idx === 0}
          onPress={() => go(idx - 1)}
          style={{ flex: 1 }}
          small
        />
        <Btn
          label="Next"
          iconRight="arrow-forward"
          kind="blue"
          onPress={() => router.push({ pathname: '/trace', params: { id: a.id } })}
          style={{ flex: 1.3 }}
          small
        />
      </View>
    </Scene>
  );
}
