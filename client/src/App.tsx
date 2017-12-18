import * as React from 'react';
import './App.css';
import AppRouter from "./AppRouter";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
          <AppRouter/>
      </div>
    );
  }
}
