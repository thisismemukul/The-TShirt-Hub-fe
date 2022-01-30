import React, { useEffect, useState } from 'react';
import { getProducts } from './helper/coreapicalls';
import { Button, Box, Container, Grid } from '@mui/material/';
import { styled } from '@mui/material/styles';
import Card from './Cards';

const ColorButton = styled(Button)(() => ({
    fontWeight: "bold",
    color: "#202023",
    backgroundColor: "#FFAA2A",
    '&:hover': {
        backgroundColor: "#FFAA2A",
    },
}));
const Base = ({
    title = "My Title",
    description = "My description",
    button = "My button",
    Img = "",
    className = "bg-dark text-white p-4",
    // childern
}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    console.log(error);
    const getAllloadducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        })
    }
    useEffect(() => {
        getAllloadducts();
    }, []);

    return (
        <>
            <Container maxWidth="xl">
                <Box className='mx-auto base' sx={{ p: 3, mb: 5 }}>
                    <Grid className='mx-auto' container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <div className="circle">
                                <img className="aboutImg" src={Img} alt="homeImg" />
                            </div>
                        </Grid>
                        <Grid className='text-justify pt-5' sx={{ mt: 3 }} item xs={12} sm={6}>
                            <h2 className="display-6 mainHead">{title}</h2>
                            <p className="lead mainBody">{description}</p>
                            <ColorButton variant="contained">{button}</ColorButton>
                        </Grid>

                    </Grid>
                </Box>
                <Box className='mx-auto' sx={{ p: 3, mt: 5, mb: 4 }}>
                    <Grid className='mx-auto' container spacing={{ xs: 1, sm: 1, md: 0 }}>
                        {products.map((product, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                    <Card product={product} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Base;
