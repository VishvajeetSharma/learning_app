/** Single source of truth for every colour in the app. No inline hex values elsewhere. */
export const colors = {
  // sky / scene
  skyTop: '#8FD3F4', skyBottom: '#E8F8D8', grass: '#7BC74D', leaf: '#3DAE4B', leafDark: '#23813A', leafLight: '#7ED957',
  cloud: '#FFFFFF', cream: '#FFF8E1', screenCream: '#FFFBEF', white: '#FFFFFF',
  // text
  ink: '#2B2B3A', muted: '#9AA0AE', navy: '#243B7A', title: '#1D3C8F',
  // brand
  blue: '#1E7BF0', blueDark: '#1458C4', blueSoft: '#E4EEFF', blueEdge: '#C7D8F5',
  green: '#27A844', greenDark: '#1B7F32', greenBg: '#B8F0A0', greenLight: '#E4FAD0', greenSky: '#9BE37B',
  orange: '#FF9A1F', orangeDark: '#C46E00', orangeText: '#FF6A1A',
  yellow: '#FFD23F', yellowSoft: '#FFF0B3', star: '#FFC107',
  red: '#E53935', redDark: '#B71C1C', pinkBg: '#FFD3DC', pinkSoft: '#FFE9EE', pinkHot: '#F0384A',
  purple: '#8E44AD', coral: '#FF5A3C',
  wood: '#B9803F', woodDark: '#6B3E12', woodLight: '#D9A760', woodGrain: '#9C6B2E',
  lion: '#F4A21D', border: '#E6E9F2', track: '#E1E6F0', grey: '#E8EDF7', greyEdge: '#C9D2E6',
  // tinted screens
  settingsBg: '#E8ECF4', settingsBgBottom: '#F5F7FB', animalsSky: '#CDEBFF', animalsBottom: '#F4FBE9',
  writeSky: '#FFF3B0', homeSky: '#FFF1C9', soonCard: '#FFF1E4', correctTop: '#9BE37B',
  dotGuide: '#B8C4E0', gloss: 'rgba(255,255,255,0.30)', scrim: 'rgba(255,255,255,0.80)', overlay: 'rgba(0,0,0,0.35)',
  ink1: '#E53935', ink2: '#1E7BF0', ink3: '#27A844', ink4: '#FF9A1F',
};

/** Glossy-button palettes: face colour, darker bottom "edge", label colour. */
export const buttons = {
  blue: { face: '#2F8BFF', edge: colors.blueDark, text: colors.white },
  green: { face: '#2DB84B', edge: colors.greenDark, text: colors.white },
  red: { face: colors.pinkHot, edge: colors.redDark, text: colors.white },
  orange: { face: '#FFA21F', edge: colors.orangeDark, text: colors.white },
  soft: { face: colors.blueSoft, edge: colors.blueEdge, text: colors.blue },
  grey: { face: colors.grey, edge: colors.greyEdge, text: colors.muted },
  white: { face: colors.white, edge: colors.border, text: colors.ink },
} as const;
export type ButtonKind = keyof typeof buttons;

/** Pastel tints for the category cards on Home. */
export const categoryTints = ['#FFF0B3', '#FFE3E3', '#E8F7D8', '#FFE9D6', '#FDE3F3', '#E3F0FF'];
