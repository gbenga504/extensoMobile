import React from "react";
import { TouchableNativeFeedback } from "react-native";

const Button = props => (
  <TouchableNativeFeedback
    {...props}
    onPress={() =>
      setTimeout(() => {
        props.onPress && props.onPress();
      }, 1)
    }
  >
    {props.children}
  </TouchableNativeFeedback>
);

export default Button;
