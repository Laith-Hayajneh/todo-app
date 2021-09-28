'use strict';
import React from "react";
import { When } from "react-if";
import  loginContext   from '../setting/capability'
class Login extends React.Component {
    static contextType = loginContext;
    render() {
        const isLoggedIn = this.context.loggedIn;
        const canDo = this.props.capability ? this.context.can(this.props.capability) :true;
        const okToRender =isLoggedIn && canDo;
        return(
            <When condition={okToRender} >
                {this. props.children}

            </When>
        )
    }
};

export default Login