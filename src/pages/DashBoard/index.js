
import './dashboard.css';
import { useState} from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default () => {
    const [calls , setCalls] = useState([111]);

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

                            <Link to="/costumers">
                                <FiPlus />
                                Add Call
                            </Link>
                        </div>
                    ) : (
                        <div className='calls'>
                            <Link to="/costumers">
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