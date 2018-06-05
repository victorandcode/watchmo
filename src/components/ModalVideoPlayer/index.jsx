import React from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

class ModalVideoPlayer extends React.Component {
  render() {
    return (
      <ModalVideo
        channel="youtube"
        isOpen={this.props.showing}
        videoId={this.props.videoId}
        onClose={() => this.props.close()}
      />
    );
  }
}

export default ModalVideoPlayer;
