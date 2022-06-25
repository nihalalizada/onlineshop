import React from 'react';
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, Tooltip, TextField, IconButton } from "@material-ui/core"
import { getProducts, sendRequest } from "./../../context/ApiContext"


function ContactPage({ history }) {

    // React.useEffect(() => {
    //     getProducts(setProducts);
    // }, [history]
    // );

    
    // TODO:Add Catalog Filter
    return (
        <> 
            <ContactForm/>
        </>
    )
}

export default ContactPage;