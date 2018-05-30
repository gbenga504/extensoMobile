import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";

import { LightText } from "../../AppText";
import Icon from "../../Icon";
import Fonts from "../../../assets/Fonts";
import { permutateReadingTime } from "../../../utils";
import realm from "../../../realm.schema";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const StyledText = LightText.extend`
  font-size: 13;
  color: ${props => props.color};
`;

export default class Footer extends React.PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.any,
      created_at: PropTypes.string.isRequired,
      user_liked: PropTypes.string.isRequired,
      bookmarked: PropTypes.bool,
      schemaType: PropTypes.string
    }),
    onAddBookmark: PropTypes.func.isRequired
  };

  bookmark = () => {
    let {
      item: { bookmarked, title, id, schemaType },
      item,
      onAddBookmark
    } = this.props;
    if (bookmarked) {
      realm.write(() => {
        let _obj = realm.objects("Bookmark").filtered(`id = "${id}"`)[0];
        realm.delete(_obj);

        realm.create(schemaType, { id, bookmarked: false }, true);
        onAddBookmark(` Removed`);
      });
    } else {
      realm.write(() => {
        realm.create("Bookmark", Object.assign({}, item, { bookmarked: true }));
        realm.create(schemaType, { id, bookmarked: true }, true);
        onAddBookmark(`Added`);
      });
    }
  };

  render() {
    let {
      item: { category, created_at, bookmarked, content }
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme: { textColor, iconActiveColor, iconUnactiveColor } }) => (
          <StyledContainer>
            <View>
              <StyledText color={textColor}>In {category}</StyledText>
            </View>
            <Icon
              onPress={this.bookmark}
              name={bookmarked ? "bookmark" : "bookmark-border"}
              type="material-icon"
              style={
                !bookmarked
                  ? [styles.icon, { color: iconUnactiveColor }]
                  : [styles.icon, { color: iconActiveColor }]
              }
            />
          </StyledContainer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: Fonts.icons
  }
});
