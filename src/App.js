import React from 'react';
import logo from './logo.svg';
import request from 'superagent';
import './App.css';

class App extends React.Component {

  async componentDidMount() {
    setInterval(this.getRequest, 2000);

  }

  getRequest = async () => {
    let call = await request
      .get('https://product-availability-server.herokuapp.com/')
      .withCredentials()
      .accept('json')
    console.log(call);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
