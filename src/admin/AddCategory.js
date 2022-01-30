import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import signupImg from '../images/home.png';
import signupImg1 from '../images/signup.png';
import { isAuthenticated } from '../auth/helper';
import { createCategory } from '../admin/helper/adminapicall';


const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated();
    const handleChange = event => {
        setError("");
        setName(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            })
    }
    const successMessage = () => {
        return (
            <>
                <Alert sx={{ display: success ? null : "none" }} severity="success">Category Added Successfully{" "}
                    {/* <NavLink className="link" to='signin'>Login </NavLink>and check it out! */}
                </Alert>
            </>
        )
    };
    const errorMessage = () => {
        return (
            <Alert sx={{ display: error ? null : "none" }} severity="error">
                {error}
            </Alert>
        )
    };

    const CategoryForm = () => {

        const useStyles = makeStyles((theme) => ({
            button: {
                background: "#FFAA2A",
                '&:hover': {
                    background: 'white',
                    color: "#FFAA2A",
                },
            },
            textfield: {
                '& label.Mui-focused': {
                    color: '#FFAA2A',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#FFAA2A',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#707274',
                    },
                    '&:hover fieldset': {
                        borderColor: '#FFAA2A',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#FFAA2A',
                    },
                },
            }
        }));

        const classes = useStyles();

        return (
            <>
                <Container maxWidth="xl">
                    {/* <MenuBar/> */}
                    <Box className='mx-auto text-white' sx={{ p: 3 }}>
                        <Grid className='mx-auto' container spacing={1}>

                            <Grid className='text-justify' sx={{ bgcolor: "#1d1e22", pt: 5 }} item xs={12} sm={6}>
                                <Container component="main" maxWidth="xs">
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'left',
                                        }}
                                    >
                                        <Typography variant="h5" component="h5">
                                            <strong> Add new category</strong>
                                        </Typography>

                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="addCategory"
                                                        fullWidth
                                                        label="Enter New Category"
                                                        onChange={handleChange}
                                                        value={name}
                                                        type="text"
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                            </Grid>
                                            <Button className={classes.button}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Add Category
                                            </Button>
                                            <Grid container justifyContent="flex-end">
                                                <Grid item>
                                                    <Typography component="h3" variant="subtitle2">
                                                        {successMessage()}
                                                        {errorMessage()}
                                                    </Typography>
                                                    <Typography component="h3" variant="subtitle2">
                                                        Get Back to <NavLink className='link' to='/admin/dashboard'>Admin Home</NavLink>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box className="ring">
                                    <Box className="ring1" >
                                        <Box className="ring2">
                                            <Box className="ring3">
                                                <img className="aboutImg" src={signupImg1} alt="homeImg" />
                                                <Box className="ring4" sx={{ display: { xs: "none", md: "flex" } }}>
                                                    <Box className="ring5">
                                                        <img className="aboutImg" src={signupImg} alt="homeImg" />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </>
        );
    };
    return (
        <>
            {CategoryForm()}
        </>
    );
};

export default AddCategory;

