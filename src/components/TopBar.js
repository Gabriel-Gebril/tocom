import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from 'react-router-dom';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "340px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "36ch",
      "&:focus": {
        width: "42ch",
      },
    },
  },
});

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchField: ''
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    event.preventDefault();

    var query = encodeURI(this.state.searchField);

    this.setState({
      searchField: ''
    });

    this.props.history.push('/app/search?query=' + query);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                Tocom Interactive Prototype
              </Typography>

            <form onSubmit={this.onSearch}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search (chat, person, description, etc...)"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={this.state.searchField}
                onChange={(event) => this.setState({searchField: event.target.value})}
              />
            </div>
            </form>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(TopBar));
