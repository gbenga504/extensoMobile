import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, Item, Input } from "native-base";
import { StatusBar } from "react-native";

import Icon from "./Icon";
import { NavigationContext } from "../context/NavigationContext";
import { ThemeContext } from "../context/ThemeContext";
import Fonts from "../assets/Fonts";

const StyledHeader = styled(Header)`
  background-color: ${props => props.backgroundColor};
`;

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.searchValue || ""
    };
  }

  static propTypes = {
    ...Header.propTypes,
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string
  };

  render() {
    let { onSearch, onEnter } = this.props,
      { value } = this.state;
    return (
      <NavigationContext.Consumer>
        {({ navigation: { goBack } }) => (
          <ThemeContext.Consumer>
            {({
              theme: {
                statusBarColor,
                statusBarStyle,
                iconActiveColor,
                foregroundColor,
                placeholderTextColor,
                seperatorColor
              }
            }) => (
              <StyledHeader
                searchBar
                noShadow
                androidStatusBarColor={statusBarColor}
                backgroundColor={foregroundColor}
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: seperatorColor
                }}
              >
                <StatusBar
                  barStyle={statusBarStyle}
                  backgroundColor={statusBarColor}
                />
                <Item style={{ backgroundColor: foregroundColor }}>
                  <Icon
                    onPress={() => goBack()}
                    name="chevron-left"
                    type="feather-icon"
                    style={{ fontSize: Fonts.icons, color: iconActiveColor }}
                  />
                  <Input
                    placeholder="Search"
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={value => {
                      this.setState({ value });
                      onSearch(value);
                    }}
                    style={{
                      color: iconActiveColor,
                      fontFamily: "FreightTextProBold"
                    }}
                    returnKeyType="search"
                    onBlur={() => onEnter(value)}
                    value={value}
                  />
                  {value.length > 0 && (
                    <Icon
                      name="x"
                      type="feather-icon"
                      onPress={() => {
                        this.setState({ value: "" });
                        onSearch("");
                      }}
                      style={{ fontSize: Fonts.icons, color: iconActiveColor }}
                    />
                  )}
                </Item>
              </StyledHeader>
            )}
          </ThemeContext.Consumer>
        )}
      </NavigationContext.Consumer>
    );
  }
}
