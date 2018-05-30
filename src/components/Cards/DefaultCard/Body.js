import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Fonts from "../../../assets/Fonts";
import { LightText } from "../../AppText";
import CustomHTMLView from "../../CustomHTMLView";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.View`
  flex-direction: row;
`;
const StyledImageContainer = styled.View`
  width: 80;
  height: 80;
  border-radius: 3;
  background-color: ${props => props.backgroundColor};
`;
const StyledImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 3;
`;
const StyledTextContainer = styled.View`
  justify-content: space-between;
  margin-left: 5;
  margin-right: 15;
`;

const titleHTML = text => `<p>${text}</p>`,
  titleStyle = props =>
    StyleSheet.create({
      p: {
        fontSize: Fonts.cardTitle,
        color: props.color,
        marginRight: 45,
        fontFamily: "FreightTextProBold"
      }
    }),
  commonStyles = color => ({
    fontSize: Fonts.cardContent,
    color,
    fontFamily: "FreightTextProLight"
  }),
  bodyHTML = text => {
    let _bodyText = text.replace(/<[^>]*>/gi, "");
    return `<k>${_bodyText}</k>`;
  },
  bodyStyle = props =>
    StyleSheet.create({
      k: {
        ...commonStyles(props.color),
        marginRight: 50
      },
      b: {
        ...commonStyles(props.color),
        fontFamily: "FreightTextProMedium"
      },
      i: {
        ...commonStyles(props.color),
        fontStyle: "italic"
      },
      a: {
        ...commonStyles(props.color),
        textDecorationLine: "underline"
      }
    }),
  renderNode = (
    node,
    index,
    siblings,
    parent,
    defaultRenderer,
    styledProps
  ) => {
    if (node.name == "k") {
      const style = bodyStyle(styledProps).k;
      return (
        <LightText
          key={index}
          style={style}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {defaultRenderer(node.children, parent)}
        </LightText>
      );
    }
  };

export default class Body extends React.PureComponent {
  state = {
    isImageLoading: true
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    src: PropTypes.string
  };

  render() {
    let { title, content, src } = this.props,
      { isImageLoading } = this.state;
    return (
      <ThemeContext.Consumer>
        {({
          theme: { imageBackgroundColor, textColor, loadedImageBackgroundColor }
        }) => (
          <StyledContainer>
            <StyledImageContainer
              backgroundColor={
                isImageLoading
                  ? imageBackgroundColor
                  : loadedImageBackgroundColor
              }
            >
              {src && (
                <StyledImage
                  onLoadStart={() => this.setState({ isImageLoading: true })}
                  onLoadEnd={() => this.setState({ isImageLoading: false })}
                  source={{
                    uri: `http://res.cloudinary.com/gbenga504/image/upload/c_thumb,g_face,h_80,w_80/${src}`
                  }}
                />
              )}
            </StyledImageContainer>
            <StyledTextContainer>
              <CustomHTMLView
                html={titleHTML(title)}
                style={titleStyle({ color: textColor })}
              />
              <CustomHTMLView
                html={bodyHTML(content)}
                style={bodyStyle({ color: textColor })}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer, {
                    color: textColor
                  })
                }
              />
            </StyledTextContainer>
          </StyledContainer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
