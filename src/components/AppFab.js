import React from "react";
import styled from "styled-components";
import { Fab, Icon } from "native-base";
import PropTypes from "prop-types";

const StyledFab = styled(Fab)`
  background-color: ${props => props.color || "#1da1f2"};
`;

const AppFab = props => {
  return (
    <StyledFab
      active={true}
      color={props.containerColor}
      direction="up"
      position="bottomRight"
      onPress={props.onPress}
    >
      <Icon name={props.name} style={{ color: props.iconColor || "#fff" }} />
    </StyledFab>
  );
};

AppFab.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  containerColor: PropTypes.string,
  iconColor: PropTypes.string
};

export default AppFab;
