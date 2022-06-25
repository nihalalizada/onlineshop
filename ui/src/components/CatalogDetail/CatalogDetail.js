import React from "react";
import {getProducts} from "../../context/ApiContext"
import { Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, TableCell, TableRow, TableBody, Table, TableHead } from "@material-ui/core"

function CatalogDetail({catalog, openDetail, handleClick, }){
    const [catalogName, setCatalogName] = React.useState('');
    const [catalogId, setCatalogId] = React.useState('');
    const [products, setProducts] = React.useState();

    const columns = [
        ["Name", "name"],
        ["Price", "price"],
        ["Description", "description"],
        ["Quantity", "quantity"],
        ["Catalog", "catalog", "name"]
    ]
    function getValue(c, col) {
        if (col.length === 2) {
            return c[col[1]]
        }
        else {
            return c[col[1]][col[2]]
        }
    }

    React.useEffect(() => {
        setCatalogName(catalog.name);
        setCatalogId(catalog.catalogId)
        getProducts(setProducts);
        
    }, [catalog])
    const productsfil = products !== undefined? products.filter(c => c.catalog.catalogId === catalogId) : []
    return( 
    <Dialog open={openDetail} onClose={handleClick} style={{
        '& .MuiDialogPaperWidthSm': {
            maxWidth: "950px"    
        }
      }}>


        <DialogTitle>{catalogName}</DialogTitle>
        <DialogContent style={{minWidth:"450px", overflow: "hidden"}}>
            <Grid container spacing={4}>
            <Table>
            <TableHead>
                <TableRow>
                    {columns.map( col => (<TableCell key={col[0]} > {col[0]} </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
            { products !== undefined ?
                 productsfil.map((c ,i) => (
                    <TableRow key = {i} >
                        {columns.map(col => <TableCell key = {col[0]} onClick={() => handleClick(c)}>{ getValue(c,col)}</TableCell>)}
                    </TableRow>
                )) : <></>} 
            </TableBody>
        </Table>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClick}
                style={{backgroundColor: "#5da4e3", color:"white"}}>
                Close
            </Button>

        </DialogActions>
    </Dialog>)
}

export default CatalogDetail