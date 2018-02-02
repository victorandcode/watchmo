import Profile from '../../components/Profile/Profile';
import { connect } from 'react-redux';
import { markAboutWasShon } from '../../actions';

const mapStateToProps = state => {
  return {
    isMobile: state.browser.lessThan.medium,
    users: state.users,
    showModalOnLoad: !state.userInteractions.aboutWasShown
  }
};

const mapDispatchToLinksProps = dispatch => {
  return {
    onModalShown: () => {
      dispatch(markAboutWasShon());
    }
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToLinksProps
)(Profile);

export default ProfileContainer;