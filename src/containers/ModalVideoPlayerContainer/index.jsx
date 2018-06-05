import ModalVideoPlayer from '../../components/ModalVideoPlayer';
import { connect } from 'react-redux';
import { closeModalVideo } from '../../actions';

const mapStateToProps = state => {
  return {
    showing: state.showVideoModal.showing,
    videoId: state.showVideoModal.videoId
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    close: () => dispatch(closeModalVideo())
  }
}

const ModalVideoPlayerContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(ModalVideoPlayer);

export default ModalVideoPlayerContainer;