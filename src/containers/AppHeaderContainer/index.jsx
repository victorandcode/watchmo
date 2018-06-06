import { connect } from "react-redux";
import AppHeader from "../../components/AppHeader";

const mapStateToProps = state => {
  return {
    shouldTriggerBigSearch:
      state.browser.is.extraSmall || state.browser.lessThan.extraSmall
  };
};

const AppHeaderContainer = connect(mapStateToProps)(AppHeader);

export default AppHeaderContainer;
