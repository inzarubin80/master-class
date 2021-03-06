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

import { PlusOutlined } from '@ant-design/icons';

import { DropzoneDialogBase } from 'material-ui-dropzone'


//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ButtonFile from '@material-ui/core/Button';


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

    const [open, setOpen] = React.useState(false);
    const [fileObjects, setFileObjects] = React.useState([]);

    const mapData = {
        center: [56.009097, 37.472180],
        zoom: 13,
    };

    const coordinates = [
        [56.009097, 37.472180]
    ];


    const dialogTitle = () => (
        <>
            <span>Выбор картинок</span>
            <IconButton
                style={{ right: '12px', top: '8px', position: 'absolute' }}
                onClick={() => setOpen(false)}>
                <CloseIcon />
            </IconButton>
        </>
    );


    React.useEffect(() => {

        if (id !== '-1') {

            getMasterClassById(props.match.params.id).then(masterClass => {


                setData(masterClass)
                setFileList(masterClass.images.map(item => { return { uid: item.filename, url: item.src } }));

                console.log(masterClass);

            })

                .catch(error => console.log(error));

        }
    }, []);


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
            cost:values.cost ? values.cost : 0,
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
                        cost: data.cost,
                        

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


                                    <label>Дата проведения</label>
                                    <DatePicker showTimeSelect locale={ru} dateFormat='MM/dd/yyyy HH:mm:ss' selected={props.values.DateMasterClass} onChange={date => props.setFieldValue("DateMasterClass", date)} />
                                    {props.errors.DateMasterClass && props.touched.DateMasterClass && <Alert variant={'danger'}>{props.errors.DateMasterClass}</Alert>}


                                </div>





                                <fieldset className="form-group">
                                    <label>Цена</label>
                                    <Field className="form-control" type="number" name="cost" validate={validateField} />
                                    {props.errors.cost && props.touched.cost && <Alert variant={'danger'}>{props.errors.cost}</Alert>}
                                </fieldset>


                                <fieldset className="form-group">
                                    <label>Количество мест</label>
                                    <Field className="form-control" type="number" name="numberSeats" validate={validateField} />
                                    {props.errors.numberSeats && props.touched.numberSeats && <Alert variant={'danger'}>{props.errors.numberSeats}</Alert>}
                                </fieldset>


                                <fieldset className="form-group">
                                    <ButtonFile variant="contained" color="primary" onClick={() => setOpen(true)}>
                                        Добавить картинки
                                    </ButtonFile>
                                    
                                    {console.log('fileObjects', fileObjects)}
                                    
                                    <DropzoneDialogBase
                                        dialogTitle={dialogTitle()}
                                        acceptedFiles={['image/*']}
                                        fileObjects={fileObjects}
                                        cancelButtonText={"Отмена"}
                                        submitButtonText={"Ок"}
                                        maxFileSize={50000000}
                                        filesLimit = {5}
                                        dropzoneText = {'Перетащите сюда картинку или кликните'}
                                        open={open}
                                        onAdd={newFileObjs => {
                                            setFileObjects([].concat(fileObjects, newFileObjs));
                                        }}
                                        onDelete={deleteFileObj => {
                                            
                                            
                                            const fileList = [...fileObjects];
                                            fileList.splice( deleteFileObj, 1 );
                                            setFileObjects( fileList );

                                       
                                        }}
                                        onClose={() => {setOpen(false); setFileObjects([])}}
                                        
                                        onSave={() => {

                                            console.log(fileObjects[0]);

                                            const newImage = fileObjects.map(file=>{return { file: file.file, src: URL.createObjectURL( file.file), key: uuid(), del: false, local: true}})
                                            props.setFieldValue("images", [...newImage, ...props.values.images]);
                                            setOpen(false);
                                            setFileObjects([]);
                                        }}

                                        showPreviews={true}
                                        showFileNamesInPreview={false}
                                    />
                                 </fieldset>


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
