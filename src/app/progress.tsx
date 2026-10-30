import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, totals, useStore } from '@/lib/store';
import { ButtonKind, Tone, buttons, colors, tones } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { font, typography } from '@/theme/typography';
import { AnimalImg, Card, Chip, Gradient, Header, Scene } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

export default function Progress() {
  const { stats } = useStore();
  const t = totals(stats);
  const learned = ANIMALS.filter((a) => isLearned(stats[a.id])).length;
  const pct = (learned / ANIMALS.length) * 100;

  const box = (icon: Icon, tone: Tone, kind: ButtonKind, v: string, l: string) => (
    <Card tone={tone} r={radius.lg} style={{ flex: 1, height: 116, padding: 6 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2.5,
          borderColor: colors.white,
          backgroundColor: buttons[kind].face,
          ...shadows.card,
        }}
      >
        <Gradient stops={[buttons[kind].top, buttons[kind].face]} />
        <Ionicons name={icon} size={22} color={colors.white} />
      </View>
      <Text style={{ ...typography.title, fontSize: 24, color: tones[tone].label, marginTop: 4 }}>{v}</Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        style={{ ...typography.caption, fontFamily: font.semi, color: tones[tone].label, opacity: 0.8 }}
      >
        {l}
      </Text>
    </Card>
  );

  return (
    <Scene bg="animals">
      <Header title="My Progress" home={false} back={true} />

      {/* 3 top stat boxes */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {box('star', 'yellow', 'yellow', `${learned}/${ANIMALS.length}`, 'Completed')}
        {box('locate', 'pink', 'red', `${t.accuracy}%`, 'Accuracy')}
        {box('stats-chart', 'blue', 'blue', `${t.attempts}`, 'Total Attempts')}
      </View>

      {/* Animals progress card */}
      <Card tone="white" r={radius.lg} style={{ marginTop: 14, alignItems: 'stretch', padding: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.heading, fontSize: 19, color: colors.title }}>Animals Progress</Text>
          <Chip text={`${learned} of ${ANIMALS.length} learned`} tone="blue" icon="trophy" />
        </View>
        <View
          style={{
            height: 22,
            borderRadius: radius.pill,
            backgroundColor: '#DCE8F7',
            marginTop: 10,
            padding: 3,
            overflow: 'hidden',
          }}
        >
          <View style={{ height: '100%', width: `${pct}%`, borderRadius: radius.pill, overflow: 'hidden' }}>
            <Gradient stops={['#7BEA9E', '#22C468']} />
            <Gradient stops={[['#FFFFFF', 0.55], ['#FFFFFF', 0]]} style={{ bottom: '50%' }} />
          </View>
        </View>
      </Card>

      {/* Animal rows */}
      <ScrollView
        style={{ marginTop: 12 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingBottom: 28 }}
      >
        {ANIMALS.map((a) => {
          const s = stats[a.id];
          const done = isLearned(s);
          const st = done ? 'Completed' : s ? 'In Progress' : 'Not Started';
          const tone: Tone = done ? 'green' : s ? 'orange' : 'white';
          const badge: Icon = done ? 'checkmark-circle' : s ? 'alert-circle' : 'ellipse-outline';
          const bc = done ? colors.green : s ? colors.orange : colors.muted;

          return (
            <Card
              key={a.id}
              tone={tone}
              r={radius.lg}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12, paddingVertical: 10 }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  borderWidth: 2,
                  borderColor: tones[tone].edge,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AnimalImg animal={a} size={44} />
              </View>
              <View style={{ flex: 1, marginLeft: 12, alignItems: 'flex-start', gap: 2 }}>
                <Text style={{ ...typography.bodyStrong, fontSize: 18, color: tones[tone].label }}>{a.name}</Text>
                <Chip text={st} tone={tone === 'white' ? 'locked' : tone} />
              </View>

              <View style={{ alignItems: 'flex-end', gap: 2 }}>
                <Ionicons name={badge} size={26} color={bc} />
                <Text style={{ ...typography.caption, fontFamily: font.semi, fontSize: 13, color: tones[tone].label }}>
                  {s ? (s.attempts ? `${s.correct}/${s.attempts} correct` : '') : '0 attempts'}
                </Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </Scene>
  );
}
