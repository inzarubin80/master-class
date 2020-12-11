import React, {useEffect, useState} from 'react'
import './index.css';
import useIntersect from "../ListMasterClasses/useIntersect";
import { useSelector} from 'react-redux'


const ListItemMasterСlass = (props) => {


   const roles = useSelector(state => state.user.userRoles.roles);
   const ref = React.useRef();
   const [isIntersecting] = useIntersect(ref, "10%", true);
   
   console.log('roles', roles);

    return (
        <div className="MasterClasses" ref={ref} >

            <div className="card" onClick={props.masterСlassViewing} style={{minHeight:'300px'}}>
         
            <div className="card-header">
             {props.NameMasterClass}
            </div>

            <img className="card-img-top" src={isIntersecting?props.image:''} alt="Card image cap" />

            </div>
            {(roles.indexOf('admin')!=-1) && <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>}

        </div>
    );
}

export default ListItemMasterСlass;