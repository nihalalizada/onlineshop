import React from "react";
import { getCart } from "../../context/ApiContext"
import { sendRequest } from "./../../context/ApiContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton } from "@material-ui/core"


function CartDialog({ history }) {
    const [items, setItems] = React.useState();
    const [openCart, setOpenCart] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(0);
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
        ["Quantity", "quantity"],
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

    function getTotalPrice(){
        if (items === undefined){
            return 0
        } else {
            var total = 0
            for(let i = 0; i < items.length; i++){
                total += items[i]["quantity"] * items[i]["product"]["price"]
            }
            setTotalPrice(total)
            return 0
        }
        
    }

    React.useEffect(() => {
        getCart(setItems);
        getTotalPrice();
        // eslint-disable-next-line
    }, [openCart, totalPrice]
    )

    function getValue(c, col) {
        if (col.length === 2) {
            return c[col[1]]
        }
        else {
            return c[col[1]][col[2]]
        }
    }

    // function close(c) {

    // }

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
                                    <TableCell></TableCell>
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
                                     <TableRow key={"total"} >
                                            <TableCell key={"total"}>Total Price: </TableCell>
                                            <TableCell> {totalPrice} EUR </TableCell>
                                        </TableRow>
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