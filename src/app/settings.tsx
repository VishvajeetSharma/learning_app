import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Switch, Text, View } from 'react-native';
import { useStore } from '@/lib/store';
import { ButtonKind, buttons, colors, ui } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { typography } from '@/theme/typography';
import { Btn, Gradient, Header, Scene } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

export default function Settings() {
  const st = useStore();
  const [ask, setAsk] = useState(false);

  const row = (
    icon: Icon,
    label: string,
    right: React.ReactNode,
    onPress?: () => void,
    kind: ButtonKind = 'blue',
    danger = false,
    last = false
  ) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 72,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: last ? 0 : 1.5,
        borderColor: '#E6EEF8',
        backgroundColor: pressed ? '#F1F7FF' : 'transparent',
      })}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 15,
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
        <Ionicons name={icon} size={24} color={colors.white} />
      </View>
      <Text
        style={{
          ...typography.bodyStrong,
          fontSize: 18,
          color: danger ? colors.redDark : colors.ink,
          flex: 1,
          marginLeft: 14,
        }}
      >
        {label}
      </Text>
      {right}
    </Pressable>
  );

  const sw = (k: 'sound' | 'voice' | 'music') => (
    <Switch
      value={st[k]}
      onValueChange={(v) => st.set(k, v)}
      trackColor={{ true: colors.green, false: '#D3DEEB' }}
      thumbColor={colors.white}
      style={{ transform: [{ scale: 1.1 }] }}
    />
  );

  const chev = <Ionicons name="chevron-forward" size={22} color="#94A3B8" />;

  return (
    <Scene bg="animals">
      <Header title="Settings" home={false} back={true} />

      {/* Grouped settings card */}
      <View
        style={{
          backgroundColor: ui.panel,
          borderRadius: radius.xl,
          overflow: 'hidden',
          borderWidth: 3,
          borderColor: colors.white,
          ...shadows.soft,
        }}
      >
        {row('volume-high', 'Sound Effects', sw('sound'), undefined, 'blue')}
        {row('megaphone', 'Voice Pronunciation', sw('voice'), undefined, 'green')}
        {row('musical-notes', 'Background Music', sw('music'), undefined, 'purple')}
        {row('trophy', 'View Progress', chev, () => router.push('/progress'), 'yellow')}
        {row('refresh-circle', 'Reset Progress', chev, () => setAsk(true), 'red', true)}
        {row(
          'information-circle',
          'About App',
          chev,
          () =>
            Alert.alert(
              'Little Learners',
              'Play • Learn • Grow\nVersion 1.0.0\nSafe & ad-free.'
            ),
          'orange',
          false,
          true
        )}
      </View>

      <View style={{ flex: 1 }} />

      {/* Reset confirmation (visual dim behind it never blocks touches) */}
      {ask && (
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: -300, bottom: -300, left: -40, right: -40, backgroundColor: colors.overlay }}
        />
      )}
      {ask && (
        <View
          style={{
            backgroundColor: ui.dangerBg,
            borderRadius: radius.xl,
            borderWidth: 3,
            borderColor: ui.dangerEdge,
            padding: 20,
            alignItems: 'center',
            marginBottom: 16,
            ...shadows.lift,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              overflow: 'hidden',
              backgroundColor: colors.red,
              borderWidth: 3,
              borderColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
              ...shadows.button,
            }}
          >
            <Gradient stops={[buttons.red.top, colors.red]} />
            <Ionicons name="warning" size={30} color={colors.white} />
          </View>

          <Text style={{ ...typography.title, color: colors.redDark, fontSize: 24, marginBottom: 4 }}>
            Reset Progress?
          </Text>
          <Text
            style={{
              ...typography.body,
              textAlign: 'center',
              color: colors.ink,
              fontSize: 15,
              marginBottom: 16,
              paddingHorizontal: 8,
            }}
          >
            This will clear all your learning progress.{'\n'}This action cannot be undone.
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <Btn label="Cancel" kind="soft" onPress={() => setAsk(false)} style={{ flex: 1 }} small />
            <Btn
              label="Yes, Reset"
              kind="red"
              onPress={() => {
                st.reset();
                setAsk(false);
              }}
              style={{ flex: 1 }}
              small
            />
          </View>
        </View>
      )}
    </Scene>
  );
}
