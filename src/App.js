import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: 'Derek Hawkins',
        age: 33,
        location: 'Dallas'
      },
      products: [
        {
          name: 'Cheez-Its Minis',
          price: 1.77
        },
        {
          name: 'Sour Patch Kids',
          price: 3.59
        },
        {
          name: "Albert Fruit Chews",
          price: 9.99
        }
      ]
    }
  }

  showPrompt(eventObj, productObj) {
    console.log(eventObj);
    alert('Hello');
    console.log(productObj);
  }

  render() {

    return (
      // 
      <div>
        <header>
          <Navbar />
        </header>

        <main className="container">
          <h4>Hello, { this.state.user.name } ({ this.state.user.age }) from: { this.state.user.location }</h4>
          <hr />
          <div class="row product-deck">
            {this.state.products.map(p => (
              <div className="col-4">
                <div class="card">
                  <div className="card-header">
                    <h6 class="card-title">
                      { p.name }
                    <span className="float-right">${ p.price }</span>
                    </h6>
                  </div>
                  <div class="card-body">
                    <img class="card-img-top" src="https://picsum.photos/500/500/?blur" alt={p.name} />
                  </div>
                  <div className="card-footer">
                    <button onClick={(e) => this.showPrompt(e, p)} className="btn btn-info btn-block">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer>

        </footer>
      </div>
    )
  }
}