import React from "react";
import { DrawerNavigator } from "react-navigation";

import Stack from "./Stack";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawerContentComponent from "./CustomDrawerContentComponent";
import GeneralSettings from "../screens/GeneralSettings";
import BookmarkScreen from "../screens/BookmarkScreen";
import NavigationProvider from "../containers/NavigationProvider";

const CustomDrawerContextDelegate = props => {
  let { navigation, screenProps } = props;
  return (
    <NavigationProvider navigation={navigation} screenProps={screenProps}>
      <CustomDrawerContentComponent />
    </NavigationProvider>
  );
};

const Drawer = DrawerNavigator(
  {
    Route: { screen: Stack },
    bookmark: { screen: BookmarkScreen },
    generalSound: {
      screen: GeneralSettings
    },
    setting: { screen: SettingsScreen }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    contentComponent: CustomDrawerContextDelegate
  }
);

export default Drawer;
