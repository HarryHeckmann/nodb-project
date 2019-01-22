import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'

class App extends Component {
  constructor(){
    super()
    this.state = {
    }
  }
    
  render(){ 
    return (
      <div className="body">
        <Main/>
      </div>
    );
  }
}

export default App;
