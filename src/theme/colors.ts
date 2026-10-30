/** Single source of truth for every colour in the app. No inline hex values elsewhere. */
export const colors = {
  // sky / scene (warm, dreamy, baby-friendly tones)
  skyTop: '#64C4FF',
  skyMiddle: '#A6E3E9',
  skyBottom: '#FFF9E6',
  grass: '#72C736',
  grassLight: '#94E052',
  grassDark: '#4FA81E',
  leaf: '#38B54A',
  leafDark: '#1E7C33',
  leafLight: '#8CE460',
  cloud: '#FFFFFF',
  cloudSoft: 'rgba(255, 255, 255, 0.88)',
  sun: '#FFD93D',
  sunGlow: '#FFF099',
  cream: '#FFF8E7',
  screenCream: '#FFFDF5',
  white: '#FFFFFF',

  // text (friendly, high contrast, soft navy/ink)
  ink: '#232B38',
  muted: '#8E99AC',
  navy: '#1E3A8A',
  title: '#1B357A',

  // brand & candy accents
  blue: '#2B86FF',
  blueDark: '#175ED8',
  blueSoft: '#E8F2FF',
  blueEdge: '#BED6FD',
  blueGlow: '#80B6FF',

  green: '#28C76F',
  greenDark: '#158C4B',
  greenBg: '#C8F7B5',
  greenLight: '#E8FCE2',
  greenSky: '#8EE571',

  orange: '#FF8800',
  orangeDark: '#C75D00',
  orangeText: '#FF5E00',
  orangeSoft: '#FFF0E0',

  yellow: '#FFC800',
  yellowSoft: '#FFF6C2',
  yellowGlow: '#FFE978',
  star: '#FFB800',

  red: '#FF4757',
  redDark: '#C81E2E',
  pinkBg: '#FFDEE9',
  pinkSoft: '#FFF0F5',
  pinkHot: '#FF3366',
  pinkBubble: '#FFAEC5',

  purple: '#9B51E0',
  purpleDark: '#6C25B8',
  purpleSoft: '#F4EBFF',
  purpleEdge: '#D8BCFD',

  coral: '#FF6B6B',
  teal: '#20C997',

  // wooden sign
  wood: '#B87C3C',
  woodDark: '#663B12',
  woodLight: '#E2AE6D',
  woodGrain: '#96632A',
  woodHighlight: '#F3CF98',

  lion: '#F59E0B',
  border: '#E2E8F0',
  borderSoft: '#EEF2F8',
  track: '#E2E8F4',
  grey: '#EDF2F7',
  greyEdge: '#CBD5E1',

  // tinted screen scenes
  settingsBg: '#E9EEF8',
  settingsBgBottom: '#F8FAFC',
  animalsSky: '#70D6FF',
  animalsBottom: '#F2FFE9',
  writeSky: '#FFF5B8',
  homeSky: '#75CEFF',
  soonCard: '#FFF2E5',
  correctTop: '#84E296',

  // overlays & effects
  dotGuide: '#94A3B8',
  gloss: 'rgba(255, 255, 255, 0.45)',
  glossSubtle: 'rgba(255, 255, 255, 0.22)',
  scrim: 'rgba(255, 255, 255, 0.88)',
  scrimDark: 'rgba(255, 255, 255, 0.95)',
  overlay: 'rgba(20, 30, 55, 0.45)',

  // colorful writing inks
  ink1: '#FF3B30',
  ink2: '#007AFF',
  ink3: '#34C759',
  ink4: '#FF9500',
  ink5: '#AF52DE',
};

