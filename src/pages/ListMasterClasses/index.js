import React, { useState, useEffect } from 'react'
import MasterСlass from '../MasterСlass';
import { db } from '../../firebase';
import useInfiniteScroll from "./useInfiniteScroll";


import 'react-virtualized/styles.css'; // only needs to be imported once




const ListMasterClasses = (props) => {


    const refMasterClass = db.ref('masterClass');

    const [data, setData] = useState([]);

    const fetchMoreListItems = () => {
    

        let firstKnownKey;

        if (data.length){
            firstKnownKey = data[data.length-1].id;
        }

        console.log("начальный ключ  -----------------" + firstKnownKey);

        if (firstKnownKey) {
          
            console.log("начальный ключ  *************" + firstKnownKey);
            
            refMasterClass.orderByKey().endAt(firstKnownKey).limitToLast(10).once('child_added',  (childSnapshot, prevChildKey) => {


                if (firstKnownKey != childSnapshot.key ) {
      
                    console.log("Выводим ******" + childSnapshot.key);
                    setData((prevState) => { return [{ ...childSnapshot.val(), id: childSnapshot.key }, ...prevState] });
                    setIsFetching(false);
    
                   }

    
            }
            );
        }
        else {

            console.log("определеяем начальный ключ  -----------------");
            
            refMasterClass.orderByKey().limitToLast(3).on('child_added',  (childSnapshot, prevChildKey) => {


                console.log(childSnapshot.val());
                
                    console.log("Выводим ******" + childSnapshot.key);
                    setData((prevState) => { return [{ ...childSnapshot.val(), id: childSnapshot.key }, ...prevState] });
                    setIsFetching(false);
                
    
            }
            );
        }

    }



    useEffect(() => {

        if (!data.length) {

            fetchMoreListItems();
        }
    });


    
const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    console.log(data);

    return (<div >
        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => { props.history.push(`/class/-1`) }}>Добавить</button>
        </div>

        {data.map((item, index) => <MasterСlass
            NameMasterClass={item.NameMasterClass}
            ImagesMasterClass={"https://i1.photo.2gis.com/images/branch/0/30258560050669905_3b47_300x300.jpg"}
            key={item.id}
            DescriptionMasterClass={item.DescriptionMasterClass}

        />)

        }

        {isFetching && 'Fetching more list items...'}

    </div>);

}

export default ListMasterClasses;
