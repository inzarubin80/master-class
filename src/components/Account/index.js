import React  from 'react';
import { useSelector } from 'react-redux';
import {signOutUser} from '../../redux/user/userActions';

export default function Account() {

    const user = useSelector(state => state.user.user);
    return (

        <div>
        
            <h5>{user.email}</h5>
            <button type="submit" className="btn btn-primary btn-block" onClick={signOutUser}>Выйти</button>

        </div>

    );
}
