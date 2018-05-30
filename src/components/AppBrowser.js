import React from "react";
import { WebView, StyleSheet, View, StatusBar } from "react-native";
import styled from "styled-components";

import { RegularText } from "./AppText";
import Icon from "./Icon";

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
const BrowserBottom = styled.View`
  height: 50;
  background-color: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10;
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
        <BrowserBottom>
          <Icon
            name="arrow-left"
            type="feather-icon"
            onPress={() => this.browser.goBack()}
            style={styles.icon}
          />

          <Icon
            name="rotate-cw"
            type="feather-icon"
            onPress={() => this.browser.reload()}
            style={styles.icon}
          />

          <Icon
            name="arrow-right"
            type="feather-icon"
            onPress={() => this.browser.goForward()}
            style={styles.icon}
          />
          <Icon
            name="x"
            type="feather-icon"
            onPress={() => this.browser.stopLoading()}
            style={styles.icon}
          />
        </BrowserBottom>
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
  },
  icon: {
    color: "#333",
    fontSize: 20
  }
});
