import React from "react";
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core"

function CartDialog({openCart, handleClick}){
    
    const columns = [
        ["Name", "name"],
        ["Price", "price"],
        ["Description", "description"],
        ["Quantity", "quantity"],
        ["Catalog", "catalog"],
        ["Product ID", "productId"]
    ]

    const contracts = [
        {
            productId : "123",
            name : "A Cool product",
            description : "very cool",
            quantity : "3",
            isAvailable: "false",
            catalog: "myCatalog",
            imageURL: "https://content.optimumnutrition.com/i/on/on-on-C101191_Image_01?locale=de-de,en-gb,*&layer0=$PDP_003$"
        },
        {
            productId : "123",
            name : "Cheap product",
            description : "kinda cool",
            quantity : "9",
            isAvailable: "false",
            catalog: "myCatalog",
            imageURL: "https://content.optimumnutrition.com/i/on/on-on-C101191_Image_01?locale=de-de,en-gb,*&layer0=$PDP_003$"            
        }
    ]
    function close() {

    }

    return( 
    <Dialog open={openCart} onClose={()=> close()} style={{
        '& .MuiDialogPaperWidthSm': {
            maxWidth: "950px"    
        }
      }}>


        <DialogTitle>Shopping Cart</DialogTitle>
        <DialogContent style={{minWidth:"450px", overflow: "hidden"}}>
            <Grid container spacing={4}>
            <Table>
            <TableHead>
                <TableRow>
                    {columns.map( col => (<TableCell key={col[0]} > {col[0]} </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {contracts.map((c ,i) => (
                    <TableRow key = {i} >
                        {columns.map(col => <TableCell key = {col[0]} onClick={() => handleClick(c)}>{c[col[1]]}</TableCell>)}
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClick}>Close</Button>
            <Button onClick={handleClick}>Checkout</Button>
        </DialogActions>
    </Dialog>)
}

export default CartDialog;