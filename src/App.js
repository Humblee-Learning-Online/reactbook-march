import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './views/Home';
import { Products } from './views/Products';
import { Navbar } from './components/Navbar';

import './App.css';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';
import { Cart } from './components/Cart';
import { DataContext } from './contexts/DataProvider';


export const App = () => {
    const { cartList } = useContext(DataContext);
    const { postList } = useContext(DataContext);
    const { grabPosts } = useContext(DataContext);
    const { cartClear } = useContext(DataContext);

    const [cart, setCart] = cartList;
    const [posts, setPosts] = postList;
    const getPosts = grabPosts;
    const clearCart = cartClear;
    const { currentUser } = useAuth();

    const db = firebase.database();


    useEffect(() => {
        if (currentUser.loggedIn) {
            db.ref(`cart/${currentUser.user.id}`).once('value', (snapshot) => {
                if (!snapshot.exists()) {
                    clearCart()
                    setCart({ items: {}, quantity: 0, tax: 0, subtotal: 0, grandtotal: 0 })
                }
            })
        }
    }, [currentUser, setCart, db, clearCart])

    const addToCart = (eventObj, productObj) => {
        let newCart;
        if (!cart.hasOwnProperty('items')) {
            newCart = {...cart, items: {} }
        }
        else {
            newCart = {...cart }
        }

        if (!Object.keys(newCart.items).includes(productObj.name)) {
            // create new newCart items
            newCart.items[productObj.name] = {
                info: productObj,
                quantity: 1
            }
        }
        else {
            // find item and increase its quantity +1
            newCart.items[productObj.name].quantity++;
        }

        // increment entire cart quantity
        newCart.quantity ++;
        
        // update subtotal
        newCart.subtotal += newCart.items[productObj.name].info.price;
        newCart.tax += newCart.items[productObj.name].info.tax;
        newCart.grandtotal = newCart.subtotal + newCart.tax;

        
        // update cart in database
        let cartListRef = db.ref(`cart/${currentUser.user.id}`);
        var newCartItem = {
            ...newCart,
        }
        cartListRef.set(newCartItem);
        
        // set cart from database
        // cartListRef.once('value', snapshot => {
        //     console.log(snapshot[0])
        // })
        // .orderByChild(`items/${productObj.name}`)
        db.ref(`cart/${currentUser.user.id}`).on('value', snapshot => {
            setCart({ ...snapshot.val() });
        })
    };


    const addPost = (e) => {
        e.preventDefault();
        
        // clear out current state of posts
        setPosts([]);

        // connect to posts Collection
        let postListRef = db.ref(`posts/${currentUser.user.id}`);

        // Get reference to current document trying to be created
        
        //  create the post structure
        var newPost = {
            date: firebase.database.ServerValue.TIMESTAMP,
            body: e.target.body.value,
            author: currentUser.user.name
        };

        postListRef.push(newPost);
        // newPostRef.set(newPost);
        // adds post to firebase database
        // newPostRef.set(newPost)
        
        //  reinitialize our state with new list of posts
        getPosts();

        // cleara input form
        e.target.body.value = '';
    }

    const deletePost = (p) => {
        // remove post from database
        db.ref(`posts/${p.id}`).remove();

        // re-render new list of posts
        setPosts( [...posts.filter(post => post.id !== p.id)] )
    }

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out.');
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div>
            <header>
                <Navbar signOut={signOut} />
            </header>

            <main className="container">
                <Switch>
                    <Route exact path='/' render={() => <Home currentUser={currentUser} deletePost={deletePost} addPost={addPost} />} />
                    <Route exact path='/shop/products' render={() => <Products addToCart={addToCart} />} />
                    <Route exact path='/shop/cart' render={() => <Cart cart={{ ...cart }} /> } />
                </Switch>
            </main>

            <footer>

            </footer>
        </div>
    )
}
