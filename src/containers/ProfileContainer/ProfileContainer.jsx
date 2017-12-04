import Profile from '../../components/Profile/Profile';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

const ProfileContainer = connect(
  mapStateToProps
)(Profile);

export default ProfileContainer;