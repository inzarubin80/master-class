import React, { useState, useEffect } from 'react'
import MasterСlass from '../MasterСlass';
import { db } from '../../firebase';
import useInfiniteScroll from "./useInfiniteScroll";
import 'react-virtualized/styles.css'; // only needs to be imported once



const ListMasterClasses = (props) => {

    const refMasterClass = db.ref('masterClass');

    const [data, setData] = useState([]);

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    function fetchMoreListItems() {


        let firstKnownKey;

        if (data.length) {
            firstKnownKey = data[data.length - 1].id;
        }

        console.log("начальный ключ  -----------------" + firstKnownKey);

        if (firstKnownKey) {


            refMasterClass.orderByKey().endAt(firstKnownKey).limitToLast(10).once('value', function (snapshot) {

                let page_ = [];

                snapshot.forEach( (childSnapshot) =>{
               
                    let key = childSnapshot.key;
                    let childData = childSnapshot.val();

                    if (firstKnownKey != key) {
                       console.log("Выводим ******" + childSnapshot.key);
                       page_.unshift({...childData, id: key});
                    }
                });

                if (page_.length){
                    setData((prevState) => { return [...prevState, ... page_] });
                }

                setIsFetching(false);
                console.log(page_);
               

            });
        }
        else {

            refMasterClass.orderByKey().limitToLast(3).on('child_added', (childSnapshot, prevChildKey) => {


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

    const updateMasterClassClicked = (id) => {
       props.history.push(`/class/${id}`)        
    }

    console.log(data);

    return (<div >

        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => { props.history.push(`/class/-1`) }}>Добавить</button>
        </div>


        {data.map((item, index) => (<MasterСlass
        
            key = {item.id}

          NameMasterClass={item.NameMasterClass}
        
          ImagesMasterClass = {item.ImgMasterClass}

          updateMasterClassClicked = {()=> updateMasterClassClicked(item.id)}

        
          DescriptionMasterClass={item.DescriptionMasterClass}

          images = {item.images}
        />))

        }

        {/*isFetching && 'Fetching more list items...'*/}

    </div>);

}

export default ListMasterClasses;
