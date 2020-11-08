import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {createMasterClass} from '../../api/firebaseApi'

const ClassForm = (props)=> {
  


    const onSubmit = (values) => {
    
        createMasterClass(values)
      
    }

    return (
        <div>
       
        <div className="container">
        
        <h3>Мастер класс</h3>

            <Formik 
                initialValues={{NameMasterClass:'',DescriptionMasterClass:'', DateMasterClass:''}}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={()=>{}}
                enableReinitialize={true}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" 
                                                        className="alert alert-warning"/>
                            <ErrorMessage name="targetDate" component="div" 
                                                        className="alert alert-warning"/>
                           
                           <fieldset className="form-group">
                                <label>Наименование</label>
                                <Field className="form-control" type="text" name="NameMasterClass"/>
                            </fieldset>
                            

                            <fieldset className="form-group">
                                <label>Описание</label>
                                <Field className="form-control" type="text" name="DescriptionMasterClass"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Дата проведения</label>
                                <Field className="form-control" type="date" name="DateMasterClass"/>
                            </fieldset>

                           <fieldset className="form-group">
                                <label>Количество мест</label>
                                <Field className="form-control" type="number" name="numberSeats"/>
                            </fieldset>
                            
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
