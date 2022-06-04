import React from 'react';
import Products from "../../components/Products/Products";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, Tooltip, TextField, IconButton } from "@material-ui/core"
import { getProducts, sendRequest } from "./../../context/ApiContext"


function ProductsPage({ history }) {
    const [products, setProducts] = React.useState();
    const [searchName, setSearchName] = React.useState("");

    React.useEffect(() => {
        getProducts(setProducts);
    }, [history]
    );

    const columns = [
        ["Name", "name"],
        ["Price", "price"],
        ["Description", "description"],
        ["Quantity", "quantity"],
        ["Catalog", "catalog.name"],
        ["Product ID", "productId"]
    ]

    async function search() {
        if (searchName !== ""){
            const result = await sendRequest("GET", "api/products/search?name=" + searchName)
            setProducts([result])
        }else {
            getProducts(setProducts);
        }
    }

    console.log(products);
    return (
        <> <Grid container style={{ paddingLeft: "83%", paddingTop: ".3%" }}>
            <TextField
                id="outlined-required"
                label="Search"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
            />
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Search">
                    <IconButton onClick={search} variant="contained" sx={{ p: 0 }}>
                        <SearchIcon style={{ color: "black" }} />

                    </IconButton>
                </Tooltip>
            </Box>
        </Grid>
            {products === undefined ? <></> :
                <><Products contracts={products} columns={columns}></Products></>}</>
    )
}

export default ProductsPage;