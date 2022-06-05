import React from "react";
import { sendRequestWithPayload, sendRequest } from "./../../context/ApiContext"
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, Typography, requirePropFactory} from "@material-ui/core"

function ProductDetail({product, openDetail, handleClick}){
    const [productName, setProductName] = React.useState('');
    const [productId, setProductId] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [catalog, setCatalog] = React.useState('');
    const [isAvailable, setIsAvailable] = React.useState(false);


    React.useEffect(() => {
        setProductName(product.name);
        setProductId(product.productId);
        setDescription(product.description);
        setQuantity(1);
        setCatalog(product.catalog);
        setIsAvailable(product.isAvailable);
    })

    async function addToCart(){
        console.log("Adding " + product.name + " to cart.")
        if (quantity > product.quantity){
            console.log("Quantity bigger than the available quantity,");
        }
        await sendRequest('POST', "cart/add/" + productId + "/" + quantity);
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
                        {productId}
                    </Typography>
                    <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        Available : {quantity}
                    </Typography>
                    <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        Price : {product.price} EUR
                    </Typography>
                    {/* <Typography
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                        >
                        Catalog : {catalog}
                    </Typography> */}
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClick}>Close</Button>
            <Button onClick={() => addToCart()}>Add to Cart</Button>
        </DialogActions>
    </Dialog>)
}

export default ProductDetail