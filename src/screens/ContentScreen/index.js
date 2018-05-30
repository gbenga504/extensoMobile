import React from "react";
import { Query } from "react-kunyora";

import ContentView from "./Content";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import NavigationProvider from "../../containers/NavigationProvider";

class ContentScreen extends React.PureComponent {
  render() {
    let {
      navigation: {
        state: {
          params: { contentId }
        },
        navigate
      }
    } = this.props;

    return (
      <NavigationProvider {...this.props}>
        <Query operation="getPosts" options={{ config: { ID: contentId } }}>
          {(feeds, fetchMore, refetchQuery) => {
            let { data } = feeds,
              _data = data || {},
              { loading, isInitialDataSet, error } = feeds;
            if (loading && !isInitialDataSet) {
              return <LoadingView size={30} />;
            } else if (!isInitialDataSet && error) {
              return <ErrorView onReload={refetchQuery} />;
            }

            return (
              <ContentView
                data={_data}
                navigate={navigate}
                refetchQuery={refetchQuery}
              />
            );
          }}
        </Query>
      </NavigationProvider>
    );
  }
}

export default ContentScreen;
