import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { loadCart, cartEmpty } from './helper/Carthelper';
import { createOrder } from './helper/orderhelper';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend'; 

const useStyles = makeStyles((theme) => ({
    button: {
        background: "#FFAA2A",
        '&:hover': {
            background: 'white',
            color: "#FFAA2A",
        },
    },
}));

const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {
    const classes = useStyles();

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const getFinalPrice = () => {
        let amount = 0;
        products && products.map(product => {
            amount = amount + product.price;
        });
        return amount;
    };
    const makePayment = (token) => {
        const body = {
            token,
            products
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        return fetch(`${API}/stripepayment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response);
                const { status } = response;
                console.log('STATUS',status);
                // if (status === 200) {
                //     setData({ ...data, success: true });
                //     cartEmpty(() => {
                //         setReload(!reload);
                //     });
                // } else {
                //     throw new Error('Something went wrong');
                // }
            })
            .catch(error => {
                console.log(error);
                setData({ ...data, error: error });
            });
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey={process.env.REACT_APP_API}
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy T-Shirts"
            >
                <Button className={classes.button}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Pay with Stripe
                </Button>
            </StripeCheckoutButton>
        ) : (
            <NavLink className='link' to="/signin">
                <Button className={classes.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    SignIn
                </Button>
            </NavLink>
        )
    }
    return (
        <>
            <h3>Stripe checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </>
    )
};

export default StripeCheckout;
