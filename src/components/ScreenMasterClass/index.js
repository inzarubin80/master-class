import React, { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { masterСlassСhangeReserve } from '../../api/firebaseApi';
import Slider from "react-slick";
import { MasterClass, createMasterClassFromVal } from "../../model/mastreClass"
import moment from "moment";

import { db } from '../../firebase';
import { connect } from 'react-redux'


import localization from 'moment/locale/ru'


moment.locale('ru')

const config = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true

};


const ScreenMasterClass = (props) => {

    const [settings, setSettings] = useState(config);
    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState(null);
    const [messageText, setMessageText] = useState(' ');
    const [comments, setComments] = useState([]);

    const addComment = () => {

        if (!messageText) {
            return;
        }
        return db.collection('masterClassComments').doc(id).collection('comments').add({ text: messageText, uid: "user1", parentId: '' })
            .then(docRef => docRef.get())
            .then(doc => {
                setMessageText('');
                console.log(doc);
            }
            );
    }

    React.useEffect(() => {


        const unsub = db.collection('masterClass').doc(id).onSnapshot(docSnapshot => {

            console.log(docSnapshot);
            setData(createMasterClassFromVal(docSnapshot.id, docSnapshot.data()));


        }, err => {
            console.log(`Encountered error: ${err}`);
        });


        const observerComments = db.collection('masterClassComments').doc(id).collection('comments')
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        console.log('New comment: ', change.doc.data());
                        setComments((prev) => [...prev, { ...change.doc.data(), id: change.doc.id }])
                    }
                    if (change.type === 'modified') {

                        console.log('Modified comment: ', change.doc.data());
                        setComments((prev) => prev.map((item) => {
                            if (item.id == change.doc.id) {
                                return { ...change.doc.data(), id: change.doc.id }
                            }
                            else {
                                return item
                            }
                        }));

                    }
                    if (change.type === 'removed') {

                        console.log('Removed comment: ', change.doc.data());
                        setComments((prev) => prev.filter(item => item.id !== change.doc.id));
                        
                    }
                });


            });

        return () => {

            unsub();
            observerComments();

        };
    }, []);




    const masterСlassСhangeReserveHandler = () => {

        if (!props.uid) {
            props.history.push(`/login`);
        }
        else {
            masterСlassСhangeReserve(id, props.uid);
        }
    }


    console.log("ScreenMasterClass", id);

    if (data) {
        return (<div className="card">
            <Slider {...settings}>

                {data.images.map((item) => (<div key={item.src}> <img src={item.src} className='card-img-top' /> </div>))}

            </Slider>


            <button className="btn btn-primary" onClick={masterСlassСhangeReserveHandler}> {data.isRes(props.uid) ? 'Отменить резерв' : 'Зарезервировать'}</button>
            <div className="card-body">
                <h5 className="card-title">{data.NameMasterClass}</h5>
                <p className="card-text">{data.DescriptionMasterClass}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">Свободных мет: {data.vacancies}</li>
                <li className="list-group-item">Цена: 1000</li>

                {/*'DD:MM:YYYY HH:mm'*/}
                <li className="list-group-item">Дата: {moment(data.DateMasterClass).locale("ru", localization).format('LLLL')}</li>
            </ul>




            <h4>Комментарии</h4>

            {comments.map((coment) => <li key={coment.id}>{coment.text}</li>)}

            <input type="text" value={messageText} onChange={(event) => { setMessageText(event.target.value) }} />
            <button type="button" className="btn btn-success" onClick={addComment}>Добавить комментарий</button>

        </div>

        )
    }

    else {
        return (<div></div>)
    }

}

const mapStateToProps = state => {
    return {
        uid: state.user.uid
    }
}

export default connect(mapStateToProps)(ScreenMasterClass);