import React from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from "@material-ui/core"

export default function Catalogs({columns, contracts}){
    return(<TableContainer component={Paper} style={{width:"96%", margin: "2%"}}>
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map( col => (<TableCell key={col[0]}> {col[0]} </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {contracts.map((c ,i) => (
                    <TableRow key = {i} >
                        {columns.map(col => <TableCell key = {col[0]} >{c[col[1]]}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}