/** Glossy 3D-button palettes: gradient top, face colour, darker bottom "edge", label colour. */
export const buttons = {
  blue: { top: '#5CA8FF', face: '#2B86FF', edge: '#1659C7', text: colors.white },
  green: { top: '#5FE59B', face: '#22C468', edge: '#168A48', text: colors.white },
  red: { top: '#FF7C88', face: '#FF4757', edge: '#C41D2D', text: colors.white },
  orange: { top: '#FFB45E', face: '#FF8F1F', edge: '#C76300', text: colors.white },
  yellow: { top: '#FFE46B', face: '#FFC800', edge: '#C79000', text: colors.ink },
  purple: { top: '#BE8BF2', face: '#9B51E0', edge: '#6B25B8', text: colors.white },
  soft: { top: '#F5FAFF', face: colors.blueSoft, edge: colors.blueEdge, text: colors.blueDark },
  grey: { top: '#F8FAFC', face: colors.grey, edge: colors.greyEdge, text: '#64748B' },
  white: { top: '#FFFFFF', face: '#F4F7FC', edge: colors.border, text: colors.ink },
} as const;
export type ButtonKind = keyof typeof buttons;

/** Soft pastel tints for category and animal cards. */
export const categoryTints = [
  '#FFF4B8', // Animals (Sunny Yellow)
  '#FFDFDF', // Fruits (Strawberry Pink)
  '#E0F7D4', // Vegetables (Mint Green)
  '#FFE9D1', // Body Parts (Peach)
  '#F4E4FD', // Flowers (Soft Lavender)
  '#DDF1FF', // Numbers (Baby Blue)
];

/** Pastel "candy" tones for cards: gradient top/bottom, 3D edge, strong accent and label colour. */
export const tones = {
  white: { top: '#FFFFFF', bottom: '#F3F8FF', edge: '#D6E4F7', accent: '#2B86FF', label: colors.ink },
  yellow: { top: '#FFF9D6', bottom: '#FFE98A', edge: '#F2C94C', accent: '#F59E0B', label: '#5B3A00' },
  blue: { top: '#EAF5FF', bottom: '#BFE0FF', edge: '#8FC3F5', accent: '#2B86FF', label: '#12408F' },
  green: { top: '#EFFFE6', bottom: '#BDF0A0', edge: '#8BCF6A', accent: '#22A34F', label: '#14532D' },
  pink: { top: '#FFF0F5', bottom: '#FFC4D8', edge: '#F59BB8', accent: '#E11D74', label: '#7A1646' },
  purple: { top: '#F7EEFF', bottom: '#DCC2FF', edge: '#BC96F0', accent: '#7C3AED', label: '#4B1D8F' },
  orange: { top: '#FFF3E3', bottom: '#FFD2A1', edge: '#F5AE63', accent: '#EA6A0A', label: '#7A3A05' },
  mint: { top: '#E9FFF8', bottom: '#B5F0DE', edge: '#7FD9BE', accent: '#0E9F7E', label: '#0B5E4B' },
  locked: { top: '#F6F8FB', bottom: '#E3E9F1', edge: '#CBD5E1', accent: '#94A3B8', label: '#64748B' },
} as const;
export type Tone = keyof typeof tones;

/** Rotation used to give lists of animals a colourful, varied look. */
export const toneCycle: Tone[] = ['yellow', 'blue', 'green', 'pink', 'purple', 'orange', 'mint'];

/** Extra jungle-UI tokens. */
export const ui = {
  banner: '#FFFFFF',
  bannerEdge: '#CFE3FF',
  panel: 'rgba(255, 255, 255, 0.92)',
  panelEdge: 'rgba(255, 255, 255, 0.98)',
  scrimTop: 'rgba(8, 48, 34, 0.55)',
  textShadow: 'rgba(15, 30, 60, 0.28)',
  woodText: '#4A2805',
  woodTextHighlight: 'rgba(255, 236, 200, 0.85)',
  success: '#22C468',
  successDark: '#14803F',
  warning: '#FF8F1F',
  danger: '#FF4757',
  dangerBg: '#FFF1F3',
  dangerEdge: '#FFC9D2',
  paperLine: 'rgba(43, 134, 255, 0.22)',
  paperLineStrong: 'rgba(43, 134, 255, 0.35)',
  confetti: ['#FF4757', '#FFC800', '#28C76F', '#2B86FF', '#9B51E0', '#FF8F1F', '#FF6FA5'],
};
