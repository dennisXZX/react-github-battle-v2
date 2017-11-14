import React from 'react';

import Nav from './Nav';
import Popular from './Popular';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
      <Router>
        <div className="container">
          <Nav />
          <Route path="/popular" component={Popular} />
        </div>
      </Router>
		)
	}
}

export default App;