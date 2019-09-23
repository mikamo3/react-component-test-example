import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Example from "./Example";
import ExampleWithEffect from "./ExampleWithEffect";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Example
        items={[{ id: 1, text: "foo" }, { id: 2, text: "bar" }]}
        func={text => {
          console.log(text);
        }}
      />
      <ExampleWithEffect str="hoge" />
    </div>
  );
};

export default App;
