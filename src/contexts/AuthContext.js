import React, { useEffect, useState, useContext } from 'react';
import firebase from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState();
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
            setCurrentUser(user);
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
