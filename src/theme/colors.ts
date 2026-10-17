/** Single source of truth for every colour in the app. No inline hex values elsewhere. */
export const colors = {
  // sky / scene (warm, dreamy, baby-friendly tones)
  skyTop: '#4FACFE',
  skyMiddle: '#00F2FE',
  skyBottom: '#FFFDF5',
  grass: '#56CC42',
  grassLight: '#8CE84A',
  grassDark: '#3DA826',
  leaf: '#2FB344',
  leafDark: '#1C752E',
  leafLight: '#99F06A',
  cloud: '#FFFFFF',
  cloudSoft: 'rgba(255, 255, 255, 0.92)',
  sun: '#FFD200',
  sunGlow: '#FFF275',
  cream: '#FFF9EB',
  screenCream: '#FFFDF5',
  white: '#FFFFFF',

  // text (friendly, high contrast, soft navy/ink)
  ink: '#1E293B',
  inkLight: '#475569',
  muted: '#8593A6',
  navy: '#1A365D',
  title: '#0F294D',

  // brand & candy accents
  blue: '#2B86FF',
  blueDark: '#1659C7',
  blueSoft: '#EBF4FF',
  blueEdge: '#BED6FD',
  blueGlow: '#80B6FF',

  green: '#28C76F',
  greenDark: '#148C48',
  greenBg: '#DCFCE7',
  greenLight: '#E8FCE2',
  greenSky: '#8EE571',

  orange: '#FF8A00',
  orangeDark: '#D46300',
  orangeText: '#E65100',
  orangeSoft: '#FFF3E0',

  yellow: '#FFC107',
  yellowDark: '#C79000',
  yellowSoft: '#FEF9C3',
  yellowGlow: '#FFE566',
  star: '#FFB300',

  red: '#FF4757',
  redDark: '#C81E2E',
  pinkBg: '#FCE7F3',
  pinkSoft: '#FFF0F5',
  pinkHot: '#FF2E63',
  pinkBubble: '#FFAEC5',

  purple: '#9333EA',
  purpleDark: '#6B21A8',
  purpleSoft: '#F3E8FF',
  purpleEdge: '#D8B4FE',

  coral: '#FF6B6B',
  teal: '#14B8A6',

  // wooden sign
  wood: '#B87C3C',
  woodDark: '#5C340E',
  woodLight: '#E8B676',
  woodGrain: '#96632A',
  woodHighlight: '#FFF0D4',

  lion: '#F59E0B',
  border: '#E2E8F0',
  borderSoft: '#F1F5F9',
  borderLight: '#EDF2F7',
  track: '#E2E8F4',
  grey: '#F1F5F9',
  greyEdge: '#CBD5E1',

  // tinted screen scenes
  settingsBg: '#EFF4FA',
  settingsBgBottom: '#F8FAFC',
  animalsSky: '#70D6FF',
  animalsBottom: '#F2FFE9',
  writeSky: '#FFF5B8',
  homeSky: '#75CEFF',
  soonCard: '#FFF8F0',
  correctTop: '#84E296',

  // overlays & effects
  dotGuide: '#94A3B8',
  gloss: 'rgba(255, 255, 255, 0.40)',
  glossSubtle: 'rgba(255, 255, 255, 0.22)',
  scrim: 'rgba(255, 255, 255, 0.88)',
  scrimLight: 'rgba(255, 255, 255, 0.75)',
  scrimDark: 'rgba(255, 255, 255, 0.96)',
  overlay: 'rgba(15, 23, 42, 0.45)',

  // colorful writing inks
  ink1: '#FF3B30',
  ink2: '#007AFF',
  ink3: '#34C759',
  ink4: '#FF9500',
  ink5: '#AF52DE',
};

/** Glossy 3D-button palettes: face colour, darker bottom "edge", highlight top, label colour. */
export const buttons = {
  blue: { face: '#3B82F6', edge: '#1D4ED8', highlight: '#93C5FD', text: colors.white },
  green: { face: '#10B981', edge: '#047857', highlight: '#6EE7B7', text: colors.white },
  red: { face: '#F43F5E', edge: '#BE123C', highlight: '#FDA4AF', text: colors.white },
  orange: { face: '#F97316', edge: '#C2410C', highlight: '#FDBA74', text: colors.white },
  yellow: { face: '#FBBF24', edge: '#B45309', highlight: '#FDE68A', text: '#5B3700' },
  purple: { face: '#A855F7', edge: '#7E22CE', highlight: '#D8B4FE', text: colors.white },
  soft: { face: '#E0F2FE', edge: '#7DD3FC', highlight: '#FFFFFF', text: '#0369A1' },
  grey: { face: '#F1F5F9', edge: '#CBD5E1', highlight: '#FFFFFF', text: '#64748B' },
  white: { face: '#FFFFFF', edge: '#CBD5E1', highlight: '#FFFFFF', text: '#1E293B' },
} as const;
export type ButtonKind = keyof typeof buttons;

/** Soft pastel tints for category and animal cards with matching border and accent tones. */
export const categoryTints = [
  { bg: '#FEF9C3', border: '#FDE047', accent: '#CA8A04', name: 'Animals' },
  { bg: '#FFE4E6', border: '#FECDD3', accent: '#E11D48', name: 'Fruits' },
  { bg: '#DCFCE7', border: '#BBF7D0', accent: '#16A34A', name: 'Vegetables' },
  { bg: '#FFEDD5', border: '#FED7AA', accent: '#EA580C', name: 'Body Parts' },
  { bg: '#F3E8FF', border: '#E9D5FF', accent: '#9333EA', name: 'Flowers' },
  { bg: '#E0F2FE', border: '#BAE6FD', accent: '#0284C7', name: 'Numbers' },
];
