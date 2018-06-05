import { connect } from "react-redux";
import AppLightbox from "../../components/AppLightbox";
import { closeLightbox, setLightboxIndex } from "../../actions";

const mapStateToProps = state => {
  return {
    isOpen: state.showLightbox.showing,
    index: state.showLightbox.index,
    images: state.showLightbox.images
  };
};

const mapDispatchToLinkProps = dispatch => {
  return {
    close: () => {
      dispatch(closeLightbox());
    },
    setIndex: index => {
      dispatch(setLightboxIndex(index));
    }
  };
};

const AppLightboxContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(AppLightbox);

export default AppLightboxContainer;
