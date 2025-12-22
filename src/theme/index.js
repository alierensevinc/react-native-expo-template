const palette = {
  primary: "#6200EE",
  secondary: "#03DAC6",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  error: "#B00020",
  text: "#000000",
  onBackground: "#000000",
  onSurface: "#000000",
  disabled: "rgba(0, 0, 0, 0.38)",
  placeholder: "rgba(0, 0, 0, 0.54)",
  backdrop: "rgba(0, 0, 0, 0.5)",
  notification: "#f50057",
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
  regular: "normal",
  medium: "500",
  bold: "bold",
};

const theme = {
  colors: palette,
  spacing,
  typography: {
    sizes: typeSizes,
    weights: typeWeights,
  },
  // İleride dark mode için buraya logic eklenebilir
};

export default theme;
