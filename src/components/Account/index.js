import React from 'react';
import { useSelector } from 'react-redux';
import { signOutUser } from '../../redux/user/userActions';
import { Descriptions, Card } from 'antd';

export default function Account(props) {

    const user = useSelector(state => state.user.user);
  

    return (

        <div>


            <Card>
                <Descriptions>

                    <Descriptions.Item label="Имя">{user ? user.displayName: ''}</Descriptions.Item>
                    <Descriptions.Item label="Телефон">{user ? user.phoneNumber : ''}</Descriptions.Item>
                    <Descriptions.Item label="Почта">{user.email ? user.email : ''}</Descriptions.Item>

                </Descriptions>

                <button type="submit" className="btn btn-primary btn-block" onClick={signOutUser}>Выйти</button>

            </Card>





           

           
        </div>

    );
}
