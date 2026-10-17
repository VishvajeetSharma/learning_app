import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Switch, Text, View } from 'react-native';
import { useStore } from '@/lib/store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { typography } from '@/theme/typography';
import { Btn, Header, Scene } from '@/ui/kit';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

export default function Settings() {
  const st = useStore();
  const [ask, setAsk] = useState(false);

  const row = (
    icon: Icon,
    label: string,
    right: React.ReactNode,
    onPress?: () => void,
    color: string = colors.ink
  ) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#EEF2F6',
      }}
    >
      <Ionicons name={icon} size={22} color={color} />
      <Text
        style={{
          ...typography.body,
          fontWeight: '700',
          color,
          flex: 1,
          marginLeft: 14,
          fontSize: 16,
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
      trackColor={{ true: '#28A745', false: '#D9E2EC' }}
      thumbColor={colors.white}
    />
  );

  const chev = <Ionicons name="chevron-forward" size={18} color="#94A3B8" />;

  return (
    <Scene bg="animals">
      {/* Screen 12: Header */}
      <Header title="Settings" home={false} back={true} />

      {/* Screen 12: Settings List Grouped Card */}
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: radius.xl,
          overflow: 'hidden',
          borderWidth: 1.5,
          borderColor: colors.border,
          ...shadows.card,
        }}
      >
        {row('volume-high-outline', 'Sound Effects', sw('sound'))}
        {row('megaphone-outline', 'Voice Pronunciation', sw('voice'))}
        {row('musical-notes-outline', 'Background Music', sw('music'))}
        {row('trophy-outline', 'View Progress', chev, () => router.push('/progress'))}
        {row('refresh-circle-outline', 'Reset Progress', chev, () => setAsk(true), '#E53935')}
        {row(
          'information-circle-outline',
          'About App',
          chev,
          () =>
            Alert.alert(
              'Little Learners',
              'Play • Learn • Grow\nVersion 1.0.0\nSafe & ad-free.'
            )
        )}
      </View>

      <View style={{ flex: 1 }} />

      {/* Screen 12: Bottom Reset Confirmation Modal */}
      {ask && (
        <View
          style={{
            backgroundColor: '#FFF2F4',
            borderRadius: radius.xl,
            borderWidth: 2,
            borderColor: '#FFCCD5',
            padding: 18,
            alignItems: 'center',
            marginBottom: 16,
            ...shadows.card,
          }}
        >
          {/* Red exclamation mark in circle */}
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: '#FF4757',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 28, color: colors.white, fontWeight: '900' }}>!</Text>
          </View>

          <Text
            style={{
              ...typography.title,
              color: '#FF4757',
              fontSize: 20,
              fontWeight: '900',
              marginBottom: 4,
            }}
          >
            Reset Progress?
          </Text>
          <Text
            style={{
              ...typography.body,
              textAlign: 'center',
              color: colors.ink,
              fontSize: 13,
              marginBottom: 16,
              paddingHorizontal: 8,
            }}
          >
            This will clear all your learning progress.{'\n'}This action cannot be undone.
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <Btn
              label="Cancel"
              kind="soft"
              onPress={() => setAsk(false)}
              style={{ flex: 1 }}
              small
            />
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
