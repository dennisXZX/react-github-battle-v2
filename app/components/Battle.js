import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      username: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='Github username'
          type='text'
          autoComplete='off'
          value={this.state.username || this.props.defaultUsername}
          onChange={this.handleChange} />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
  }

  handleSubmit = (playerId, username) => {
    this.setState(() => {
      const newState = {};
      newState[playerId + 'Name'] = username;
      newState[playerId + 'Image'] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  };

  handleReset = (playerId) => {
    this.setState(() => {
      const newState = {};
      newState[playerId + 'Name'] = '';
      newState[playerId + 'Image'] = null;
      return newState;
    });
  }

  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {/* Player One */}
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            defaultUsername='dennisboy'
            onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}>
            <button
              className='reset'
              onClick={() => this.handleReset('playerOne')}>
              Reset
            </button>
          </PlayerPreview>}

          {/* Player Two */}
          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            defaultUsername='stevema'
            onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}>
            <button
              className='reset'
              onClick={() => this.handleReset('playerTwo')}>
              Reset
            </button>
          </PlayerPreview>}
        </div>

        {/* When both players have entered the info, shows the Battle button */}
        {(playerOneImage && playerTwoImage) &&
          <Link
            className='button'
            to={{
              pathname: `${this.props.match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

export default Battle;