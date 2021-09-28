import React from "react";
import cookie from "react-cookies"
import  Jwt  from "jsonwebtoken";

const testUsers = {
    admin: {password:'123', name:'admin', role:'admin', capabilities:['create','read','update','delete']},
    user: { password: '123', name: 'user', role: 'user', capabilities: ['read']},
  };

export const LoginContext =React.createContext();
class LoginProvider extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn:false,
            can:this.can,
            login:this.login,
            logout:this.logout,
            user:{capabilities:[]}
        };
    };
    can=(capability)=>{
        return this?.state?.user?.capabilities?.includes(capability)

    };

    login =(username,password)=>{
        if(testUsers[username]){
            const token = Jwt.sign(testUsers[username],process.env.REACT_APP_SECRET || "TOKILS");
            this.setLoginState(true,token,user)
        }

    };
    logout = () => {
        this.setLoginState(false, null, {});
      };
    
    validateToken=token=>{
        try {
            let user=Jwt.verify(token,process.env.REACT_APP_SECRET);
            this.setLoginState(true,token,user);
            
        } catch (e) {
            this.setLoginState(false,null,{})
            console.log('Token validation error')
            
        }
    }
    setLoginState=(loggedIn,token,user)=>{
        cookie.save('auth',token);
        this.setState({token,loggedIn,user});
    };

    componentDidMount(){
        const qs=new URLSearchParams (window.location.search);
        const cookiesToken=cookie.load('token');
        const token=qs.get('token') || cookiesToken || null;
        this.validateToken(token)
    };








    render(){
        return(
            <LoginContext.Provider>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
};
export default LoginProvider