import React from 'react';
import { Collapse, Avatar, List, Statistic} from 'antd';


const { Panel } = Collapse;



const UserList = ({ usersReserv }) => {
    return (
        <div>
            <Collapse defaultActiveKey={[]} onChange={() => { }}>
                <Panel header={(<Statistic title="Идут на мастер класс" value={usersReserv.length} precision={0}/>)} key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={usersReserv}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.photoURL} />}
                                    title={<a>{item.displayName}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </Panel>
            </Collapse>

        </div>
    )
}
export default UserList


