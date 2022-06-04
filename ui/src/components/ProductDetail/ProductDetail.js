import React from "react";
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
        setQuantity(product.quantity);
        setCatalog(product.catalog);
        setIsAvailable(product.isAvailable);
    })

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
            <Button onClick={handleClick}>Add to Cart</Button>
        </DialogActions>
    </Dialog>)
}

export default ProductDetail