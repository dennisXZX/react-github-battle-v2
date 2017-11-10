import React from 'react';

const SelectedLanguage = ({updateLanguage, selectedLanguage}) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <div>
      <ul className='languages'>
        {languages.map((language) => {
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

export default SelectedLanguage;