import React from "react";
import { Query } from "react-kunyora";

import SearchHeader from "../../components/SearchHeader";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import NavigationProvider from "../../containers/NavigationProvider";
import Search from "./Search";

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    // let {
    //   navigation: {
    //     state: {
    //       params: { q }
    //     }
    //   }
    // } = props;
    let q = undefined;
    this.state = {
      searchValue: q || "ope"
    };
  }

  render() {
    let { searchValue } = this.state,
      q = encodeURIComponent(searchValue.trim());
    return (
      <NavigationProvider {...this.props}>
        <React.Fragment>
          <SearchHeader
            searchValue={searchValue}
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
              return (
                <Search
                  data={_data}
                  loading={loading}
                  fetchMore={fetchMore}
                  isInitialDataSet={isInitialDataSet}
                  refetchQuery={refetchQuery}
                />
              );
            }}
          </Query>
        </React.Fragment>
      </NavigationProvider>
    );
  }
}
