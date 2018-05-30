import React from "react";
import { StyleSheet } from "react-native";

const TitleStyles = props =>
  StyleSheet.create({
    p: {
      fontSize: 22,
      color: props.color,
      marginHorizontal: 10,
      fontFamily: "FreightTextProBold"
    }
  });

const CommonStyles = color => ({
  fontFamily: "FreightTextProLight",
  fontSize: 17,
  textAlign: "justify",
  color
});

const BodyStyles = props =>
  StyleSheet.create({
    p: {
      ...CommonStyles(props.color),
      marginTop: 5
    },
    b: {
      ...CommonStyles(props.color),
      fontFamily: "FreightTextProMedium"
    },
    h3: {
      ...CommonStyles(props.color),
      fontFamily: "FreightTextProMedium"
    },
    h4: {
      ...CommonStyles(props.color),
      fontFamily: "FreightTextProMedium"
    },
    i: {
      ...CommonStyles(props.color),
      fontStyle: "italic"
    },
    a: {
      ...CommonStyles(props.color),
      textDecorationLine: "underline",
      fontFamily: "FreightTextProMedium"
    },
    figcaption: {
      ...CommonStyles(props.color),
      fontStyle: "italic",
      fontSize: 12
    }
  });

export { TitleStyles, BodyStyles };
