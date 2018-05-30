import React from "react";

export const themes = {
  light: {
    tabIndicatorColor: "#1da1f2",
    tabPressColor: "#e0e0e0",
    iconActiveColor: "#1da1f2",
    iconUnactiveColor: "#37474f",
    textColor: "#14171a",
    statusBarColor: "#e0e0e0",
    statusBarStyle: "dark-content",
    imageBackgroundColor: "#aab8c2",
    loadedImageBackgroundColor: "transparent",
    foregroundColor: "#fff",
    backgroundColor: "#fff",
    seperatorColor: "#e0e0e0",
    errorTextAndIcons: "#bdbdbd",
    placeholderTextColor: "#37474f"
  },
  dark: {
    tabIndicatorColor: "#1da1f2",
    tabPressColor: "#263238",
    iconActiveColor: "#1da1f2",
    iconUnactiveColor: "#78909c",
    textColor: "#fff",
    statusBarColor: "#14171a",
    statusBarStyle: "light-content",
    imageBackgroundColor: "#455a64",
    loadedImageBackgroundColor: "transparent",
    foregroundColor: "#37474f",
    backgroundColor: "#263238",
    seperatorColor: "#14171a",
    errorTextAndIcons: "#1da1f2",
    placeholderTextColor: "#78909c"
  }
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});
