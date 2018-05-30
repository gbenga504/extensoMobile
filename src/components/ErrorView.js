import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

import { RegularText } from "./AppText";
import Icon from "./Icon";
import Button from "./Button";
import { ThemeContext } from "../context/ThemeContext";
import Fonts from "../assets/Fonts";

const StyledActivityContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;
const StyledText = styled(RegularText)`
  font-size: ${Fonts.errorText};
  color: ${props => props.color};
`;

const ErrorView = props => (
  <ThemeContext.Consumer>
    {({ theme: { errorTextAndIcons, backgroundColor } }) => (
      <Button onPress={props.onReload}>
        <StyledActivityContainer backgroundColor={backgroundColor}>
          <Icon
            name="alert-circle"
            type="feather-icon"
            style={[styles.errorIcon, { color: errorTextAndIcons }]}
          />
          <StyledText color={errorTextAndIcons}>
            Error occurred in connecting, tap to reload
          </StyledText>
        </StyledActivityContainer>
      </Button>
    )}
  </ThemeContext.Consumer>
);

ErrorView.propTypes = {
  onReload: PropTypes.func
};

const styles = StyleSheet.create({
  errorIcon: {
    fontSize: Fonts.errorIcon
  }
});

export default ErrorView;
