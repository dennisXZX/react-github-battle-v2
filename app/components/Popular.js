import React from 'react';
import PropTypes from 'prop-types';

function SelectedLanguage({updateLanguage, selectedLanguage}) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
	
	return (
		<div>
			<ul className='languages'>
				{languages.map(language => {
					return (
						<li key={language}
								onClick={() => updateLanguage(language)}
								style={language === selectedLanguage ? { color: '#d0021b' } : null}>
							{language}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};
	}

	updateLanguage = (lang) => {
		this.setState({
			selectedLanguage: lang
		})
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
}

export default Popular;