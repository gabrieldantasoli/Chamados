
import { useState , UseContext, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import User from '../../images/user.png'

import { AuthContext } from '../../Contexts/auth';

import { FiSettings , FiUpload , FiLogOut } from 'react-icons/fi';

export default () => {
    const { user , SignOut } = useContext(AuthContext);

    const [name , setName] = useState(user && user.name);
    const [email , setEmail] = useState(user && user.email);
    const [avatarURL , setAvatarURL] = useState(user && user.avatarURL);

    return(
        <div className='profile'>
            <Header />
            
            <div className='content'>
                <Title name="My Profile">
                    <FiSettings />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <FiUpload />

                            <input type="file" accept="image/*" /> <br />

                            {avatarURL === null ? <img src={User} alt="user"/> : <img src={avatarURL} alt="user"/>}
                        </label> <br />

                        <label className='label' htmlFor='name'>Name</label> <br />
                        <input id='name' type="text" value={name === "UNKNOWN" ? "" : name} onChange={(e) => setName(e.target.value)} placeholder="UNKNOWN" required/> <br />

                        <label className='label' htmlFor='email'>E-mail</label> <br />
                        <input id='email' type="text" value={email} disabled={true} /> <br />

                        <button type="submit">Upload</button>
                    </form>
                </div>

                <button onClick={SignOut}><FiLogOut /> LogOut</button>
            </div>
        </div>
    )
}