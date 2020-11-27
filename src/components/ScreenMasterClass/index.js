import React, { useState } from "react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

import Slider from "react-slick";

import { db } from '../../firebase';





const ScreenMasterClass = (props) => {



    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      const SamplePrevArrow = (props)=> {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }

    const config = {
        arrows: true,
        dots: true,
        infinite: true,
        //centerMode: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1
        

      };


    
      


     
    const [settings, setSettings] = useState(config);

    
    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState({basicData: 
        {images:[],
        NameMasterClass:'',
        DescriptionMasterClass:''}
    });
    
    React.useEffect(() => {

        if (id !== -1) {
            db.ref('masterClass/' + id).on('value', function (snapshot) {

                const val = snapshot.val();
                console.log('val', val);
                setData(val);

            });
        }
    }, [id]);


    if (data)
    console.log(data.basicData.images);

    return (


        <div className="card_">
        <Slider {...config}>

        {(data.basicData.images && data.basicData.images.length) && data.basicData.images.map((item) => (<div key={item.src}> <img  src={item.src}  className='card-img-top'/> </div>))}

    </Slider>

    <a href="#" className="btn btn-primary">Зарезервировать</a>

    <div className="card-body">
    <h5 className="card-title">{data.basicData.NameMasterClass}</h5>
    <p className="card-text">{data.basicData.DescriptionMasterClass}</p>
   
    </div>


    <ul className="list-group list-group-flush">

    <li className="list-group-item">Цена: 1000</li>
    <li className="list-group-item">Дата: {data.basicData.DateMasterClass}</li>
    </ul>

    </div>



    );
}

export default ScreenMasterClass;
