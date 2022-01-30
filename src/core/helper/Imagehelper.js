import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import { API } from '../../backend';
const Imagehelper = ({ product }) => {
    const imageurl = product
        ? `${API}/product/photo/${product._id}`
        : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
    return (
        <>
        
            <CardMedia
                component="img"
                height="160"
                image={imageurl}
                alt="green iguana"
            />
        </>
    )
};

export default Imagehelper;
