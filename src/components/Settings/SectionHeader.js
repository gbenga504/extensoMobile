import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { BoldText } from "../AppText";
import Fonts from "../../assets/Fonts";
import Colors from "../../assets/Colors";
import Settings from "../../containers/ReadingMode";
import ReadingMode from "../../containers/ReadingMode";

const StyledContainer = styled.View`
  justify-content: center;
  padding-left: 10;
  background-color: ${Colors.day.settings.sectionHeaderBackground};
  height: 70
`
const StyledText = BoldText.extend`
  color: ${props => props.color};
  font-size: ${Fonts.headerTitle}
`

const SectionHeader = props => {
  let { title, readingMode: { settings: { sectionHeaderText } } } = props;
  return (
    <StyledContainer>
      <StyledText color={sectionHeaderText}>{title}</StyledText>
    </StyledContainer>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired
};

const _SectionHeader = ReadingMode(SectionHeader);

export default _SectionHeader;
