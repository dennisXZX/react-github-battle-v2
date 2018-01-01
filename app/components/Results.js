import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';

const Profile = (props) => {
  const info = props.info;
  console.log(info);

  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.info}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog} target='_blank'>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

const Player = (props) => {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <Profile
        info={props.profile}/>
    </div>
  )
}

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    // parse the URL query parameters
    const players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName])
      .then((results) => {
        // check if there is an error
        if (results === null) {
          this.setState({
            error: 'Look like there was an error. Check that both users exist on Github.',
            loading: false
          });
        }

        this.setState({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        });
      })
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading === true) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile} />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile} />
      </div>
    )
  }
}

export default Results;