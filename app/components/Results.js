import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';

class Results extends Component {
  componentDidMount() {
    // parse the URL query parameters
    const players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName])
      .then((results) => {
        console.log(results);
      })
  }

  render() {
    return (
      <div>Results</div>
    )
  }
}

export default Results;