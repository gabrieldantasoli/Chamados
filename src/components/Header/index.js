
import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../Contexts/auth';
import Avatar from '../../images/user.png';

//icons
import { FiHome , FiUser , FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default () => {
    const { user , loadUSer } = useContext(AuthContext);

    if (user === "null") {
        loadUSer();
    }

    return(
        <div className='sidebar'>
            <div className='img'>
                <div>
                    <img src={user.avatarURL === null ? Avatar : user.avatarURL} alt="Avatar image" />
                </div>
            </div>

            <Link to="/dashboard">
                <FiHome />
                Chamados
            </Link>

            <Link to="/costumers">
                <FiUser />
                Clients
            </Link>

            <Link to="/profile">
                <FiSettings />
                Settings
            </Link>

        </div>
    )
}