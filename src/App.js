import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Homepage from './Components/Homepage.js'
import ProjectsOverview from './Components/ProjectsOverview.js'
import ProjectInfo from './Components/ProjectInfo.js'
import CreateProject from './Components/CreateProject.js'
import { initializeUserIfNeeded } from './Components/backend.js'

class App extends Component {
constructor() {
  super();
  this.state = {
    user: {},
    isLoggedIn: false
  };
}

_handleLogin = (event) => {
  initializeUserIfNeeded()
  .then(result => {
    if(result) {
      this.setState({
        user: result,
        isLoggedIn: true
      });
    }
})
}

_handleLogout = (event) => {
  this.setState({
    user: {},
    isLoggedIn: false,
  })
}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact={true} render={() => <Homepage handleLogin={this._handleLogin} isLoggedIn={this.state.isLoggedIn} userName={this.state.user.name}/> } />
          <Route path="/projects" exact={true} render={() => <ProjectsOverview isLoggedIn={this.state.isLoggedIn} user={this.state.user} handleLogout={this._handleLogout} />} />
          <Route path="/projects/createproject" exact={true} render={() => <CreateProject />} />
          <Route path="/projects/:projectid" exact={true} render={() => <ProjectInfo />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
