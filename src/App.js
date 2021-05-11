import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';
import Products from './views/Products';

export default class App extends Component {
  constructor() {
    console.log('constructed')
    super();

    this.state = {
      user: {
        name: 'Derek Hawkins',
        age: 33,
        location: 'Dallas'
      },
      products: []
    }
  }

  showPrompt(eventObj, productObj) {
    console.log(eventObj);
    alert('Hello');
    console.log(productObj);
  }

  // if you have data that you want to pass into the DOM (mainly from API call), then once complete, it fires render method again
  componentDidMount() {
    console.log('mounted')
    fetch('products.json') 
      .then(res => res.json())
      .then(data => this.setState( { products: data } ))
  }

  render() {
    console.log('rendered')

    return (
      // 
      <div>
        <header>
          <Navbar delete={true} cart={ { total: Number(0).toFixed(2) } } />
        </header>

        <main className="container">
          <Switch>
            <Route exact path='/' render={ () => <Home {...this.state} /> } />
            <Route exact path='/products' render={ () => <Products /> } />
          </Switch>
        </main>

        <footer>

        </footer>
      </div>
    )
  }
}