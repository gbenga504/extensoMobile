import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

import Fonts from "../../../assets/Fonts";
import CustomHTMLView from "../../CustomHTMLView";

let html = text => `<p>${text}</p>`,
  style = color =>
    StyleSheet.create({
      p: {
        fontSize: Fonts.cardContent,
        color,
        fontFamily: "FreightTextProMedium"
      }
    });

const Body = props => [
  <CustomHTMLView key={1} style={style(props.color)} html={html(props.title)} />
];

Body.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

export default Body;
