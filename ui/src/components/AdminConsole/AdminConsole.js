import React from "react";
import ProductDetail from "../ProductDetail/ProductDetail"
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, TextField, Button } from "@material-ui/core"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AdminConsole({ columns, contracts }) {
    const [openDetail, setOpenDetail] = React.useState(false);

    function handleClick(c) {
        if (openDetail === false) {
            console.log("opening " + c.name)
            setOpenDetail(true);
        } else {
            setOpenDetail(false);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ width: "96%", margin: "2%" }}>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Create Product</Typography>
                        <Grid container spacing={2} >

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Name"
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product Description"
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Product ID"
                                    defaultValue=""
                                />
                            </Grid>

                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Quantity"
                                    defaultValue="0"
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Catalog"
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Image Link"
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item >
                        <Button
                  
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Create
                </Button>
                        </Grid>
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
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                required
                                id="outlined-required"
                                label="Catlog Description"
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                required
                                id="outlined-required"
                                label="Catalog ID"
                                defaultValue=""
                            />
                        </Grid>

                        <Grid item >
                        <Button
                  
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Create
                </Button>
                        </Grid>
                    </Grid>
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminConsole