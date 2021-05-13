import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export const Navbar = (props) => {
    const prices = props.cart.map(p => p.price);
    const subtotal = prices.reduce((sum, current) => sum + current, 0);

    const { currentUser } = useAuth();
    const handleLogin = () => {
        props.signIn();
    }

    const handleLogout = () => {
        props.signOut();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href=".">Navbar</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href=".">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-expanded="false">
                            Shop
                                <span style={{ marginLeft: '15px' }} className="badge badge-secondary">${subtotal.toFixed(2)}</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to="/products">Products</Link>
                            <a className="dropdown-item" href=".">
                                <div>
                                    Cart
                                        <span className="float-right badge badge-secondary">{props.cart.length}</span>
                                </div>
                            </a>
                            <a className="dropdown-item" href=".">Checkout</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav m1-auto">
                    {
                        !currentUser
                        ?
                        <li className="nav-item">
                            <Link onClick={ () => handleLogin() } to="" className="btn btn-link text-light">Login</Link>
                        </li>
                        :
                        <li className="nav-item">
                            <Link onClick={ () => handleLogout() } to="" className="btn btn-link text-light">Logout</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}
