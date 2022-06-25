import { Router, Route, Redirect, Switch, withRouter } from "react-router-dom";
import './App.css';
import React from "react";
import CatalogsPage from "./pages/Catalog/Catalog"
import ProductsPage from "./pages/Product/Product"
import ContactPage from "./pages/Contact/Contact"
import ThankYouPage from "./pages/Contact/ThankYou";
import AdminPage from "./pages/Admin/Admin"
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
          <Route path="/app/admin" component={withRouter(AdminPage)}/>
          <Route path="/app/contact" component={withRouter(ContactPage)}/>
          <Route path="/app/thanks" component={withRouter(ThankYouPage)}/>
        </Switch>
    </Router>
  );
}

export default App;



