import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { View } from "react-native";

import Body from "./Body";
import Footer from "./Footer";
import Button from "../../Button";
import { NavigationContext } from "../../../context/NavigationContext";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.View`
  background-color: ${props => props.backgroundColor};
  border-radius: 5;
  margin-bottom: 30;
  border-width: 1;
  border-color: ${props => props.borderColor};
`;
const StyledSection = styled.View`
  padding-horizontal: 10;
  padding-vertical: 10;
`;
const StyledImageContainer = styled.View`
  height: 200;
  background-color: ${props => props.backgroundColor};
`;
const StyledImage = styled.Image`
  height: 200;
`;

export default class ContentCard extends React.PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      short_content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.any,
      created_at: PropTypes.string.isRequired,
      user_liked: PropTypes.string.isRequired,
      bookmarked: PropTypes.bool,
      schemaType: PropTypes.string
    })
  };

  state = {
    isImageDisplayed: false,
    imageWidth: 0,
    isImageLoading: true
  };

  onLayout = e => {
    this.setState({
      imageWidth: e.nativeEvent.layout.width,
      isImageDisplayed: true
    });
  };

  renderDisplayImage = (imageBackgroundColor, loadedImageBackgroundColor) => {
    let {
        item: { src }
      } = this.props,
      { isImageDisplayed, imageWidth, isImageLoading } = this.state;
    return (
      <StyledImageContainer
        backgroundColor={
          isImageLoading ? imageBackgroundColor : loadedImageBackgroundColor
        }
      >
        {src &&
          isImageDisplayed &&
          imageWidth !== 0 && (
            <StyledImage
              onLoadStart={() => this.setState({ isImageLoading: true })}
              onLoadEnd={() => this.setState({ isImageLoading: false })}
              source={{
                uri: `http://res.cloudinary.com/gbenga504/image/upload/c_scale,h_${imageWidth},w_${imageWidth}/${src}`
              }}
            />
          )}
      </StyledImageContainer>
    );
  };

  render() {
    let {
      item: { category, title, created_at, id, bookmarked, schemaType, oid },
      item
    } = this.props;
    return (
      <ThemeContext.Consumer>
        {({
          theme: {
            seperatorColor,
            backgroundColor,
            textColor,
            imageBackgroundColor,
            loadedImageBackgroundColor
          }
        }) => (
          <View onLayout={this.onLayout}>
            <NavigationContext.Consumer>
              {({ navigation: { navigate } }) => (
                <Button
                  onPress={() =>
                    navigate("content", {
                      contentId: id,
                      bookmarked,
                      schemaType,
                      oid
                    })
                  }
                >
                  <StyledContainer
                    backgroundColor={backgroundColor}
                    borderColor={seperatorColor}
                  >
                    {this.renderDisplayImage(
                      imageBackgroundColor,
                      loadedImageBackgroundColor
                    )}
                    <StyledSection>
                      <Body title={title} color={textColor} />
                      <Footer
                        createdAt={created_at}
                        item={item}
                        color={textColor}
                      />
                    </StyledSection>
                  </StyledContainer>
                </Button>
              )}
            </NavigationContext.Consumer>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
