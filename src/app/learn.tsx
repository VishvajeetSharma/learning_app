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
  const a = getAnimal(id);
  const idx = ANIMALS.indexOf(a);
  const { voice } = useStore();
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      <Header
        title="Learn"
        sub={`${idx + 1} of ${ANIMALS.length}`}
        home={true}
        back={true}
      />

      {/* Screen 4: 3D Animal sitting on rock */}
      <View
        style={{
          alignItems: 'center',
          marginTop: scale(10),
        }}
      >
        <AnimalImg animal={a} size={scale(245)} />
      </View>

      {/* 3D Carved Wooden Sign: LION */}
      <View style={{ alignItems: 'center', marginTop: -scale(16) }}>
        <WoodSign text={a.name} />
      </View>

      {/* Hear Pronunciation & Auto Play Round Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 40,
          marginTop: scale(16),
        }}
      >
        <RoundBtn
          icon="volume-high"
          kind="green"
          size={58}
          label={'Hear\nPronunciation'}
          onPress={() => speak(a.name, true)}
        />
        <RoundBtn
          icon={auto ? 'pause' : 'play'}
          kind="orange"
          size={58}
          label="Auto Play"
          onPress={() => setAuto(!auto)}
        />
      </View>

      <View style={{ flex: 1 }} />

      {/* Screen 4: Bottom Navigation Bar with Previous and Next */}
      <View style={{ flexDirection: 'row', gap: 14, marginBottom: 8 }}>
        <Btn
          label="← Previous"
          kind="grey"
          disabled={idx === 0}
          onPress={() => go(idx - 1)}
          style={{ flex: 1 }}
          small
        />
        <Btn
          label="Next →"
          kind="blue"
          onPress={() =>
            router.push({ pathname: '/trace', params: { id: a.id } })
          }
          style={{ flex: 1.3 }}
          small
        />
      </View>
    </Scene>
  );
}
