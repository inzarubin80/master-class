import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveMasterClass } from '../../redux/app/appActions'
import uuid from 'react-uuid'
import { useSelector, useDispatch } from 'react-redux'
import { setSaveRequest } from '../../redux/app/appActions'
import { Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { db } from '../../firebase';
import { YMaps, Map } from 'react-yandex-maps';

const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'
};

const ClassForm = (props) => {


    const dispatch = useDispatch();

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState(null);



    const uploading = useSelector(state => state.app.uploading);
    const error = useSelector(state => state.app.error);


    React.useEffect(() => {

        if (id !== -1) {
            db.ref('masterClass/' + id).once('value').then(function (snapshot) {

                const val = snapshot.val();
                console.log('val', val);
                setData(val);

            });
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
            images: values.images.filter((item) => { return !item.del }).map((item) => { return { filename: item.key, src: item.src } })

        };

        dispatch(saveMasterClass(Data, addFiles, removeFiles, data ? id : '', goToClasses));

    }

    // console.log('data', data);

    return (
        <div>

            <div className="container">

                <h3>Мастер класс</h3>

                {uploading && <h5>...идет загрузка</h5>}

                {uploading && <ProgressBar now={100} />}

                {error && <Alert variant={'danger'}>
                    {error}
                </Alert>}


                <Formik
                    initialValues={{
                        NameMasterClass: data ? data.NameMasterClass : '',
                        DescriptionMasterClass: data ? data.DescriptionMasterClass : '',
                        images: (data && data.images) ? data.images.map((item) => { return { file: '', src: item.src, key: item.filename, del: false, local: false } }) : []
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
                                    <Field className="form-control" type="text" name="DescriptionMasterClass" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Дата проведения</label>
                                    <Field className="form-control" type="date" name="DateMasterClass" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Количество мест</label>
                                    <Field className="form-control" type="number" name="numberSeats" />
                                </fieldset>

                                <YMaps>
                                    <div>
                                       Место проведения.
                                       <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
                                    </div>
                                </YMaps>

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


                                {props.values.images.filter((item) => { return !item.del }).map((item, index) => (<li key={item.key} className="form-group">

                                    <img src={item.src} style={divStyle} className="img-thumbnail mt-2" />
                                    <button className="btn btn-success" onClick={() => {
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


                                    }}>Удалить</button>

                                </li>))}

                                <button className="btn btn-success" type="submit">

                                    Опубликовать
                                    {<Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>}
                                </button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}

export default ClassForm;
