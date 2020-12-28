import React, {useEffect, useRef } from 'react'
import ListItemMasterСlass from '../ListItemMasterСlass';
import useIntersect from "./useIntersect";
import { useSelector, useDispatch } from 'react-redux'
import {getLists} from '../../redux/app/appActions'
import { Button } from 'antd';
import './index.css';

const ListMasterClasses = (props) => {

    const masterClasses = useSelector(state => state.app.masterClasses);
    
    const ref = useRef();

    const [isIntersecting, setIntersecting] = useIntersect(ref, "1%");


    const roles = useSelector(state => state.user.userRoles.roles);

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

    return (<div className='ListMasterClasses'>


            {(roles.indexOf('admin') !== -1) && <div className="ListMasterClasses">
                <Button type="primary" block onClick={() => {props.history.push(`/change/-1`)}}>Добавить мастер класс</Button>
            </div>}

     

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



    </div>);


}

export default ListMasterClasses;
