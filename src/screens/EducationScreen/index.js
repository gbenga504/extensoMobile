import React from "react";
import { Query } from "react-kunyora";
import { View } from "react-native";
import PropTypes from "prop-types";

import { ConnectQuery } from "../../realmDB";
import Education from "./Education";

const SCHEMAS = ["Education", "Pagination"];

const EducationQuery = props => {
  let eduPagination =
      (props.pagination &&
        props.pagination.filtered('category = "Education"')) ||
      undefined,
    _page = eduPagination && eduPagination[0],
    _pageCount = (_page && _page.pageCount) || 0;
  return (
    <Query
      operation="getPosts"
      options={{
        config: { params: { category: "Education", page: _pageCount } }
      }}
    >
      {(feeds, fetchMore, refetchQuery) => (
        <Education
          feeds={props.realmFeeds}
          fetchMore={fetchMore}
          refetchQuery={refetchQuery}
          queryFeeds={feeds}
          pageCount={_pageCount}
          {...props}
        />
      )}
    </Query>
  );
};

EducationQuery.propTypes = {
  pagination: PropTypes.any,
  realmFeeds: PropTypes.any
};

export default (EducationScreen = props => (
  <ConnectQuery schemas={SCHEMAS}>
    {({ Education, Pagination }) => {
      return (
        <EducationQuery
          pagination={Pagination}
          realmFeeds={
            (Education && Education[0] && Education.slice(0).reverse()) || []
          }
          {...props}
        />
      );
    }}
  </ConnectQuery>
));
