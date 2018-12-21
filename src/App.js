import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> Encryption Demo </h3>
        <FormContainer />
      </div>
    );
  }
}

export default App;
