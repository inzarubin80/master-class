import React, { useState, useEffect } from 'react'
import './index.css';
import { storage } from '../../firebase'


const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'
};

const MasterClasses = (props) => {

    return (


        <li className="MasterClasses" >


            <div className="card" style={divStyle}>

                <div className="card-header">
                    {props.NameMasterClass}
                </div>



                {(props.images && props.images.length) && <img className="card-img-top" src={props.images[0].src} alt="Card image cap" />}


                <div className="card-body">

                    <p className="card-text">{props.DescriptionMasterClass}</p>

                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => { }}>Зарезервировать</button>



            </div>

        </li>
    );
}

export default MasterClasses;
