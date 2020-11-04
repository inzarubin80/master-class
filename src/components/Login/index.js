import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setPassword, logInUser, registerUser } from '../../redux/user/userActions';
import { Tabs, Tab } from 'react-bootstrap';

import './index.css';

export default function LoginComponent() {

    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);

    const [key, setKey] = useState('login');

   
    const handleLogInButtonClick = () => {
        if (username && password) {
            logInUser(username, password)
                .catch(error => console.log(error.message));
        }
    }

    const handleRegisterButtonClick = () => {
        if (username && password) {
            registerUser(username, password)
                .catch(error => console.log(error.message));
        }
    }

    return (

        <div>
            <div className="form-signin">

                <h1 className="text-center">{(key==='login')?'Вход':'Регистрация'}</h1>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" value={username} onChange={event => dispatch(setUserName(event.target.value))} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={event => dispatch(setPassword(event.target.value))} />
                </div>

                {(key==='login') && <button type="submit" className="btn btn-primary btn-block" onClick={handleLogInButtonClick}>Войти</button>}

                {!(key==='login') && <button type="submit" className="btn btn-primary btn-block" onClick={handleRegisterButtonClick}>Зарегистрироваться</button>}



                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="selectMode"
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => { setKey(k)}}>


                    <Tab eventKey="login" title="Я уже зарегистрирован">
                    </Tab>

                    <Tab eventKey="signUp" title="Регистрация">
                    </Tab>

                </Tabs>


            </div>
        </div>
    );
}
