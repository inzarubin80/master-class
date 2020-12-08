import React, { useState, useEffect, useRef } from 'react'
import ListItemMasterСlass from '../ListItemMasterСlass';
import { db } from '../../firebase';
import useIntersect from "./useIntersect";

import { useSelector, useDispatch } from 'react-redux'
import {getMasterClass} from '../../redux/app/appActions'



const ListMasterClasses = (props) => {

    const refMasterClass = db.ref('masterClass');

   // const [data, setData] = useState([]);

    const masterClasses = useSelector(state => state.app.masterClasses);

    const ref = useRef();

    const [isIntersecting, setIntersecting] = useIntersect(ref, "1%");

    const dispatch = useDispatch();

    useEffect(() => {

        if (isIntersecting) {
           // fetchMoreListItems();

           dispatch(getMasterClass());

        }

    }, [isIntersecting]);

    const updateMasterClassClicked = (id) => {
        props.history.push(`/change/${id}`)
    }


    const masterСlassViewing = (id) => {
        props.history.push(`/classes/${id}`);
    }


    return (<div >

        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => { props.history.push(`/change/-1`) }}>Добавить</button>
        </div>


        {masterClasses.map((item, index) => (
         
                <ListItemMasterСlass
              
                    NameMasterClass={item.NameMasterClass}
                    updateMasterClassClicked={() => updateMasterClassClicked(item.id)}
                    masterСlassViewing={() => masterСlassViewing(item.id)}
                    DescriptionMasterClass={item.DescriptionMasterClass}
                    DateMasterClass={item.DateMasterClass}
                    images={item.images}
                    image={item.image}
                    key = {item.id}
                         
                />
        
         
        ))

        }


        <div className='EndLoader' ref={ref}>
            {isIntersecting && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
        </div>

    </div>);

}

export default ListMasterClasses;
