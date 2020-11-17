import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createMasterClass } from '../../api/firebaseApi'
import Image from 'react-bootstrap/Image'
import uuid from 'react-uuid'

import { storage } from '../../firebase'

const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'
};


const ClassForm = (props) => {

    const onSubmit = (values) => {

        const addFiles = values.images.filter((item)=>{return !item.del && item.local}).map((item) => {return {filename:item.key, file:item.file}})
        const removeFiles = values.images.filter((item)=>{return item.del && !item.local}).map((item) => {return {filename:item.key}})
        
        createMasterClass({
            NameMasterClass: values.NameMasterClass,
            DescriptionMasterClass: values.DescriptionMasterClass,
            DateMasterClass: values.DateMasterClass,
            keyMaster: values.keyMaster,
            images: values.images.filter((item)=>{return !item.del}).map((item) => {return {filename:item.key, src:item.src}})
            
        }, addFiles, removeFiles)

    }


    return (
        <div>

            <div className="container">

                <h3>Мастер класс</h3>

                <Formik
                    initialValues={{
                        NameMasterClass: '', DescriptionMasterClass: '', DateMasterClass: '', 
                        keyMaster: uuid(), images: []
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


                                <div className="form-group">


                                    <input multiple name="file" type="file" style={{ display__: 'none' }} accept="image/png, image/jpeg" onChange={(event) => {

                                        console.log(event.currentTarget.files);
                                        let images_ = [];

                                        for (let i = 0; i < event.currentTarget.files.length; i++) {

                                            images_.unshift({ file: event.currentTarget.files[i], src: URL.createObjectURL(event.currentTarget.files[i]), key: uuid(), del: false, local:true });

                                        }

                                        props.setFieldValue("images", [...images_, ...props.values.images]);


                                    }} />



                                </div>


                                {props.values.images.filter((item)=>{return !item.del}).map((item, index) => (<li key={item.key} className="form-group">

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





                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}

export default ClassForm;
