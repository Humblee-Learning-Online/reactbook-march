import React, { useEffect, useState, createContext } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([])
    const [cart, setCart] = useState({});
    const { currentUser } = useAuth();

    const db = firebase.database();

    const clearCart = () => {
        let cartReset = { items: {}, quantity: 0, tax: 0, subtotal: 0, grandtotal: 0 };
        setCart(cartReset)
        db.ref(`cart/${ currentUser.user.id }`).set(cartReset)
    }

    // Get Cart
    useEffect(() => {
        
        // if they have items in their cart
        if (cart.hasOwnProperty('items')) {
            // if the user is logged in
            if (currentUser.loggedIn) {
                async function getCart() {
                    // show their database copy of the cart
                    await db.ref(`cart/${currentUser.user.id}`).once('value', snapshot => {
                        setCart({ ...snapshot.val() });
                    })
                }
                getCart();
            }
        }
        else {
            
            if (!currentUser.loggedIn) {
                setCart({ items: {}, quantity: 0, tax: 0, subtotal: 0, grandtotal: 0 });
            }
        }
    }, [currentUser, cart, db])

    // Get Products
    useEffect(() => {
        let newProducts = [];
        
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                for (const p of data) {
                    newProducts.push({
                        id: p.id,
                        image: p.image,
                        name: p.name,
                        price: p.price,
                        tax: p.tax
                    })
                }
                setProducts(newProducts);
            })
            .catch(err => console.log(err))

        // db.ref('products').once('value', (snapshot) => {
        //     snapshot.forEach(child => {
        //         // console.log(child.val())
        //         newProducts.push(child.val())
        //     })
        //     setProducts(newProducts);
        // })
    }, []);

    // Get Posts
    const getPosts = () => {
        let newPosts = [];
        db.ref(`posts/${currentUser.user.id}`).once('value', (snapshot) => {
            snapshot.forEach(child => {
                newPosts.push({ id: child.key, ...child.val() })
            })
            setPosts(newPosts);
        })
    }

    useEffect(() => {
        if (currentUser.loggedIn) {
            getPosts();
        }
    })

    return (
        <DataContext.Provider value={{ cartClear: clearCart, grabPosts: getPosts, productList: [products, setProducts], postList: [posts, setPosts], cartList: [cart, setCart] } }>
            { props.children }
        </DataContext.Provider>
    )
}
