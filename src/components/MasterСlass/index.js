import React from 'react'
import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const MasterClasses = (props) => {

    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    return (


        <div className="MasterClasses">


            <div className="card" >

                <div className="card-header">
                    {props.NameMasterClass}
                </div>


                <Slider {...settings}>

                    {(props.images && props.images.length) && props.images.map((item) => (<div key={item.src}> <img className="card-img-top" src={item.src} alt="Card image cap" /> </div>))}

                </Slider>



                <div className="card-body">

                    <p className="card-text">{props.DescriptionMasterClass}</p>

                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={props.updateMasterClassClicked}>Изменить</button>


            </div>

        </div>
    );
}

export default MasterClasses;
