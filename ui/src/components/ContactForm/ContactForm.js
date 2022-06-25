import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, TextField, Button } from "@material-ui/core"

const FORM_ENDPOINT = "https://public.herotofu.com/v1/b053e880-f49b-11ec-95d6-ef970076a4ff";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ContactForm = () => {
   

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ width: '100%', height: "94.5vh", background: "rgb(231, 235, 240)", padding: "2%", margin: "0px", paddingLeft: "18%", paddingTop: "2%" }}>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Typography variant="h6" gutterBottom component="div">Contact Form</Typography>
                        <Grid container spacing={2} >
                            <Grid item style={{ width: "100%", display: "" }}  >
                                <form
                                    action={FORM_ENDPOINT}
                                    method="POST"
                                    target="_blank"
                                >
                                    <div className="mb-3 pt-0">
                                    <TextField
                                        required
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        defaultValue={""}
                                        style={{margin:"10px", width:"70%"}}
                                        id="outlined-required"
                                        variant="outlined"
                                        label="Name"
                                    />
                                    </div>
                                    <div className="mb-3 pt-0">
                                    <TextField
                                        required
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        defaultValue={""}
                                        style={{margin:"10px", width:"70%"}}
                                        id="outlined-required"
                                        variant="outlined"
                                        label="Email"
                                    />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <TextField
                                        required
                                        defaultValue={""}
                                        style={{margin:"10px", width:"70%"}}
                                        id="outlined-required"
                                        name="message"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        label="Your message"
                                    />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            style={{ backgroundColor: "#73bd6a", color: "white" }}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>

    );
};

export default ContactForm;