import React from 'react'
import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const ListItemMasterСlass = (props) => {

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
        <div className="MasterClasses">
            <div className="card" onClick={props.masterСlassViewing}>
         
            <div className="card-header">
            

             {props.NameMasterClass}

            
            
            </div>


                {(props.images && props.images.length) && <img className="card-img-top" src={props.images[0].src} alt="Card image cap" />}
              
            </div>
        <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Изменить</button>
        </div>
    );
}

export default ListItemMasterСlass;
