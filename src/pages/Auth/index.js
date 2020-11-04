import React  from 'react';
import {useSelector } from 'react-redux';
import Login from '../../components/Login'
import Account from '../../components/Account'

export default function Auth() {

    const user = useSelector(state => state.user.user);
    
    return (

        <div>
       
           {user && <Account/>}
           {!user && <Login/>}
           
        </div>
    );
}
