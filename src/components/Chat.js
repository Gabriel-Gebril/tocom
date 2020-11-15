import React from 'react';
import { withStyles } from '@material-ui/core';
import { ChatBox } from 'react-chatbox-component';

const useStyles = theme => ({

});

class Chat extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            
            <ChatBox
                messages={this.props.messages}
                user={this.props.user}
                onSubmit={this.props.onSubmit}
            />
        );
    }
}

export default withStyles(useStyles)(Chat);