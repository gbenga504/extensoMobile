import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomAppHeader from "../CustomAppHeader";
import { BoldText } from "../AppText";
import Fonts from "../../assets/Fonts";
import Colors from "../../assets/Colors";
import ReadingMode from "../../containers/ReadingMode";

const StyledTitle = BoldText.extend`
  margin-left: 20;
  color: ${props => props.color};
  font-size: ${Fonts.headerTitle}
`

class SettingsHeader extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  renderSettingsTitle = () => {
    let {readingMode: {settings: {text}}} = this.props;
    return  (
      <StyledTitle color={text}>{this.props.title}</StyledTitle>
    );
  }

  render() {
    return (
      <CustomAppHeader
        showBackButton
        noShadow={false}
        left={this.renderSettingsTitle()}
      />
    );
  }
}

const _SettingsHeader = ReadingMode(SettingsHeader);

export default _SettingsHeader;