import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, Item, Input } from "native-base";
import { StyleSheet } from "react-native";

import Button from "./Button";
import Icon from "./Icon";
import Colors from "../assets/Colors";
import ReadingMode from "../containers/ReadingMode";

const StyledHeader = styled(Header)`
  background-color: ${props => props.backgroundColor};
`;

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.searchValue || ""
    };
  }

  static propTypes = {
    ...Header.propTypes,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    searchValue: PropTypes.string
  };

  static contextTypes = {
    navigation: PropTypes.object
  };

  render() {
    let { navigation: { goBack } } = this.context,
      { readingMode: { defaultStatusBar, defaultScreenHeader } } = this.props;
    return (
      <StyledHeader
        searchBar
        noShadow
        androidStatusBarColor={defaultStatusBar}
        backgroundColor={defaultScreenHeader}
      >
        <Item>
          <Icon
            onPress={() => goBack()}
            name="chevron-left"
            type="feather-icon"
            style={styles.icon}
          />
          <Input
            placeholder="Search"
            onChangeText={value => {
              this.setState({ value });
              this.props.onSearch(value);
            }}
            returnKeyType="search"
            onBlur={() => this.props.onEnter(this.state.value)}
            value={this.state.value}
          />
          {this.state.value.length > 0 && (
            <Icon
              name="x"
              type="feather-icon"
              onPress={() => {
                this.setState({ value: "" });
                this.props.onSearch("");
              }}
              style={styles.icon}
            />
          )}
        </Item>
      </StyledHeader>
    );
  }
}

const _SearchHeader = ReadingMode(SearchHeader);

export default _SearchHeader;

const styles = StyleSheet.create({
  icon: {
    fontSize: 20
  }
});
