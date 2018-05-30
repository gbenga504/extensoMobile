import React from "react";
import { RefreshControl } from "react-native";
import PropTypes from "prop-types";

const AppRefreshControl = props => (
  <RefreshControl colors={["#1da1f2"]} {...props} />
);

AppRefreshControl.propTypes = {
  ...RefreshControl.propTypes
};

export default AppRefreshControl;
