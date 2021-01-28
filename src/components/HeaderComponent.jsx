
import React from "react";
import { Avatar } from 'antd';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';

import { Link, useRouteMatch } from "react-router-dom"


import { useSelector } from 'react-redux';

const HeaderComponent = () => {

    const matchClasses = useRouteMatch({
        path: '/classes',
        exact: true
    });

    const matchClassesInit = useRouteMatch({
        path: '/',
        exact: true
    });

    const matchLogin = useRouteMatch({
        path: '/login'
    });

    const style = { fontSize: '28px', color: '#808080' };
    const selectStyle = { fontSize: '28px', color: '#3399FF' };

    const user = useSelector(state => state.user.user);
    return (


                <nav className="navbar navbar-light" style={{ border: '4px, double, black', borderWidth:'10px', borderСolor: '#cacd58'}}>

                    <ul className="nav">

                        <li className='nav-item'>
                            <Link className="nav-link" to="/classes">
                                <HomeOutlined style={(matchClasses||matchClassesInit) ? selectStyle : style} />
                            </Link>
                        </li>
                    </ul>


                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li><Link className="nav-link" to="/login">

                            {user && <Avatar src={user.photoURL} />}
                            {!user && <LoginOutlined style={matchLogin ? selectStyle : style} />}

                        </Link></li>
                    </ul>

                </nav>
   
    )

}



export default HeaderComponent
