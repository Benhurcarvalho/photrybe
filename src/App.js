import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Login, Admin, Home, Favorites, NotFound } from './Pages';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Login } />
        <Route path='/home' component={ Home } />
        <Route path='/admin' component={ Admin } />
        <Route path='/favorites' component={ Favorites } />
        <Route path='*' component={ NotFound } />
      </Switch>
    )
  };
}

export default App;
