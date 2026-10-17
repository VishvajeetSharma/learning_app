export const fontFamily: { display?: string } = { display: undefined };
const f = fontFamily.display ? { fontFamily: fontFamily.display } : {};
export const typography = {
  hero: { ...f, fontSize: 40, fontWeight: '900' as const, letterSpacing: -0.5 },
  display: { ...f, fontSize: 34, fontWeight: '900' as const, letterSpacing: -0.5 },
  title: { ...f, fontSize: 22, fontWeight: '800' as const, letterSpacing: -0.2 },
  heading: { ...f, fontSize: 18, fontWeight: '800' as const },
  subheading: { ...f, fontSize: 16, fontWeight: '700' as const },
  body: { ...f, fontSize: 14, fontWeight: '600' as const },
  small: { ...f, fontSize: 12, fontWeight: '700' as const },
  micro: { ...f, fontSize: 10, fontWeight: '800' as const },
  button: { ...f, fontSize: 18, fontWeight: '900' as const, letterSpacing: 0.3 },
};

