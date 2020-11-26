import React from 'react'
import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const MasterClasses = (props) => {

    const settings = {
        dots: true,
        lazyLoad: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    return (


        <div className="MasterClasses" onClick={props.masterСlassViewing}>


            <div className="card">

                {(props.images && props.images.length) && <img className="card-img-top" src={props.images[0].src} alt="Card image cap" />}

                <h5 className="card-title">{props.NameMasterClass}</h5>
                <p className="card-text">{props.DescriptionMasterClass}</p>


                <ul className="list-group list-group-flush">

                    <li className="list-group-item">Цена: 1000</li>
                    <li className="list-group-item">Дата: {props.DateMasterClass}</li>
                </ul>

                

            </div>


            <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>
            

        </div>
    );
}

export default MasterClasses;
