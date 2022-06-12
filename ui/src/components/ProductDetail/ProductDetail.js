import React from "react";
import { sendRequestWithPayload, sendRequest } from "./../../context/ApiContext"
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Typography, TextField } from "@material-ui/core"

function ProductDetail({product, openDetail, handleClick}){
    const [productName, setProductName] = React.useState('');
    const [productId, setProductId] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [quantityToAdd, setQuantityToAdd] = React.useState('');
    const [catalog, setCatalog] = React.useState('');
    const [isAvailable, setIsAvailable] = React.useState(false);


    React.useEffect(() => {
        setProductName(product.name);
        setProductId(product.productId);
        setDescription(product.description);
        setQuantity(product.quantity);
        setCatalog(product.catalog.name);
        setIsAvailable(product.available);
        setQuantityToAdd(1);
    })
    console.log(product)
    async function addToCart(){
        console.log("Adding " + product.name + " to cart.")
        if (quantity > product.quantity){
            console.log("Quantity bigger than the available quantity,");
        }
        await sendRequest('POST', "cart/add/" + productId + "/" + quantityToAdd);
    }

    return( 
    <Dialog open={openDetail} onClose={handleClick} style={{
        '& .MuiDialogPaperWidthSm': {
            maxWidth: "950px"    
        }
      }}>


        <DialogTitle>{productName}</DialogTitle>
        <DialogContent style={{minWidth:"450px", overflow: "hidden"}}>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <img src={product.imageURL} style={{maxWidth: "150px", maxHeight: "173px"}}></img>
                </Grid>
                <Grid item xs={6}   >
                    <Typography 
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        {description}
                    </Typography>
                    <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        Available: {quantity}
                    </Typography>
                    <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        {isAvailable ? "" : "Not Available"}
                    </Typography>
                    <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        Price : {product.price} EUR
                    </Typography>
                    <TextField
                        id="delete-product-id"
                        label="Quantity"
                        value={quantityToAdd}
                        disabled={!isAvailable}
                        style={{width:"40px"}}
                        onChange={(event) => setQuantityToAdd(event.target.value)}
                    />
                    <Button 
                        onClick={() => addToCart()}
                        number
                        style={{height: "35px", marginTop:"12px", marginLeft:"5px"}}
                        disabled={!isAvailable}
                        >Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClick}>Close</Button>

        </DialogActions>
    </Dialog>)
}

export default ProductDetail