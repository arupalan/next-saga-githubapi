import { updateUser , fetchRepos, fetchIssues, setStatus } from '../actions';
import {connect} from 'react-redux';
import Button from './common/button';
import Input from './common/input';


class SearchForm extends React.Component {
  fetchIssues  = () => {
    this.props.dispatch(fetchIssues())
  }

	updateUser = () => {
		this.props.dispatch(updateUser())
	}

	setStatus = (event) => {
    const value = event.target.value;
		this.props.dispatch(setStatus(value))
  }

   _prev =  {
       repoName: ''
    }

    state = {
           user: {
               userName: '',
               repoName: ''
           },

           matchedRepos: [],
           showDropdown: true,
           enterDropdown: false,
           repoSelected: false,
           loading: false
    };

    componentDidUpdate (prevProps, { user: { userName, repoName } }) {
        let user = this.state.user;
        if (userName !== user.userName ||
            repoName !== user.repoName) {
            this.props.dispatch(updateUser(user));
        }
    }

    _updateUser = () => {

        return new Promise((resolve, reject) => {

            this.setState({ user: {
                userName: this.refs.userName.getValue(),
                repoName: this.refs.repoName.getValue()
            } }, resolve);
        });
    }

    _matchRepos = () =>  {
        const repoName = this.state.user.repoName;
        return repoName ?
           this.props.repos
                .map(repo => repo.name)
                .filter(name => name.startsWith(repoName)) :
            [];
    }

    _onNameChange = () => {

        this._updateUser();
    }

    _onRepoChange = () => {

        this._updateUser()
            .then(() => {
                const nextState = { matchedRepos: this._matchRepos() };
                !this.state.showDropdown &&
                    (nextState.showDropdown = true);
                this.setState(nextState);
            });
    }

    _onRepoFocus = () => {

        const userName = this.state.user.userName;
        if (userName !== this._prev.repoName) {
            this.setState({ loading: true });
            this._prev.repoName = userName;
            this.props.dispatch(fetchRepos(this.state.user));
            this.setState({
                    showDropdown: true,
                    matchedRepos: this._matchRepos(),
                    loading: false
             });
        } else {
            !this.state.showDropdown && this.setState({ showDropdown: true });
        }

        if (this.state.repoSelected && this.state.showDropdown) {
            this.setState({
                showDropdown: false,
                repoSelected: false
            });
        }
    }

    _onRepoBlur = () => {
        !this.state.enterDropdown && this.setState({ showDropdown: false });
    }

    _onRepoKeyDown = (event) => {
        if (event.keyCode === 40) {
            event.preventDefault();
            this.setState({ enterDropdown: true });
        }
    }

    _focusToRepoName = () => {
        this.setState({ enterDropdown: false}, () => {
            this.refs.repoName.refs.input.getDOMNode().focus();
        });
    }

    _onSubmit = (event) => {
        event.preventDefault();
        this._submitForm();
    }

    _submitForm = () => {this.fetchIssues()}

    render() {
        const {user, repos , selectedRepo, issues , pagination} = this.props  
        return (
					 <div className="container-fluid alert alert-primary">
            <form ref='form' className="form-inline" onSubmit={this._onSubmit}>
							<div className="form-group mr-3">
								<Input ref='userName' 
									label='GitHub username'
									value={this.state.user.userName}
									onChange={this._onNameChange}
									required />
							</div>
							<div className="form-group mr-3">
								<Input ref='repoName' className="form-group mb-2" 
									label='Repository name'
									value={this.state.user.repoName}
									onChange={this._onRepoChange}
									onFocus={this._onRepoFocus}
									onBlur={this._onRepoBlur}
									onKeyDown={this._onRepoKeyDown}
									required>
									{this.state.loading ? loader : null}
								</Input>
							</div>

								<div onChange={event => this.setStatus(event)} className="ml-4 mt-3"> 
										<div className="form-check-inline"> 
											<label className="form-check-label">
													<input className="form-check-input" type="radio" value='' name="optradio" defaultChecked/>All
											</label>
										</div>
										<div className="form-check-inline">
											<label className="form-check-label">
													<input className="form-check-input" type="radio" value='open' name="optradio"/>Open
											</label>
										</div>
										<div className="form-check-inline">
											<label className="form-check-label">
													<input className="form-check-input" type="radio" value='closed' name="optradio" />Closed
											</label>
										</div>
								</div>

              <Button type='submit' className="btn btn-primary mt-3 ml-4">List issues</Button>
            </form>
					 </div>
        );
    }
}

const mapStateToProps = ({user, repos}) => ({user, repos})
/*
const mapDispatchToProps = dispatch => {
  return {
    updateUser: () => dispatch(updateUser()),
    fetchRepos: () => dispatch(fetchRepos()),
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
*/

export default connect(mapStateToProps)(SearchForm)
