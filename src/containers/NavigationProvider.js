import React from "react";
import { Linking } from "react-native";
import PropTypes from "prop-types";

import { NavigationContext } from "../context/NavigationContext";

export default class NavigationProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenProps: props.screenProps,
      navigation: props.navigation,
      shouldComponentDisplay: false
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired
  };

  componentDidMount() {
    let {
      navigation: { navigate }
    } = this.props;
    Linking.getInitialURL().then(url => {
      if (url) {
        this.setState({ shouldComponentDisplay: false });
        let _arr = url.replace(/^[a-z]+:\/\//, "").split("/");
        navigate(_arr[1], {
          contentId: _arr[2]
        });
      } else {
        this.setState({
          shouldComponentDisplay: true
        });
      }
    });
  }

  render() {
    let { shouldComponentDisplay } = this.state;
    return shouldComponentDisplay ? (
      <NavigationContext.Provider value={this.state}>
        {this.props.children}
      </NavigationContext.Provider>
    ) : null;
  }
}
