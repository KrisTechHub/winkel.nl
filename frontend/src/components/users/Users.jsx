import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { UserService } from '../../../services/users';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';


export default function Users () {
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [ users, setUsers ] = useState([])


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const getUsers = async() => {
            const data = await UserService();
            if (data) {
                setUsers(data.user)
            }  
        };

        getUsers();
    }, []);


    return (
        <div>
            <ToastContainer
                    position="top-center"
                    autoClose={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    theme="light"
                    />
            <h1>Users:</h1>
            { isLoggedIn && users.length > 0 && users.map((user) => (
                <div key={user.uuid}>
                    <p> {user.firstname} </p>
                    <Link to={`/user/profile/${user.uuid}`}>
                        <Button>View</Button>
                    </Link>
                </div>
                ))
            }
        </div>
    );
}