import React from "react";
import { Animated, Easing, Dimensions, StyleSheet } from "react-native";
import { Container } from "native-base";

import { themes, ThemeContext } from "../context/ThemeContext";

export default class ThemeContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      opacity: new Animated.Value(0),
      zIndex: 0,
      shouldComponentDisplay: false,
      toggleTheme: this.toggleTheme
    };
  }

  toggleTheme = () => {
    let { opacity } = this.state;
    this.setState({ zIndex: 1 }, () => {
      Animated.timing(opacity, {
        duration: 1000,
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(animation => {
        if (animation.finished) {
          this.setState(state => ({
            theme: state.theme == themes.dark ? themes.light : themes.dark
          }));
          Animated.timing(opacity, {
            duration: 1000,
            toValue: 0,
            easing: Easing.linear,
            useNativeDriver: true
          }).start(animation => {
            if (animation.finished) {
              this.setState({
                zIndex: 0
              });
            }
          });
        }
      });
    });
  };

  render() {
    let { zIndex, opacity } = this.state;
    return (
      <React.Fragment>
        <Animated.View style={[styles.animatedView, { opacity, zIndex }]} />
        <ThemeContext.Provider value={this.state}>
          <Animated.View
            style={{
              flex: 1,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
              })
            }}
          >
            {this.props.children}
          </Animated.View>
        </ThemeContext.Provider>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    flex: 1,
    backgroundColor: "#fff",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
