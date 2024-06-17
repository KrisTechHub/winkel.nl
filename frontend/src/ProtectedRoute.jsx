import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setRedirectAfterLogin } from "./actions/authActions";


const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(setRedirectAfterLogin(location.pathname));
        }
    }, [dispatch, isLoggedIn, location.pathname]);

    if (!isLoggedIn) {
        return <Navigate to="/user/register" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;