import React from 'react';
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, TextField, Button } from "@material-ui/core"
import { getProducts, sendRequest } from "./../../context/ApiContext"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function ThankYouPage({ history }) {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ width: '100%', height: "94.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px", paddingLeft: "18%", paddingTop: "2%" }}>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Thank You!</Typography>
                        <Typography variant="h7" gutterBottom component="div">We'll be in touch soon!</Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>

    )
}

export default ThankYouPage;