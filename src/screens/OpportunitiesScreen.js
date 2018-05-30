import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "../components/Icon";
import Fonts from "../assets/Fonts";
import Colors from "../assets/Colors";
import { ConnectQuery } from "../realmDB";

export default class CollectionScreen extends React.PureComponent {
  static contextTypes = {
    viewColor: PropTypes.string
  };

  render() {
    return (
      <ConnectQuery schemas={["User"]}>
        {({ User }) => {
          if (User) {
            return <Text>{User[User.length - 1].firstName}</Text>;
          } else {
            return null;
          }
        }}
      </ConnectQuery>
    );
  }
}

const styles = StyleSheet.create({});
