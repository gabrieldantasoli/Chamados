import { createContext , useEffect, useState } from "react";
import { app } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

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
    const [message, setMessage] = useState("");

    const SignInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:token", "wwwww");
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            console.log(userCredential)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
            setTimeout(() => setMessage(""),7000)
        })
    };

    const SignUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setMessage("User registered!");
            setTimeout(() => setMessage(""),7000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
            setTimeout(() => setMessage(""),7000)
        }) 
    }

    function SignOut() {
        sessionStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }

    return(
        <AuthContext.Provider value={{signed: !!user , SignInWithEmail, SignUpWithEmail, SignOut, user , message}}>
            {children}
        </AuthContext.Provider>
    )
}