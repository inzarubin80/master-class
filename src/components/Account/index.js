import React  from 'react';
import { useSelector } from 'react-redux';
import {signOutUser} from '../../redux/user/userActions';

export default function Account(props) {

    const user = useSelector(state => state.user.user);
    const roles = useSelector(state => state.user.userRoles.roles);

    return (

        <div>
        
            <h5>{user.email?user.email:user.phoneNumber}</h5>
            <button type="submit" className="btn btn-primary btn-block" onClick={signOutUser}>Выйти</button>

            {(roles.indexOf('admin')!=-1) && <div className="ListMasterClasses">
                <button className="btn btn-success" onClick={() => { props.history.push(`/change/-1`) }}>Добавить мастер класс</button>
            </div>}

        </div>

    );
}
