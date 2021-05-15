import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';

export const Navbar = (props) => {
    const { currentUser, signIn } = useAuth();
    const { cartList } = useContext(DataContext);
    const [cart, setCart] = cartList;

    const handleLogin = () => {
        signIn();
    }

    const handleLogout = () => {
        props.signOut();
        setCart({ items: {}, quantity: 0, tax: 0, subtotal: 0, grandtotal: 0 })
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Reactbook March</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-expanded="false">
                            Shop
                                <span style={{ marginLeft: '15px' }} className="badge badge-secondary">${ Number(cart.subtotal).toFixed(2) }</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to="/shop/products">Products</Link>
                            <Link className="dropdown-item" to="/shop/cart">
                                <div>
                                    Cart
                                        <span className="float-right badge badge-secondary">{cart.quantity}</span>
                                </div>
                            </Link>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav m1-auto">
                    {
                        !currentUser.loggedIn
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
