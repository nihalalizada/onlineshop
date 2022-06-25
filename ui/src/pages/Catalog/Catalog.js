import React from 'react';
import Catalogs from "../../components/Catalogs/Catalogs";
import {Box, Grid, IconButton, TextField, Tooltip} from "@material-ui/core"
import {getCatalogs, getProducts, sendRequest,} from "./../../context/ApiContext"
import SearchIcon from "@mui/icons-material/Search";

function CatalogsPage({history}){
    const [catalogs, setCatalogs] = React.useState();
    const [searchName, setCatalogName] = React.useState("");

    React.useEffect(() => {
        getCatalogs(setCatalogs);
    }, [history]
    );

    const columns = [
        ["Name", "name"],
        ["Description", "description"]
    ]

    async function searchCatalog() {
        if (searchName !== ""){
            const result = await sendRequest("GET", "api/catalogs/search?name=" + searchName)
            setCatalogs(result)
        }else {
            getCatalogs(setCatalogs);
        }
    }
   
    return(
        <>
            <Grid container style={{ paddingLeft: "70%", paddingTop: ".3%" , background: "rgb(231, 235, 240)"}}>
                <Grid item style={{marginLeft: "10px"}}>
                    <TextField
                        id="outlined-required"
                        label="Search"
                        value={searchName}
                        onChange={(event) => setCatalogName(event.target.value)}
                    />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Search">
                            <IconButton onClick={searchCatalog} variant="contained" sx={{ p: 0 }}>
                                <SearchIcon style={{ color: "black" }} />

                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        <Grid container spacing={2} style={{ width: '100%',  height: "90.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px" }}>
       { catalogs === undefined ? <></> : 
        <><Catalogs contracts={catalogs} columns={columns}></Catalogs></>}</Grid></>
    )
}

export default CatalogsPage;