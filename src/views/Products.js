import React, { useContext } from 'react'
import { Product } from '../components/Product'
import { DataContext } from '../contexts/DataProvider'

export const Products = (props) => {
    const { productList } = useContext(DataContext);
    const [products] = productList;

    return (
        <React.Fragment>
            <h4>Products</h4>
            <hr />
            <div className="row product-deck">
                {products.map(p => <Product addToCart={props.addToCart} key={p.id} p={p} />)}
            </div>
        </React.Fragment>
    )
}
