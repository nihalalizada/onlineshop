import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";

import Catalogs from "../../components/Catalogs/Catalogs";

function CatalogsPage(){
    const contracts = [
        {
            catalogId : "123",
            name : "myCatalog",
            description : "a lot of stuff"
        }
    ]
    
    
    
    const columns = [
        ["Catalog ID", "catalogId"],
        ["Name", "name"],
        ["Description", "description"]
    ]
    return(
        <><Catalogs contracts={contracts} columns={columns}></Catalogs></>
    )
}

export default CatalogsPage;