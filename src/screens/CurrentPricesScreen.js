import React from "react";
import { View, StyleSheet, Button } from "react-native";
import PropTypes from "prop-types";

import Icon from "../components/Icon";
import Fonts from "../assets/Fonts";
import Colors from "../assets/Colors";

export default class UtilitiesScreen extends React.PureComponent {
  static contextTypes = {
    viewColor: PropTypes.string,
    navigation: PropTypes.object
  };

  render() {
    return (
      <Button
        title="Facebook"
        onPress={() =>
          this.context.navigation.navigate("browser", {
            uri: "https://www.facebook.com"
          })
        }
      />
    );
  }
}

const styles = StyleSheet.create({});
