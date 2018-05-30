import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import styled from "styled-components";
import { Header, Left, Body, Right, Title } from "native-base";
import PropTypes from "prop-types";

import { BoldText } from "./AppText";
import Fonts from "../assets/Fonts";
import Icon from "./Icon";
import { NavigationContext } from "../context/NavigationContext";
import { ThemeContext } from "../context/ThemeContext";

const StyledLeft = styled.View`
  margin-top: 18;
  flex-direction: row;
`;
const StyledHeader = styled(Header)`
  background-color: ${props => props.color};
`;
const StyledTitle = BoldText.extend`
  font-size: ${Fonts.tabLabel};
  color: ${props => props.color};
  margin-left: 23;
`;

export default class AppHeader extends React.PureComponent {
  static propTypes = {
    ...Header.propTypes,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {({
          theme: {
            statusBarColor,
            foregroundColor,
            statusBarStyle,
            textColor,
            iconUnactiveColor
          }
        }) => (
          <NavigationContext.Consumer>
            {({ navigation: { navigate } }) => (
              <StyledHeader
                noShadow
                androidStatusBarColor={statusBarColor}
                color={foregroundColor}
                barStyle={statusBarStyle}
              >
                <StatusBar
                  barStyle={statusBarStyle}
                  backgroundColor={statusBarColor}
                />
                <StyledLeft>
                  <Icon
                    name="menu"
                    type="feather-icon"
                    style={{ fontSize: Fonts.icons, color: iconUnactiveColor }}
                    onPress={() => navigate("DrawerOpen")}
                  />
                  <StyledTitle color={textColor}>
                    {this.props.title}
                  </StyledTitle>
                </StyledLeft>
                <Right style={styles.right}>
                  <Icon
                    onPress={() => null}
                    name="droplet"
                    type="feather-icon"
                    style={{ fontSize: Fonts.icons, color: iconUnactiveColor }}
                  />
                </Right>
              </StyledHeader>
            )}
          </NavigationContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  right: {
    marginRight: 25
  }
});
