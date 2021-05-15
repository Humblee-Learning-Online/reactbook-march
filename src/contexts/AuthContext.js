import React, { useEffect, useState, useContext } from 'react';
import firebase from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState({ loggedIn: false, hasItems: false });
    const auth = new firebase.auth.GoogleAuthProvider();

    function signIn() {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        firebase.auth().signInWithPopup(auth);
                    })
                    .catch(err => {
                        console.error(`${err.code}\n${err.message}`)
                    })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(
                    {
                        user: {
                            id: user.uid,
                            name: user.displayName,
                            email: user.email
                        },
                        loggedIn: true 
                    }
                );
            } else {
                setCurrentUser({ loggedIn: false });
            }
        });
        return unsubscribe;
    }, []);

    const value = { currentUser, signIn };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
