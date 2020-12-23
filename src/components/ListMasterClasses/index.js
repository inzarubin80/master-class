import React, {useEffect, useRef } from 'react'
import ListItemMasterСlass from '../ListItemMasterСlass';
import useIntersect from "./useIntersect";
import { useSelector, useDispatch } from 'react-redux'
import {getLists} from '../../redux/app/appActions'


const ListMasterClasses = (props) => {

    const masterClasses = useSelector(state => state.app.masterClasses);
    
    const ref = useRef();

    const [isIntersecting, setIntersecting] = useIntersect(ref, "1%");

    const dispatch = useDispatch();

    useEffect(() => {

           dispatch(getLists());
       
    }, []);

    const updateMasterClassClicked = (id) => {
        props.history.push(`/change/${id}`)
    }

    const masterСlassViewing = (id) => {
        props.history.push(`/classes/${id}`);
    }

    return (<div >

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


    {/*

        <div className='EndLoader' ref={ref}>
            {isIntersecting && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
        </div>
*/}
    </div>);


}

export default ListMasterClasses;
