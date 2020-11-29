import React, { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { masterСlassAddReserve } from '../../api/firebaseApi';
import Slider from "react-slick";
import { MasterClass, createMasterClassFromVal } from "../../model/mastreClass"

import { db } from '../../firebase';
import { connect } from 'react-redux'

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
    const [data, setData] = useState(new MasterClass());


    React.useEffect(() => {

        //"Создаем подписку"
        db.ref('masterClass/' + id).on('value', function (snapshot) {
            const val = snapshot.val();
            setData(createMasterClassFromVal(id, val));
        });

        //Выключаем подписку
        //https://reactjs.org/docs/hooks-effect.html
        //componentDidMount 
        return () => {

            console.log("Отменяем подписку **************** " + id);
            db.ref('masterClass/' + id).off();
          };


    }, [id]);





    const masterСlassAddReserveHandler = () => {

        masterСlassAddReserve(id, props.uid);

    }


    console.log("ScreenMasterClass", id);


    return (<div className="card">
        <Slider {...settings}>

            {data.images.map((item) => (<div key={item.src}> <img src={item.src} className='card-img-top' /> </div>))}

        </Slider>

        <button className="btn btn-primary" onClick={masterСlassAddReserveHandler}> {data.isRes(props.uid) ? 'Отменить резерв' : 'Зарезервировать'}</button>

        <div className="card-body">
            <h5 className="card-title">{data.NameMasterClass}</h5>
            <p className="card-text">{data.DescriptionMasterClass}</p>
        </div>


        <ul className="list-group list-group-flush">
            <li className="list-group-item">Свободных мет: {data.vacancies}</li>
            <li className="list-group-item">Цена: 1000</li>
            <li className="list-group-item">Дата: {data.DateMasterClass}</li>
        </ul>

    </div>

    );
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid
    }
}

export default connect(mapStateToProps)(ScreenMasterClass);