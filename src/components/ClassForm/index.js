import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveMasterClass } from '../../redux/app/appActions'
import uuid from 'react-uuid'
import { useSelector, useDispatch } from 'react-redux'
import { setSaveRequest } from '../../redux/app/appActions'
import { Alert, ProgressBar, Spinner, Button  } from 'react-bootstrap';
import { db } from '../../firebase';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const divStyle = {
    maxWidth: '90%',
    minWidth: '90%'
};



const ClassForm = (props) => {


    const dispatch = useDispatch();

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState(null);
    const uploading = useSelector(state => state.app.uploading);
    const error = useSelector(state => state.app.error);


    const mapData = {
        center: [56.009097, 37.472180],
        zoom: 13,
    };

    const coordinates = [
        [56.009097, 37.472180]
    ];


    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    React.useEffect(() => {

        if (id !== -1) {
            db.ref('masterClass/' + id).once('value').then(function (snapshot) {

                const val = snapshot.val();
                console.log('val', val);
                setData(val);

            });


            //Выключаем подписку
        //https://reactjs.org/docs/hooks-effect.html
        //componentDidMount 
        return () => {
            db.ref('masterClass/' + id).off();
          };
          
        }
    }, [id]);




    const goToClasses = () => {
        props.history.push(`/classes`)
    };

    const onSubmit = (values) => {

        if (uploading) {
            return;
        }
        dispatch(setSaveRequest());

        const addFiles = values.images.filter((item) => { return !item.del && item.local }).map((item) => { return { filename: item.key, file: item.file } })
        const removeFiles = values.images.filter((item) => { return item.del && !item.local }).map((item) => { return { filename: item.key } })

        const Data = {
            NameMasterClass: values.NameMasterClass,
            DescriptionMasterClass: values.DescriptionMasterClass,
            DateMasterClass: values.DateMasterClass ? values.DateMasterClass : '',
            
            numberSeats: values.numberSeats ? values.numberSeats : 0,
            
            images: values.images.filter((item) => { return !item.del }).map((item) => { return { filename: item.key, src: item.src } })

        };

        dispatch(saveMasterClass(Data, addFiles, removeFiles, data ? id : '', goToClasses));

    }

    return (
        <div>

            <div className="container">

                <h3>Мастер класс</h3>

                {uploading && <h5>...идет загрузка</h5>}
                {error && <Alert variant={'danger'}>{error}</Alert>}



                <Formik
                    initialValues={{
                        NameMasterClass: data ? data.basicData.NameMasterClass : '',
                        DescriptionMasterClass: data ? data.basicData.DescriptionMasterClass : '',
                        images: (data && data.basicData.images) ? data.basicData.images.map((item) => { return { file: '', src: item.src, key: item.filename, del: false, local: false } }) : [],
                        numberSeats:data ? data.basicData.numberSeats : '',
                   
                    }}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={() => { }}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>


                                <button className="btn btn-primary btn-lg btn-block" type="submit">
                                    Опубликовать
                                </button>

                                <ErrorMessage name="description" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div"
                                    className="alert alert-warning" />



                                <fieldset className="form-group">
                                    <label>Наименование</label>
                                    <Field className="form-control" type="text" name="NameMasterClass" />
                                </fieldset>


                                <fieldset className="form-group">
                                    <label>Описание</label>
                                    <Field className="form-control" type="text" name="DescriptionMasterClass" component="textarea"/>
                                    
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Дата проведения</label>
                                    <Field className="form-control" type="date" name="DateMasterClass" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Количество мест</label>
                                    <Field className="form-control" type="number" name="numberSeats" />
                                </fieldset>


                                <div className="form-group">


                                    <input multiple name="file" type="file" style={{ display__: 'none' }} accept="image/png, image/jpeg" onChange={(event) => {

                                        console.log(event.currentTarget.files);
                                        let images_ = [];

                                        for (let i = 0; i < event.currentTarget.files.length; i++) {

                                            images_.unshift({ file: event.currentTarget.files[i], src: URL.createObjectURL(event.currentTarget.files[i]), key: uuid(), del: false, local: true });

                                        }

                                        props.setFieldValue("images", [...images_, ...props.values.images]);


                                    }} />



                                </div>


                                <Slider {...settings}>
                                    {props.values.images.filter((item) => { return !item.del }).map((item, index) => (<div key={item.key} className="form-group">

                                        <img src={item.src} style={divStyle} className="card-img-top" />
                                        <Button type="button" variant="outline-danger" onClick={() => {
                                            console.log(item.key)

                                            props.setFieldValue("images", props.values.images.map((item_) => {

                                                if (item_.key == item.key) {
                                                    return { ...item_, del: true }
                                                }

                                                else {
                                                    return item_;
                                                }
                                            }
                                            )
                                            );


                                        }}>Удалить картинку</Button>

                                    </div>))}
                                </Slider>


                                <fieldset className="form-group">
                                    <label>Место проведения</label>
                                    <YMaps>


                                        <Map defaultState={mapData}>
                                            {coordinates.map(coordinate => <Placemark geometry={coordinate} />)}
                                        </Map>
                                    </YMaps>

                                </fieldset>


                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}

export default ClassForm;
