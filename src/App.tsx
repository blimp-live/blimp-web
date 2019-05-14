import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        <EnterButton></EnterButton>
          HELLO WORLD
        </a>
      </header>
    </div>
  );
}

const EnterButton = () => (
  <div>
    <Button type="submit" className="button" >
      Test
    </Button>
    <br />
    <br />
  </div>
);

export default App;
