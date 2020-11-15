import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SelectableChat from "./SelectableChat";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {withRouter} from 'react-router-dom';

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  platformName: {
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  addChat: {
    display: "flex",
    padding: theme.spacing(1),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

class ChatDivider extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selectedChat: 0
    }
  }

  handleListItemClick(event, chatId) {
    event.preventDefault();

    this.setState({
      selectedChat: chatId
    });

    this.props.history.push('/app/chat/' + chatId);
  }

  render() {
    const { classes } = this.props;

    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">{this.props.platformName}</Typography>
        </AccordionSummary>
        <List component="nav">
        {
            this.props.chats?.map(({chatId, chatName, chatDescription, avatarUrl}, index) => 
                <ListItem key={chatId} button onClick={(event, id) => this.handleListItemClick(event, chatId)} selected={this.state.selectedChat === chatId}>
                  <SelectableChat key={chatId} chatName={chatName} chatDescription={chatDescription} avatarUrl={avatarUrl} />
                </ListItem>
            )
        }
        </List>

      </Accordion>
    );
  }
}

export default withStyles(useStyles)(withRouter(ChatDivider));
