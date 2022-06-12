import React from "react";
import { getCart } from "../../context/ApiContext"
import { sendRequestWithPayload, sendRequest } from "./../../context/ApiContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Tooltip, IconButton } from "@material-ui/core"


function CartDialog({ history }) {
    const [items, setItems] = React.useState();
    const [openCart, setOpenCart] = React.useState(false);
    function handleClick() {
        if (openCart === false) {
            console.log("Opening Cart")
            setOpenCart(true);
        } else {
            setOpenCart(false);
        }
    }

    const columns = [
        ["ItemID", 'id'],
        ["Name", 'product', 'name'],
        ["Description", 'product', "description"],
        ["Quantity", 'product', "quantity"],
        // ["Catalog", 'product', "catalog"],
        ["Product ID", 'product', "productId"],
        ["Price", 'product', 'price'],
    ]

    async function clearCart() {
        await sendRequest('DELETE', "cart/clear");
        getCart(setItems);
    }

    async function checkout() {
        await sendRequest('DELETE', "cart/checkout");
        getCart(setItems);
    }

    async function deleteItem(id) {
        await sendRequest('DELETE', "cart/delete/" + id);
        getCart(setItems);
    }

    React.useEffect(() => {
        getCart(setItems);
    }, [openCart]
    )

    function getValue(c, col) {
        if (col.length === 2) {
            return c[col[1]]
        }
        else {
            return c[col[1]][col[2]]
        }
    }

    function close(c) {

    }

    return (
        <div>
            <Tooltip title="Shopping Cart">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <ShoppingCartIcon style={{ color: "white" }} />
                </IconButton>
            </Tooltip>


            <Dialog open={openCart} onClose={handleClick} onBackdropClick="false" style={{
                '& .MuiDialogPaperWidthSm': {
                    maxWidth: "950px"
                }
            }}>


                <DialogTitle>Shopping Cart</DialogTitle>
                <DialogContent style={{ minWidth: "450px", overflow: "hidden" }}>
                    <Grid container spacing={4}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map(col => (<TableCell key={col[0]} > {col[0]} </TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items === undefined ? <></> :
                                    items.map((c, i) => (
                                        <TableRow key={i} >
                                            {columns.map(col => <TableCell key={col[0] + "-" + c.product.id} onClick={() => handleClick(c)}>{getValue(c, col)} </TableCell>)}
                                            <TableCell><Button style={{height: "35px", marginTop:"12px"}} onClick={() => deleteItem(c.id)}>Delete</Button>    </TableCell>
                                        </TableRow>
                                    ))}

                            </TableBody>
                        </Table>
                        {/* <div style={{height : "60px"}}>
            <TextField
                id="delete-product-id"
                label="Product ID"
                value={deleteId}
                onChange={(event) => setDeleteId(event.target.value)}
            />
            <Button style={{height: "35px", marginTop:"12px"}} onClick={() => deleteItem()}>Delete</Button>    
            </div>     */}
                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => handleClick()}>Close</Button>
                    <Button onClick={() => clearCart()}>Clear</Button>
                    <Button onClick={() => checkout()}>Checkout</Button>
                </DialogActions>
            </Dialog></div>)
}

export default CartDialog;