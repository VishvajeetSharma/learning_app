import type { ImageSourcePropType } from 'react-native';

export type BgKey =
  | 'splash'
  | 'home'
  | 'animals'
  | 'learning'
  | 'tracing'
  | 'writing'
  | 'success'
  | 'wrong'
  | 'nextAnimal'
  | 'review';

export const BACKGROUNDS: Partial<Record<BgKey, ImageSourcePropType>> = {
  splash: require('../../assets/backgrounds/splash_jungle.jpg'),
  home: require('../../assets/backgrounds/jungle_bg.jpg'),
  animals: require('../../assets/backgrounds/jungle_bg.jpg'),
  learning: require('../../assets/backgrounds/jungle_bg.jpg'),
  tracing: require('../../assets/backgrounds/jungle_bg.jpg'),
  writing: require('../../assets/backgrounds/jungle_bg.jpg'),
  success: require('../../assets/backgrounds/jungle_bg.jpg'),
  wrong: require('../../assets/backgrounds/jungle_bg.jpg'),
  nextAnimal: require('../../assets/backgrounds/jungle_bg.jpg'),
  review: require('../../assets/backgrounds/jungle_bg.jpg'),
};

export const DECOR: {
  logo?: ImageSourcePropType;
  woodBoard?: ImageSourcePropType;
  tracingFinger?: ImageSourcePropType;
  stars?: ImageSourcePropType;
  confetti?: ImageSourcePropType;
  categories?: Partial<Record<string, ImageSourcePropType>>;
} = {
  logo: require('../../assets/branding/little_learners_logo.png'),
  woodBoard: require('../../assets/decorations/wooden_board.png'),
};
