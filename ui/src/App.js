import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import './App.css';
import React from "react";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={'/app/catalog'} />} />
        <PublicRoute path="/app" component={Layout} />
      </Switch>
    </HashRouter>
  );
}
function PublicRoute({component, ...rest}){
  return(
    <Route 
    {...rest}
    render={props =>
      React.createElement(component, props)
    }
    />
  )
}

export default App;



