import React from 'react';
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
        },
        {
            productId : "123",
            name : "Cheap product",
            description : "kinda cool",
            quantity : "9",
            isAvailable: "false",
            catalog: "myCatalog"
        }
    ]
    
    const columns = [
        ["Name", "name"],
        ["Description", "description"],
        ["Quantity", "quantity"],
        ["Catalog", "catalog"],
        ["Product ID", "productId"]
    ]

    return(
        <><Products contracts={contracts} columns={columns}></Products></>
    )
}

export default ProductsPage;