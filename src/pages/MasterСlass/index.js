import React, { useState, useEffect } from 'react'
import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const divStyle = {
    maxWidth: '100px',
    minWidth: '500px'
};

const MasterClasses = (props) => {

    
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      };

    return (


        <li className="MasterClasses" >


            <div className="card" >

                <div className="card-header">
                    {props.NameMasterClass}
                </div>


                <Slider {...settings}>
                    
                {(props.images && props.images.length) &&  props.images.map((item)=>(<div> <img className="card-img-top" src={item.src} alt="Card image cap" /> </div>))}                    

                </Slider>

              

                <div className="card-body">

                    <p className="card-text">{props.DescriptionMasterClass}</p>

                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => { }}>Зарезервировать</button>



            </div>

        </li>
    );
}

export default MasterClasses;
