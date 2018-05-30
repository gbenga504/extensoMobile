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
    foregroundColor: "#fff",
    backgroundColor: "#fff",
    seperatorColor: "#e0e0e0",
    errorTextAndIcons: "#bdbdbd"
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
    foregroundColor: "#37474f",
    backgroundColor: "#263238",
    seperatorColor: "#14171a",
    errorTextAndIcons: "#1da1f2"
  }
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});
