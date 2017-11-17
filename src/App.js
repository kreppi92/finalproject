import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Homepage from './Components/Homepage.js'
import ProjectsOverview from './Components/ProjectsOverview.js'
import ProjectInfo from './Components/ProjectInfo.js'
import CreateProject from './Components/CreateProject.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact={true} render={() => <Homepage />} />
          <Route path="/projects" exact={true} render={() => <ProjectsOverview />} />
          <Route path="/projects/createproject" exact={true} render={() => <CreateProject />} />
          <Route path="/projects/:projectid" exact={true} render={() => <ProjectInfo />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
