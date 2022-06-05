import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, TextField, Button } from "@material-ui/core"
import { sendRequestWithPayload, sendRequest } from "./../../context/ApiContext"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function AdminConsole({ columns, contracts }) {
    const [openDetail, setOpenDetail] = React.useState(false);
    const [catalogName, setCatalogName] = React.useState("");
    const [catalogId, setCatalogId] = React.useState("");
    const [catalogDescription, setCatalogDescription] = React.useState("");

    const [catalogUpdateName, setCatalogUpdateName] = React.useState("");
    const [catalogUpdateId, setCatalogUpdateId] = React.useState("");
    const [catalogUpdateDescription, setCatalogUpdateDescription] = React.useState("");

    const [productName, setProductName] = React.useState("");
    const [productId, setProductId] = React.useState("");
    const [productCatalog, setProductCatalog] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productDescription, setProductDescription] = React.useState("");
    const [productQuantity, setProductQuantity] = React.useState("");
    const [productImage, setProductImage] = React.useState("");

    const [productUpdateName, setProductUpdateName] = React.useState("");
    const [productUpdateId, setProductUpdateId] = React.useState("");
    const [productUpdateCatalog, setProductUpdateCatalog] = React.useState("");
    const [productUpdatePrice, setProductUpdatePrice] = React.useState("");
    const [productUpdateDescription, setProductUpdateDescription] = React.useState("");
    const [productUpdateQuantity, setProductUpdateQuantity] = React.useState("");
    const [productUpdateImage, setProductUpdateImage] = React.useState("");

    const [catalogDeleteId, setCatalogDeleteId] = React.useState("");
    const [productDeleteId, setProductDeleteId] = React.useState("");

    async function handleClickCatalog(method, endpoint, id, name, description) {
        console.log("Creating/Updating Catalog")
        const payload = {
            catalogId: id,
            name: name,
            description: description
        }
        const result = await sendRequestWithPayload(method, endpoint, payload)
        console.log(result);
    }

    async function getCatalog() {
        const catalogFound = await sendRequest('GET', "api/catalogs/" + catalogId);
        console.log(catalogFound);
    }

    async function handleClickProduct(method, endpoint, id, name, price, quantity, description, image, catalogId) {
        console.log("Creating Product")
        const catalogFound = await sendRequest('GET', "api/catalogs/" + catalogId);
        if (catalogFound.catalogId === undefined) {
            console.log("catalogue not found!")
            return;
        }
        console.log(catalogFound)
        const payload = {
            productId: id,
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            imageURL: image,
            catalog: {
                catalogId: catalogFound.catalogId,
                name: catalogFound.name,
                description: catalogFound.description
            },
            available: true
        }
        console.log(payload);
        const result = await sendRequestWithPayload(method, endpoint, payload)
        console.log(result);
    }

    async function handleClickDelete(type, id) {
        console.log("deleting " + type + " " + id)
        const result = sendRequest("DELETE", "api/" + type + "/delete/" + id);
        console.log(result);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ width: '100%', height: "94.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px" }}>
                <Grid item xs={6} md={8}>
                    <Item style={{ height: "230px" }}>
                        <Typography variant="h6" gutterBottom component="div">Create Product</Typography>
                        <Grid container spacing={2} >

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Name"
                                    value={productName}
                                    onChange={(event) => setProductName(event.target.value)} />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Description"
                                    value={productDescription}
                                    onChange={(event) => setProductDescription(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product ID"
                                    value={productId}
                                    onChange={(event) => setProductId(event.target.value)}
                                />
                            </Grid>

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Quantity"
                                    value={productQuantity}
                                    onChange={(event) => setProductQuantity(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog ID"
                                    value={productCatalog}
                                    onChange={(event) => setProductCatalog(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Image Link"
                                    value={productImage}
                                    onChange={(event) => setProductImage(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Price"
                                    value={productPrice}
                                    onChange={(event) => setProductPrice(event.target.value)}
                                />
                            </Grid>
                            <div style={{ width: "100%", margin: "2%" }}>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        onClick={() => handleClickProduct('POST', "api/products/add", productId, productName, productPrice, productQuantity, productDescription, productImage, productCatalog)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Create Catalog</Typography>
                        <Grid container spacing={2} >

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog Name"
                                    value={catalogName}
                                    onChange={(event) => setCatalogName(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catlog Description"
                                    value={catalogDescription}
                                    onChange={(event) => setCatalogDescription(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog ID"
                                    value={catalogId}
                                    onChange={(event) => setCatalogId(event.target.value)}
                                />
                            </Grid>
                            <div style={{ width: "100%", margin: "2%" }}>
                                <Grid item >

                                    <Button
                                        onClick={() => handleClickCatalog('POST', 'api/catalogs/add', catalogId, catalogName, catalogDescription)}
                                        variant="contained"

                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Create
                                    </Button>

                                </Grid>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">Delete Product</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Product ID"
                                value={productDeleteId}
                                onChange={(event) => setProductDeleteId(event.target.value)}
                            />

                            <Button
                                onClick={() => handleClickDelete("products", productDeleteId)}
                                variant="contained"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Delete
                            </Button>

                        </Grid>

                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>
                        <Button
                            onClick={getCatalog}
                            variant="contained"

                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Get
                        </Button></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>                   <Grid item >
                        <Typography variant="h6" gutterBottom component="div">Delete Catalog</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Catalog ID"
                            value={catalogDeleteId}
                            onChange={(event) => setCatalogDeleteId(event.target.value)}
                        />

                        <Button
                            onClick={() => handleClickDelete("catalogs", catalogDeleteId)}
                            variant="contained"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Delete
                        </Button>

                    </Grid>
                    </Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item style={{ height: "230px" }}>
                        <Typography variant="h6" gutterBottom component="div">Edit Product</Typography>
                        <Grid container spacing={2} >

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Name"
                                    value={productUpdateName}
                                    onChange={(event) => setProductUpdateName(event.target.value)} />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Description"
                                    value={productUpdateDescription}
                                    onChange={(event) => setProductUpdateDescription(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product ID"
                                    value={productUpdateId}
                                    onChange={(event) => setProductUpdateId(event.target.value)}
                                />
                            </Grid>

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Quantity"
                                    value={productUpdateQuantity}
                                    onChange={(event) => setProductUpdateQuantity(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog ID"
                                    value={productUpdateCatalog}
                                    onChange={(event) => setProductUpdateCatalog(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Image Link"
                                    value={productUpdateImage}
                                    onChange={(event) => setProductUpdateImage(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Price"
                                    value={productUpdatePrice}
                                    onChange={(event) => setProductUpdatePrice(event.target.value)}
                                />
                            </Grid>
                            <div style={{ width: "100%", margin: "2%" }}>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        onClick={() => handleClickProduct('PUT', "api/products/update", productUpdateId, productUpdateName, productUpdatePrice, productUpdateQuantity, productUpdateDescription, productUpdateImage, productUpdateCatalog)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Edit Catalog</Typography>
                        <Grid container spacing={2} >

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog Name"
                                    value={catalogUpdateName}
                                    onChange={(event) => setCatalogUpdateName(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catlog Description"
                                    value={catalogUpdateDescription}
                                    onChange={(event) => setCatalogUpdateDescription(event.target.value)}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog ID"
                                    value={catalogUpdateId}
                                    onChange={(event) => setCatalogUpdateId(event.target.value)}
                                />
                            </Grid>
                            <div style={{ width: "100%", margin: "2%" }}>
                                <Grid item >

                                    <Button
                                        onClick={() => handleClickCatalog('PUT', 'api/catalogs/update', catalogUpdateId, catalogUpdateName, catalogUpdateDescription)}
                                        variant="contained"

                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Save
                                    </Button>

                                </Grid>
                            </div>
                        </Grid>

                    </Item>
                </Grid>
                <Grid item xs={6} md={4} style={{ height: "40%" }}></Grid>
                <Grid item xs={6} md={8}></Grid>

            </Grid>
        </Box>
    )
}




export default AdminConsole