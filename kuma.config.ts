import {createTheme} from "@kuma-ui/core"

const theme = createTheme({
  colors: {
    primary: "#00DFC0",
    base: "#f5f5f5",
    border: "#C7C6C6",
    blue: {
      400: "#4299E1"
    },
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  sizes: {
    full: "100%",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
