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

/** Glossy 3D-button palettes: face colour, darker bottom "edge", label colour. */
export const buttons = {
  blue: { face: '#2B86FF', edge: '#1659C7', text: colors.white },
  green: { face: '#28C76F', edge: '#168A48', text: colors.white },
  red: { face: '#FF4757', edge: '#C41D2D', text: colors.white },
  orange: { face: '#FF921F', edge: '#C76300', text: colors.white },
  yellow: { face: '#FFC800', edge: '#C79000', text: colors.ink },
  purple: { face: '#9B51E0', edge: '#6B25B8', text: colors.white },
  soft: { face: colors.blueSoft, edge: colors.blueEdge, text: colors.blueDark },
  grey: { face: colors.grey, edge: colors.greyEdge, text: colors.muted },
  white: { face: colors.white, edge: colors.border, text: colors.ink },
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
