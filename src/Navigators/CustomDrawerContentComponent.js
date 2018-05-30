import React from "react";
import { Row } from "native-base";
import styled from "styled-components";

import Button from "../components/Button";
import Icon from "../components/Icon";
import Fonts from "../assets/Fonts";
import { RegularText } from "../components/AppText";
import { NavigationContext } from "../context/NavigationContext";
import { ThemeContext } from "../context/ThemeContext";

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor};
`;
const StyledSegment = styled.View`
  height: 150;
  padding-vertical: 15;
  padding-horizontal: 30;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.borderColor};
`;
const StyledContentRow = styled(Row)`
  height: 40;
  align-items: center;
  flex-direction: row;
`;
const StyledText = RegularText.extend`
  color: ${props => props.color};
  font-size: ${Fonts.dashboardLabel};
  margin-left: 5;
`;

export default class CustomDrawerContentComponent extends React.PureComponent {
  render() {
    return (
      <NavigationContext.Consumer>
        {({ navigation: { navigate } }) => (
          <ThemeContext.Consumer>
            {({
              theme: {
                foregroundColor,
                iconUnactiveColor,
                seperatorColor,
                textColor
              },
              toggleTheme
            }) => (
              <StyledContainer backgroundColor={foregroundColor}>
                <StyledSegment height="250" borderColor={seperatorColor}>
                  <Button onPress={() => navigate("bookmark")}>
                    <StyledContentRow>
                      <Icon
                        name="bookmark"
                        type="feather-icon"
                        style={{
                          fontSize: Fonts.icons,
                          color: iconUnactiveColor
                        }}
                      />
                      <StyledText color={textColor}>Bookmark</StyledText>
                    </StyledContentRow>
                  </Button>
                  <Button onPress={toggleTheme}>
                    <StyledContentRow>
                      <Icon
                        name="moon"
                        type="feather-icon"
                        style={{
                          fontSize: Fonts.icons,
                          color: iconUnactiveColor
                        }}
                      />
                      <StyledText color={textColor}>
                        Toggle Reading Mode
                      </StyledText>
                    </StyledContentRow>
                  </Button>
                </StyledSegment>
              </StyledContainer>
            )}
          </ThemeContext.Consumer>
        )}
      </NavigationContext.Consumer>
    );
  }
}
