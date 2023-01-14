
import Header from '../../components/Header';
import Title from '../../components/Title';
import './new.css';

import { FiPlusCircle } from 'react-icons/fi';

export default () => {

    function newCall(e) {
        e.preventDefault();
        alert("new call")
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
                        <select id='select' required>
                            <option key={1} value={1}>Gabriel</option>
                        </select> <br />

                        <label htmlFor='description'>Description</label> <br />
                        <select id='description'>
                            <option value="Suport" required>Suport</option>
                            <option value="financial">Financial</option>
                            <option value="technicalVisit">Technical Visit</option>
                            <option value="Services">Services</option>
                        </select> <br />

                        <label htmlFor='status'>status</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Opened" id='opened' required/>
                            <label htmlFor='opened'>Opened</label>

                            <input type="radio" name="radio" value="Pending" id='pending'/>
                            <label htmlFor='pending'>Pending</label>

                            <input type="radio" name="radio" value="Conclued" id='conclued'/>
                            <label htmlFor='conclued'>Conclued</label>
                        </div>

                        <label htmlFor='problem'>Your Problem</label><br />
                        <textarea type="text" placeholder='Your Problem' required /><br/>

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        
        </div>
    )
}