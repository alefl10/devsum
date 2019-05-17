import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import actions from './redux/actions/actionsMaster';
import Main from './components/Main';

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

export default App;
