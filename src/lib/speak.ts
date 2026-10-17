import * as Speech from 'expo-speech';
/** On-device text-to-speech (works offline when the device has an English voice installed). Swap for bundled audio when recorded. */
export const speak = (t: string, enabled = true) => {
  if (!enabled) return;
  Speech.stop();
  Speech.speak(t, { language: 'en-US', rate: 0.8, pitch: 1.1 });
};
