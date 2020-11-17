import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  types: {
    display: "flex",
    flexDirection: "row",
  },
  type: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    margin: theme.spacing(8),
  },
  text: {
    
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: theme.spacing(2)
  },
});

class NoChats extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.text} variant="h4">
          Connect an Account
        </Typography>
        <div className={classes.types}>
          {!this.props.logins.discord && (
            <div className={classes.type}>
              <div className={classes.typeLogo}>
                <img className={classes.logo} src="/tocom/images/discord_icon.png" />
              </div>
              <Button variant="outlined" color="primary" component={Link} to="/external/connectAccount/discord">
                Add Discord Account
              </Button>
            </div>
          )}
          {!this.props.logins.teams && (
            <div className={classes.type}>
              <div className={classes.typeLogo}>
                <img className={classes.logo} src="/tocom/images/teams_icon.png" />
              </div>
              <Button variant="outlined" color="primary" component={Link} to="/external/connectAccount/teams">
                Add Teams Account
              </Button>
            </div>
          )}
          {!this.props.logins.zoom && (
            <div className={classes.type}>
              <div className={classes.typeLogo}>
                <img className={classes.logo} src="/tocom/images/zoom_icon.png" />
              </div>
              <Button variant="outlined" color="primary" component={Link} to="/external/connectAccount/zoom">
                Add Zoom Account
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(NoChats);
