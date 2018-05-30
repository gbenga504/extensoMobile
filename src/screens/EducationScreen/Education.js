import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";

import List from "../../components/List";
import { DefaultCard } from "../../components/Cards";
import ToastNotifier from "../../containers/ToastNotifier";
import realm from "../../realm.schema";

class Education extends React.PureComponent {
  static propTypes = {
    feeds: PropTypes.any.isRequired,
    fetchMore: PropTypes.func.isRequired,
    refetchQuery: PropTypes.func.isRequired,
    queryFeeds: PropTypes.object.isRequired,
    pageCount: PropTypes.number.isRequired
  };

  componentDidUpdate(prevProps) {
    let { queryFeeds } = this.props,
      _newFeeds = queryFeeds.data || [],
      _oldFeeds = (prevProps.queryFeeds && prevProps.queryFeeds.data) || [];

    if (!_.isEqual(_newFeeds, _oldFeeds)) {
      try {
        realm.write(() => {
          _newFeeds.map((feed, i) => {
            (feed => {
              realm.create(
                "Education",
                Object.assign({}, feed, {
                  bookmarked: false,
                  schemaType: "Education",
                  oid: parseInt(moment(feed.created_at).format("x"))
                })
              );
            })(feed);
          });
        });
      } catch (err) {
        //@Todo , slowly kill the error
      }
    }
  }

  render() {
    let { queryFeeds, pageCount, refetchQuery, fetchMore, feeds } = this.props;

    return (
      <ToastNotifier>
        <View style={styles.container}>
          <List
            dataArray={feeds || []}
            loading={queryFeeds.loading}
            fetchMore={fetchMore}
            category="Education"
            isLoadingMore={queryFeeds.isInitialDataSet && queryFeeds.loading}
            onRefresh={refetchQuery}
            initialPageCount={pageCount}
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

export default Education;
