const lightPalette = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  disabled: 'rgba(0, 0, 0, 0.38)',
  placeholder: 'rgba(0, 0, 0, 0.54)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#f50057',
};

const darkPalette = {
  primary: '#BB86FC',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#CF6679',
  text: '#FFFFFF',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  disabled: 'rgba(255, 255, 255, 0.38)',
  placeholder: 'rgba(255, 255, 255, 0.54)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#ff80ab',
};

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

const typeSizes = {
  caption: 12,
  button: 14,
  body: 16,
  subhead: 14,
  title: 20,
  headline: 24,
};

const typeWeights = {
  regular: 'normal',
  medium: '500',
  bold: 'bold',
};

const fonts = {
  thin: 'Montserrat-Thin',
  light: 'Montserrat-Light',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semiBold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
  extraBold: 'Montserrat-ExtraBold',
  black: 'Montserrat-Black',
};

export const lightTheme = {
  colors: lightPalette,
  spacing,
  typography: {
    sizes: typeSizes,
    weights: typeWeights,
    fonts,
  },
  dark: false,
};

export const darkTheme = {
  colors: darkPalette,
  spacing,
  typography: {
    sizes: typeSizes,
    weights: typeWeights,
    fonts,
  },
  dark: true,
};

const defaultTheme = lightTheme;
export default defaultTheme;
