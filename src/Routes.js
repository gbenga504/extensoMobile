/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Platform } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ActionCreators } from "./actions";
import Drawer from "./Navigators/Drawer";
import ThemeProvider from "./containers/ThemeProvider";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => ({}), mapDispatchToProps)(props => (
  <ThemeProvider>
    <Drawer screenProps={props} />
  </ThemeProvider>
));
