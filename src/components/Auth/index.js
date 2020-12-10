import React  from 'react';
import {useSelector } from 'react-redux';
import Login from '../Login'
import Account from '../Account'

export default function Auth(props) {

    const user = useSelector(state => state.user.user);
    console.log(user);
    return (

        <div>
       
           {user && <Account history = {props.history}/>}
           {!user && <Login/>}
           
        </div>
    );
}
