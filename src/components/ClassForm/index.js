import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveMasterClass } from '../../redux/app/appActions'
import uuid from 'react-uuid'
import { useSelector, useDispatch } from 'react-redux'
import { setSaveRequest } from '../../redux/app/appActions'
import { Alert, Button } from 'react-bootstrap';
import { getMasterClassById } from '../../api/firebaseApi';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { MasterClass } from "../../model/mastreClass"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ru from 'date-fns/locale/ru';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {DropzoneArea} from 'material-ui-dropzone'
//import Button1 from '@material-ui/core/Button';

const divStyle = {
    maxWidth: '90%',
    minWidth: '90%'
};

const validateField = (value) => {

    //  return '';

    console.log('validateNameMasterClass');
    let error = '';
    if (!value) {
        error = 'Требуется заполнение';
    }
    return error;
}

const validateForm = (props) => {

    let errors = {};

    // return errors;

    if (props.images.filter((item) => { return !item.del }).length === 0) {
        errors.images = "Требуется выбрать файлы";
    }

    if (!props.DateMasterClass) {
        errors.DateMasterClass = 'Требуется заполнение';
    }

    return errors;

}


const ClassForm = (props) => {


    const dispatch = useDispatch();
    const [id] = useState(props.match.params.id);
    const [data, setData] = useState(new MasterClass());
    const uploading = useSelector(state => state.app.uploading);
    const error = useSelector(state => state.app.error);


    const [fileList, setFileList] = useState([]);
    
    const [files, setFiles] = useState([]);
    

    const mapData = {
        center: [56.009097, 37.472180],
        zoom: 13,
    };

    const coordinates = [
        [56.009097, 37.472180]
    ];




    React.useEffect(() => {

        if (id !== '-1') {

            getMasterClassById(props.match.params.id).then(masterClass => {

          


                setData(masterClass)
                setFileList(masterClass.images.map(item=>{return {uid:item.filename,url:item.src}}));

                console.log(masterClass);

            })

                .catch(error => console.log(error));

        }
    }, []);


    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    const goToClasses = () => {
        props.history.push(`/classes`)
    };

    const onSubmit = (values) => {

        if (uploading) {
            //  return;
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
                        NameMasterClass: data.NameMasterClass,
                        DescriptionMasterClass: data.DescriptionMasterClass,
                        DateMasterClass: data.DateMasterClass,
                        images: data.images.map((item) => { return { file: '', src: item.src, key: item.filename, del: false, local: false } }),
                        numberSeats: data.numberSeats,

                    }}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validateForm}
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
                                    <Field className="form-control" type="text" name="NameMasterClass" validate={validateField} />
                                    {props.errors.NameMasterClass && props.touched.NameMasterClass && <Alert variant={'danger'}>{props.errors.NameMasterClass}</Alert>}
                                </fieldset>


                                <fieldset className="form-group">

                                    <label>Описание</label>

                                    <Field className="form-control" type="text" name="DescriptionMasterClass" component="textarea" validate={validateField} />
                                    {props.errors.DescriptionMasterClass && props.touched.DescriptionMasterClass && <Alert variant={'danger'}>{props.errors.DescriptionMasterClass}</Alert>}



                                </fieldset>

                                <div className="form-group">

                                    {/*dateFormat="Pp"*/}


                                    {/*  <label>Дата</label>*/}
                                    <DatePicker showTimeSelect locale={ru} dateFormat='MM/dd/yyyy HH:mm:ss' selected={props.values.DateMasterClass} onChange={date => props.setFieldValue("DateMasterClass", date)} />
                                    {props.errors.DateMasterClass && props.touched.DateMasterClass && <Alert variant={'danger'}>{props.errors.DateMasterClass}</Alert>}


                                </div>





                                <fieldset className="form-group">
                                    <label>Количество мест</label>
                                    <Field className="form-control" type="number" name="numberSeats" validate={validateField} />
                                    {props.errors.numberSeats && props.touched.numberSeats && <Alert variant={'danger'}>{props.errors.numberSeats}</Alert>}
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


                                    {props.errors.images && <Alert variant={'danger'}>{props.errors.images}</Alert>}


                                </div>



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


                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={()=>{}}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={({fileList})=>{console.log(fileList); setFileList(fileList)}}

                                    method = ''
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>


                                <DropzoneArea
                                    onChange={(files)=>{console.log('files', files)}}
                                />



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
