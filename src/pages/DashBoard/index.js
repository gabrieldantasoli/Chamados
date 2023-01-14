
import { AuthContext } from '../../Contexts/auth';
import { useContext , useEffect} from 'react';

import Header from '../../components/Header';

export default () => {
    
    // Using context starts
    const { user , SignOut , loadUser } = useContext(AuthContext);

    async function logOut() {
        await SignOut();
    }
    // Using context ends

    return (
        <div>
            <Header />

            
            logged!
            <button onClick={logOut}>Log out</button>
        </div>
    )
}