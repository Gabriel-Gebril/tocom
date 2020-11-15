import { useState } from 'react';
import ClassCalendar from "./components/ClassCalendar";
import Settings from "./components/Settings"
import './App.css';



function App() {
  // Need the state to be stored up here so others can use it to change the behaviour of thier 
  // components.
  const [notify, toggleNotification] = useState(true); //use this for the message component to see if you need to send a notification or not.
  const [keybinds, onBindSave] = useState(
    [{
      "id": 0,
      "action": "back",
      "keybind": [
        "a",
        "b",
        "c"
      ]
    }]
    );
  const [nextkIndex, updateIndex]= useState(1)
  const [events, onEventSave] = useState([]);
  return (
    <div className="App">
      {console.log(keybinds)}
      {/* <ClassCalendar onEventSave={onEventSave} events={events}/> */}
      {/* <Settings notify={notify} toggleNotification={toggleNotification} keybinds={keybinds} onBindSave={onBindSave} nextkIndex={nextkIndex} updateIndex={updateIndex}></Settings> */}
    </div>
  );
}

export default App;
