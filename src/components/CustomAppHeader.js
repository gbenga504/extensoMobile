import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, Left, Body, Title, Right, Row } from "native-base";

import Button from "./Button";
import Icon from "./Icon";
import { NavigationContext } from "../context/NavigationContext";
import { ThemeContext } from "../context/ThemeContext";
import Fonts from "../assets/Fonts";

const StyledHeader = styled(Header)`
  background-color: ${props => props.backgroundColor};
`;
const StyledRow = styled(Row)`
  align-items: center;
  width: 200;
`;

export default class CustomAppHeader extends React.PureComponent {
  static propTypes = {
    ...Header.propTypes,
    left: PropTypes.element.isRequired,
    right: PropTypes.element,
    showBackButton: PropTypes.bool,
    noShadow: PropTypes.bool
  };

  static contextTypes = {
    navigation: PropTypes.object
  };

  render() {
    let { left, right, showBackButton, noShadow } = this.props;
    return (
      <NavigationContext.Consumer>
        {({ navigation: { goBack } }) => (
          <ThemeContext.Consumer>
            {({
              theme: {
                foregroundColor,
                statusBarColor,
                statusBarStyle,
                iconActiveColor
              }
            }) => (
              <StyledHeader
                androidStatusBarColor={statusBarColor}
                noShadow={noShadow}
                backgroundColor={foregroundColor}
                barStyle={statusBarStyle}
              >
                <StatusBar
                  barStyle={statusBarStyle}
                  backgroundColor={statusBarColor}
                />
                <Left>
                  <Button onPress={() => goBack()}>
                    <StyledRow>
                      {showBackButton && (
                        <Icon
                          name="arrow-left"
                          type="feather-icon"
                          style={[styles.icon, { color: iconActiveColor }]}
                        />
                      )}
                      {left}
                    </StyledRow>
                  </Button>
                </Left>
                <Body>
                  <Title />
                </Body>
                {right ? <Right>{right}</Right> : <Right />}
              </StyledHeader>
            )}
          </ThemeContext.Consumer>
        )}
      </NavigationContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: Fonts.icons
  }
});
