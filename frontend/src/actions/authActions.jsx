import axios from "axios";
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const SET_REDIRECT_AFTER_LOGIN = 'SET_REDIRECT_AFTER_LOGIN';
export const CLEAR_REDIRECT_AFTER_LOGIN = 'CLEAR_REDIRECT_AFTER_LOGIN';
const serverUrl = process.env.VITE_SERVER;

console.log(serverUrl);


export const login = (user) => ({
    type: LOGIN,
    payload: user,
});

export const logout = () => ({
    type: LOGOUT,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const setRedirectAfterLogin = (url) => ({
    type: SET_REDIRECT_AFTER_LOGIN,
    payload: url
});

export const clearRedirectAfterLogin = () => ({
    type: CLEAR_REDIRECT_AFTER_LOGIN,
});

export const checkAuthStatus = () => (dispatch) => {
    axios.get(`${serverUrl}/auth/checkAuth`)
        .then(response => {
            if (response.data.isAuthenticated) {
                dispatch(setUser(response.data.user));
            }
        }).catch(error => {
            console.log('Error checking authentication status', error);
            dispatch(logout());
        })
};