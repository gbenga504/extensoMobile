import React from "react";
import PropTypes from "prop-types";

import AppFab from "../AppFab";
import realm from "../../realm.schema";

export default class LikeIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: parseInt(props.userLiked) == 1 ? true : false
    };
  }

  static propTypes = {
    categoryColor: PropTypes.string.isRequired,
    likeData: PropTypes.object,
    refetchContentFn: PropTypes.func.isRequired,
    updateLikeStatus: PropTypes.func.isRequired,
    schemaType: PropTypes.string,
    id: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    let {
      likeData: { data },
      refetchContentFn,
      schemaType,
      id
    } = this.props;
    if (prevProps.likeData.data !== data) {
      refetchContentFn();
      if (schemaType != undefined) {
        let user_liked = data.indexOf("removed") != -1 ? "0" : "1";
        realm.write(() => {
          realm.create(schemaType, { id, user_liked }, true);
        });
      }
    }
  }

  updateLikeStatus = () => {
    //Doing this for optimistic response of like update
    this.setState({
      liked: !this.state.liked
    });
    this.props.updateLikeStatus();
  };

  render() {
    let { categoryColor } = this.props,
      { liked } = this.state;
    return (
      <AppFab
        name={liked ? "ios-thumbs-up" : "ios-thumbs-up-outline"}
        onPress={this.updateLikeStatus}
        containerColor="#fff"
        iconColor={liked ? "#1da1f2" : "#14171a"}
      />
    );
  }
}
