import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";

import { DefaultCard } from "../Cards";
import List from "../List";

const StyledContainer = styled.View`
  flex: 1;
`;

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: this.reConstructFeeds()
    };
  }

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.any,
        created_at: PropTypes.string.isRequired,
        user_liked: PropTypes.string.isRequired
      })
    ),
    loading: PropTypes.bool,
    isInitialDataSet: PropTypes.bool,
    onLoadMore: PropTypes.func.isRequired,
    onRefreshQuery: PropTypes.func.isRequired,
    reduxActions: PropTypes.object
  };

  static contextTypes = {
    viewColor: PropTypes.string
  };

  reConstructFeeds = () => {
    let { items } = this.props,
      _newFeeds = items || [];

    let _feeds = _newFeeds.map((feed, i) =>
      Object.assign({}, feed, {
        bookmarked: undefined,
        schemaType: undefined,
        oid: parseInt(moment(feed.created_at).format("x"))
      })
    );
    return _feeds;
  };

  render() {
    let {
        loading,
        isInitialDataSet,
        onLoadMore,
        onRefreshQuery,
        reduxActions: { setToastNotification }
      } = this.props,
      { feeds } = this.state,
      { viewColor } = this.context;

    return (
      <StyledContainer>
        <List
          dataArray={feeds}
          themeColor={viewColor}
          loading={loading}
          fetchMore={onLoadMore}
          isLoadingMore={isInitialDataSet && loading}
          onRefresh={onRefreshQuery}
          initialPageCount={0}
          renderItem={(key, item) => (
            <DefaultCard
              key={key}
              item={item}
              onAddBookmark={setToastNotification}
            />
          )}
        />
      </StyledContainer>
    );
  }
}
