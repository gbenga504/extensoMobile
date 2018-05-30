import React from "react";
import { Query } from "react-kunyora";

import SearchHeader from "../components/SearchHeader";
import Posts from "../components/Search/Posts";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    let {
      navigation: {
        state: {
          params: { q }
        }
      }
    } = props;
    this.state = {
      navigationOptions: {
        index: 0,
        routes: [{ key: "1", title: "Posts" }, { key: "2", title: "Tags" }]
      },
      searchValue: q || ""
    };
  }

  render() {
    let q = encodeURIComponent(this.state.searchValue.trim());

    return (
      <React.Fragment>
        <SearchHeader
          searchValue={this.state.searchValue}
          onEnter={value =>
            this.setState({ searchValue: value }, () => this.refetchQuery)
          }
          onSearch={value => this.setState({ searchValue: value })}
        />
        <Query
          operation="getPosts"
          skip={q.length > 0 ? false : true}
          options={{
            config: {
              params: { q }
            }
          }}
        >
          {(feeds, fetchMore, refetchQuery) => {
            let { data } = feeds,
              _data = data || [],
              { loading, isInitialDataSet, error } = feeds;
            if (loading && !isInitialDataSet) {
              return <LoadingView size={30} />;
            } else if (isInitialDataSet && error) {
              return <ErrorView onReload={refetchQuery} />;
            }

            if (!this.refetchQuery) this.refetchQuery = refetchQuery;

            return (
              <Posts
                items={_data}
                loading={loading}
                isInitialDataSet={isInitialDataSet}
                onLoadMore={fetchMore}
                onRefreshQuery={refetchQuery}
                reduxActions={this.props.screenProps}
              />
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
