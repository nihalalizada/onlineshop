import React from 'react';
import Catalogs from "../../components/Catalogs/Catalogs";
import { getCatalogs, sendRequest } from "./../../context/ApiContext"

function CatalogsPage({history}){
    const [catalogs, setCatalogs] = React.useState();

    React.useEffect(() => {
        getCatalogs(setCatalogs);
    }, [history]
    );

    const columns = [
        ["Name", "name"],
        ["Description", "description"],
        ["Catalog ID", "catalogId"]
    ]
   
    return(
        catalogs === undefined ? <></> : 
        <><Catalogs contracts={catalogs} columns={columns}></Catalogs></>
    )
}

export default CatalogsPage;