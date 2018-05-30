import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import EVILIcon from "react-native-vector-icons/EvilIcons";
import IONICon from "react-native-vector-icons/Ionicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MATIcon from "react-native-vector-icons/MaterialIcons";
import SIMPLEIcon from "react-native-vector-icons/SimpleLineIcons";
import MATCOMMIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FEATHERIcon from "react-native-vector-icons/Feather";

class Icon extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.any,
    contentContainerStyle: PropTypes.any,
    onPress: PropTypes.func
  };

  /**
   * @return {component|null}
   * make decision to present a particular icon based on the type supplied by the user
   */
  getIconToRender = () => {
    let icon = null,
      { contentContainerStyle, onPress, name, type, style } = this.props,
      newStyles = style || {};

    switch (type) {
      case "evil-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <EVILIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "material-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "simple-line-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <SIMPLEIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "ionic-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <IONICon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "font-awesome-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FAIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "community-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATCOMMIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      case "feather-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FEATHERIcon style={[newStyles]} name={name} />
          </Text>
        );
        break;
      default:
        console.warn(
          "Sorry the type you provided is not supported. \n The supported types are a) font-awesome-icon \n b) ionic-icon \n c) material-icon \n d) simple-line-icon \n e) evil-icon f) community-icon"
        );
        icon = null;
    }
    return icon;
  };

  render() {
    return this.getIconToRender();
  }
}

export default Icon;
