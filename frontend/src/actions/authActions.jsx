import axios from "axios";

//ACTION TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const SET_REDIRECT_AFTER_LOGIN = 'SET_REDIRECT_AFTER_LOGIN';
export const CLEAR_REDIRECT_AFTER_LOGIN = 'CLEAR_REDIRECT_AFTER_LOGIN';
export const UPDATE_IS_SELLER = 'UPDATE_IS_SELLER';

//ACTIONS
export const login = (user) => ({
    type: LOGIN,
    payload: user,
});

export const logout = () => ({
    type: LOGOUT,
});

export const updateIsSeller = (isSeller) => ({
    type: UPDATE_IS_SELLER,
    payload: isSeller,
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
    axios.get(`${process.env.VITE_SERVER}/auth/checkAuth`)
        .then(response => {
            if (response.data.isAuthenticated) {
                dispatch(setUser(response.data.user));
            }
        }).catch(error => {
            console.log('Error checking authentication status', error);
            dispatch(logout());
        })
};