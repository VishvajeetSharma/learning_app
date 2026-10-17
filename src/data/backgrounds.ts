import type { ImageSourcePropType } from 'react-native';

/**
 * ASSET SLOTS — fill these in once the 3D art exists. Until then every screen falls back to the built-in
 * sky-and-foliage scene in <Scene>. Drop files in assets/backgrounds/ (WebP recommended, ~1080x2160) and uncomment.
 * Backgrounds must NOT contain baked-in buttons/headings.
 */
export type BgKey = 'splash' | 'home' | 'animals' | 'learning' | 'tracing' | 'writing' | 'success' | 'wrong' | 'nextAnimal' | 'review';

export const BACKGROUNDS: Partial<Record<BgKey, ImageSourcePropType>> = {
  // splash: require('../../assets/backgrounds/splash_jungle.webp'),
  // home: require('../../assets/backgrounds/home_jungle.webp'),
  // animals: require('../../assets/backgrounds/animals_jungle.webp'),
  // learning: require('../../assets/backgrounds/learning_jungle.webp'),
  // tracing: require('../../assets/backgrounds/tracing_jungle.webp'),
  // writing: require('../../assets/backgrounds/writing_jungle.webp'),
  // success: require('../../assets/backgrounds/success_jungle.webp'),
  // wrong: require('../../assets/backgrounds/wrong_jungle.webp'),
  // nextAnimal: require('../../assets/backgrounds/next_animal_jungle.webp'),
  // review: require('../../assets/backgrounds/review_jungle.webp'),
};

/** Overlay / branding slots (transparent PNG or WebP). */
export const DECOR: {
  logo?: number; woodBoard?: number; tracingFinger?: number;
  stars?: number; confetti?: number; categories?: Partial<Record<string, number>>;
} = {
  // logo: require('../../assets/branding/little_learners_logo.png'),
  // woodBoard: require('../../assets/decorations/wooden_board.png'),
  // tracingFinger: require('../../assets/decorations/tracing_finger.png'),
  // stars: require('../../assets/decorations/stars.png'),
  // confetti: require('../../assets/decorations/confetti.png'),
  // categories: { fruits: require('../../assets/categories/fruits.png'), ... },
};
