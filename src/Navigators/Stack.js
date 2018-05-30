import React from "react";
import { Dimensions } from "react-native";
import { StackNavigator } from "react-navigation";

import CustomTab from "./CustomTab";
import ContentScreen from "../screens/ContentScreen";
import SearchScreen from "../screens/SearchScreen";
import AppBrowser from "../components/AppBrowser";

const customTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [
    Dimensions.get("window").width,
    0,
    -Dimensions.get("window").width
  ];

  const translateX = position.interpolate({
    inputRange,
    outputRange
  });

  return {
    transform: [{ translateX }]
  };
};

let TransitionConfiguration = () => {
  return {
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      return customTransition(index, position);
    }
  };
};

const Stack = StackNavigator(
  {
    inception: {
      screen: CustomTab
    },
    search: {
      screen: SearchScreen
    },
    browser: {
      screen: AppBrowser
    },
    content: { screen: ContentScreen }
  },
  {
    navigationOptions: { header: null },
    transitionConfig: TransitionConfiguration
  }
);

export default Stack;
