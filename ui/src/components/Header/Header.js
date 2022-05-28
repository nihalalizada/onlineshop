import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { withRouter, Switch, Route } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [['Products', '/app/products'], ['Catalogs', '/app/catalogs'], ['Contact', 'app/contact']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    function myfucn(){
       console.log("pressed")
    }

  return (
    <AppBar position="static" style={{background: "grey"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
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
                <Tooltip title="Shopping Cart">
                <IconButton onClick={myfucn} sx={{ p: 0 }}>
                    <ShoppingCartIcon style={{color:"white"}}/>
                </IconButton>
                </Tooltip>
            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
