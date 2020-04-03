import React from 'react';
import request from 'superagent';
import soundfile from './sound.wav';
import Sound from 'react-sound';
import './App.css';

class App extends React.Component {
  state = {
    text: "",
    alarm: false,
    link: "Link will appear here",
  }

  async componentDidMount() {
    setInterval(this.getRequest, 30000);
  }

  getRequest = async () => {
    let call = await request
      .get('https://product-availability-server.herokuapp.com/')
      .withCredentials()
      .accept('json')
    call = call.body;
    this.setState({
      text: call.message,
      alarm: !call.isNotAvailable,
      link: call.weblink || "Link will appear here",
    })
  }
  
  render() {
    const { text, alarm, link } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Status: {text}</p>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {alarm && (
            <>
            <Sound
              url={soundfile}
              playStatus={Sound.status.PLAYING}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              />
            <p> AVAILABLE! </p>
            </>
          )}
          <p>Link: {link}</p>
        </header>
      </div>
    );
  }
}

export default App;
