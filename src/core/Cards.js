import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Imagehelper from './helper/Imagehelper';
import { Navigate } from 'react-router-dom';
import { addItemToCart, addItemToWishlist, removeItemFromCart,removeItemFromWishlist } from './helper/Carthelper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import Rating from '@mui/material/Rating';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#1d1e22',
        color: '#fcfcfc',
    },
    button: {
        color: "#FFAA2A",
        '&:hover': {
            background: 'white',
            color: "#FFAA2A",
        },
    },
    buttonError: {
        color: "#ff000",
        '&:hover': {
            background: 'white',
            color: "#ff000",
        },
    },
    buttonLike: {
        color: "#fcfcfc",
        '&:hover': {
            background: 'white',
            color: "#FFAA2A",
        },
    },
}));
const Cards = ({ product,
    addtoCart = true,
    removefromCart = false,
    addtoWishlist = true,
    removefromWishlist = false,
    // setReload = f => f
    setReload = function (f) {
		return f;
	},
    reload = undefined }) => {
    const classes = useStyles();
    const [count, setCount] = useState(product.count);
    const [redirect, setRedirect] = useState(false);
    const [redirectToWishlist, setRedirectToWishlist] = useState(false);
    const cardPrice = product ? `INR ${product.price}/-` : 'INR 300/-';
    const cardRating = product ? product.rating : '3';
    const cardTitle = product ? product.name : 'The T-Shirt Hub';
    const cardDescription = product ? product.description : 'MERN Stack E-commerce website,where you can buy products.';
    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
        getRedirect(redirect);
    }

    const getRedirect = (redirect) => {
        if (redirect) {
            return <Navigate to="/cart" />

        }
    }
    const addToWishlist = () => {
        addItemToWishlist(product, () => setRedirectToWishlist(true));
        getRedirectToWishlist(redirectToWishlist);
    }
    const getRedirectToWishlist = (redirectToWishlist) => {
        if (redirectToWishlist) {
            return <Navigate to="/wishlist" />

        }
    }
    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <Button className={classes.button} size="small" onClick={() => addToCart()} >{<ShoppingCartIcon />}Add to Cart</Button>
            )
        );
    }
    const showRemoveFromCart = (removefromCart) => {
        return (
            removefromCart && (
                <Button className={classes.buttonError} color='error' size="small" onClick={() => {removeItemFromCart(product._id);setReload(!reload)}} >{<RemoveShoppingCartRoundedIcon color='error' />}Remove from Cart</Button>
            )
        );
    }
    const showAddToWishlist = (addtoWishlist) => {
        return (
            addtoWishlist && (
                <Button className={classes.buttonLike} onClick={() => addToWishlist()} size="small">{<FavoriteBorderIcon />}</Button>
            )
        );
    }
    const showRemoveFromWishlist = (removefromWishlist) => {
        return (
            removefromWishlist && (
                <Button className={classes.buttonLike} size="small" onClick={() => {removeItemFromWishlist(product._id);setReload(!reload)}}  >{<FavoriteIcon />}</Button>
            )
        );
    }
    return (
        <>

            <Card className={classes.root} sx={{ maxWidth: 300, minHeight: 350 }} >
                {getRedirect(redirect)}
                {getRedirectToWishlist(redirectToWishlist)}
                <Imagehelper product={product} />
                <CardContent>
                    <Typography sx={{ fontSize: 14, marginTop: 3 }} gutterBottom>
                        {cardPrice}
                    </Typography>
                    <Rating name="read-only" value={cardRating} readOnly />
                    <Typography gutterBottom variant="h5" component="div">
                        {cardTitle}
                    </Typography>
                    <Typography variant="body2" >
                        {cardDescription}
                    </Typography>
                </CardContent>
                <CardActions>
                    {showAddToWishlist(addtoWishlist)}
                    {showRemoveFromWishlist(removefromWishlist)}
                    {showAddToCart(addtoCart)}
                    {showRemoveFromCart(removefromCart)}
                </CardActions>
            </Card>
        </>
    )
};

export default Cards;
