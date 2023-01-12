import { createContext , useEffect, useState } from "react";
import { app } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUSer = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionToken && sessionUSer) {
                setUser(sessionUSer);
            }
        };

        loadStoreAuth();
    }, []);

    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    const SignInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:token", userCredential.user.accessToken);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            console.log(userCredential)
            toast.success("Welcome!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        })
    };

    const SignUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User registered!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        }) 
    }

    function SignOut() {
        sessionStorage.clear();
        setUser(null);
        toast.success("log out")
        return <Navigate to="/" />;
    }

    return(
        <AuthContext.Provider value={{signed: !!user , SignInWithEmail, SignUpWithEmail, SignOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}