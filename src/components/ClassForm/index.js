import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createMasterClass } from '../../api/firebaseApi'
import Image from 'react-bootstrap/Image'
import uuid from 'react-uuid'

import { storage } from '../../firebase'

const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'

};


class Thumb extends React.Component {
    state = {
      loading: false,
      thumb: undefined,
    };
  
    componentWillReceiveProps(nextProps) {
      if (!nextProps.file) { return; }
  
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(nextProps.file);
      });
    }
  
    render() {
      const { file } = this.props;
      const { loading, thumb } = this.state;
  
      if (!file) { return null; }
  
      if (loading) { return <p>loading...</p>; }
  
      return (<img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200} />);
    }
  }

const ClassForm = (props) => {

    const onSubmit = (values) => {

        createMasterClass({NameMasterClass: values.NameMasterClass, 
            DescriptionMasterClass: values.DescriptionMasterClass, 
            DateMasterClass: values.DateMasterClass, 
            ImgMasterClass: values.ImgMasterClass, 
            keyMaster:values.keyMaster}, values.file)

    }

    return (
        <div>

            <div className="container">

                <h3>Мастер класс</h3>

                <Formik
                    initialValues={{ NameMasterClass: '', DescriptionMasterClass: '', DateMasterClass: '', file:null, ImgMasterClass: '', 
                    keyMaster: uuid()}}
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

                                    <label for="file">Картинка</label>
                                    <input id="file" name="file" type="file" onChange={(event) => {

                                        const file = event.currentTarget.files[0];
                                        props.setFieldValue("file", file);

                                        /*
                                        const imageRef = storage.ref('images').child(props.values.keyMaster);

                                        imageRef.put(file).then(function (snapshot) {
                                    
                                            snapshot.ref.getDownloadURL().then(function (ImgMasterClass) {
                                                props.setFieldValue("ImgMasterClass", ImgMasterClass);
                                            });
                                    
                                        });
                                        */


                                    }}/>
                                </div>

                               {!props.values.file && <Image className="card-img-top" src= {props.values.ImgMasterClass} style = {divStyle} alt="Card image cap" />}
                               {props.values.file && <Thumb file={props.values.file} />}


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
