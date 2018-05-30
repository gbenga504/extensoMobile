import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, ActivityIndicator } from "react-native";

const StyledActivityContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingView = props => (
  <StyledActivityContainer>
    <ActivityIndicator
      animating={props.animating}
      size={props.size}
      color="#1da1f2"
      style={styles.activityIndicator}
    />
  </StyledActivityContainer>
);

LoadingView.defaultProps = {
  animating: true
};

LoadingView.propTypes = {
  size: PropTypes.number.isRequired,
  animating: PropTypes.bool
};

const styles = StyleSheet.create({
  activityIndicator: {
    alignSelf: "center",
    marginTop: 20
  }
});

export default LoadingView;
