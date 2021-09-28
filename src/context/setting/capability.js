import React, { useEffect, useState } from "react";
import superagent from "superagent";
import base64 from 'base-64';
import cookie from "react-cookies"
import  jwt  from "jsonwebtoken";


export const LoginContext =React.createContext();
const API =process.env.REACT_APP_HOST || 'https://mid-project-01.herokuapp.com';

export default function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // initial render
    useEffect(() => {
        const tokenFromCookie = cookie.load('token');
        validateJwToken(tokenFromCookie);
    }, []);

    const login = async (username, password) => {
        // {username: password} encoded
        //Basic base64(username:password)

        const encodedUsernameAndPassword =
            base64.encode(`${username}:${password}`);

        const response = await superagent.post(`${API}/signin`)
            .set('authorization', `Basic ${encodedUsernameAndPassword}`);

        validateJwToken(response.body.token);
    }

    const validateJwToken = (token) => {
        if (token) {
            // the user is logged in
            const user = jwt.decode(token);
            setLoginState(true, user);

            cookie.save('token', token)
        } else {
            // the user is NOT logged in
            setLoginState(false, {});
        }
    }

    const setLoginState = (loggedIn, user) => {
        setLoggedIn(loggedIn);
        setUser(user);
    }

    const logout = () => {
        setLoginState(false, {});
        cookie.remove('token');
    }

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    };

    const state = {
        loggedIn,
        login,
        logout,
        user,
        can
    }

    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}