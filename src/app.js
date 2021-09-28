import React from 'react';
import SettingsProvider from './context/setting/context'
import ToDo from './components/todo/todo.js';

import Auth from './context/auth/auth';
import Login from './context/login/login'
import LoginContext from './context/setting/capability';



export default class App extends React.Component {
  render() {
    return (
      <LoginContext>
        <SettingsProvider>
          <Login />

            <ToDo />


        </SettingsProvider>
      </LoginContext>
    );
  }
}
