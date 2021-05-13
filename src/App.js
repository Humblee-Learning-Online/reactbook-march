import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './views/Home';
import { Products } from './views/Products';
import { Navbar } from './components/Navbar';

import './App.css';
import firebase from './firebase';


export const App = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [posts, setPosts] = useState([]);

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
        console.log(productObj);
        setCart([...cart, productObj])
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
        
        let postListRef = db.ref('posts');
        let newPostRef = postListRef.push();
        var newPost = {
<<<<<<< HEAD
            id: newPostRef.key,
=======
            id: newPostRef.key, // pulling out the key attribute from newPostRef object
>>>>>>> thursday
            date: firebase.database.ServerValue.TIMESTAMP,
            body: e.target.body.value,
            author: 'Derek H'
        };
        newPostRef.set(newPost);
        // adds post to firebase database
<<<<<<< HEAD
        // db.ref('posts').push(newPost);

=======
        newPostRef.set(newPost)
        
>>>>>>> thursday
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

    const signIn = () => {
        alert('Signed in!');
    }

    const signOut = () => {
        alert('Signed out!');
    }

    return (
        <div>
            <header>
                <Navbar cart={[...cart]} signIn={signIn} signOut={signOut} />
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
