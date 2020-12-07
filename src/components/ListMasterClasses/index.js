import React, { useState, useEffect, useRef } from 'react'
import ListItemMasterСlass from '../ListItemMasterСlass';
import { db } from '../../firebase';
//import 'react-virtualized/styles.css'; // only needs to be imported once
import useIntersect from "./useIntersect";



const ListMasterClasses = (props) => {

    const refMasterClass = db.ref('masterClass');

    const [data, setData] = useState([]);

    const ref = useRef();

    const [isIntersecting,  setIntersecting] = useIntersect(ref, "1%");


    function fetchMoreListItems() {

        setIntersecting(false);

        console.log('fetchMoreListItems******************************');


        let firstKnownKey;

        if (data.length) {
            firstKnownKey = data[data.length - 1].id;
        }

       

        if (firstKnownKey) {

            
            refMasterClass.orderByKey().endAt(firstKnownKey).limitToLast(2).once('value', function (snapshot) {

                let page_ = [];

                snapshot.forEach( (childSnapshot) =>{
               
                    let key = childSnapshot.key;
                    let childData = childSnapshot.val();

                    if (firstKnownKey !== key) {
                    
                       page_.unshift({...childData, id: key});
                    }
                });

                if (page_.length){
                    setData((prevState) => { return [...prevState, ... page_] });
                }
               

            });
        

        }
        else {

            

            refMasterClass.orderByKey().limitToLast(2).on('child_added', (childSnapshot, prevChildKey) => {

                
                setData((prevState) => { return [{ ...childSnapshot.val(), id: childSnapshot.key }, ...prevState] });

           
            }
            );
        }


      

    }

    useEffect(() => {
        
        if (isIntersecting){
            fetchMoreListItems();
        }
    
    }, [isIntersecting]);

    const updateMasterClassClicked = (id) => {
       props.history.push(`/change/${id}`)        
    }


     const masterСlassViewing = (id) =>{
        props.history.push(`/classes/${id}`);
    }


   
    return (<div >

        <div className="ListMasterClasses">
            <button className="btn btn-success" onClick={() => { props.history.push(`/change/-1`) }}>Добавить</button>
        </div>


        {data.map((item, index) => (<ListItemMasterСlass
        
            key = {item.id}
          NameMasterClass={item.basicData.NameMasterClass}
          
          updateMasterClassClicked = {()=> updateMasterClassClicked(item.id)}
         
          masterСlassViewing = {()=> masterСlassViewing(item.id)}

         
          DescriptionMasterClass={item.basicData.DescriptionMasterClass}
          
          
          DateMasterClass={item.basicData.DateMasterClass}
          images = {item.basicData.images}
        />))

        }

    
        <div className='EndLoader' ref = {ref}>
             
            {isIntersecting && <h1>...</h1>}

        </div>

    </div>);

}

export default ListMasterClasses;
