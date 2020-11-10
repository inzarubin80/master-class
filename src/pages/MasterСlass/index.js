import React from 'react'
import './index.css';


const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'

};

//"https://i1.photo.2gis.com/images/branch/0/30258560050669905_3b47_300x300.jpg"

const MasterClasses = (props) => {

   
    console.log('входящий key ' + props.id);

    console.log(props);

    return (
       
        // <div className="MasterClasses" key={props.key}>

<li  className="MasterClasses"  key={props.id}>


            <div className="card" style={divStyle}>

                <div className="card-header">
                    {props.NameMasterClass}
                </div>



                <img className="card-img-top" src= {props.ImagesMasterClass} alt="Card image cap" />

                <div className="card-body">

                    {/*<p className="card-text">Мы знаем, что среди вас много любителей Хэллоуина! Уж больно захватывающая атрибутика у этого праздника! Брр! Куда же в Хэллоуин без летучих мышей?!
                    По этому поводу мы подготовили для вас мастер-класс по летучей мышке!
                    В субботу,31 октября, в 14-00.🙂</p>*/}

                <p className="card-text">{props.DescriptionMasterClass}</p>

                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => { }}>Зарезервировать</button>

               

                </div>

            </li>
    );
}

export default MasterClasses;
