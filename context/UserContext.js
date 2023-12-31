'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../server/firebase-config";
const { doc, getDoc, setDoc } = require ("firebase/firestore");
import { createFirestoreUser } from "../server/firebase-auth";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);


    // auth change

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setCurrentUser(userData);
                    setUserLoggedIn(true);

                } else {
                    console.log(
                        "user does not exist in firestore, creating a new document."
                    );
                    // User does not exist in Firestore, create a new document
                    const user = {
                        uid: authUser.uid,
                        email: authUser.email,
                    };
                    // ... creates new user in firestore
                    createFirestoreUser(user);
                }
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
