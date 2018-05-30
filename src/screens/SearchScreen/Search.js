import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import ToastNotifier from "../../containers/ToastNotifier";
import List from "../../components/List";

export default class Search extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func.isRequired,
    isInitialDataSet: PropTypes.bool.isRequired,
    refetchQuery: PropTypes.func.isRequired
  };

  render() {
    let {
      data,
      loading,
      fetchMore,
      isInitialDataSet,
      refetchQuery
    } = this.props;
    return (
      <ToastNotifier>
        <View style={styles.container}>
          <List
            dataArray={data}
            loading={loading}
            fetchMore={fetchMore}
            isLoadingMore={isInitialDataSet && loading}
            onRefresh={refetchQuery}
            initialPageCount={0}
            shouldPersistState
            renderItem={(key, item) => <DefaultCard key={key} item={item} />}
          />
        </View>
      </ToastNotifier>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
