import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, totals, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

export default function Progress() {
  const { stats } = useStore();
  const t = totals(stats);
  const learned = ANIMALS.filter((a) => isLearned(stats[a.id])).length;

  const box = (icon: Icon, tint: string, v: string, l: string) => (
    <Card
      style={{
        flex: 1,
        height: 94,
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        borderColor: colors.border,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name={icon} size={26} color={tint} />
      <Text style={{ ...typography.title, color: colors.ink, fontWeight: '900', marginTop: 2 }}>
        {v}
      </Text>
      <Text style={{ ...typography.small, color: colors.muted, fontWeight: '700' }}>
        {l}
      </Text>
    </Card>
  );

  return (
    <Scene bg="animals">
      {/* Screen 10: Header */}
      <Header title="My Progress" home={false} back={true} />

      {/* Screen 10: 3 Top Stat Boxes */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {box('star', '#FFC107', `${learned}/${ANIMALS.length}`, 'Completed')}
        {box('locate', '#FF4757', `${t.accuracy}%`, 'Accuracy')}
        {box('stats-chart', '#2F8BFF', `${t.attempts}`, 'Total Attempts')}
      </View>

      {/* Screen 10: Animals Progress Card */}
      <Card
        style={{
          marginTop: 14,
          alignItems: 'stretch',
          padding: 14,
          backgroundColor: colors.white,
          borderRadius: radius.lg,
          borderColor: colors.border,
          borderWidth: 1.5,
        }}
      >
        <Text style={{ ...typography.heading, fontSize: 16, color: colors.ink, fontWeight: '800' }}>
          Animals Progress
        </Text>
        <Text style={{ ...typography.small, color: '#2F8BFF', fontWeight: '800', marginTop: 2 }}>
          {learned} of {ANIMALS.length} learned
        </Text>
        <View
          style={{
            height: 10,
            borderRadius: radius.pill,
            backgroundColor: '#E2E8F0',
            marginTop: 8,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              backgroundColor: '#28A745',
              width: `${(learned / ANIMALS.length) * 100}%`,
              borderRadius: radius.pill,
            }}
          />
        </View>
      </Card>

      {/* Screen 10: Animal Progress Rows */}
      <ScrollView
        style={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: 24 }}
      >
        {ANIMALS.map((a) => {
          const s = stats[a.id];
          const done = isLearned(s);
          const st = done ? 'Completed' : s ? 'In Progress' : 'Not Started';
          const badge: Icon = done
            ? 'checkmark-circle'
            : s
            ? 'alert-circle'
            : 'ellipse-outline';
          const bc = done ? '#28A745' : s ? '#FF4757' : colors.muted;

          return (
            <Card
              key={a.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: radius.md,
                backgroundColor: colors.white,
                borderColor: colors.border,
                borderWidth: 1.5,
              }}
            >
              <AnimalImg animal={a} size={44} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ ...typography.body, fontWeight: '800', color: colors.ink, fontSize: 16 }}>
                  {a.name}
                </Text>
                <Text
                  style={{
                    ...typography.small,
                    color: done ? '#28A745' : s ? '#FF4757' : colors.muted,
                    fontWeight: '700',
                  }}
                >
                  {st}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name={badge} size={20} color={bc} />
                <Text style={{ ...typography.small, color: colors.ink, fontWeight: '700' }}>
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
