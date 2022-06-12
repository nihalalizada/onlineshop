import React from "react";
import CatalogDetail from "../CatalogDetail/CatalogDetail"
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from "@material-ui/core"

function Catalogs({columns, contracts}){
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedCatalog, setSelectedCatalogs] = React.useState(contracts[0]);


    function handleClick(c){
        if (openDetail === false){
            console.log("opening " + c.name)
            setOpenDetail(true);
            setSelectedCatalogs(c)
        }else {
            setOpenDetail(false);
        }
    }

    return(  
    <TableContainer component={Paper} >
        <CatalogDetail catalog ={selectedCatalog} openDetail={openDetail} handleClick={handleClick} />
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map( col => (<TableCell key={col[0]}> {col[0]} </TableCell>))}
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
    </TableContainer>
    )
}

export default Catalogs