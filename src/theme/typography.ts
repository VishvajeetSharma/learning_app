/**
 * Set `display` to a bundled rounded font (e.g. Fredoka via @expo-google-fonts/fredoka, loaded with expo-font)
 * to match the reference exactly. Left undefined -> platform default, so nothing breaks offline.
 */
export const fontFamily: { display?: string } = { display: undefined };
const f = fontFamily.display ? { fontFamily: fontFamily.display } : {};
export const typography = {
  hero: { ...f, fontSize: 44, fontWeight: '900' as const },
  display: { ...f, fontSize: 38, fontWeight: '900' as const },
  title: { ...f, fontSize: 22, fontWeight: '800' as const },
  heading: { ...f, fontSize: 20, fontWeight: '800' as const },
  body: { ...f, fontSize: 14, fontWeight: '600' as const },
  small: { ...f, fontSize: 11, fontWeight: '600' as const },
  button: { ...f, fontSize: 18, fontWeight: '800' as const },
};
