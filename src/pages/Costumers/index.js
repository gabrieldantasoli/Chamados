
import './costumers.css';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';


export default () => {
    return(
        <div>
            <Header />
            
            <div className='content'>
                <Title name="Costumers">
                    <FiUser />
                </Title>
            </div>
        </div>
        
    )    
}