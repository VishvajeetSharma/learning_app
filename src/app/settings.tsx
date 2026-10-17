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
  const st = useStore(); const [ask, setAsk] = useState(false);
  const row = (icon: Icon, label: string, right: React.ReactNode, onPress?: () => void, color: string = colors.ink) => (
    <Pressable onPress={onPress} disabled={!onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 14, borderBottomWidth: 1, borderColor: colors.border }}>
      <Ionicons name={icon} size={22} color={color} /><Text style={{ ...typography.body, fontWeight: '700', color, flex: 1, marginLeft: 12 }}>{label}</Text>{right}
    </Pressable>);
  const sw = (k: 'sound' | 'voice' | 'music') => <Switch value={st[k]} onValueChange={(v) => st.set(k, v)} trackColor={{ true: colors.green, false: colors.track }} thumbColor={colors.white} />;
  const chev = <Ionicons name="chevron-forward" size={18} color={colors.muted} />;
  return (
    <Scene top={colors.settingsBg} bottom={colors.settingsBgBottom} foliage={false}>
      <Header title="Settings" home={false} />
      <View style={{ backgroundColor: colors.white, borderRadius: radius.lg, overflow: 'hidden', ...shadows.card }}>
        {row('volume-high', 'Sound Effects', sw('sound'))}
        {row('megaphone', 'Voice Pronunciation', sw('voice'))}
        {row('musical-notes', 'Background Music', sw('music'))}
        {row('trophy', 'View Progress', chev, () => router.push('/progress'))}
        {row('refresh-circle', 'Reset Progress', chev, () => setAsk(true), colors.red)}
        {row('information-circle', 'About App', chev, () => Alert.alert('Little Learners', 'Play • Learn • Grow\nVersion 1.0.0\nWorks fully offline.'))}
      </View>
      {ask && (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: colors.overlay, justifyContent: 'flex-end', padding: 12 }}>
          <View style={{ backgroundColor: colors.pinkSoft, borderRadius: radius.xl, borderWidth: 3, borderColor: colors.red, padding: 16, alignItems: 'center', marginBottom: 24 }}>
            <Ionicons name="alert-circle" size={44} color={colors.red} />
            <Text style={{ ...typography.title, color: colors.red, marginVertical: 4 }}>Reset Progress?</Text>
            <Text style={{ ...typography.small, textAlign: 'center', color: colors.ink, marginBottom: 14 }}>This will clear all your learning progress.{'\n'}This action cannot be undone.</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Btn label="Cancel" kind="soft" onPress={() => setAsk(false)} style={{ flex: 1 }} small />
              <Btn label="Yes, Reset" kind="red" onPress={() => { st.reset(); setAsk(false); }} style={{ flex: 1 }} small />
            </View>
          </View>
        </View>)}
    </Scene>
  );
}
