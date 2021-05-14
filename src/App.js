import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './views/Home';
import { Products } from './views/Products';
import { Navbar } from './components/Navbar';

import './App.css';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';


export const App = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({ items: {}, quantity: 0, subtotal: 0 });
    const [posts, setPosts] = useState([]);
    const { signIn } = useAuth();

    const db = firebase.database();

    useEffect(() => {
        setUser({
            name: 'Derek Hawkins',
            age: 33,
            location: 'Dallas'
        });
    }, []);

    useEffect(() => {
        let newProducts = [];
        db.ref('products').once('value', (snapshot) => {
            snapshot.forEach(child => {
                newProducts.push(child.val())
            })
            setProducts(newProducts);
        })
    }, [db]);
    
    useEffect(() => {
        let newPosts = [];
        db.ref('posts').once('value', (snapshot) => {
            snapshot.forEach(child => {
                newPosts.push(child.val())
            })
            setPosts(newPosts);
        })
    }, [db])

    const addToCart = (eventObj, productObj) => {
        let newCart = {...cart}

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

        setCart({...newCart})
    };

    const addPost = (e) => {
        e.preventDefault();
        
        // Keep track of original posts
        let originalPosts = posts;

        // clear out current state of posts
        setPosts([]);

        // connect to posts Collection
        let postListRef = db.ref('posts');

        // Get reference to current document trying to be created
        let newPostRef = postListRef.push();
        
        //  create the post structure
        var newPost = {
            id: newPostRef.key, // pulling out the key attribute from newPostRef object
            date: firebase.database.ServerValue.TIMESTAMP,
            body: e.target.body.value,
            author: 'Derek H'
        };
        // newPostRef.set(newPost);
        // adds post to firebase database
        newPostRef.set(newPost)
        
        //  reinitialize our state with new list of posts
        setPosts([...originalPosts, newPost]);

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
                <Navbar cart={{ ...cart }} signIn={signIn} signOut={signOut} />
                {/* <Navbar delete={true} cart={ { total: Number(0).toFixed(2) } } /> */}
            </header>

            <main className="container">
                <Switch>
                    <Route exact path='/' render={() => <Home deletePost={deletePost} addPost={addPost} posts={posts} user={{...user, something: 'hello'}} />} />
                    <Route exact path='/products' render={() => <Products addToCart={addToCart} products={[...products]} />} />
                </Switch>
            </main>

            <footer>

            </footer>
        </div>
    )
}
