import { useContext, useState } from "react";
import { When } from "react-if";
import { LoginContext } from "../setting/capability";

export default function Login(props) {
  const context = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   state = {
  //     username: '',
  //     password: '',
  //   }
  const handleSubmit = (event) => {
    event.preventDefault();
    context.login(username, password);
  };

  //   const handleChange = (event) => {
  //        in case of class component
  //        this.setState({ [event.target.name]: event.target.value });
  //   };
  
  return (
    <>
      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </When>
      <When condition={context.loggedIn}>
        <button type="button" onClick={context.logout}>
            {console.log(context.user)}
          Logout
        </button>
        <span>{context.user.id}</span>
      </When>
    </>
  );
}
