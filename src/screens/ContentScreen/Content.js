import React from "react";
import { Content } from "native-base";
import { View } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Query } from "react-kunyora";
import moment from "moment";

import Header from "../../components/Content/Header";
import { ContentCard } from "../../components/Cards/";
import CustomHTMLView from "../../components/CustomHTMLView";
import { TitleStyles, BodyStyles } from "../../components/Content/EditorStyles";
import LikeIcon from "../../components/Content/LikeIcon";
import { ConnectQuery } from "../../realmDB";
import LoadingView from "../../components/LoadingView";
import realm from "../../realm.schema";
import { getSchemaType } from "../../utils";
import { ThemeContext } from "../../context/ThemeContext";

const StyledContent = styled(Content)`
  background-color: ${props => props.backgroundColor};
`;
const StyledBodyContainer = styled.View`
  background-color: ${props => props.backgroundColor};
`;
const StyledCardContainer = styled.View`
  margin-horizontal: 15;
  margin-vertical: 30;
`;
const StyledImageContainer = styled.View`
  height: 200;
  margin-top: 5;
  background-color: ${props => props.backgroundColor};
`;
const StyledImage = styled.Image`
  height: 200;
`;
const StyledContentContainer = styled.View`
  padding-horizontal: 10;
`;

export default class ContentView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      canUpdateLike: false,
      contentCard: [],
      schemaType: undefined,
      bookmarked: false,
      shouldComponentDisplay: false,
      categoryColor: ContentView.defaults.colors[Math.floor(Math.random() * 6)]
    };
  }

  state = {
    imageWidth: 0
  };

  static defaults = {
    colors: [
      "#605CA9",
      "#932290",
      "#39B979",
      "#764B1F",
      "#F2651C",
      "#127C2C",
      "#9F0306"
    ]
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    refetchQuery: PropTypes.func.isRequired,
    data: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      category: PropTypes.string,
      tags: PropTypes.any,
      created_at: PropTypes.string,
      user_liked: PropTypes.string
    })
  };

  componentDidMount() {
    let {
        data: { category, id }
      } = this.props,
      _schemaType = getSchemaType(category);
    realm.write(() => {
      let _obj = realm.objects("Bookmark").filtered(`id = "${id}"`)[0];
      this.setState({
        schemaType: _schemaType,
        bookmarked: _obj ? true : false,
        shouldComponentDisplay: true
      });
    });
  }

  onLinkPress = uri => {
    let { navigate } = this.props;
    if (/^#/.test(uri)) {
      navigate("search", {
        q: uri
      });
    } else {
      navigate("browser", {
        uri
      });
    }
  };

  handleQuery = realm => {
    let {
        data: { created_at }
      } = this.props,
      oid = parseInt(moment(created_at).format("x")),
      { schemaType } = this.state,
      _obj = realm
        .objects(schemaType)
        .filtered(`oid > "${oid}"`)
        .slice(0, 4);
    this.setState({
      contentCard: _obj
    });
  };

  onLayout = e => {
    this.setState({
      imageWidth: e.nativeEvent.layout.width
    });
  };

  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.attribs && node.attribs.publicid && node.name == "img") {
      return (
        <StyledImage
          key={index}
          source={{
            uri: `http://res.cloudinary.com/gbenga504/image/upload/c_crop,g_center,h_200,w_200/${
              node.attribs.publicid
            }`
          }}
        />
      );
    }
  };

  renderTitle = (title, textColor) => {
    const html = `<p>${title}</p>`;
    return (
      <CustomHTMLView html={html} style={TitleStyles({ color: textColor })} />
    );
  };

  renderBody = (content, textColor) => {
    const html = `<p>${content}</p>`;
    return (
      <StyledContentContainer>
        <CustomHTMLView
          onLinkPress={this.onLinkPress}
          html={html}
          style={BodyStyles({ color: textColor })}
          renderNode={this.renderNode}
        />
      </StyledContentContainer>
    );
  };

  renderOtherContent = () => {
    let { contentCard, schemaType } = this.state,
      { navigate } = this.props;
    if (schemaType) {
      return (
        <ConnectQuery
          schemas={[schemaType]}
          contentCard={contentCard.length}
          handleQuery={this.handleQuery}
        >
          {() => {
            return contentCard.map((feed, i) => (
              <ContentCard key={i} item={feed} />
            ));
          }}
        </ConnectQuery>
      );
    }
    return null;
  };

  renderLikeIcon = refetchContentFn => {
    let { categoryColor, canUpdateLike, schemaType } = this.state,
      { id, user_liked } = this.props;

    return (
      <Query
        key={2}
        operation="getLike"
        skip={!canUpdateLike}
        options={{ config: { id } }}
      >
        {(like, fetchMore, refetchQuery) => (
          <LikeIcon
            userLiked={user_liked}
            categoryColor={categoryColor}
            id={id}
            likeData={like}
            refetchContentFn={refetchContentFn}
            schemaType={schemaType}
            updateLikeStatus={() =>
              this.setState({ canUpdateLike: true }, () => refetchQuery())
            }
          />
        )}
      </Query>
    );
  };

  render() {
    let {
        data: { title, content },
        refetchQuery,
        data
      } = this.props,
      {
        categoryColor,
        shouldComponentDisplay,
        schemaType,
        bookmarked
      } = this.state;

    return shouldComponentDisplay ? (
      <ThemeContext.Consumer>
        {({ theme: { backgroundColor, textColor } }) => (
          <View style={{ flex: 1 }} onLayout={this.onLayout}>
            <Header
              categoryColor={categoryColor}
              item={data}
              bookmarked={bookmarked}
              schemaType={schemaType}
            />
            <StyledContent backgroundColor={backgroundColor}>
              <StyledBodyContainer backgroundColor={backgroundColor}>
                {this.renderTitle(title, textColor)}
                {this.renderBody(content, textColor)}
              </StyledBodyContainer>
              <StyledCardContainer>
                {this.renderOtherContent()}
              </StyledCardContainer>
            </StyledContent>
            {this.renderLikeIcon(refetchQuery)}
          </View>
        )}
      </ThemeContext.Consumer>
    ) : (
      <LoadingView size={30} />
    );
  }
}