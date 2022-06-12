import React from "react";
import ProductDetail from "../ProductDetail/ProductDetail"
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from "@material-ui/core"

function Products({columns, contracts}){
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(contracts[0]);
    function handleClick(c){
        if (openDetail === false){
            console.log("opening " + c.name)
            setOpenDetail(true);
            setSelectedProduct(c)
        }else {
            setOpenDetail(false);
        }
    }
    function getValue(c, col) {
        if (col.length === 2) {
            return c[col[1]]
        }
        else {
            return c[col[1]][col[2]]
        }
    }
    return(<TableContainer component={Paper} style={{width:"100%"}}>
            <ProductDetail product ={selectedProduct} openDetail={openDetail} handleClick={handleClick} />
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map( col => (<TableCell key={col[0]} > {col[0]} </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                 {contracts.map((c ,i) => (
                    <TableRow key = {i} >
                        {columns.map(col => <TableCell key = {col[0]} onClick={() => handleClick(c)}>{ getValue(c,col)}</TableCell>)}
                    </TableRow>
                ))} 
            </TableBody>
        </Table>
    </TableContainer>)
}

export default Products