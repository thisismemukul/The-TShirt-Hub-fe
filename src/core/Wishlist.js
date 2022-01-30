import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { loadWishlist } from './helper/Carthelper';
import Card from './Cards';

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setProducts(loadWishlist());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <>
                <Box className='mx-auto' sx={{ p: 3, mt: 5, mb: 4 }}>

                    <Grid className='mx-auto' container spacing={{ xs: 1, sm: 1, md: 0 }}>
                        {products && products.map((product, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                    <Card key={index}
                                        product={product}
                                        addtoWishlist={false}
                                        removefromWishlist={true}
                                        setReload={setReload}
                                        reload={reload}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>

            </>
        )
    }
    return (
        <>
            <Container maxWidth="xl">
                {/* <MenuBar/> */}
                <Box className='mx-auto text-white' sx={{ p: 3 }}>

                    <Typography className='text-center' variant="h5" component="h5">
                        <strong> Your Wishlist</strong>
                    </Typography>
                    {loadAllProducts()}
                    {!products && (<h1>Your Wishlist is empty</h1>)}
                </Box>
            </Container>
        </>
    )
};

export default Wishlist;
