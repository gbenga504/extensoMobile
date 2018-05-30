import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import { RealmContext } from "./RealmProvider";

class QueryAdvanced extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      result: {}
    };
    this.results = {};
    this.addListener(props.realm);
  }

  static propTypes = {
    schemas: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleQuery: PropTypes.func,
    realm: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.handleQuery) {
      this.props.handleQuery(this.props.realm);
      this.setState({
        component: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { realm } = nextProps;
    if (realm.path !== this.props.realm.path) {
      this.removeListener();
      this.addListener(realm);
    }
  }

  removeListener = () => {
    if (!this.props.handleQuery) {
      this.props.schemas.forEach(schema => {
        this.results[schema].removeListener();
      });
      this.results = {};
    }
  };

  addListener = realm => {
    if (!this.props.handleQuery) {
      this.props.schemas.forEach(schema => {
        let name = schema;
        (name => {
          this.results[name] = realm.objects(name);
          this.results[name].addListener(() => {
            this.setState({
              component: true,
              result: { ...this.state.result, [name]: this.results[name] }
            });
          });
        })(name);
      });
    }
  };

  render() {
    let { component } = this.state;
    if (component) {
      return this.props.children(this.state.result);
    }
    return null;
  }
}

let Query = null;

export default (Query = ({ children, ...rest }) => (
  <RealmContext.Consumer>
    {context => {
      let { realm } = context,
        composedProps = { realm, ...rest };
      return (
        <QueryAdvanced {...composedProps}>
          {results => children(results)}
        </QueryAdvanced>
      );
    }}
  </RealmContext.Consumer>
));

Query.propTypes = {
  schemas: PropTypes.arrayOf(PropTypes.string)
};
