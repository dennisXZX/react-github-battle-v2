import React from 'react';

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
		const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<div>
				<ul className='languages'>
					{languages.map(language => {
						return (
							<li key={language}
									onClick={() => this.updateLanguage(language)}
									style={language === this.state.selectedLanguage ? { color: '#d0021b' } : null}>
								{language}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Popular;