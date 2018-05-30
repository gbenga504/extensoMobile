import React from "react";
import { WebView, StyleSheet, View, StatusBar } from "react-native";
import styled from "styled-components";

import { RegularText } from "./AppText";

const BrowserHeader = styled.View`
  height: 50;
  background-color: #333;
  justify-content: center;
  padding-horizontal: 10;
`;
const BrowserTitle = styled(RegularText)`
  color: #fff;
  font-size: 14;
`;

export default class AppBrowser extends React.PureComponent {
  render() {
    let {
      navigation: {
        state: {
          params: { uri }
        }
      }
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <BrowserHeader>
          <BrowserTitle>Extenso Browser</BrowserTitle>
        </BrowserHeader>
        <WebView
          ref={ref => (this.browser = ref)}
          source={{ uri }}
          style={styles.browser}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  browser: {
    flex: 1
  }
});
