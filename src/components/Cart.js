import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { DataContext } from '../contexts/DataProvider';
import { LoggedOut } from '../views/LoggedOut';
import { NoCart } from '../views/NoCart';

export const Cart = (props) => {
    const { currentUser } = useAuth();
    const { cartList } = useContext(DataContext);
    const { cartClear } = useContext(DataContext);
    const [cart, setCart] = cartList;
    const clearCart = cartClear;

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        const stripePromise = loadStripe("pk_test_51HQDVkBAC7MChR4eGnboooNdN9FPPSNun8qBxyaG8Na6GSC8XnR7QrxNjOjm9D6MT8my6wsmkGgrHcspdsnZ8YpF00Ljptt61D");
        const stripe = await stripePromise;   
        
        await fetch('/shop/react/checkout', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {...cart} )
        })
        .then(res => res.json())
        .then(data => {
            // with sessionId
            const redirect = async () => await stripe.redirectToCheckout({ sessionId: data.session_id });
            redirect();
            clearCart();
            setCart({ items: {}, quantity: 0, tax: 0, subtotal: 0, grandtotal: 0 });
        })
        .catch(err => console.error(err))

    }

    if (!currentUser.loggedIn) {
        return (
            <LoggedOut />
        )
    }
    if (!cart.items) {
        return (
            <NoCart />
        )
    }
    else {
        return (
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">{cart.quantity}</span>
                    </h4>
                    <ul className="list-group mb-3">

                        {Object.values(cart.items).map(item => (
                            <li key={item.info.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{item.info.name}</h6>
                                    {/* <small className="text-muted">Brief description</small> */}
                                </div>
                                <span className="text-muted">${Number(item.info.price).toFixed(2)} x{item.quantity}</span>
                            </li>
                        ))}

                        {/* <li className="list-group-item d-flex justify-content-between bg-light">
                        <div className="text-success">
                            <h6 className="my-0">Promo code</h6>
                            <small>EXAMPLECODE</small>
                        </div>
                        <span className="text-success">-$5</span>
                        </li> */}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Tax</span>
                            <strong>${Number(cart.tax).toFixed(2)}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span>
                            <strong>${Number(cart.subtotal).toFixed(2)}</strong>
                        </li>
                    </ul>

                    {/* <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code" />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">Redeem</button>
                        </div>
                        </div>
                    </form> */}
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Shipping Address</h4>
                    <form onSubmit={(e) => handleCheckout(e)} action='http://127.0.0.1:5000/shop/react/checkout' method='POST' className="needs-validation" noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" defaultValue="" required />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                        </div>

                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <select className="custom-select d-block w-100" id="country" required>
                                    <option defaultValue="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select className="custom-select d-block w-100" id="state" required>
                                    <option defaultValue="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" disabled={true} required />
                                <label className="custom-control-label" htmlFor="debit">PayPal (Coming Soon)</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
                                <label className="custom-control-label" htmlFor="paypal">Stripe</label>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                    </form>
                </div>
            </div>
        )
    }
}
