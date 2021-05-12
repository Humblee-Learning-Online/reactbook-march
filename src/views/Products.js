import React from 'react'
import { Product } from '../components/Product'

export const Products = (props) => {
    return (
        <React.Fragment>
            <h4>Products</h4>
            <hr />
            <div className="row product-deck">
                {props.products.map(p => <Product addToCart={props.addToCart} key={p.id} p={p} />)}
            </div>
        </React.Fragment>
    )
}
