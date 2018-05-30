import React from "react";
import { Container, Content } from "native-base";

import SettingsHeader from "../components/Settings/SettingsHeader";
import SectionHeader from "../components/Settings/SectionHeader";
import SectionContent from "../components/Settings/SectionContent";

export default class SettingsScreen extends React.PureComponent {
  render() {
    let {
      navigation: { navigate }
    } = this.props;
    return (
      <Container>
        <SettingsHeader title="Settings" />
        <Content>
          <SectionHeader title="Stories" />
          <SectionContent text="New Story Notification" />
          <SectionContent text="Disable Image Loading" />

          <SectionHeader title="General" />
          <SectionContent
            text="Display and Sound"
            onPress={() => navigate("generalSound")}
          />
          <SectionContent text="About" />
        </Content>
      </Container>
    );
  }
}
