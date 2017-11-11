import React from 'react';
import PropTypes from 'prop-types';

const SelectedLanguage = ({selectedLanguage, updateLanguage}) => {

  // initialize the language options in nav bar
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

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

export default SelectedLanguage;