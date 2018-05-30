import React from "react";
import PropTypes from "prop-types";
import createReactContext from "create-react-context";
import Realm from "realm";
import invariant from "invariant";

/**
 * Here we use the polyfill context API provided by the react community
 * We also export the ComposerContext variable so it would be called from other components
 */
export const RealmContext = createReactContext({
  realm: null
});

export default class RealmProvider extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    realm: PropTypes.object.isRequired
  };

  render() {
    let { realm, children } = this.props,
      value = { realm };
    return (
      <RealmContext.Provider value={value}>{children}</RealmContext.Provider>
    );
  }
}
