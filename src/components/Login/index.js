import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setPassword } from '../../redux/user/userActions';
import { Tabs, Tab } from 'react-bootstrap';

import './index.css';

export default function LoginComponent() {

    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);

    const [key, setKey] = useState('login');

   
    return (

        <div>
            <form className="form-signin">

                <h1 className="text-center">{(key=='login')?'Вход':'Регистрация'}</h1>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" value={username} onChange={event => dispatch(setUserName(event.target.value))} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={event => dispatch(setPassword(event.target.value))} />
                </div>

                {(key=='login') && <button type="submit" className="btn btn-primary btn-block" nClick={() => { }}>Войти</button>}

                {!(key=='login') && <button type="submit" className="btn btn-primary btn-block" nClick={() => { }}>Зарегистрироваться</button>}



                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="selectMode"
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => { setKey(k)}}>


                    <Tab eventKey="login" title="Я уже зарегистрирован">
                    </Tab>

                    <Tab eventKey="signUp" title="Регистрация">
                    </Tab>

                </Tabs>


            </form>
        </div>
    );
}
