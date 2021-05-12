import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import Products from './views/Products';

import './App.css';
import { Navbar } from './components/Navbar';


export const App = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([])

    useEffect(() => {
        setUser({
            name: 'Derek Hawkins',
            age: 33,
            location: 'Dallas'
        });
    }, []);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const addToCart = (eventObj, productObj) => {
        console.log(productObj);
        setCart([...cart, productObj])
    };

    return (
        <div>
            <header>
                <Navbar cart={[...cart]} />
                {/* <Navbar delete={true} cart={ { total: Number(0).toFixed(2) } } /> */}
            </header>

            <main className="container">
                <Switch>
                    <Route exact path='/' render={() => <Home user={{...user, something: 'hello'}} />} />
                    <Route exact path='/products' render={() => <Products addToCart={addToCart} products={[...products]} />} />
                </Switch>
            </main>

            <footer>

            </footer>
        </div>
    )
}
