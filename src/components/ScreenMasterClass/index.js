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


    React.useEffect(() => {
       
      
        const unsub = db.collection('masterClass').doc(id).onSnapshot(docSnapshot => {

            console.log(docSnapshot);
            setData(createMasterClassFromVal(docSnapshot.id, docSnapshot.data()));


        }, err => {
            console.log(`Encountered error: ${err}`);
        });

        return () => {
            unsub();
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
                <li className="list-group-item">Дата: {moment(data.DateMasterClass).locale("ru", localization).format('LLL')}</li>
            </ul>

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