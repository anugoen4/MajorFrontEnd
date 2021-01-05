import React from 'react';
import CartItem from './CartItem'

export default function CartList({value}) {
    const {cart} = value
    console.log(value,cart);
    return (
        <>
            {cart.map(item => {
                return <CartItem key = {item.id} item = {item} value = {value}
            />})}
        </>
    );
}
