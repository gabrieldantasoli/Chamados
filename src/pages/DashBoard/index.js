
import './dashboard.css';
import { useEffect, useState , useContext } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { app } from '../../services/firebaseConection';
import { collection, getFirestore , doc, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../Contexts/auth';
import { toast } from 'react-toastify';

export default () => {
    const [calls , setCalls] = useState([]);
    const [loading , setLoading] = useState(true);

    const database = getFirestore(app);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            loadCalls(user.uid)
        }
        
        return () => {

        }
    }, [user]);

    async function loadCalls(id) {
        if (id !== null && id !== undefined) {
            const callsRef = collection(database, "calls");
            const userCallsRef = doc(callsRef, id);
            const userCalls = collection(userCallsRef, "userCalls");
            const data = await getDocs(userCalls)
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    let list = [];
                    snapshot.forEach((doc) => {
                        list.push(doc.data());
                    })
                    setCalls(list);
                    console.log(list);
                }
            })
            .catch((error) => {
                toast.error("Error : Fail to load Call!")
                setLoading(false);
            })
            setLoading(false);
        }
        
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Calls">
                    <FiMessageSquare />
                </Title>

                
                <div id='board' className="container dashboard">
                    {calls.length === 0 ? (
                        <div>
                            <p>No call registered :(</p>

                            <Link to="/new">
                                <FiPlus />
                                Add Call
                            </Link>
                        </div>
                    ) : (
                        <div className='calls'>
                            <Link to="/new">
                                <FiPlus />
                                Add Call
                            </Link>

                            <table>

                                <thead>
                                    <tr>
                                        <th scope='col'>Costumers</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Add´s Date</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td data-label="client">
                                            <div>
                                                Gabriel Dantas de Oliveira
                                            </div>
                                        </td>
                                        <td data-label="description">
                                            <div>
                                            Supor dddddddddddddddddd dddddddddddd dddddddddddd ddddddddddddddd ddddddddddddddddddd ddddddddddddddddddddd dddddddddddddddddddd dddddddddddddddd ddddddddddddddd ddddddddddddddddddd dddddddddddddddd ddddddddddddddddd dddddddddddddt    
                                            </div>
                                        </td>
                                        <td data-label="status">
                                            <div>
                                                <span className='badge' style={{backgroundColor: '#5cb85c'}}>Open</span>
                                            </div>
                                            
                                        </td>
                                        <td data-label="date">
                                            <div>
                                                20/12/2022
                                            </div>
                                        </td>
                                        <td data-label="#" className='buttons'>
                                            <div>
                                        <button className='action' style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch />
                                        </button>
                                        <button className='action' style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 />
                                        </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}