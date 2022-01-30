import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import signupImg from '../images/home.png';
import signupImg1 from '../images/signup.png';
import { signup } from '../auth/helper';

const commonStyles = {
    border: 8,
};
const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        error: "",
        success: false
    });
    const { name, lastName, username, email, phone, password, confirmPassword, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        if (password !== confirmPassword) {
            setValues({ error: "Passwords not matching" })
        } else {
            signup({ name, lastName, username, email, phone, password })
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, success: false })
                    } else {
                        setValues({
                            ...values,
                            name: "",
                            lastName: "",
                            username: "",
                            email: "",
                            phone: "",
                            password: "",
                            confirmPassword: "",
                            error: "",
                            success: true
                        })
                    }
                })
                .catch(console.log("Error in SignUp"))
        }
    }

    const SignUpForm = () => {

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
                <Container sx={{ paddingBottom: { xs: "10%", md: "3%" } }} maxWidth="xl">
                    {/* <MenuBar/> */}
                    <Box className='mx-auto text-white' sx={{ p: 3 }}>
                        <Grid className='mx-auto' container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Box className="ring">
                                    <Box className="ring1" sx={{ ...commonStyles, borderColor: error ? "error.main" : 'primary.main' }} >
                                        <Box className="ring2">
                                            <Box className="ring3" sx={{ ...commonStyles, borderColor: error ? "error.main" : 'primary.main' }} >
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
                                            <strong> Join over 25 million
                                                buyers from around the globe</strong>
                                        </Typography>
                                        <Typography component="h1" variant="h5">
                                            Sign up and get yours
                                        </Typography>

                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="given-name"
                                                        name="name"
                                                        required
                                                        fullWidth
                                                        label="First Name"
                                                        type="text"
                                                        onChange={handleChange("name")}
                                                        value={name}
                                                        autoFocus
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="given-name"
                                                        name="lastName"
                                                        fullWidth
                                                        label="Last Name"
                                                        type="text"
                                                        onChange={handleChange("lastName")}
                                                        value={lastName}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="given-name"
                                                        name="username"
                                                        fullWidth
                                                        label="Username"
                                                        type="text"
                                                        onChange={handleChange("username")}
                                                        value={username}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="email"
                                                        name="email"
                                                        fullWidth
                                                        label="Email"
                                                        type="email"
                                                        onChange={handleChange("email")}
                                                        value={email}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="phone"
                                                        name="phone"
                                                        fullWidth
                                                        label="Phone Number"
                                                        type="tel"
                                                        onChange={handleChange("phone")}
                                                        value={phone}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="new-password"
                                                        name="password"
                                                        fullWidth
                                                        label="Password"
                                                        type="password"
                                                        onChange={handleChange("password")}
                                                        value={password}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="confirm-password"
                                                        name="confirmPassword"
                                                        fullWidth
                                                        label="Confirm Password"
                                                        type="password"
                                                        onChange={handleChange("confirmPassword")}
                                                        value={confirmPassword}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                        label="I agree to all statements included in Terms of Use"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button className={classes.button}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
                                            </Button>
                                            <Grid container justifyContent="flex-end">
                                                <Grid item>
                                                    <Typography component="h3" variant="subtitle2">
                                                        {successMessage()}
                                                        {errorMessage()}
                                                    </Typography>
                                                    <Typography component="h3" variant="subtitle2">
                                                        Already have an account?   <NavLink className='link' to='/signin'>Sign in</NavLink>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </>
        );
    };
    const successMessage = () => {
        return (
            <>
                <Alert sx={{ display: success ? null : "none" }} severity="success">Your Account was created successfully.Please{" "}
                    <NavLink className="link" to='signin'>Login </NavLink>and check it out!
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
    return (
        <>
            {SignUpForm()}
        </>
    );
};

export default Signup;
