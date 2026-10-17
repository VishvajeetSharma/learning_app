import { Dimensions } from 'react-native';
export const REF_WIDTH = 390;
export const scale = (n: number) => Math.round((Math.min(Dimensions.get('window').width, 480) / REF_WIDTH) * n);
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
