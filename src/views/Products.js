import React, { Component } from 'react'
import Product from '../components/Product';

export default class Products extends Component {
    render() {
        const products = this.props.products;

        return (
            <React.Fragment>
                <h4>Products</h4>
                <hr />
                <div className="row product-deck">
                    {products.map(p => <Product addToCart={this.props.addToCart} key={p.id} p={p} />)}
                </div>
            </React.Fragment>
        )
    }
}
