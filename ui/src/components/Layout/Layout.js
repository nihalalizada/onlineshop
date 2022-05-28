import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Catalog from "../../pages/Catalog"
import Header from "../Header/Header"


function Layout(){
    
    return(
    <>
        <Header/>
        <Switch>
            <Route path="/app/catalog" component={Catalog}/>
        </Switch>
       
    </>);
}

export default withRouter(Layout);
