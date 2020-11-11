import React, { useState, useEffect} from 'react'
import MasterСlass from '../MasterСlass';
import { db} from '../../firebase';

import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once


const ListMasterClasses = (props) => {
        

    const refMasterClass = db.ref('masterClass');


    const [firstKnownKey, setFirstKnownKey] = useState(0);
    const [data, setData] = useState([]);


    useEffect(() => {
      
        //let newData = [];
        refMasterClass.orderByKey().limitToLast(5).on('child_added', function(childSnapshot, prevChildKey) {
            if (!firstKnownKey) {
                setFirstKnownKey(childSnapshot.key);
            }

            //let value = childSnapshot.val();
           // value.key = childSnapshot.key;

           // console.log({...value, id:  childSnapshot.key});
     
            setData((prevState)=>{return [...prevState, {...childSnapshot.val(), id:  childSnapshot.key}]});

        });


    
    }, []);

    




    return (<div >
        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => {props.history.push(`/class/-1`)}}>Добавить</button>
        </div>
    
    {data.map((item)=><MasterСlass  
    NameMasterClass = {item.NameMasterClass} 
    ImagesMasterClass = {"https://i1.photo.2gis.com/images/branch/0/30258560050669905_3b47_300x300.jpg"} 
    id = {item.id}
    DescriptionMasterClass = {item.DescriptionMasterClass}
    
    />)
    
    }
    </div>);

}

export default ListMasterClasses;
