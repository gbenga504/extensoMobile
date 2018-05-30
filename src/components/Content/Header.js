import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyleSheet, View, Share } from "react-native";
import moment from "moment";

import { LightText } from "..//AppText";
import CustomAppHeader from "../CustomAppHeader";
import Icon from "../Icon";
import Button from "../Button";
import Fonts from "../../assets/Fonts";
import { permutateReadingTime } from "../../utils";
import realm from "../../realm.schema";
import { ThemeContext } from "../../context/ThemeContext";

const StyledHeaderLeftContainer = styled.View`
  width: 270;
  margin-left: 10;
`;
const StyledHeaderRightContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
`;
const StyledHeaderText = LightText.extend`
  font-size: ${Fonts.appHeaderText};
  color: ${props => props.color || "#333"};
`;
const StyledIconContainer = styled.View`
  width: 40;
  height: 60;
  justify-content: center;
  align-items: center;
`;

export default class Header extends React.PureComponent {
  state = {
    bookmarked: this.props.bookmarked
  };

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.array,
      created_at: PropTypes.string.isRequired,
      user_liked: PropTypes.string.isRequired
    }),
    bookmarked: PropTypes.bool,
    categoryColor: PropTypes.string,
    schemaType: PropTypes.string
  };

  shareContent = () => {
    //@Todo add a resonable link that would enable deep linking
    let {
      item: { title, content }
    } = this.props;
    Share.share(
      {
        message: `${content.slice(0, 20)}...`,
        url: `https://www.google.com`,
        title: title
      },
      {
        dialogTitle: `Share ${title}`
      }
    ).then(Share => {
      //do nothing
    });
  };

  bookmark = () => {
    let {
        item: { title, id, created_at, content },
        item,
        schemaType
      } = this.props,
      _titleSplit = title.split(" "),
      { bookmarked } = this.state,
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
        realm.create(
          "Bookmark",
          Object.assign({}, item, {
            bookmarked: true,
            schemaType,
            short_content: content.replace(/<[^>]*>/gi, "").trim(),
            oid: parseInt(moment(created_at).format("x"))
          })
        );
        let _objFromSchema = realm
          .objects(schemaType)
          .filtered(`id = "${id}"`)[0];
        if (_objFromSchema) {
          realm.create(schemaType, { id, bookmarked: true }, true);
        } else {
          realm.create(
            schemaType,
            Object.assign({}, item, {
              bookmarked: true,
              schemaType,
              short_content: content.replace(/<[^>]*>/gi, "").trim(),
              oid: parseInt(moment(created_at).format("x"))
            })
          );
        }
      });
    }
  };

  renderAppHeaderLeft = () => (
    <ThemeContext.Consumer>
      {({ theme: { textColor } }) => (
        <StyledHeaderLeftContainer>
          <StyledHeaderText color={this.props.categoryColor}>
            {this.props.item.category}
          </StyledHeaderText>
          <View style={styles.row}>
            <StyledHeaderText color={textColor}>
              {moment(this.props.item.created_at).fromNow()}
            </StyledHeaderText>
            <StyledHeaderText color={textColor}>
              @{permutateReadingTime(this.props.item.content)} mins Read
            </StyledHeaderText>
          </View>
        </StyledHeaderLeftContainer>
      )}
    </ThemeContext.Consumer>
  );

  renderAppHeaderRight = () => {
    let { categoryColor } = this.props,
      { bookmarked } = this.state;
    return (
      <ThemeContext.Consumer>
        {({ theme: { iconActiveColor } }) => (
          <StyledHeaderRightContainer>
            {bookmarked !== undefined && (
              <Button onPress={this.bookmark}>
                <StyledIconContainer>
                  <Icon
                    name={bookmarked ? "bookmark" : "bookmark-border"}
                    type="material-icon"
                    style={
                      !bookmarked
                        ? styles.icon
                        : [styles.icon, { color: categoryColor }]
                    }
                  />
                </StyledIconContainer>
              </Button>
            )}
            <Button onPress={() => this.shareContent()}>
              <StyledIconContainer>
                <Icon
                  name="share-2"
                  type="feather-icon"
                  style={[styles.icon, { color: iconActiveColor }]}
                />
              </StyledIconContainer>
            </Button>
          </StyledHeaderRightContainer>
        )}
      </ThemeContext.Consumer>
    );
  };

  render() {
    return (
      <CustomAppHeader
        showBackButton
        left={this.renderAppHeaderLeft()}
        right={this.renderAppHeaderRight()}
      />
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
