import React, { useState } from "react";
import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from '../../firebase';



const ScreenMasterClass = (props) => {

    const settings = {
        dots: true,
        lazyLoad: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };
    
    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState(null);
    
    React.useEffect(() => {

        if (id !== -1) {
            db.ref('masterClass/' + id).once('value').then(function (snapshot) {

                const val = snapshot.val();
                console.log('val', val);
                setData(val);

            });
        }
    }, [id]);


    return (


        <div className="MasterClasses" onClick={() => { console.log("MasterClasses") }}>


            <div className="card">

            <Slider {...settings}>

                {(data && data.basicData.images && data.basicData.images.length) && data.basicData.images.map((item) => (<div key={item.src}> <img className="card-img-top" src={item.src} alt="Card image cap" /> </div>))}

            </Slider>

                <h5 className="card-title">{data?data.basicData.NameMasterClass:''}</h5>
                <p className="card-text">{data?data.basicData.DescriptionMasterClass:''}</p>


                <ul className="list-group list-group-flush">

                    <li className="list-group-item">Цена: 1000</li>
                    <li className="list-group-item">Дата: {data?data.basicData.DateMasterClass:''}</li>
                </ul>

                <button type="submit" className="btn btn-primary" onClick={props.updateMasterClassClicked}>Резерв</button>

            </div>


           

        </div>
    );
}

export default ScreenMasterClass;
