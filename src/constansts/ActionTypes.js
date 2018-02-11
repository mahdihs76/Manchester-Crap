export const ADD_USER = 'ADD_USER';
export const ADD_GAME_ID = 'ADD_GAME_ID';
export const ADD_IS_HOME = 'ADD_IS_HOME';
export const ADD_SNACK_TEXT = 'ADD_SNACK_TEXT';
export const CLOSE_SNACK_TEXT = 'CLOSE_SNACK_TEXT';
export const SHOW_DIALOG = "SHOW_DIALOG";
export const SET_LOADING = "SET_LOADING";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LEFT_DRAWER = "CLOSE_LEFT_DRAWER";


export function addUserToStateUnsafe(user) {
    return {
        type: ADD_USER,
        user
    };
}

export function addGameIdToStateUnsafe(gameId) {
    return {
        type: ADD_GAME_ID,
        gameId
    };
}

export function addIsHomeToStateUnsafe(isHome) {
    return {
        type: ADD_IS_HOME,
        isHome
    };
}

export function addSnackTextUnsafe(text) {
    return {
        type: ADD_SNACK_TEXT,
        text
    }
}

export function closeSnackTextUnsafe() {
    return {
        type: CLOSE_SNACK_TEXT
    }
}

export function showDialogUnsafe(dialog) {
    return {
        type: SHOW_DIALOG,
        dialog
    }
}

export function closeDialogUnsafe() {
    return {
        type: CLOSE_DIALOG
    }
}

export function signInUnsafe() {
    return {
        type: SIGN_IN
    }
}

export function signOutUnsafe() {
    return {
        type: SIGN_OUT
    }
}

export function setLeftDrawerUnsafe(state) {
    return {
        type: SET_LEFT_DRAWER,
        state
    }
}

export function setLoadingUnsafe(state) {
    return{
        type: SET_LOADING,
        state
    }
}

export function defaultState() {
    return {
        user: {
            username: "",
            firstName: "",
            lastName: "",
            city: "",
            birthDate: new Date(),
            gender: true,
        },
        game: null,
        pageStatus: {
            snack: {
                text: "",
                isOpen: false
            },
            dialog: "",
            signed: false,
            leftDrawer: false,
            loading: true,
        }
    }
}

