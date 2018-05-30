import React from "react";
import PropTypes from "prop-types";
import HTMLView from "react-native-htmlview";

export default class CustomHTMLView extends React.PureComponent {
  static propTypes = {
    html: PropTypes.string.isRequired,
    style: PropTypes.any.isRequired,
    renderNode: PropTypes.func,
    onLinkPress: PropTypes.func
  };

  render() {
    let { html, style, renderNode, onLinkPress } = this.props;
    return (
      <HTMLView
        value={html}
        stylesheet={style}
        renderNode={renderNode || null}
        onLinkPress={onLinkPress}
      />
    );
  }
}
