import React, { Component } from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../context'
import CartItem from '../Cart/CartItem'
import CartList from '../Cart/CartList'
import CartTotal from '../Cart/CartTotal';
export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const {cart} = value;
            if(cart.length > 0){
              return(
                <>
                  <Title name = "Yours " title = "Cart" />
                  <CartColumns />
                  <CartList value = {value}/>
                  <CartTotal value = {value} />
                </>
              )
            }else{
                return (<EmptyCart />)
            }
          }}
        </ProductConsumer>
      
      </section>
    )
  }
}
