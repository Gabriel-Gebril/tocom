import React from "react";
import { withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import ChatDivider from "./ChatDivider";
import SettingsIcon from "@material-ui/icons/Settings";
import {withRouter} from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';

const drawerWidth = 340;

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  fixedOptions: {
    display: "flex",
    width: "100%",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    width: "100%",
  },
  icon: {
    width: 80,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
});

export class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });

    if (index === 0) {
      this.props.history.push("/app/addAccount");
    }
    if (index === 1) {
      this.props.history.push("/settings");
    }
    if (index === 2) {
      this.props.history.push("/calendar");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <ChatDivider platformName="Discord" chats={this.props.messages?.discord?.chats} />
        <ChatDivider platformName="Teams" chats={this.props.messages?.teams?.chats} />
        <ChatDivider platformName="Zoom" chats={this.props.messages?.zoom?.chats} />
        <Divider />

        <List component="nav">
          <ListItem
            button
            onClick={(event) => this.handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Account" />
          </ListItem>
          <ListItem
            button
            onClick={(event) => this.handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            onClick={(event) => this.handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(useStyles)(withRouter(SideBar));
