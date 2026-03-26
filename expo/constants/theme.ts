import { Platform } from 'react-native';

export const fonts = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    web: 'Georgia, "Times New Roman", serif',
  }) as string,
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    web: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  }) as string,
  sansMedium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    web: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  }) as string,
  sansLight: Platform.select({
    ios: 'System',
    android: 'sans-serif-light',
    web: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  }) as string,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
};
