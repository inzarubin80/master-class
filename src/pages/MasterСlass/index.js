import React from 'react'
import './index.css';


const divStyle = {
    maxWidth: '540px',
    minWidth: '500px'

};

const MasterClasses = () => {
    return (
        <div className="MasterClasses">

            <div className="card" style={divStyle}>

                <div className="card-header">
                    Cухое валяние
                </div>

                <img className="card-img-top" src="https://i1.photo.2gis.com/images/branch/0/30258560050669905_3b47_300x300.jpg" alt="Card image cap" />

                <div className="card-body">

                    <p className="card-text">Мы знаем, что среди вас много любителей Хэллоуина! Уж больно захватывающая атрибутика у этого праздника! Брр! Куда же в Хэллоуин без летучих мышей?!
                    По этому поводу мы подготовили для вас мастер-класс по летучей мышке!
                    В субботу,31 октября, в 14-00.🙂</p>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => { }}>Зарезервировать</button>

               

                </div>

            </div>
    );
}

export default MasterClasses;
