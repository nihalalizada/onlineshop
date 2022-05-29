import { Router, Route, Redirect, Switch, withRouter } from "react-router-dom";
import './App.css';
import React from "react";
import CatalogsPage from "./pages/Catalog/Catalog"
import ProductsPage from "./pages/Product/Product"
import Header from "./components/Header/Header"
import {createBrowserHistory} from 'history';

export const customHistory = createBrowserHistory();

function App(){
  return (
    <Router history={customHistory}>
       <Header/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/products"/>} />
          <Route path="/app/catalogs" component={withRouter(CatalogsPage)}/>
          <Route path="/app/products" component={withRouter(ProductsPage)}/>
        </Switch>
    </Router>
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



