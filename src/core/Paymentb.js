import React, { useState, useEffect } from 'react';
import { cartEmpty } from './helper/Carthelper';
import { getmeToken, processPayment } from './helper/paymentBhelper';
import { createOrder } from './helper/orderhelper';
import { isAuthenticated } from '../auth/helper';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import DropIn from 'braintree-web-drop-in-react';
const useStyles = makeStyles((theme) => ({
    button: {
        background: "#FFAA2A",
        '&:hover': {
            background: 'white',
            color: "#FFAA2A",
        },
    }
}));

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
    const classes = useStyles();
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            if (info.error) {
                setInfo({ ...info, error: info.error })
            } else {
                console.log("INFO ", info);
                const clientToken = info.clientToken
                setInfo({ clientToken })
            }
        })
    };
    const showbtdropIn = () => {

        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <Button onClick={onPurchase} className={classes.button}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Buy
                        </Button>
                    </div>
                ) : (
                    <h3>Please login or add something to cart</h3>
                )}
            </div>
        );
    };
    useEffect(() => {
        getToken(userId, token)
    }, []);
    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    };
                    createOrder(userId, token, orderData);
                    cartEmpty(() => {
                        console.log("Did we got a crash?");
                    });

                    setReload(!reload);
                })
                .catch(error => {
                    setInfo({ loading: false, success: false });
                    console.log("PAYMENT FAILED");
                });
        });
    };
    const getAmount = () => {
        let amount = 0;
        products && products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };
    return (
        <div>
            <h3>Your bill is {getAmount()} $</h3>
            {showbtdropIn()}
        </div>
    )
};

export default Paymentb;
