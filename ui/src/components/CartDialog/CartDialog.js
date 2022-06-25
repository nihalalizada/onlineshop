import React from "react";
import { getCart, sendRequestWithPayload } from "../../context/ApiContext"
import { sendRequest } from "./../../context/ApiContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton } from "@material-ui/core"


function CartDialog({ history }) {
    const [cart, setCart] = React.useState();
    const [openCart, setOpenCart] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [cartId, setCartId] = React.useState(0);

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
        getCart(setCart);
    }

    async function checkout() {
        window.location.assign("http://localhost:8080/checkout/" + cart.cartId);
    }



    async function deleteItem(id) {
        await sendRequest('DELETE', "cart/delete/" + id);
        getCart(setCart);
    }

    function getTotalPrice(){
        if (cart === undefined){
            return 0
        } else {
            var total = 0
            for(let i = 0; i < cart.items.length; i++){
                total += cart.items[i]["quantity"] * cart.items[i]["product"]["price"]
            }
            setTotalPrice(total)
            return 0
        }
        
    }

    React.useEffect(() => {
        getCart(setCart);
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
                    maxWidth: "950px",
                    minWidth: "450px"
                }
            }}>


                <DialogTitle>Shopping Cart</DialogTitle>
                <DialogContent style={{ minWidth: "450px", overflow: "scroll" }}>
                    <Grid container spacing={4}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map(col => (<TableCell key={col[0]} > {col[0]} </TableCell>))}
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart === undefined ? <></> :
                                    cart.items.map((c, i) => (
                                        <TableRow key={i} >
                                            {columns.map(col => <TableCell key={col[0] + "-" + c.product.id} onClick={() => handleClick(c)}>{getValue(c, col)} </TableCell>)}
                                            <TableCell><Button style={{height: "35px", marginTop:"12px", backgroundColor:"rgb(211 63 63 / 87%)", color:"white" }} onClick={() => deleteItem(c.id)}>Delete</Button>    </TableCell>
                                        </TableRow>
                                    ))}
                                     <TableRow key={"total"} >
                                            <TableCell key={"total"}>Total Price: </TableCell>
                                            <TableCell> {totalPrice} EUR </TableCell>
                                        </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => handleClick()}
                        style={{backgroundColor: "#5da4e3", color:"white"}}
                        >Close
                    </Button>
                    <Button onClick={() => clearCart()}
                        style={{backgroundColor:"rgb(211 63 63 / 87%)", color:"white"}}
                        >
                            Clear
                    </Button>
                    <Button onClick={() => checkout()}
                        style={{backgroundColor: "#73bd6a", color:"white"}}>
                        Checkout
                    </Button>
                </DialogActions>
            </Dialog></div>)
}

export default CartDialog;