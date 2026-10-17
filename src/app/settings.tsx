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
    iconBg: string,
    iconColor: string,
    onPress?: () => void,
    textColor: string = '#1E293B',
    isLast: boolean = false
  ) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderColor: '#F1F5F9',
        backgroundColor: pressed ? '#F8FAFC' : colors.white,
      })}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: iconBg,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          borderColor: colors.white,
          ...shadows.subtle,
        }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text
        style={{
          ...typography.body,
          fontWeight: '800',
          color: textColor,
          flex: 1,
          marginLeft: 14,
          fontSize: 15.5,
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
      trackColor={{ true: '#10B981', false: '#E2E8F0' }}
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
          borderRadius: radius.card,
          overflow: 'hidden',
          borderWidth: 2,
          borderBottomWidth: 4,
          borderColor: '#E2E8F0',
          borderBottomColor: '#CBD5E1',
          ...shadows.card,
        }}
      >
        {row('volume-high', 'Sound Effects', sw('sound'), '#FFEDD5', '#EA580C')}
        {row('megaphone', 'Voice Pronunciation', sw('voice'), '#DCFCE7', '#16A34A')}
        {row('musical-notes', 'Background Music', sw('music'), '#F3E8FF', '#9333EA')}
        {row(
          'trophy',
          'View Progress',
          chev,
          '#FEF9C3',
          '#CA8A04',
          () => router.push('/progress')
        )}
        {row(
          'refresh-circle',
          'Reset Progress',
          chev,
          '#FFE4E6',
          '#E11D48',
          () => setAsk(true),
          '#E11D48'
        )}
        {row(
          'information-circle',
          'About App',
          chev,
          '#E0F2FE',
          '#0284C7',
          () =>
            Alert.alert(
              'Little Learners',
              'Play • Learn • Grow\nVersion 1.0.0\nSafe, fun & ad-free.'
            ),
          '#1E293B',
          true
        )}
      </View>

      <View style={{ flex: 1 }} />

      {/* Screen 12: Bottom Reset Confirmation Modal */}
      {ask && (
        <View
          style={{
            backgroundColor: '#FFF1F2',
            borderRadius: radius.card,
            borderWidth: 2.5,
            borderBottomWidth: 4.5,
            borderColor: '#FECDD3',
            borderBottomColor: '#FDA4AF',
            padding: 20,
            alignItems: 'center',
            marginBottom: 16,
            ...shadows.card,
          }}
        >
          {/* Red exclamation mark in circle */}
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#F43F5E',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              borderWidth: 2.5,
              borderColor: colors.white,
              shadowColor: '#F43F5E',
              shadowOpacity: 0.35,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
            }}
          >
            <Ionicons name="alert" size={28} color={colors.white} />
          </View>

          <Text
            style={{
              ...typography.title,
              color: '#BE123C',
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
              color: '#475569',
              fontSize: 13,
              marginBottom: 16,
              paddingHorizontal: 8,
              lineHeight: 18,
            }}
          >
            This will clear all your learning progress.{'\n'}This action cannot be undone.
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <Btn
              label="Cancel"
              kind="white"
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
