import React, { useState, useEffect } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {isAuthenticated } from '../auth/helper';
import { getCategories, createaProduct } from '../admin/helper/adminapicall';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        rating: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: ""
    });
    const { name, description, price, stock, rating, categories, category, loading, error, createdProduct, getRedirect, formData } = values;

    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        });
    };
    useEffect(() => {
        preload();
    }, []);

    const handleChange = name => event => {
        // setError("");
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, error: false, [name]: value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createaProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: true });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        rating: "",
                        stock: "",
                        photo: "",
                        error: "",
                        loading: false,
                        createdProduct: data.name
                    });
                }
            })
    }
    const successMessage = () => {
        return (
            <>
                <Alert sx={{ display: createdProduct ? "" : "none" }} severity="success">{createdProduct} created Successfully</Alert>
            </>
        )
    };
    const errorMessage = () => {
        return (
            <Alert sx={{ display: error ? null : "none" }} severity="error">
                {error}
                {console.log("err", error)}
            </Alert>
        )
    };

    const ProductForm = () => {

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
                    <Box className='mx-auto text-white' sx={{ p: 3, mb: 5 }}>
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
                                            <strong> Add new Product</strong>
                                        </Typography>

                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Button className={classes.button}
                                                        variant="contained"
                                                        component="label"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Upload Product Photo
                                                        <input
                                                            onChange={handleChange("photo")}
                                                            type="file"
                                                            name="photo"
                                                            accept="image"
                                                            placeholder="choose a file"
                                                        // hidden
                                                        />
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="name"
                                                        fullWidth
                                                        label="Product Name"
                                                        onChange={handleChange("name")}
                                                        value={name}
                                                        type="text"
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="description"
                                                        fullWidth
                                                        label="Product Description"
                                                        onChange={handleChange("description")}
                                                        value={description}
                                                        type="text"
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="price"
                                                        fullWidth
                                                        label="Price"
                                                        onChange={handleChange("price")}
                                                        value={price}
                                                        type="number"
                                                        inputProps={{
                                                            min:1
                                                          }}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="rating"
                                                        fullWidth
                                                        label="Rating"
                                                        onChange={handleChange("rating")}
                                                        value={rating}
                                                        type="number"
                                                        inputProps={{
                                                            max:5,
                                                            min:1
                                                          }}
                                                        autoFocus
                                                        //  focused
                                                        id="custom-css-outlined-input" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl className={classes.textfield} sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel className='text-light' id="demo-simple-select-helper-label">Category</InputLabel>
                                                        <Select className='text-light'
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={category}
                                                            label="Category"
                                                            onChange={handleChange("category")}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {categories &&
                                                                categories.map((cate, index) => (
                                                                    <MenuItem key={index} value={cate._id}>{cate.name}</MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ input: { color: 'white' }, label: { color: '#707274' } }}
                                                        className={classes.textfield}
                                                        autoComplete="true"
                                                        name="stock"
                                                        fullWidth
                                                        label="Stock"
                                                        onChange={handleChange("stock")}
                                                        value={stock}
                                                        type="number"
                                                        inputProps={{
                                                            min:1
                                                          }}
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
                                                Add Product
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
            {ProductForm()}
        </>
    );
};

export default AddProduct;
