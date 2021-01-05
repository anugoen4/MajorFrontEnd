import React, { Component } from 'react'
import Products from './Products';
import Title from './Title'
import {ProductConsumer} from '../context'



export default class ProductList extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <div className = "py-5">
          <div className = "container">
            <Title name = "Our" title = "Products" />
            <div className = "row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map( product => {
                    return <Products key = {product.id} product = {product}  />
                  })
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
