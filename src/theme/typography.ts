/**
 * Fredoka (rounded, friendly, OFL-licensed) is bundled in assets/fonts and loaded in src/app/_layout.tsx.
 * Each weight is a separate static face, so every style below keeps fontWeight '400' (never faux-bold the files).
 * If the fonts fail to load the platform default is used, so nothing breaks.
 */
export const font = {
  regular: 'Fredoka_400Regular',
  medium: 'Fredoka_500Medium',
  semi: 'Fredoka_600SemiBold',
  bold: 'Fredoka_700Bold',
};
export const fontFamily = { display: font.bold };

const w = { fontWeight: '400' as const };
export const typography = {
  hero: { fontFamily: font.bold, ...w, fontSize: 44 },
  display: { fontFamily: font.bold, ...w, fontSize: 38 },
  title: { fontFamily: font.bold, ...w, fontSize: 24 },
  heading: { fontFamily: font.semi, ...w, fontSize: 20 },
  body: { fontFamily: font.medium, ...w, fontSize: 16 },
  bodyStrong: { fontFamily: font.semi, ...w, fontSize: 16 },
  small: { fontFamily: font.medium, ...w, fontSize: 13 },
  caption: { fontFamily: font.medium, ...w, fontSize: 12 },
  button: { fontFamily: font.bold, ...w, fontSize: 20 },
};
