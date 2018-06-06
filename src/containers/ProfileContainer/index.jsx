import Profile from "../../components/Profile";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isMobile: state.browser.lessThan.medium,
    users: state.users
  };
};

const ProfileContainer = connect(mapStateToProps)(Profile);

export default ProfileContainer;
