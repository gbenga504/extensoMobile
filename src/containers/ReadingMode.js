import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import hoistNonReactStatic from "hoist-non-react-statics";

import Colors from "../assets/Colors";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

function WrapReadingMode(WrappedComponent) {
  class ReadingMode extends React.PureComponent {
    constructor(props, context) {
      super(props, context)
    }

    static displayName = `ReadingMode(${getDisplayName(WrappedComponent)})`;

    composePassedPropsWithReadingMode = () => ({
      ...this.props,
      readingMode: Colors[this.props.readingMode]
    })

    render() {
      return (
        <WrappedComponent {...this.composePassedPropsWithReadingMode() } />
      )
    }
  }

  hoistNonReactStatic(ReadingMode, WrappedComponent);

  const _ReadingMode = connect((state) => ({ readingMode: state.readingMode }))(ReadingMode);

  return _ReadingMode
};

export default WrapReadingMode;


