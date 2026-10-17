import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, totals, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene, Stars } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];
export default function Progress() {
  const { stats } = useStore(); const t = totals(stats);
  const learned = ANIMALS.filter((a) => isLearned(stats[a.id])).length;
  const box = (icon: Icon, tint: string, v: string, l: string) => (
    <Card style={{ flex: 1, height: 92 }}>
      <Ionicons name={icon} size={26} color={tint} />
      <Text style={{ ...typography.title, color: colors.title }}>{v}</Text>
      <Text style={{ ...typography.small, color: colors.muted }}>{l}</Text>
    </Card>);
  return (
    <Scene top={colors.homeSky} bottom={colors.screenCream} foliage={false}>
      <Header title="My Progress" home={false} />
      <View style={{ flexDirection: 'row', gap: 8 }}>{box('star', colors.star, `${learned}/${ANIMALS.length}`, 'Completed')}{box('locate', colors.red, `${t.accuracy}%`, 'Accuracy')}{box('stats-chart', colors.blue, `${t.attempts}`, 'Total Attempts')}</View>
      <Card style={{ marginTop: 12, alignItems: 'stretch', padding: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.heading, fontSize: 16, color: colors.ink }}>Animals Progress</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Ionicons name="star" size={16} color={colors.star} /><Text style={{ ...typography.body, fontWeight: '800', color: colors.ink }}>{t.stars}</Text></View>
        </View>
        <Text style={{ ...typography.small, color: colors.blue }}>{learned} of {ANIMALS.length} learned</Text>
        <View style={{ height: 12, borderRadius: radius.sm, backgroundColor: colors.track, marginTop: 6, overflow: 'hidden' }}>
          <View style={{ height: 12, backgroundColor: colors.green, width: `${(learned / ANIMALS.length) * 100}%` }} />
        </View>
      </Card>
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 20 }}>
        {ANIMALS.map((a) => { const s = stats[a.id]; const done = isLearned(s); const wrong = s ? s.attempts - s.correct : 0;
          const st = done ? 'Completed' : s ? 'In Progress' : 'Not Started';
          const badge: Icon = done ? 'checkmark-circle' : s ? 'alert-circle' : 'ellipse-outline'; const bc = done ? colors.green : s ? colors.red : colors.muted;
          return (
            <Card key={a.id} style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 8, borderRadius: radius.md }}>
              <AnimalImg animal={a} size={44} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={{ ...typography.body, fontWeight: '800', color: colors.ink }}>{a.name}</Text>
                <Text style={{ ...typography.small, color: done ? colors.green : s ? colors.orange : colors.muted }}>{st}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name={badge} size={20} color={bc} />
                  <Text style={{ ...typography.small, color: colors.ink }}>{s ? (s.attempts ? `${s.correct}/${s.attempts} correct` : '') : '0 attempts'}</Text>
                </View>
                {done ? <Stars n={Math.min(3, Math.max(1, Math.round(s!.stars / Math.max(1, s!.correct))))} size={12} /> : wrong ? <Text style={{ ...typography.small, color: colors.red }}>{wrong} to retry</Text> : null}
              </View>
            </Card>); })}
      </ScrollView>
    </Scene>
  );
}
