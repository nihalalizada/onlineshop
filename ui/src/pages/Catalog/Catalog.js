import React from 'react';
import Catalogs from "../../components/Catalogs/Catalogs";
import {  Grid } from "@material-ui/core"
import { getCatalogs,  } from "./../../context/ApiContext"

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
        <Grid container spacing={2} style={{ width: '100%',  height: "90.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px" }}>
       { catalogs === undefined ? <></> : 
        <><Catalogs contracts={catalogs} columns={columns}></Catalogs></>}</Grid>
    )
}

export default CatalogsPage;