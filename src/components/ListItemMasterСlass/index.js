import React, {useEffect, useState} from 'react'
import './index.css';
import useIntersect from "../ListMasterClasses/useIntersect";



const ListItemMasterСlass = (props) => {


   const ref = React.useRef();
   const [isIntersecting] = useIntersect(ref, "10%", true);
   


    return (
        <div className="MasterClasses" ref={ref} >
            <div className="card" onClick={props.masterСlassViewing} style={{minHeight:'300px'}}>
         
            <div className="card-header">
             {props.NameMasterClass}
            </div>


            <img className="card-img-top" src={isIntersecting?props.image:''} alt="Card image cap" />

              
            </div>
        <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>
        </div>
    );
}

export default ListItemMasterСlass;