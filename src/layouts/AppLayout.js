import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import NoChats from "../components/NoChats";
import { Route, Switch } from "react-router-dom";
import Chat from "../components/Chat";
import "../App.css";
import SearchPage from "../components/SearchPage";
import { store } from 'react-notifications-component';
const sidebarWidth = 300;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  toolbar: {
    minHeight: 'calc(100vh - 64px)'
  },
  content: {
    marginLeft: 340,
  },
});

class AppLayout extends React.Component {
  anyLogins() {
    if (
      this.props.logins.discord ||
      this.props.logins.zoom ||
      this.props.logins.teams
    ) {
      return true;
    } else return false;
  }

  getMessages(id) {
    var intId = parseInt(id);

    const messages = [
      ...this.props.messages.discord.chats,
      ...this.props.messages.teams.chats,
      ...this.props.messages.zoom.chats,
    ];

    var filtered = messages.filter(({ chatId }) => {
      return chatId === intId;
    });

    return filtered[0].messages;
  }

  onSubmit(chatId, props) {
    console.log("creating on submit function");

    return function (message) {
      console.log("onSubmit called");
      console.log(chatId + " " + message);
      //console.log(props);

      var newMessage = {
        text: message,
        id: 0,
        sender: {
          name: "Me",
          uid: "currentUser",
          avatar: "https://ui-avatars.com/api/?name=M+E",
        },
      };

      var discord = props.messages.zoom;
      var teams = props.messages.teams;
      var zoom = props.messages.zoom;

      if (chatId >= 1 && chatId <= 3) {
        var discordChats = [...props.messages.discord.chats];

        newMessage.id = discordChats[chatId - 1].messages.length + 1;

        discordChats[chatId - 1].messages = [
          ...discordChats[chatId - 1].messages,
          newMessage,{
            "text": "This is an automated response",
            "id": newMessage.id + 1,
            "sender": {
                "name": "CS50 Bot",
                "uid": "cs50bot_discord",
                "avatar": "/tocom/images/bot.jpg"
            }
        }
        ];

        store.addNotification({
          title: "CS50 Bot has sent you a message on discord!",
          message: "This is an automated response",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });

        discord = {
          chats: discordChats,
        };
      } else if (chatId >= 4 && chatId <= 6) {
        var teamsChats = [...props.messages.teams.chats];

        newMessage.id = teamsChats[chatId - 4].messages.length + 1;

        teamsChats[chatId - 4].messages = [
          ...teamsChats[chatId - 4].messages,
          newMessage,
        ];

        teams = {
          chats: teamsChats,
        };
      } else if (chatId >= 7 && chatId <= 9) {
        var zoomChats = [...props.messages.zoom.chats];

        newMessage.id = zoomChats[chatId - 7].messages.length + 1;

        zoomChats[chatId - 7].messages = [
          ...zoomChats[chatId - 7].messages,
          newMessage,
        ];

        zoom = {
          chats: zoomChats,
        };
      }

      props.addMessage({
        discord: discord,
        teams: teams,
        zoom: zoom,
      });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar />
        <SideBar messages={this.props.messages} />
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Switch>
              <Route
                path="/app/addAccount"
                render={() => <NoChats logins={this.props.logins} />}
              />
              <Route
                path="/app/chat/:id"
                render={(props) => (
                  <Chat
                    {...props}
                    user={this.props.user}
                    messages={this.getMessages(props.match.params.id)}
                    chatId={props.match.params.id}
                    onSubmit={this.onSubmit(
                      parseInt(props.match.params.id),
                      this.props
                    )}
                  />
                )}
              />
              <Route
                path="/app/search"
                render={(props) => (
                  <SearchPage {...props} messages={this.props.messages} />
                )}
              />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(AppLayout);
