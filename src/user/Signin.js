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
import { useNavigate } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const commonStyles = {
  border: 8,
};

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
      .catch(console.log("Error in SignUp"))
  }
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
      return navigate('/admin/dashboard');
      } else {
      return navigate('/user/dashboard');
      }
    }
    if (isAuthenticated()) {
      return navigate('/');
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <Alert sx={{ display: loading ? null : "none" }} severity="info">Loading...</Alert>
      )
    )
  };
  const errorMessage = () => {
    return (
      <Alert sx={{ display: error ? null : "none" }} severity="error">
        {error}
      </Alert>
    )
  };
  const SignInForm = () => {

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
                      <strong> Welcome, hope you find wonderful stuff inside</strong>
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
                      <Grid container spacing={2}>
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

                      </Grid>
                      <Button className={classes.button}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography component="h3" variant="subtitle2">
                            {loadingMessage()}
                            {errorMessage()}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <NavLink className='link' to='/'>Forgot password?</NavLink>
                        </Grid>
                        <Grid item>
                          <Typography component="h3" variant="subtitle2">
                            Don't have an account?  <NavLink className='link' to='/signup'>Sign Up</NavLink>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Grid>
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
            </Grid>
          </Box>
        </Container>
      </>
    );
  };
  return (
    <>
      {SignInForm()}
      {performRedirect()}
    </>
  );
};

export default Signin;
