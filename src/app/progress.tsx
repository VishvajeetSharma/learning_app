import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { ANIMALS } from '@/data/animals';
import { isLearned, totals, useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { scale } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AnimalImg, Card, Header, Scene } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

export default function Progress() {
  const { stats } = useStore();
  const t = totals(stats);
  const learned = ANIMALS.filter((a) => isLearned(stats[a.id])).length;
  const pct = Math.round((learned / ANIMALS.length) * 100);

  // Gamified praise based on progress
  const motivationalTitle =
    learned === ANIMALS.length
      ? 'Grand Champion! 👑'
      : learned >= 8
      ? 'Super Learner! 🌟'
      : learned >= 1
      ? 'Great Explorer! 🚀'
      : 'Ready to Play! 🎈';

  const motivationalSub =
    learned === ANIMALS.length
      ? 'You mastered all 15 animals!'
      : learned >= 1
      ? `${learned} animals unlocked and counted!`
      : 'Practice animals to earn your first star!';

  const statBox = (
    icon: Icon,
    tint: string,
    v: string,
    l: string,
    bg: string,
    border: string,
    edge: string
  ) => (
    <Card
      style={{
        flex: 1,
        height: 104,
        backgroundColor: bg,
        borderRadius: radius.card,
        borderColor: border,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderBottomColor: edge,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        ...shadows.card,
      }}
    >
      {/* Specular gloss strip */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 2,
          left: 8,
          right: 8,
          height: 16,
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
        }}
      />
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
          borderWidth: 2,
          borderColor: border,
          ...shadows.subtle,
        }}
      >
        <Ionicons name={icon} size={20} color={tint} />
      </View>
      <Text
        style={{
          ...typography.title,
          color: '#1E293B',
          fontWeight: '900',
          fontSize: 18,
        }}
      >
        {v}
      </Text>
      <Text
        style={{
          ...typography.micro,
          color: '#64748B',
          fontWeight: '800',
          marginTop: 1,
        }}
      >
        {l}
      </Text>
    </Card>
  );

  return (
    <Scene bg="animals">
      {/* Screen 10: Header with subtitle pill */}
      <Header
        title="My Progress"
        sub={`${learned} of ${ANIMALS.length} Animals Mastered`}
        home={false}
        back={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        {/* Hero Trophy Achievement Banner */}
        <View
          style={{
            backgroundColor: '#FFFBEB',
            borderRadius: radius.xl,
            borderWidth: 2.5,
            borderBottomWidth: 5,
            borderColor: '#FCD34D',
            borderBottomColor: '#F59E0B',
            padding: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            ...shadows.card,
          }}
        >
          {/* Top gloss arc */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 2,
              left: 12,
              right: 12,
              height: 22,
              borderRadius: radius.xl,
              backgroundColor: 'rgba(255, 255, 255, 0.45)',
            }}
          />

          {/* Golden Trophy Icon Badge */}
          <View
            style={{
              width: scale(54),
              height: scale(54),
              borderRadius: scale(27),
              backgroundColor: '#FEF08A',
              borderWidth: 2.5,
              borderColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#D97706',
              shadowOpacity: 0.25,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 4,
            }}
          >
            <Ionicons name="trophy" size={scale(28)} color="#D97706" />
          </View>

          {/* Text Summary */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                ...typography.heading,
                fontSize: 17,
                color: '#92400E',
                fontWeight: '900',
              }}
            >
              {motivationalTitle}
            </Text>
            <Text
              style={{
                ...typography.small,
                color: '#78350F',
                fontWeight: '700',
                marginTop: 2,
                fontSize: 12,
              }}
            >
              {motivationalSub}
            </Text>
          </View>

          {/* Large Mastery Percentage Pill */}
          <View
            style={{
              backgroundColor: '#10B981',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: radius.pill,
              borderWidth: 2,
              borderBottomWidth: 3.5,
              borderColor: '#6EE7B7',
              borderBottomColor: '#047857',
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.subtle,
            }}
          >
            <Text
              style={{
                ...typography.button,
                fontSize: 16,
                color: colors.white,
                fontWeight: '900',
              }}
            >
              {pct}%
            </Text>
          </View>
        </View>

        {/* 3 Gamified Stat Cards */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {statBox(
            'star',
            '#D97706',
            `${learned}/${ANIMALS.length}`,
            'Completed',
            '#FEF9C3',
            '#FDE047',
            '#FACC15'
          )}
          {statBox(
            'sparkles',
            '#E11D48',
            `${t.accuracy}%`,
            'Accuracy',
            '#FFE4E6',
            '#FECDD3',
            '#FDA4AF'
          )}
          {statBox(
            'flame',
            '#0284C7',
            `${t.attempts}`,
            'Practices',
            '#E0F2FE',
            '#BAE6FD',
            '#7DD3FC'
          )}
        </View>

        {/* Learning Journey Progress Card */}
        <View
          style={{
            marginTop: 12,
            padding: 16,
            backgroundColor: colors.white,
            borderRadius: radius.card,
            borderColor: '#E2E8F0',
            borderWidth: 2,
            borderBottomWidth: 4,
            borderBottomColor: '#CBD5E1',
            ...shadows.card,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="map" size={18} color="#2563EB" />
              <Text
                style={{
                  ...typography.heading,
                  fontSize: 16,
                  color: '#1E293B',
                  fontWeight: '900',
                }}
              >
                Learning Journey
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#EFF6FF',
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: '#BFDBFE',
              }}
            >
              <Text style={{ ...typography.micro, color: '#2563EB', fontWeight: '900' }}>
                {pct}% Completed 🎯
              </Text>
            </View>
          </View>

          {/* 3D Candy Progress Track */}
          <View
            style={{
              height: 20,
              borderRadius: 10,
              backgroundColor: '#EEF2F6',
              marginTop: 12,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: colors.white,
              padding: 2,
              justifyContent: 'center',
              ...shadows.subtle,
            }}
          >
            {/* Top gloss strip across the track */}
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 2,
                left: 8,
                right: 8,
                height: 5,
                borderRadius: 3,
                backgroundColor: colors.gloss,
                zIndex: 5,
              }}
            />

            <View
              style={{
                height: '100%',
                backgroundColor: '#10B981',
                width: `${Math.max(pct, 4)}%`,
                borderRadius: 8,
              }}
            />
          </View>

          {/* Milestone markers */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
              paddingHorizontal: 2,
            }}
          >
            <Text style={{ ...typography.micro, color: '#64748B', fontWeight: '800' }}>
              🥉 Starter
            </Text>
            <Text style={{ ...typography.micro, color: '#64748B', fontWeight: '800' }}>
              🥈 Explorer (5)
            </Text>
            <Text style={{ ...typography.micro, color: '#64748B', fontWeight: '800' }}>
              🥇 Champion (10)
            </Text>
            <Text style={{ ...typography.micro, color: '#16A34A', fontWeight: '900' }}>
              👑 Master (15)
            </Text>
          </View>
        </View>

        {/* Section Heading: Animal Badges Collection */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              ...typography.heading,
              fontSize: 16,
              color: '#0F294D',
              fontWeight: '900',
            }}
          >
            Animal Badges 🐾
          </Text>
          <Text style={{ ...typography.small, color: '#64748B', fontWeight: '800' }}>
            Tap any animal to practice!
          </Text>
        </View>

        {/* Animal Collectible Cards List */}
        <View style={{ gap: 8 }}>
          {ANIMALS.map((a) => {
            const s = stats[a.id];
            const done = isLearned(s);
            const st = done ? 'Mastered' : s ? 'In Progress' : 'Not Started';
            const badgeIcon: Icon = done
              ? 'checkmark-circle'
              : s
              ? 'pencil'
              : 'lock-closed';
            const badgeBg = done ? '#DCFCE7' : s ? '#FEF3C7' : '#F1F5F9';
            const badgeColor = done ? '#15803D' : s ? '#B45309' : '#64748B';

            return (
              <Card
                key={a.id}
                onPress={() =>
                  router.push({ pathname: '/learn', params: { id: a.id } })
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderRadius: radius.card,
                  backgroundColor: colors.white,
                  borderColor: done ? '#BBF7D0' : '#E2E8F0',
                  borderWidth: 2,
                  borderBottomWidth: 3.5,
                  borderBottomColor: done ? '#86EFAC' : '#CBD5E1',
                }}
              >
                {/* Animal Thumbnail in styled circle */}
                <View
                  style={{
                    width: scale(52),
                    height: scale(52),
                    borderRadius: scale(26),
                    backgroundColor: done ? '#DCFCE7' : '#F8FAFC',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: done ? '#BBF7D0' : '#E2E8F0',
                    shadowColor: done ? '#16A34A' : '#64748B',
                    shadowOpacity: 0.12,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                >
                  <AnimalImg animal={a} size={scale(44)} dim={!done && !s} />
                </View>

                {/* Animal Name & Status Badge */}
                <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
                  <Text
                    style={{
                      ...typography.body,
                      fontWeight: '900',
                      color: '#1E293B',
                      fontSize: 16,
                    }}
                  >
                    {a.name}
                  </Text>
                  <View
                    style={{
                      backgroundColor: badgeBg,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 8,
                      paddingVertical: 2.5,
                      borderRadius: radius.pill,
                      marginTop: 3,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      borderWidth: 1,
                      borderColor: done ? '#86EFAC' : '#E2E8F0',
                    }}
                  >
                    <Ionicons name={badgeIcon} size={12} color={badgeColor} />
                    <Text
                      style={{
                        ...typography.micro,
                        color: badgeColor,
                        fontWeight: '900',
                        fontSize: 11,
                      }}
                    >
                      {st}
                    </Text>
                  </View>
                </View>

                {/* Score & Play Button Indicator */}
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
                  <View
                    style={{
                      backgroundColor: '#F8FAFC',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: radius.pill,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                    }}
                  >
                    <Text
                      style={{
                        ...typography.micro,
                        color: '#475569',
                        fontWeight: '800',
                      }}
                    >
                      {s
                        ? s.attempts
                          ? `${s.correct}/${s.attempts} correct`
                          : '0 tries'
                        : '0 tries'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text
                      style={{
                        ...typography.micro,
                        color: '#2563EB',
                        fontWeight: '900',
                      }}
                    >
                      Play
                    </Text>
                    <Ionicons name="chevron-forward" size={13} color="#2563EB" />
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </Scene>
  );
}
