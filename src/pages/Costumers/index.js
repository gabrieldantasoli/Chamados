
import { doc, getFirestore , setDoc , collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { app } from "../../services/firebaseConection";

import './costumers.css';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';


export default () => {
    const database = getFirestore(app);
    const [ name , setName ] = useState(""); 
    const [ cnpj , setCnpj ] = useState(""); 
    const [ address , setAdress ] = useState(""); 

    async function handleAdd(e) {
        e.preventDefault();
        
        if (!name || !cnpj || !address) {
            toast.error("Fill all Filds!");
            return;
        }
        
        let data = collection(database, "costumers");

        await addDoc(data , {
            name: name,
            cnpj: cnpj,
            address: address,
        })
        .then(() => {
            setName("");
            setCnpj("");
            setAdress("");
            toast.info("Costumer Saved!")
        })
        .catch((error) => {
            toast.error("Something went Wrong :(")
        })
    }

    return(
        <div className='costumers-page'>
            <Header />
            
            <div className='content'>
                <Title name="Costumers">
                    <FiUser />
                </Title>

                <div className="container">
                    <form className="form-profile costumers" onSubmit={handleAdd}>
                        <label htmlFor='name'>Name</label> <br />
                        <input type="text" placeholder="Costumer´s name" value={name} onChange={(e) => setName(e.target.value)} id="name" /> <br />

                        <label htmlFor='cnpj'>CNPJ</label> <br />
                        <input type="text" placeholder="Costumer´s CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} id="cnpj" /> <br />

                        <label htmlFor='address'>Address</label> <br />
                        <input type="text" placeholder="Costumer´s Address" value={address} onChange={(e) => setAdress(e.target.value)} id="address" /> <br />

                        <button type='submit'>Add Costumer</button>
                    </form>
                </div>
            </div>
        </div>
        
    )    
}