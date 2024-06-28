import { LOGIN, LOGOUT,SET_USER,  SET_REDIRECT_AFTER_LOGIN, CLEAR_REDIRECT_AFTER_LOGIN, UPDATE_IS_SELLER } from '../actions/authActions.jsx';

const initialState = {
    isLoggedIn: false,
    user: null,
    redirectAfterLogin: null,
    isSeller: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isSeller: action.payload.isSeller,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                redirectAfterLogin: null
            };
        case SET_USER: 
            return {
                ...state,
                user: action.payload,
                isSeller: action.payload.isSeller,
                isLoggedIn: true,
            };
        case UPDATE_IS_SELLER:
            return {
                ...state,
                isSeller: action.payload,
                user: { ...state.user, isSeller: action.payload }
            };
        case SET_REDIRECT_AFTER_LOGIN:
            return {
                ...state,
                redirectAfterLogin: action.payload
            };
        case CLEAR_REDIRECT_AFTER_LOGIN:
            return {
                ...state,
                redirectAfterLogin: null
            };
        default:
            return state;
    }
};
