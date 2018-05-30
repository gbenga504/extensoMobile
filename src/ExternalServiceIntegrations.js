import React from "react";
import { createLogger } from "redux-logger";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import uuid from "uuid/v1";
import KunyoraClient from "kunyora";
import { KunyoraProvider } from "react-kunyora";
import { Container } from "native-base";

import App from "./App";
import LoadingART from "./components/LoadingART";

import { appReducer } from "./reducers";
import realm from "./realm.schema";
import kunyoraConfig from "./kunyora.config";
import RealmProvider from "./realmDB";
import { SET_APP_ID } from "./actions/types";

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

export default class ExternalServiceIntegrations extends React.PureComponent {
  state = {
    isLoading: true
  };

  componentDidMount() {
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

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 5000);
  }

  render() {
    let { isLoading } = this.state;
    return (
      <RealmProvider realm={realm}>
        <Provider store={store}>
          <KunyoraProvider client={client} store={client.store}>
            {/* <Container>{isLoading ? <LoadingART /> : <App />}</Container> */}
            <App />
          </KunyoraProvider>
        </Provider>
      </RealmProvider>
    );
  }
}
