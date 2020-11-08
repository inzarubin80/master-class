import React from 'react'

import MasterСlass from '../MasterСlass';

const ListMasterClasses = (props) => {
    
    return (<div >
        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => {props.history.push(`/class/-1`)}}>Добавить</button>
        </div>
        <MasterСlass />

    </div>);

}

export default ListMasterClasses;
