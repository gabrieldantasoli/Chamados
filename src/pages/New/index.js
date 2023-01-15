
import Header from '../../components/Header';
import Title from '../../components/Title';
import './new.css';

import { FiPlusCircle } from 'react-icons/fi';
import { useState , useEffect , useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';

import { app } from '../../services/firebaseConection';
import { doc , collection, getDocs, getFirestore, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default () => {

    const [loading , setLoading] = useState(true);
    const [customers , setCustomers] = useState([]);

    const [customerSelected , setCustomerSelected] = useState(0);
    const [description , setDescription] = useState('Suport');
    const [status , setStatus] = useState('Opened');
    const [problem , setProblem] = useState("");

    const database = getFirestore(app);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers() {
            let customersCollection = collection(database, "costumers");
            let customersData = await getDocs(customersCollection)
            .then((snapshot) => {
                let arrayCustomers = [];

                snapshot.forEach((doc) => {
                    arrayCustomers.push({
                        id: doc.id,
                        name: doc.data().name,
                    })
                });

                if (arrayCustomers.length === 0) {
                    toast.info("No one Client Founded!");
                    setCustomers([]);
                    setLoading(false);
                    return;
                }

                setCustomers(arrayCustomers);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Fail Showing Customers!")
                setLoading(false);
                setCustomers([{id:1 , name: ''}]);
            })
        }

        loadCustomers();
    }, []);

    async function newCall(e) {
        e.preventDefault();
        //collection("collection").doc("documentId").collection("subcollection");
        const callsRef = collection(database, "calls");
        const userCallsRef = doc(callsRef, user.uid);
        const userCalls = collection(userCallsRef, "userCalls");
        await addDoc(userCalls,{
            created: new Date(),
            customer: customers[customerSelected].name,
            customerId: customers[customerSelected].id,
            description: description,
            status: status,
            problem: problem,
        })
        .then(() => {
            toast.success("Call created ;)");
            setProblem('');
            setCustomerSelected(0);
        })
        .catch((error) => {
            toast.error("Error: call not added!")
        })
       
    }

    function changeSelect(e) {
        setDescription(e.target.value);
    }

    function changeStatus(e) {
        setStatus(e.target.value);
    }

    function changeSelecteCustomer(e) {
        setCustomerSelected(e.target.value);
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="New call">
                    <FiPlusCircle />
                </Title>

                <div className="container">
                    <form className='form-profile' onSubmit={newCall}>
                        <label htmlFor='select'>Costumer</label> <br /> 

                        {loading ? (
                            <input type="text" disabled={true} value="Loading Customers..." />
                         ) : (
                            <select id='select' required value={customerSelected} onChange={changeSelecteCustomer}>
                                {customers.map((item,index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                    })}
                            </select>
                        )}

                        <br />

                        <label htmlFor='description'>Description</label> <br />
                        <select id='description' value={description} onChange={changeSelect}>
                            <option value="Suport" required>Suport</option>
                            <option value="financial">Financial</option>
                            <option value="technicalVisit">Technical Visit</option>
                            <option value="Services">Services</option>
                        </select> <br />

                        <label htmlFor='status'>status</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Opened" id='opened' required onChange={changeStatus} checked={ status === 'Opened' }/>
                            <label htmlFor='opened'>Opened</label>

                            <input type="radio" name="radio" value="Pending" id='pending' onChange={changeStatus} checked={ status === 'Pending' }/>
                            <label htmlFor='pending'>Pending</label>

                            <input type="radio" name="radio" value="Conclued" id='conclued' onChange={changeStatus} checked={ status === 'Conclued' }/>
                            <label htmlFor='conclued'>Conclued</label>
                        </div>

                        <label htmlFor='problem'>Your Problem</label><br />
                        <textarea type="text" placeholder='Your Problem' required value={problem} onChange={(e) => setProblem(e.target.value)} /><br/>

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        
        </div>
    )
}