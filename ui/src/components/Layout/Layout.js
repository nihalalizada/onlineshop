import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import CatalogsPage from "../../pages/Catalog/Catalog"
import ProductsPage from "../../pages/Product/Product"
import Header from "../Header/Header"


function Layout(){
    
    return(
    <>
        <Header/>
        <Switch>
            <Route path="/app/catalogs" component={withRouter(CatalogsPage)}/>
            <Route path="/app/products" component={withRouter(ProductsPage)}/>
        </Switch>
       
    </>);
}

export default withRouter(Layout);
 