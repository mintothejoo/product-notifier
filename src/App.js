import React from 'react';
import request from 'superagent';
import soundfile from './sound.wav';
import Sound from 'react-sound';
import './App.css';

class App extends React.Component {
  state = {
    text: [],
    alarm: false,
    link: [],
    location: [],
  }

  async componentDidMount() {
    setInterval(this.getRequest, 10000);
  }

  getRequest = async () => {
    let call = await request
      .get('https://product-availability-server.herokuapp.com/')
      .withCredentials()
      .accept('json')
    call = call.body;
    console.log(call);
    const { message, isNotAvailable, links, location } = call;
    let available = false;
    let availableLinks = [];

    for(let i = 0; i<location.length; i++){
      if(!isNotAvailable[i]) {
        available = true;
        availableLinks.push({
          location: location[i],
          link: links[i],
        });
      }
    }

    this.setState({
      text: message,
      alarm: available,
      link: availableLinks,
      location,
    })
  }
  
  render() {
    const { text, alarm, link, location } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {text.map((t, i)=> (
            <p key={t+i}>{`${location[i]}: ${t}`}</p>
          ))}
          {alarm && (
            <>
              <Sound
                url={soundfile}
                playStatus={Sound.status.PLAYING}
              />
              <p> AVAILABLE! </p>
            </>
          )}
          {!alarm && (
            <p>If available, link will appear below.</p>
          )}
          <div>
            {link.map((link, index) => (
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 300}}>
                <p key={index}>{`${link.location}`}</p>
                <a href={link.link} target="_blank"> link </a>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
