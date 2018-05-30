import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "../components/Icon";
import Fonts from "../assets/Fonts";
import Colors from "../assets/Colors";
import realm from "../realm.schema";

export default class SearchScreen extends React.PureComponent {
  static contextTypes = {
    viewColor: PropTypes.string
  };

  createUser = () => {
    realm.write(() => {
      realm.create("User", {
        firstName: `Gbenga ${new Date().getSeconds()}`,
        lastName: "Anfowoshe"
      });
    });
  };

  render() {
    return <Button title="Create User" onPress={this.createUser} />;
  }
}

const styles = StyleSheet.create({});
