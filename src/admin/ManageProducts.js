import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getProducts } from '../admin/helper/adminapicall';

const ManageProducts = () => {
    const { user, token } = isAuthenticated();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };
    useEffect(() => {
        preload();
    }, []);
    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                preload();
            }
        })
    }
   
    return (
        <>
            <Container maxWidth="xl">
                {/* <MenuBar/> */}
                <Box className='mx-auto text-white' sx={{ p: 3, mb: 5 }}>
                    <Grid className='mx-auto' container spacing={1}>
                        <Grid className='text-justify' sx={{ bgcolor: "#1d1e22", pt: 5 }} item xs={12} sm={12}>
                            <Container component="main" maxWidth="lg">
                                <Box
                                    sx={{
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                    }}
                                >
                                    <Typography variant="h5" component="h5">
                                        <strong> All Products</strong>
                                    </Typography>
                                    <Typography variant="h5" component="h5">
                                        Total 3 Products
                                    </Typography>

                                    <Box component="form" noValidate sx={{ mt: 5 }}>
                                        <Grid container spacing={2}>

                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Product Name</TableCell>
                                                            <TableCell align="right">Category</TableCell>
                                                            <TableCell align="right">Price</TableCell>
                                                            <TableCell align="right">Rating</TableCell>
                                                            <TableCell align="right">Stock</TableCell>
                                                            <TableCell align="right">Sold</TableCell>
                                                            <TableCell align="right">Update</TableCell>
                                                            <TableCell align="right">Delete</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {products.map((product, index) => (
                                                            <TableRow
                                                                key={index}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                {console.log(product)}
                                                                <TableCell component="th" scope="row">
                                                                    {product.name}
                                                                </TableCell>
                                                                <TableCell align="right">{product.category.name}</TableCell>
                                                                <TableCell align="right">{product.price}</TableCell>
                                                                <TableCell align="right">{product.rating}</TableCell>
                                                                <TableCell align="right">{product.stock}</TableCell>
                                                                <TableCell align="right">{product.sold}</TableCell>
                                                                <TableCell align="right"><NavLink to={`/admin/product/update/${product._id}`}><EditIcon /></NavLink></TableCell>    
                                                                <TableCell align="right"><Button color="error" onClick={()=>{
                                                                    deleteThisProduct(product._id)
                                                                }}><DeleteForeverIcon /></Button> </TableCell>                                                        </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                {/* <Typography component="h3" variant="subtitle2">
                                                    {successMessage()}
                                                    {errorMessage()}
                                                </Typography> */}
                                                <Typography component="h3" variant="subtitle2">
                                                    Get Back to <NavLink className='link' to='/admin/dashboard'>Admin Home</NavLink>
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
    )
};

export default ManageProducts;
