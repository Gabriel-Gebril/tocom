import { useState, useEffect } from "react";
import "./App.css";
import SimulatedLoginPage from "./components/SimulatedLoginPage";
import AppLayout from "./layouts/AppLayout";
import "react-chatbox-component/dist/style.css";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import ClassCalendar from "./components/ClassCalendar";
import Settings from "./components/Settings"
import './App.css';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


function App() {
  // Need the state to be stored up here so others can use it to change the behaviour of thier
  // components.
  const [notify, toggleNotification] = useState(true); //use this for the message component to see if you need to send a notification or not.
  const [keybinds, onBindSave] = useState(
    [{
      "id": 0,
      "action": "unassigned",
      "keybind": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    }]
    );
  const [nextkIndex, updateIndex]= useState(1)
  const [events, onEventSave] = useState([]);

  const [logins, onAddLogin] = useState({
    discord: false,
    teams: false,
    zoom: false,
  });

  const [user, updateUser] = useState({
    "uid": 'currentUser'
  });

  const [messages, onMessageSave] = useState({
    discord: {
      chats: [],
    },
    teams: {
      chats: [],
    },
    zoom: {
      chats: [],
    },
  });
  const [currSeq, updateSeq] = useState([]);
  
  const handleKeyDown = (event) => {
    if (!event.repeat){
      //
      updateSeq([...currSeq,event.key.toLowerCase()])
    }
    
  };
  const handleKeyUp = (event) => {
    if (currSeq.includes(event.key.toLowerCase() )){
      updateSeq([])
    }
  }; 

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let obj = keybinds.find((o) => {
      if (o.keybind.equals(currSeq)) {
          return o;
      }
     });
    if (obj){
      if (obj.action === "back"){
        window.history.back();
        updateSeq([])
      }else if (obj.action === "notify"){
        console.log("toggling notifications",notify)
        toggleNotification(!notify);
        updateSeq([])
      }else if (obj.action === "unassigned"){
        console.log("Do Nothing")
        updateSeq([])
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyDown);
    };
  },[keybinds,currSeq,updateSeq,handleKeyDown,toggleNotification,handleKeyUp,notify]);

  return (
    
    <BrowserRouter>
    {notify? <ReactNotification /> : ""}  
      <Switch>
        <Route exact path="/"><Redirect to="/app" /></Route>
        <Route path="/app">
          <AppLayout
            logins={logins}
            addLogin={onAddLogin}
            messages={messages}
            addMessage={onMessageSave}
            user={user}
          />
        </Route>
        <Route
          exact
          path="/external/connectAccount/:type"
          render={(props) => (
            <SimulatedLoginPage
              {...props}
              logins={logins}
              addLogin={onAddLogin}
              addMessages={onMessageSave}
              messages={messages}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={(props) => (
            <Settings notify={notify} messages={messages} toggleNotification={toggleNotification} keybinds={keybinds} onBindSave={onBindSave} nextkIndex={nextkIndex} updateIndex={updateIndex}></Settings>

          )}
        />
        <Route
          exact
          path="/calendar"
          render={(props) => (
            <ClassCalendar onEventSave={onEventSave} messages={messages} events={events}/>

          )}
        />
      </Switch>
    </BrowserRouter>
      
  );
}

export default App;
