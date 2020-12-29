
import React from "react";
import { Avatar } from 'antd';
import {
    HomeOutlined,HomeTwoTone, InfoCircleOutlined, InfoCircleTwoTone, getTwoToneColor, setTwoToneColor 
} from '@ant-design/icons';

import { Link, useRouteMatch } from "react-router-dom"


import { useSelector } from 'react-redux';

const HeaderComponent = () => {


    const matchClasses = useRouteMatch({
        path: '/classes'
      });

    const matchInfo = useRouteMatch({
        path: '/info'
      });


    setTwoToneColor('#ff7f50');

    console.log('matchClasses', matchClasses);

    const user = useSelector(state => state.user.user);
    return (

        <div className='footer'>
            <header id='header'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <ul className="nav">

                        <li className='nav-item'>
                            <Link className="nav-link" to="/classes">
                                
                            {matchClasses&&<HomeTwoTone  style={{fontSize: '26px'}} />}
                            {!matchClasses&&   <HomeOutlined  style={{fontSize: '26px'}} />}

                                
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link className="nav-link" to="/info">
                            
                            {matchInfo&&<InfoCircleTwoTone  style={{fontSize: '26px'}} />}
                            {!matchInfo&&<InfoCircleOutlined  style={{fontSize: '26px'}} />}

                        </Link></li>

                    </ul>


                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                        <li><Link className="nav-link" to="/login">

                            {user && <Avatar src={user.photoURL} />}
                            {!user && 'Войти'}

                        </Link></li>
                    </ul>

                </nav>
            </header>

        </div>
    )

}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <div className={match ? "active" : ""}>
            {match && "> "}
            <Link to={to}>{label}</Link>
        </div>
    );
}

export default HeaderComponent
