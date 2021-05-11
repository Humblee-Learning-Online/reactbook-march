import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';
import Products from './views/Products';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      user: {
        name: 'Derek Hawkins',
        age: 33,
        location: 'Dallas'
      },
      products: [],
    }
  }

  addToCart = (eventObj, productObj) => {
    this.setState({
      cart: this.state.cart.concat(productObj)
    })
  }

  // if you have data that you want to pass into the DOM (mainly from API call), then once complete, it fires render method again
  componentDidMount() {
    fetch('products.json') 
      .then(res => res.json())
      .then(data => this.setState( { products: data } ))
  }

  render() {

    return (
      // 
      <div>
        <header>
          <Navbar cart={this.state.cart} />
          {/* <Navbar delete={true} cart={ { total: Number(0).toFixed(2) } } /> */}
        </header>

        <main className="container">
          <Switch>
            <Route exact path='/' render={ () => <Home user={this.state.user} /> } />
            <Route exact path='/products' render={ () => <Products addToCart={this.addToCart} products={this.state.products} /> } />
          </Switch>
        </main>

        <footer>

        </footer>
      </div>
    )
  }
}