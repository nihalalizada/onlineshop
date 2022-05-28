import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";

import Products from "../../components/Products/Products";

function ProductsPage(){
    const contracts = [
        {
            productId : "123",
            name : "A Cool product",
            description : "very cool",
            quantity : "3",
            isAvailable: "false",
            catalog: "myCatalog"
        }
    ]
    
    
    
    const columns = [
        ["Product ID", "productId"],
        ["Name", "name"],
        ["Description", "description"],
        ["Quantity", "quantity"],
        ["Catalog", "catalog"]

    ]
    return(
        <><Products contracts={contracts} columns={columns}></Products></>
    )
}

export default ProductsPage;