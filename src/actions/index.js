import {
    addSnackTextUnsafe, addGameIdToStateUnsafe, addIsHomeToStateUnsafe,
    addUserToStateUnsafe, closeSnackTextUnsafe
} from "../constansts/ActionTypes";

export function addUserToState(user) {
    return function (dispatch) {
        dispatch(addUserToStateUnsafe(user));
    };
}

export function addGameIdToState(game) {
    return function (dispatch) {
        dispatch(addGameIdToStateUnsafe(game));
    };
}

export function addIsHomeToState(game) {
    return function (dispatch) {
        dispatch(addIsHomeToStateUnsafe(game));
    };
}

export function addSnackText(text) {
    return function (dispatch) {
        dispatch(addSnackTextUnsafe(text));
    }
}

export function closeSnackText() {
    return function (dispatch) {
        dispatch(closeSnackTextUnsafe());
    }
}