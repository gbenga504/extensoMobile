import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ScrollView, StyleSheet } from "react-native";

import AppRefreshControl from "./AppRefreshControl";
import LoadingView from "./LoadingView";
import { BoldText } from "./AppText";
import realm from "../realm.schema";
import { ThemeContext } from "../context/ThemeContext";

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor};
`;
const NullContainer = styled.View`
  align-items: center;
  margin-top: 200;
`;

export default class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: true,
      pageCount: props.initialPageCount
    };
  }

  static propTypes = {
    dataArray: PropTypes.arrayOf(
      PropTypes.shape({
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
    ),
    renderItem: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    renderNullItem: PropTypes.element,
    onRefresh: PropTypes.func,
    isLoadingMore: PropTypes.bool,
    initialPageCount: PropTypes.number,
    category: PropTypes.string,
    shouldPersistState: PropTypes.bool,
    fetchMore: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

  persistPageCountState = () => {
    realm.write(() => {
      let { pageCount } = this.state,
        { category } = this.props;
      if (pageCount == 0) {
        realm.create("Pagination", {
          category,
          pageCount: pageCount + 1
        });
      } else {
        realm.create(
          "Pagination",
          { category, pageCount: pageCount + 1 },
          true
        );
      }
    });
  };

  fetchMore = event => {
    let {
        contentOffset: { y },
        contentSize: { height },
        layoutMeasurement
      } = event.nativeEvent,
      { fetchMore, category, shouldPersistState } = this.props,
      { pageCount } = this.state;
    if (fetchMore) {
      if (height - layoutMeasurement.height == y) {
        fetchMore({
          config: {
            params: {
              page: pageCount,
              category: category || "all"
            }
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (fetchMoreResult.length === 0) {
              this.setState(prevState => ({
                hasNextPage: false
              }));
            } else {
              shouldPersistState && this.persistPageCountState();
              this.setState(prevState => ({
                pageCount: prevState.pageCount + 1
              }));
            }
            return [...previousResult, ...fetchMoreResult];
          }
        });
      }
    }
  };

  renderNullItem = textColor => (
    <NullContainer>
      <BoldText style={{ color: textColor }}> NO POSTS YET!!! </BoldText>
    </NullContainer>
  );

  renderActivityIndicator = () => (
    <LoadingView size={30} animating={this.props.isLoadingMore} />
  );

  render() {
    let { dataArray, renderItem, loading, onRefresh } = this.props;
    return (
      <ThemeContext.Consumer>
        {({ theme: { backgroundColor, textColor } }) => (
          <StyledContainer backgroundColor={backgroundColor}>
            <ScrollView
              onScroll={this.fetchMore}
              refreshControl={
                <AppRefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
            >
              {dataArray &&
                (dataArray.length == 0
                  ? this.renderNullItem(textColor)
                  : dataArray.map((rowData, i) => renderItem(i, rowData)))}
              {this.renderActivityIndicator()}
            </ScrollView>
          </StyledContainer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    alignSelf: "center",
    marginTop: 20
  }
});
