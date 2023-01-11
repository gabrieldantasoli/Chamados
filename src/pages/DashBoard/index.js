
import { AuthContext } from '../../Contexts/auth';
import { useContext } from 'react';

export default () => {
    
    // Using context starts
    const { user , SignOut } = useContext(AuthContext);

    async function logOut() {
        await SignOut();
    }
    // Using context ends

    return (
        <div>
            logged!
            <button onClick={logOut}>Log out</button>
        </div>
    )
}