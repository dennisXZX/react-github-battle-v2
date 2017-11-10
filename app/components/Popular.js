import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import SelectedLanguage from './SelectedLanguage';

class Popular extends React.Component {
	constructor(props) {
		super(props);

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
			</div>
		)
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
}

export default Popular;