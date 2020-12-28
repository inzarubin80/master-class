import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Avatar} from 'antd';
import {
    HomeOutlined
} from '@ant-design/icons';

import { useSelector } from 'react-redux';

const HeaderComponent = () => {
   
    
    const user = useSelector(state => state.user.user);




        return (

            <div className='footer'>
                <header id='header'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        
                        <ul className="navbar-nav">
                            <li><Link className="nav-link" to="/classes">
                                <HomeOutlined style={{ fontSize: '32px' }} />
                            </Link></li>
                        </ul>


                        <ul className="nav navbar-nav nav-flex-icons ml-auto">
                            <li><Link className="nav-link" to="/login">
                                
                                {user&&<Avatar src={user.photoURL}/>}
                                {!user&&'Войти'}
                                
                            </Link></li>
                        </ul>

                    </nav>
                </header>

            </div>
        )
    
}

export default HeaderComponent
