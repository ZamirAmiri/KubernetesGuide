import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getHome } from './hooks/services/home';

function App() {
  const [response, setResponse] = useState(String);

  const callGetHome = async ()=>{
    const response = await getHome();
    setResponse(response.title);
  }

  callGetHome();

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
          Learn React
        </a>
      <div>
        Response: {response}
      </div>
      </header>
    </div>
  );
}

export default App;
