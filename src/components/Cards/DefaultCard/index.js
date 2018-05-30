import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View } from "react-native";

import Body from "./Body";
import Footer from "./Footer";
import Button from "../../Button";
import { NavigationContext } from "../../../context/NavigationContext";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.View`
  background-color: ${props => props.backgroundColor};
  padding: 15px;
  border-bottom-width: 1;
  border-color: ${props => props.borderColor};
`;
const StyledBodyContainer = styled.View`
  margin-bottom: 10;
`;

export default class DefaultCard extends React.PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      short_content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.any,
      created_at: PropTypes.string.isRequired,
      user_liked: PropTypes.string,
      bookmarked: PropTypes.bool,
      schemaType: PropTypes.string
    })
  };

  render() {
    let { item } = this.props;

    return (
      <NavigationContext.Consumer>
        {({ screenProps, navigation: { navigate } }) => (
          <ThemeContext.Consumer>
            {({ theme: { backgroundColor, seperatorColor } }) => (
              <Button
                onPress={() =>
                  navigate("content", {
                    contentId: item.id
                  })
                }
              >
                <StyledContainer
                  backgroundColor={backgroundColor}
                  borderColor={seperatorColor}
                >
                  <StyledBodyContainer>
                    <Body
                      title={item.title}
                      content={item.short_content}
                      src={item.src}
                    />
                  </StyledBodyContainer>
                  <Footer
                    item={item}
                    onAddBookmark={screenProps.setToastNotification}
                  />
                </StyledContainer>
              </Button>
            )}
          </ThemeContext.Consumer>
        )}
      </NavigationContext.Consumer>
    );
  }
}
