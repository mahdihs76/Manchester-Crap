import React, {Component} from 'react';
import {parseInitializer} from "../init/ParseInit";
import {connect} from 'react-redux'
import {addGameIdToState, addIsHomeToState, addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {
    BIRTH_DATE, CITY, FIRST_NAME, GENDER, LAST_NAME, OBJECT_ID, PLAYER, SCORE, USER, USER_HOME,
    USER_NAME
} from "../constansts/DBColumn";
import {USER_GUEST} from "../constansts/DBColumn";
import {IS_PEND} from "../constansts/DBColumn";
import {POSITION_HOME} from "../constansts/DBColumn";
import {POSITION_GUEST} from "../constansts/DBColumn";
import {IS_HOME_PLAYED} from "../constansts/DBColumn";
import {IS_GUEST_PLAYED} from "../constansts/DBColumn";
import "../App.css"
import {FlatButton, Paper} from "material-ui";
import {APP_PRIMARY_COLOR} from "../constansts/AppDetail";
import {openGameFlatButtonLabelStyle} from "../constansts/Styles";


let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
const User = Parse.Object.extend("User");
let subscription;



class UserPage extends Component {
    constructor() {
        super();

        this.state = {
            user : null,
            showPopup: false,
            isLoading:false,
            gameId: null,
            leaderBoardPopUp : false,
            leaderBoardData : null
        };
        this.startGame = this.startGame.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.hostGame = this.hostGame.bind(this);
        this.showLeaderBoard = this.showLeaderBoard.bind(this);

        let query = new Parse.Query(Game);
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            if (object.id === this.state.gameId) {
                this.setState({
                    redirect: !object.get(IS_PEND),
                })
            }
        });

    }


    startGame() {
        let query = new Parse.Query(Game);
        query.equalTo(IS_PEND, true);
        query.first({
            success: (object) => {
                if (object) {
                    object.set(IS_PEND, false);
                    object.set(USER_GUEST, this.props.user);
                    object.save();
                    this.props.addGameIdToState(object.id);
                    this.props.addIsHomeToState(false);
                    alert("You joined");


                } else {
                    this.hostGame()
                }
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    editProfile(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    showLeaderBoard() {
        let query = new Parse.Query(User);
        query.descending(SCORE);
        query.find({
            success: (object) => {
                console.log(object);
                this.setState({ leaderBoardData: object, leaderBoardPopUp: !this.state.leaderBoardPopUp });
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

    hostGame() {
        let game = new Game();
        game.set(USER_HOME, this.props.user);
        game.set(IS_PEND, true);
        game.set(POSITION_HOME, 0);
        game.set(POSITION_GUEST, 0);
        game.set(IS_HOME_PLAYED, false);
        game.set(IS_GUEST_PLAYED, true);

        game.save(null, {
            success:(game) => {
                this.props.addGameIdToState(game.id);
                this.props.addIsHomeToState(true);
                // alert("You hosted");
                this.setState({isLoading: true, gameId: game.id});
            },
            error: function (gameScore, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }


    render() {
        return (
            <div>
                <p>Hi {this.props.user.username}</p>
                <button onClick={this.startGame}>Play Mench</button>
                <button onClick={this.editProfile}>Edit Your Profile</button>
                <button onClick={this.showLeaderBoard}>Leader Board</button>
                {this.state.isLoading?<ReactLoading type="spinningBubbles" color="black"/>:null}
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.editProfile.bind(this)}>
                        <ProfileInfo player={this.state.player} onSubmit={this.saveProfileInfo}/>

                    </Popup> : null}

                {this.state.leaderBoardPopUp ?
                    <Popup
                        text='Close Me'
                        closePopup={this.showLeaderBoard.bind(this)}>
                        <PlayerLeaderBoard users={this.state.leaderBoardData}/>
                    </Popup> : null}
            </div>
        )
    }
}

class Popup extends React.Component {
    render() {
        return (
            <div style={{textAlign: "center", marginTop:"400px"}}>
                <FlatButton
                    style={{backgroundColor: APP_PRIMARY_COLOR}}
                    labelStyle={openGameFlatButtonLabelStyle}
                    label="Start Game"/>
            </div>
        )
    }
}


Parse.LiveQuery.on('open', () => {
    console.log('socket connection established');
});

Parse.LiveQuery.on('close', () => {
    console.log('socket connection closed');
});

Parse.LiveQuery.on('error', (error) => {
    console.log(error);
});

const mapStateToProps = function (state) {
    return {
        user: state.user
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState,
        addGameIdToState,
        addIsHomeToState
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);



