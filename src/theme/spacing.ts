import { Dimensions } from 'react-native';
export const REF_WIDTH = 390;
export const REF_HEIGHT = 844;
export const scale = (n: number) => Math.round((Math.min(Dimensions.get('window').width, 480) / REF_WIDTH) * n);
/** Height-aware scale (clamped) so layouts also fit short phones and stay balanced on tall ones. */
export const vscale = (n: number) =>
  Math.round(Math.min(Math.max(Dimensions.get('window').height / REF_HEIGHT, 0.78), 1.15) * n);
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
/** Minimum touch target for little fingers. */
export const TOUCH = 56;
