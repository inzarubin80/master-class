import React, {useEffect, useState} from 'react'
import './index.css';
import useIntersect from "../ListMasterClasses/useIntersect";



const ListItemMasterСlass = (props) => {

 
   const ref = React.useRef();

   const [isIntersecting] = useIntersect(ref, "1%", true);
   
    console.log(props.NameMasterClass);
    console.log("isIntersecting", isIntersecting);
    

    return (
        <div className="MasterClasses" ref={ref}>
            <div className="card" onClick={props.masterСlassViewing}>
         
            <div className="card-header">
            

             {props.NameMasterClass}

            
            
            </div>


                {(props.images && props.images.length) && <img className="card-img-top" src={isIntersecting?props.images[0].src:''} alt="Card image cap" />}
              
            </div>
        <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>
        </div>
    );
}

export default ListItemMasterСlass;