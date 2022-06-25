import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CartDialog from './../CartDialog/CartDialog'
import {AiFillShopping} from "react-icons/ai";

const pages = [
  ['Products', '/app/products'], 
  ['Catalogs', '/app/catalogs'], 
  ['Admin', '/app/admin'], 
  ['Contact', '/app/contact']
];

const Header = () => {


  return (
    <AppBar position="static" style={{background: "lightSeaGreen"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <AiFillShopping size="40px" color="tomato"></AiFillShopping>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                margin: 2,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
            }}
            >
                ONLINE SHOP
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    component={Link}
                    key={page[0]}
                    to={page[1]}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page[0]}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>

              <CartDialog />

            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
