import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const PlayerPreview = (props) => {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={props.username} />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={() => props.onReset(props.id)}>
        Reset
      </button>
    </div>
  )
};

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
          value={this.state.username}
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
            onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}
            id='playerOne'
            onReset={this.handleReset} />}

          {/* Player Two */}
          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}
            id='playerTwo'
            onReset={this.handleReset} />}
        </div>

        {/* When both players have entered the info, shows the Battle button */}
        {(playerOneImage && playerTwoImage) &&
          <Link
            className='button'
            to={{
              pathname: `${this.props.match.url}/result`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

export default Battle;