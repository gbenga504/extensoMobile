import React from "react";
import { Animated, StatusBar } from "react-native";
import Styled from "styled-components";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center
`;

export default class CircleToAnimate extends React.PureComponent {
  state = {
    rotate: new Animated.Value(0),
    moveBalls: new Animated.Value(1)
  };

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    let { rotate, moveBalls } = this.state;
    Animated.sequence([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(moveBalls, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(moveBalls, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start(() => {
      this.state.rotate.setValue(0);
      this.animate();
    });
  };

  generateBallTransform = ballPosition => {
    let transform = undefined,
      { moveBalls } = this.state;
    switch (ballPosition) {
      case "first":
        transform = [
          {
            translateY: moveBalls.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0]
            })
          }
        ];
        break;
      case "second":
        transform = [
          {
            translateX: moveBalls.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, 0]
            })
          }
        ];
        break;
      case "third":
        transform = [
          {
            translateY: moveBalls.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, 0]
            })
          }
        ];
        break;
      default:
        transform = [
          {
            translateX: moveBalls.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0]
            })
          }
        ];
        break;
    }
    return { transform, opacity: moveBalls };
  };

  render() {
    const transform = [
      {
        rotate: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"]
        })
      }
    ];

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#e0e0e0" />
        <Animated.View style={{ ...styles.container, ...{ transform } }}>
          <Animated.View
            style={{
              ...styles.firstBall,
              ...this.generateBallTransform("first")
            }}
          />
          <Animated.View
            style={{
              ...styles.secondBall,
              ...this.generateBallTransform("second")
            }}
          />
          <Animated.View
            style={{
              ...styles.thirdBall,
              ...this.generateBallTransform("third")
            }}
          />
          <Animated.View
            style={{
              ...styles.fourthBall,
              ...this.generateBallTransform("fourth")
            }}
          />
        </Animated.View>
      </Container>
    );
  }
}

const styles = {
  container: {
    width: 100,
    height: 100
  },
  firstBall: {
    position: "absolute",
    backgroundColor: "#4caf50",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 40,
    marginTop: 0
  },
  secondBall: {
    position: "absolute",
    backgroundColor: "#f44336",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 80,
    marginTop: 40
  },
  thirdBall: {
    position: "absolute",
    backgroundColor: "#2196f3",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 40,
    marginTop: 80
  },
  fourthBall: {
    position: "absolute",
    backgroundColor: "#795548",
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 40
  }
};
