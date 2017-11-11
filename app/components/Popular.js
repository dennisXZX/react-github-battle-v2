import React from 'react';
import api from '../utils/api';
import SelectedLanguage from './SelectedLanguage';
import RepoGrid from './RepoGrid';

class Popular extends React.Component {
	constructor(props) {
		super(props);

		// initialize the state
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};
	}

	updateLanguage = (lang) => {
		this.setState({
			selectedLanguage: lang,
			repos: null
		});

		// fetch the repos associated with the selected language
		api.fetchPopularRepos(lang)
			.then(repos => {
				this.setState({
					repos: repos
				});
			});		
	}

	render() {
		return (
			<div>
				<SelectedLanguage 
					selectedLanguage={this.state.selectedLanguage}
					updateLanguage={this.updateLanguage} />
        {this.state.repos
          ? <RepoGrid
            repos={this.state.repos} />
          : <h1 style={{textAlign: "center"}}>Loading repos for you...</h1>}
			</div>
		)
	}

	// update the selected language and fetch its Github repos when the component is mounted
  // the default selected language is 'All'
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
}

export default Popular;