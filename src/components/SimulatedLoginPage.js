import React from "react";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getSelectableChatForPlatform } from '../data/SelectableChatsData';
import { getCs50Messages, getMyFirstChatMessages, getSophiaMessages } from "../data/MessageData";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  formError: {
    color: "red",
  },
  loginForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',

  },
  container: {
    maxWidth: 960,
    minWidth: 400,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: '75%'
  },
  textfield: {
      marginBottom: theme.spacing(3),
      width: '100%',
  },
  logo: {
      maxWidth: 500,
      marginBottom: theme.spacing(4)
  }
});

class SimulatedLoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        invalid: false,
      },
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event?.preventDefault();

    if (
      this.state.email === "test@tocom.ca" &&
      this.state.password === "tocom1"
    ) {
      this.doAddAccount();
    } else {
      this.setState({ errors: { invalid: true } });
    }
  }

  handleEmailChange(event) {
    this.setState({
        email: event.target.value,
        errors: {
            invalid: false
        }
    });
  }

  handlePasswordChange(event) {
    this.setState({
        password: event.target.value,
        errors: {
            invalid: false
        }
    });
  }

  doAddAccount() {
    var accountType = this.props?.match?.params?.type;

    if (accountType === "discord") {
      this.props.addLogin({
        discord: true,
        zoom: this.props.logins.zoom,
        teams: this.props.logins.teams
        });
    } else if (accountType === "teams") {
      this.props.addLogin({
        teams: true,
        zoom: this.props.logins.zoom,
        discord: this.props.logins.discord,
      });
    } else if (accountType === "zoom") {
      this.props.addLogin({
        zoom: true,
        discord: this.props.logins.discord,
        teams: this.props.logins.teams
      });
    } 

    this.doAddMessages(accountType);

    this.props.history.push('/app');
  }

  doAddMessages(accountType) {
    var availableChats;

    if (accountType === "discord") {
      availableChats = getSelectableChatForPlatform(accountType);
      availableChats[0].messages = getMyFirstChatMessages(accountType);
      availableChats[1].messages = getCs50Messages(accountType);
      availableChats[2].messages = getSophiaMessages(accountType);

      this.props.addMessages({
        discord: {
          chats: availableChats
        },
        teams: this.props.messages.teams,
        zoom: this.props.messages.zoom,
      });

    } else if (accountType === "teams") {
      availableChats = getSelectableChatForPlatform(accountType);
      availableChats[0].messages = getMyFirstChatMessages(accountType);
      availableChats[1].messages = getCs50Messages(accountType);
      availableChats[2].messages = getSophiaMessages(accountType);

      this.props.addMessages({
        teams: {
          chats: availableChats
        },
        zoom: this.props.messages.zoom,
        discord: this.props.messages.discord
      });
    } else if (accountType === "zoom") {
      availableChats = getSelectableChatForPlatform(accountType);
      availableChats[0].messages = getMyFirstChatMessages(accountType);
      availableChats[1].messages = getCs50Messages(accountType);
      availableChats[2].messages = getSophiaMessages(accountType);

      this.props.addMessages({
        zoom: {
          chats: availableChats
        },
        teams: this.props.messages.teams,
        discord: this.props.messages.discord
      });
    } else return;
  }

  getLogo(type) {
    if (type === "discord") {
      return "/tocom/images/discord.png";
    } else if (type === "teams") {
      return "/tocom/images/teams.png";
    } else if (type === "zoom") {
      return "/tocom/images/zoom.png";
    } else return "";
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div>
            <img className={classes.logo} src={this.getLogo(this.props?.match?.params?.type)} alt="Logo"/>
          </div>

          <form className={classes.loginForm} noValidate={true} onSubmit={(e) => this.handleSubmit(e)}>
            <TextField
            className={classes.textfield}
              error={this.state.errors.invalid}
              label="Email"
              helperText={this.state.errors.invalid ? 'Invalid email or password' : ''}
              variant="outlined"
              type="email"
              value={this.state.email}
              onChange={(e) => this.handleEmailChange(e)}
            />
            <TextField
            className={classes.textfield}
              label="Password"
              variant="outlined"
              type="password"
              value={this.state.password}
              onChange={(e) => this.handlePasswordChange(e)}
            />
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(SimulatedLoginPage);
