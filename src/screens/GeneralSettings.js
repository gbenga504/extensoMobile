import React from "react";
import { Container, Content } from "native-base";

import SettingsHeader from "../components/Settings/SettingsHeader";
import SectionHeader from "../components/Settings/SectionHeader";
import SectionContent from "../components/Settings/SectionContent";

export default class GeneralSettings extends React.PureComponent {
  render() {
    return (
      <Container>
        <SettingsHeader title="General Settings" />
        <Content>
          <SectionHeader title="Display" />
          <SectionContent text="Night mode" />

          <SectionHeader title="Web browser" />
          <SectionContent text="Use in-app browser" />
        </Content>
      </Container>
    );
  }
}
