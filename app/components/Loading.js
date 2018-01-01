import React, { Component } from 'react';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    const stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({
          text: this.props.text
        });
      } else {
        this.setState((prevState) => {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }, this.props.speed);
  }

  // when the component is unmounted, clean up the timer
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

export default Loading;