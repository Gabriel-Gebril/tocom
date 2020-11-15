import React from "react";
import { withStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = theme => ({
  root: {
    display: "flex",
  },
  details: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1)
  },
  content: {
      
  },
  avatar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      width: 80,
  },
  avatarImage: {
      width: 64,
      height: 64
  },
  notifications: {
      display: 'flex',
      flexDirection: 'row'
  }
});

class SelectableChat extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.avatar}>
            <Avatar alt={this.props.chatName} src={this.props.avatarUrl} className={classes.avatarImage}/>
        </div>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography>
              { this.props.chatName }
            </Typography>
            <Typography color="textSecondary">
              <small>{ this.props.chatDescription }</small>
            </Typography>
          </div>
          <div className={classes.notifications}>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(SelectableChat);
