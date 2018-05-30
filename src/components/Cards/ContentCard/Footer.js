import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";

import { LightText } from "../../AppText";
import Icon from "../../Icon";
import Colors from "../../../assets/Colors";
import { permutateReadingTime } from "../../../utils";
import realm from "../../../realm.schema";
import Fonts from "../../../assets/Fonts";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.View`
  justify-content: space-between;
  margin-top: 10;
  align-items: center;
  flex-direction: row;
`;
const StyledLikesText = LightText.extend`
  font-size: 14;
  color: ${Colors.day.cards.likesText};
  margin-left: 3;
`;

export default class Footer extends React.PureComponent {
  state = {
    bookmarked: this.props.item.bookmarked
  };

  static propTypes = {
    createdAt: PropTypes.string,
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
    })
  };

  bookmark = () => {
    let {
        item: { bookmarked, title, id, schemaType },
        item
      } = this.props,
      _titleSplit = title.split(" "),
      _title = `${_titleSplit[0]} ${_titleSplit[1]} ${_titleSplit[2]}...`;

    this.setState({ bookmarked: !this.state.bookmarked });
    if (bookmarked) {
      realm.write(() => {
        let _obj = realm.objects("Bookmark").filtered(`id = "${id}"`)[0];
        realm.delete(_obj);

        realm.create(schemaType, { id, bookmarked: false }, true);
      });
    } else {
      realm.write(() => {
        realm.create("Bookmark", Object.assign({}, item, { bookmarked: true }));
        realm.create(schemaType, { id, bookmarked: true }, true);
      });
    }
  };

  render() {
    let {
        item: { createdAt, category }
      } = this.props,
      { bookmarked } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme: { textColor, iconActiveColor, iconUnactiveColor } }) => (
          <StyledContainer>
            <LightText style={{ color: textColor }}>In {category}</LightText>
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
  row: {
    flexDirection: "row"
  },
  icon: {
    fontSize: Fonts.icons
  }
});
