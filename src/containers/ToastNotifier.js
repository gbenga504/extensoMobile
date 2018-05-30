import React from "react";
import { connect } from "react-redux";
import { ToastAndroid } from "react-native";

class ToastNotifier extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    let {
      toastNotification: { id, message }
    } = nextProps;
    if (id) {
      if (id !== this.props.toastNotification.id) {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  }

  render() {
    return this.props.children;
  }
}

const _ToastNotifier = connect(state => ({
  toastNotification: state.toastNotification
}))(ToastNotifier);

export default _ToastNotifier;
