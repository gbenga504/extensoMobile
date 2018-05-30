import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { RegularText } from "../AppText";
import Fonts from "../../assets/Fonts";
import Button from "../Button";
import Colors from "../../assets/Colors";
import ReadingMode from "../../containers/ReadingMode";

const StyledContainer = styled.View`
  justify-content: center;
  padding-left: 10;
  background-color: ${props => props.backgroundColor};
  height: 50
`
const StyledText = RegularText.extend`
  color: #333;
  font-size: ${Fonts.content};
`

const SectionContent = props => {
  let { onPress, left, text, readingMode: { settings: { sectionContentBackground } } } = props;
  return (
    <Button
      onPress={
        onPress ? () => setTimeout(() => onPress(), 1) : () => null
      }
    >
      <StyledContainer backgroundColor={sectionContentBackground}>
        {props.text ? (
          <StyledText>{text}</StyledText>
        ) : (
            left
          )}
      </StyledContainer>
    </Button>
  );
}

SectionContent.propTypes = {
  text: PropTypes.string,
  left: PropTypes.element,
  onPress: PropTypes.func
};

const _SectionContent = ReadingMode(SectionContent);

export default _SectionContent;


