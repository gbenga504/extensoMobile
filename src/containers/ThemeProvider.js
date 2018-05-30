import React from "react";
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";

import { themes, ThemeContext } from "../context/ThemeContext";

class ThemeProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
      opacity: new Animated.Value(0),
      zIndex: 0,
      shouldComponentDisplay: false,
      toggleTheme: this.toggleTheme
    };
  }

  configureApplicationTheme = () => {
    let { theme } = this.state,
      newTheme =
        JSON.stringify(theme) == JSON.stringify(themes.dark)
          ? themes.light
          : themes.dark;
    AsyncStorage.setItem("@extensoTheme", JSON.stringify(newTheme), error => {
      //@Todo: Send data to analytics
    });
    this.setState({
      theme: newTheme
    });
  };

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
          this.configureApplicationTheme();
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

function mapStateToProps(state) {
  return {
    theme: state.applicationTheme
  };
}

export default connect(mapStateToProps)(ThemeProvider);

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
