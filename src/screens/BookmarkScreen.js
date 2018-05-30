import React from "react";
import PropTypes from "prop-types";

import AppHeader from "../components/AppHeader";
import List from "../components/List";
import ToastNotifier from "../containers/ToastNotifier";
import { DefaultCard } from "../components/Cards";
import { ConnectQuery } from "../realmDB";
import AppFab from "../components/AppFab";
import NavigationProvider from "../containers/NavigationProvider";
import { ThemeContext } from "../context/ThemeContext";

export default class BookmarkScreen extends React.PureComponent {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  render() {
    let { screenProps, navigation } = this.props;
    return (
      <NavigationProvider screenProps={screenProps} navigation={navigation}>
        <ThemeContext.Consumer>
          {({ toggleTheme }) => (
            <React.Fragment>
              <AppHeader title="Bookmark" />
              <ToastNotifier>
                <ConnectQuery schemas={["Bookmark"]}>
                  {({ Bookmark }) => (
                    <List
                      dataArray={
                        (Bookmark && Bookmark[0] && Bookmark.slice(0)) || []
                      }
                      loading={false}
                      fetchMore={null}
                      category="Bookmark"
                      isLoadingMore={false}
                      onRefresh={() => null}
                      renderItem={(key, item) => (
                        <DefaultCard
                          key={key}
                          item={item}
                          category="Bookmark"
                        />
                      )}
                    />
                  )}
                </ConnectQuery>
              </ToastNotifier>
              <AppFab name="moon" onPress={toggleTheme} />
            </React.Fragment>
          )}
        </ThemeContext.Consumer>
      </NavigationProvider>
    );
  }
}
