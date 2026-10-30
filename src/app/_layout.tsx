import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from '@/lib/store';

export default function Layout() {
  // Bundled rounded display font (Fredoka). If loading ever fails we fall back to the system font.
  const [fontsLoaded, fontError] = useFonts({
    Fredoka_400Regular: require('../../assets/fonts/Fredoka_400Regular.ttf'),
    Fredoka_500Medium: require('../../assets/fonts/Fredoka_500Medium.ttf'),
    Fredoka_600SemiBold: require('../../assets/fonts/Fredoka_600SemiBold.ttf'),
    Fredoka_700Bold: require('../../assets/fonts/Fredoka_700Bold.ttf'),
  });
  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 280,
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="index" options={{ animation: 'fade' }} />
            <Stack.Screen name="home" options={{ animation: 'fade' }} />
            <Stack.Screen name="animals" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="learn" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="trace" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="write" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen
              name="result"
              options={{ animation: 'fade_from_bottom', animationDuration: 320 }}
            />
            <Stack.Screen name="next" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen
              name="progress"
              options={{ animation: 'slide_from_bottom', animationDuration: 300 }}
            />
            <Stack.Screen name="review" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen
              name="settings"
              options={{ animation: 'slide_from_bottom', animationDuration: 300 }}
            />
          </Stack>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
