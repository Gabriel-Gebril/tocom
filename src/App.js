import { useState } from "react";
import "./App.css";
import SimulatedLoginPage from "./components/SimulatedLoginPage";
import AppLayout from "./layouts/AppLayout";
import "react-chatbox-component/dist/style.css";
import { ChatBox } from "react-chatbox-component";
import { getCs50Messages, getSophiaMessages } from "./data/MessageData";
import NoChats from "./components/NoChats";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  // Need the state to be stored up here so others can use it to change the behaviour of thier
  // components.
  const [notify, toggleNotification] = useState(true); //use this for the message component to see if you need to send a notification or not.
  const [keybinds, onBindSave] = useState([{}]);
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

  return (
    <BrowserRouter>
      <Switch>
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
