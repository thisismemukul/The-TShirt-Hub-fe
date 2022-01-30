import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { loadCart } from './helper/Carthelper';
import Card from './Cards';
import Paymentb from './Paymentb';
const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <>
                {products && products.map((product, index) => (
                    <Card key={index}
                        product={product}
                        addtoCart={false}
                        removefromCart={true}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </>
        )
    }
    const loadCheckout = () => {
        return (
            <>
                <Paymentb
                    products={products}
                    setReload={setReload}
                />
                {/* <StripeCheckout
                    products={products}
                    setReload={setReload}
                /> */}
            </>
        )
    }
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
                                    <Typography className='text-center' variant="h5" component="h5">
                                        <strong> Your Cart</strong>
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 5 }}>
                                        <Grid container spacing={2}>
                                            {products.length > 0 ? loadAllProducts(products) : (<h3>No products in CART</h3>)}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Container component="main" maxWidth="xs">
                                <Box
                                    sx={{
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                    }}
                                >
                                    <Typography className='text-center' variant="h5" component="h5">
                                        <strong> Your Cart</strong>
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 5 }}>
                                        <Grid container spacing={2}>
                                            {loadCheckout()}
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

export default Cart;
