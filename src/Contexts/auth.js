import { createContext , useEffect, useState } from "react";
import { app } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import { doc, getFirestore, setDoc , collection, addDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { async } from "@firebase/util";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const database = getFirestore(app);

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
        .then( async (userCredential) => {
            const user = userCredential.user;
            sessionStorage.setItem("@AuthFirebase:token", user.accessToken);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

            let userCollection = collection(database, "users");
            const userProfile = await getDoc(doc(userCollection, user.uid));
            
            let data = {
                uid: user.uid,
                name: userProfile.data().name,
                avatarURL: userProfile.data().avatarURL,
                email: user.email
            }
            setUser(data);
            toast.success("Welcome!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        })
    };

    const SignUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            let uid = user.uid;
            let name = user.displayName;
            let data = collection(database, "users");

            await setDoc(doc(data,uid) , {
                name: "UNKNOWN",
                avatarURL: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: user.email,
                    avatarURL: null
                }
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            })

            toast.success("User registered!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        }) 
    }

    function SignOut() {
        signOut(auth);
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