import React from 'react';
import SettingsProvider from './context/setting/context'
import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
      <ToDo />
    </SettingsProvider>
    );
  }
}
