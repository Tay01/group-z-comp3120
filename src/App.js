import logo from './logo.svg';
import './App.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import LoginButton from './Components/LoginButton.js';
import LogoutButton from './Components/LogoutButton.js';
import Profile from './Components/Profile.js';
import Content from './Components/Content.js';

function App() {
  
  
  return (
    <div className="App">
      <LoginButton /> 
      <LogoutButton /> 
      <Profile /> 
      <Content />
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

export default App;
