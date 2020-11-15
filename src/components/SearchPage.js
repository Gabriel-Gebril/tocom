import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SelectableChat from "./SelectableChat";
import Typography from "@material-ui/core/Typography";

const qs = require("qs");

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(4),
    paddingLeft: theme.spacing(8),
  },
  results: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
});

class SearchPage extends React.Component {
  handleListItemClick(event, chatId) {
    this.props.history.push("/app/chat/" + chatId);
  }

  getChats(platform) {
    let chats;
    if (platform === "discord") {
      chats = this.props.messages.discord.chats;
    } else if (platform === "teams") {
      chats = this.props.messages.teams.chats;
    } else if (platform === "zoom") {
      chats = this.props.messages.zoom.chats;
    } else return [];

    if (chats.length === 0) {
      return [];
    }

    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;

    return chats.filter(({ chatName, chatDescription }) => {
      return (
        chatName.toLowerCase().includes(query.toLowerCase()) ||
        chatDescription.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  render() {
    const { classes } = this.props;

    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5">
            Search Results for: <small>{query}</small>
          </Typography>
        </div>

        <div className={classes.results}>
          {this.getChats("discord").length > 0 && (
            <div className={classes.platform}>
              <div className={classes.platformHeading}>
                <Typography variant="h5">Discord</Typography>
              </div>
              <div className={classes.platformResults}>
                <List component="nav">
                  {this.getChats("discord").map(
                    (
                      { chatId, chatName, chatDescription, avatarUrl },
                      index
                    ) => (
                      <ListItem
                        key={chatId}
                        button
                        onClick={(event, id) =>
                          this.handleListItemClick(event, chatId)
                        }
                      >
                        <SelectableChat
                          key={chatId}
                          chatName={chatName}
                          chatDescription={chatDescription}
                          avatarUrl={avatarUrl}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </div>
            </div>
          )}

          {this.getChats("teams").length > 0 && (
            <div className={classes.platform}>
              <div className={classes.platformHeading}>
                <Typography variant="h5">Microsoft Teams</Typography>
              </div>
              <div className={classes.platformResults}>
                <List component="nav">
                  {this.getChats("teams").map(
                    (
                      { chatId, chatName, chatDescription, avatarUrl },
                      index
                    ) => (
                      <ListItem
                        key={chatId}
                        button
                        onClick={(event, id) =>
                          this.handleListItemClick(event, chatId)
                        }
                      >
                        <SelectableChat
                          key={chatId}
                          chatName={chatName}
                          chatDescription={chatDescription}
                          avatarUrl={avatarUrl}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </div>
            </div>
          )}

          {this.getChats("zoom").length > 0 && (
            <div className={classes.platform}>
              <div className={classes.platformHeading}>
                <Typography variant="h5">Zoom</Typography>
              </div>
              <div className={classes.platformResults}>
                <List component="nav">
                  {this.getChats("zoom").map(
                    (
                      { chatId, chatName, chatDescription, avatarUrl },
                      index
                    ) => (
                      <ListItem
                        key={chatId}
                        button
                        onClick={(event, id) =>
                          this.handleListItemClick(event, chatId)
                        }
                      >
                        <SelectableChat
                          key={chatId}
                          chatName={chatName}
                          chatDescription={chatDescription}
                          avatarUrl={avatarUrl}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(SearchPage));
