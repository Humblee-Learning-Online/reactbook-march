import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        const products = this.props.products;
        const user = this.props.user;

        return (
            <React.Fragment>
                <h4>Hello, {user.name} ({user.age}) from: {user.location}</h4>
                <hr />
                <div className="row product-deck">
                    {products.map(p => (
                        <div key={p.id} className="col-4">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title">
                                        {p.name}
                                        <span className="float-right">${p.price}</span>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <img className="card-img-top" src="https://picsum.photos/500/500/?blur" alt={p.name} />
                                </div>
                                <div className="card-footer">
                                    <button onClick={(e) => this.showPrompt(e, p)} className="btn btn-info btn-block">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}
