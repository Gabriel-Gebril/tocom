import { useState } from 'react';
import './App.css';



function App() {
  // Need the state to be stored up here so others can use it to change the behaviour of thier 
  // components.
  const [notify, toggleNotification] = useState(true); //use this for the message component to see if you need to send a notification or not.
  const [keybinds, onBindSave] = useState([{}]);
  const [events, onEventSave] = useState([]);
  return (
    <div className="App">

    </div>
  );
}

export default App;
