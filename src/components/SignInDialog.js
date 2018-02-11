import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, showDialog, signIn} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUser, parseSignIn} from "../init/Parse";
import {Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {SIGN_IN_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";



class SignInDialog extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.signInSuccess = this.signInSuccess.bind(this);
    }

    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    signInSuccess(user) {
        this.props.addUserToState(getUser(user.id, this.props.addSnackText));
        this.props.closeDialog();
        this.props.signIn();
        // this.props.addUserToState(user);
        // this.setState({redirect: true});
        // event.preventDefault();
        // Parse.User.logIn(this.state.username, this.state.password, {
        //     success: (user) => {
        //         NotificationManager.success("salam", "salam");
        //         this.props.addUserToState(user);
        //         this.setState({redirect: true});
        //     },
        //     error: (user, error) => {
        //         NotificationManager.error(error.message);
        //     }
        // });
    }

    render() {
        return(
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Sign In"
                autoScrollBodyContent={true}
                actions={
                    <div>
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={() => {
                                this.props.closeDialog()
                            }}
                        />
                        <RaisedButton
                            style={Object.assign({} , buttonThemeColorStyle)}
                            label="Sign In"
                            primary={true}
                            onClick={() => {
                                parseSignIn(
                                    this.state,
                                    this.signInSuccess,
                                    this.props.addSnackText)
                            }}
                        />
                    </div>
                }
                modal={false}
                open={this.props.dialog === SIGN_IN_DIALOG}
                onRequestClose={() => {this.props.closeDialog()}}
            >
                <TextField
                    name="username"
                    hintText="Username"
                    floatingLabelText="Username"
                    onChange={this.onChange}
                    type="text"
                    value={this.state.username}
                />
                <TextField
                    name="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    onChange={this.onChange}
                    type="password"
                    value={this.state.password}
                />
            </Dialog>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        dialog: state.pageStatus.dialog,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        showDialog: showDialog,
        closeDialog: closeDialog,
        addUserToState: addUserToState,
        signIn: signIn,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInDialog);