import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, Button } from "@material-ui/core"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AdminPrompt({ setIsAdmin }) {
    const [checkedYes, setCheckedYes] = React.useState(false);

    function handleClick(c) {
        if (c === "Yes"){
            if (checkedYes === false) {
                setCheckedYes(true);
            } else {
                return;
            }
        } else {
            if (checkedYes === true) {
                setIsAdmin(true);
            } else {
                return;
            }
        }
        
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}  style={{ width: '100%', height: "94.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px",  paddingLeft: "18%", paddingTop:"2%"}}>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Admin Prompt</Typography>
                        <Grid container spacing={2} >

                            <Grid item style={{width:"100%", display : checkedYes ? "none" : ""}}  >
                                Are you an Admin?
                            </Grid>
                            <Grid item style={{width:"100%", display : checkedYes ? "" : "none"}}  >
                                Are you lying?
                            </Grid>
                            <Grid item style={{width:"50%"}}>
                                <Button

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => handleClick("Yes")}
                                >
                                Yes
                                </Button>
                            </Grid>
                            <Grid item style={{width:"50%"}}>
                                <Button
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() =>handleClick("No")}
                                >
                                    No
                                </Button>
                            </Grid>

                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminPrompt