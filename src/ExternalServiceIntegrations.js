import React from "react";
import { createLogger } from "redux-logger";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import uuid from "uuid/v1";
import KunyoraClient from "kunyora";
import { KunyoraProvider } from "react-kunyora";
import { Container } from "native-base";
import { AsyncStorage } from "react-native";
import codePush from "react-native-code-push";

import App from "./App";
import LoadingART from "./components/LoadingART";

import { appReducer } from "./reducers";
import realm from "./realm.schema";
import kunyoraConfig from "./kunyora.config";
import RealmProvider from "./realmDB";
import { SET_APP_ID, SET_APPLICATION_THEME } from "./actions/types";
import { themes } from "./context/ThemeContext";

const store = createStore(
  combineReducers({
    ...appReducer
  }),
  {},
  compose(applyMiddleware(createLogger()))
);

const client = KunyoraClient({ ...kunyoraConfig });

client.middleware({
  useBeforeRequest: function(header) {
    return {
      ...header,
      common: {
        ...header.common,
        appid: store.getState().appId
      }
    };
  }
});

class ExternalServiceIntegrations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.verifyUser();
    this.getApplicationTheme();
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 6000);
  }

  getApplicationTheme = () => {
    AsyncStorage.getItem("@extensoTheme", (error, result) => {
      if (result !== null && !error) {
        store.dispatch({
          type: SET_APPLICATION_THEME,
          theme: JSON.parse(result)
        });
      } else {
        store.dispatch({
          type: SET_APPLICATION_THEME,
          theme: themes.light
        });
      }
    });
  };

  verifyUser = () => {
    let User = realm.objects("User"),
      appid = null;
    if (User && User[0] && User[0].userId) {
      appid = User[0].userId;
    } else {
      appid = uuid();
      realm.write(() => {
        realm.create("User", { userId: appid });
      });
    }

    store.dispatch({
      type: SET_APP_ID,
      appId: appid
    });
  };

  render() {
    let { isLoading } = this.state;
    return (
      <RealmProvider realm={realm}>
        <Provider store={store}>
          <KunyoraProvider client={client} store={client.store}>
            <Container>{isLoading ? <LoadingART /> : <App />}</Container>
          </KunyoraProvider>
        </Provider>
      </RealmProvider>
    );
  }
}

const _ExternalServiceIntegrations = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
})(ExternalServiceIntegrations);

export default _ExternalServiceIntegrations;
