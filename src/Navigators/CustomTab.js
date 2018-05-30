import React from "react";
import { StyleSheet } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import PropTypes from "prop-types";

import EducationScreen from "../screens/EducationScreen";
import OpportunitiesScreen from "../screens/OpportunitiesScreen";
import InformationScreen from "../screens/InformationScreen";
import CurrentPricesScreen from "../screens/CurrentPricesScreen";
import AppFab from "../components/AppFab";
import NavigationProvider from "../containers/NavigationProvider";
import AppHeader from "../components/AppHeader";
import Icon from "../components/Icon";
import Fonts from "../assets/Fonts";
import { ThemeContext } from "../context/ThemeContext";

export default class CustomTab extends React.PureComponent {
  state = {
    navigationOptions: {
      index: 0,
      routes: [{ key: "1" }, { key: "2" }, { key: "3" }, { key: "4" }]
    }
  };

  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static defaults = [
    "Education",
    "Information",
    "Opportunities",
    "Current Prices"
  ];

  handleIndexChange = index => {
    this.setState({
      navigationOptions: { ...this.state.navigationOptions, index }
    });
  };

  renderHeader = props => {
    return (
      <ThemeContext.Consumer>
        {({
          theme: {
            foregroundColor,
            seperatorColor,
            tabPressColor,
            tabIndicatorColor,
            iconActiveColor,
            iconUnactiveColor
          }
        }) => (
          <TabBar
            {...props}
            indicatorStyle={[
              styles.indicatorStyle,
              { backgroundColor: tabIndicatorColor }
            ]}
            style={[
              styles.tabStyle,
              {
                backgroundColor: foregroundColor,
                borderBottomColor: seperatorColor
              }
            ]}
            pressColor={tabPressColor}
            renderIcon={props =>
              this.renderIcon(props, iconActiveColor, iconUnactiveColor)
            }
          />
        )}
      </ThemeContext.Consumer>
    );
  };

  composeIconColor = (props, iconActiveColor, iconUnactiveColor) => {
    let { index, focused } = props,
      activeIconColor = null;

    switch (index) {
      case 0:
        activeIconColor = iconActiveColor;
        break;
      case 1:
        activeIconColor = iconActiveColor;
        break;
      case 2:
        activeIconColor = iconActiveColor;
        break;
      default:
        activeIconColor = iconActiveColor;
        break;
    }
    return focused
      ? { color: activeIconColor, fontSize: Fonts.tabs }
      : {
          color: iconUnactiveColor,
          fontSize: Fonts.tabs
        };
  };

  renderIcon = (props, iconActiveColor, iconUnactiveColor) => {
    let { index, focused } = props,
      icon = null,
      style = this.composeIconColor(props, iconActiveColor, iconUnactiveColor);
    switch (index) {
      case 0:
        icon = <Icon name="home" type="feather-icon" style={style} />;
        break;
      case 1:
        icon = <Icon name="activity" type="feather-icon" style={style} />;
        break;
      case 2:
        icon = <Icon name="layers" type="feather-icon" style={style} />;
        break;
      default:
        icon = <Icon name="clipboard" type="feather-icon" style={style} />;
        break;
    }
    return icon;
  };

  renderScene = SceneMap({
    "1": props => <EducationScreen />,
    "2": props => null,
    "3": props => null,
    "4": props => null
  });

  render() {
    let {
        navigationOptions: { index }
      } = this.state,
      { navigation, screenProps } = this.props;
    return (
      <NavigationProvider screenProps={screenProps} navigation={navigation}>
        <ThemeContext.Consumer>
          {({ toggleTheme }) => (
            <React.Fragment>
              <AppHeader title={CustomTab.defaults[index].toUpperCase()} />
              <TabViewAnimated
                navigationState={this.state.navigationOptions}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onIndexChange={this.handleIndexChange}
                useNativeDriver
              />
              <AppFab name="moon" onPress={toggleTheme} />
            </React.Fragment>
          )}
        </ThemeContext.Consumer>
      </NavigationProvider>
    );
  }
}

const styles = StyleSheet.create({
  indicatorStyle: {
    height: 3
  },
  tabStyle: {
    height: 60,
    borderTopWidth: 0,
    paddingVertical: 2,
    borderBottomWidth: 1,
    elevation: 0
  }
});
