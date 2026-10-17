import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { getAnimal } from '@/data/animals';
import { DECOR } from '@/data/backgrounds';
import { Image } from 'expo-image';
import { LETTERS, verifyTrace } from '@/lib/letters';
import type { Pt } from '@/lib/letters';
import { speak } from '@/lib/speak';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { CanvasHandle, DrawCanvas, toGuideUnits } from '@/ui/Canvas';
import { Btn, Header, Scene } from '@/ui/kit';

export default function Trace() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = getAnimal(id); const letters = a.name.toUpperCase().split(''); const { voice } = useStore();
  const [i, setI] = useState(0); const [msg, setMsg] = useState('Trace the dotted letter with your finger'); const [h, setH] = useState(scale(300));
  const cv = useRef<CanvasHandle>(null);
  const { width } = useWindowDimensions(); const w = Math.min(width, 480) - scale(32) - 8;

  // Verify after every finished stroke: succeed as soon as the letter is covered; only nag once the expected number of strokes is drawn.
  const onChange = (px: Pt[][]) => {
    if (!px.length) return;
    const need = LETTERS[letters[i]]?.length ?? 1;
    if (verifyTrace(letters[i], toGuideUnits(px, w, h))) {
      speak(letters[i], voice); cv.current?.clear();
      if (i + 1 >= letters.length) router.replace({ pathname: '/write', params: { id: a.id } });
      else { setI(i + 1); setMsg('Great! Next letter'); }
    } else if (px.length >= need) setMsg('Try to follow the dots a little closer');
  };
  return (
    <Scene bg="tracing">
      <Header title="Trace & Write" sub={`${i + 1} of ${letters.length}`} />
      <View style={{ flex: 1, backgroundColor: colors.white, borderRadius: radius.xl, padding: 4, borderWidth: 3, borderColor: colors.blueSoft, ...shadows.soft }} onLayout={(e) => setH(e.nativeEvent.layout.height)}>
        <DrawCanvas key={i} ref={cv} width={w} height={h} guide={letters[i]} ink={colors.blue} thickness={11} onChange={onChange} />
        <View style={{ position: 'absolute', right: 12, top: 12, width: 38, height: 38, borderRadius: 19, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="volume-high" size={22} color={colors.blue} onPress={() => speak(a.name, true)} />
        </View>
        {DECOR.tracingFinger ? <View pointerEvents="none" style={{ position: 'absolute', right: 6, bottom: 6 }}><Image source={DECOR.tracingFinger} style={{ width: scale(90), height: scale(90) }} contentFit="contain" /></View> : null}
      </View>
      <Text style={{ ...typography.body, fontWeight: '800', textAlign: 'center', marginVertical: 8, color: colors.title }}>{msg}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        {letters.map((l, k) => (
          <View key={k} style={{ flex: 1, margin: 3, height: scale(54), borderRadius: radius.md, backgroundColor: k < i ? colors.greenBg : colors.white, borderWidth: 3, borderColor: k === i ? colors.blue : colors.border, alignItems: 'center', justifyContent: 'center', ...shadows.card }}>
            <Text style={{ ...typography.title, fontSize: 26, color: colors.title }}>{l}</Text>
          </View>))}
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Btn label="Clear" icon="refresh" kind="red" onPress={() => cv.current?.clear()} style={{ flex: 1 }} small />
        <Btn label="Hear Again" icon="volume-high" kind="soft" onPress={() => speak(a.name, true)} style={{ flex: 1 }} small />
      </View>
    </Scene>
  );
}
