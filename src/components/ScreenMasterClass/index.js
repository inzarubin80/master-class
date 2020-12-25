import React, { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { masterСlassСhangeReserve } from '../../api/firebaseApi';
import Slider from "react-slick";
import { createMasterClassFromVal } from "../../model/mastreClass"
import moment from "moment";
import { db } from '../../firebase';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import localization from 'moment/locale/ru'
import ListComments from '../ListComments';
import { useSelector } from 'react-redux'
import { Tooltip, Form, Input, Button, Modal } from 'antd';
import * as appActions from "../../redux/app/appActions";
import UserList from "../UserList";




moment.locale('ru')

const config = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true

};


const ScreenMasterClass = (props) => {

    const [settings, setSettings] = useState(config);
    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);


    const [usersReserv, setUsersReserv] = useState([]);


    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const profiles = useSelector(state => state.profiles.profiles);





    console.log('user', user);

    const getComent = (id, parentId, content, uid) => {

        console.log('getComent', user);


        return {
            id: id,
            parentId: parentId,

            uid: uid,

            actions: [

                <span onClick={() => dispatch(appActions.setAnswerCommentId(id))}>Ответить</span>,
                <span onClick={() => dispatch(appActions.setModifiedCommentId(id))}>Изменить</span>,
                <span onClick={() => dispatch(appActions.setDelCommentId(id))}>Удалить</span>,


            ],

            author: '',
            avatar: '',
            content: (
                <p>{content}</p>
            ),

            textContent: content,


            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            )
        }

    }

    React.useEffect(() => {
          let usersReserv = [];
        if (data) {
            for (const carentUid in data.reservation) {
                
                const profil = profiles.find(item => item.uid == carentUid);
                if (profil) {
                    usersReserv.push({ uid: carentUid, displayName: profil.displayName, photoURL: profil.photoURL });
                }
                else {
                    usersReserv.push({ uid: carentUid, displayName: '', photoURL: '' });
                }

            }


        }

        setUsersReserv(usersReserv);

    },
        [data, profiles]);


    React.useEffect(() => {


        const unsub = db.collection('masterClass').doc(id).onSnapshot(docSnapshot => {

            setData(createMasterClassFromVal(docSnapshot.id, docSnapshot.data()));


        }, err => {
            console.log(`Encountered error: ${err}`);
        });


        const observerComments = db.collection('masterClassComments').doc(id).collection('comments')
            .onSnapshot(querySnapshot => {

                let addComments = [];

                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {

                        let data = change.doc.data();
                        addComments.push(getComent(change.doc.id, data.parentId, data.content, data.uid));

                    }
                    if (change.type === 'modified') {
                        let data = change.doc.data();

                        setComments((prev) => prev.map((item) => {
                            if (item.id == change.doc.id) {
                                return getComent(change.doc.id, data.parentId, data.content, data.uid)
                            }
                            else {
                                return item
                            }
                        }));

                    }
                    if (change.type === 'removed') {

                        setComments((prev) => prev.filter(item => item.id !== change.doc.id));

                    }
                });

                if (addComments.length) {

                    const comentsEndProfile = addComments.map((comment) => {
                        const find = profiles.find(item => item.uid == comment.uid);

                        if (find) {
                            comment.author = find.displayName;
                            comment.avatar = find.photoURL;
                        }
                        return comment;
                    }
                    );
                    setComments((prev) => [...prev, ...comentsEndProfile]);
                }

            });

        return () => {

            unsub();
            observerComments();

        };
    }, []);




    const masterСlassСhangeReserveHandler = () => {

        if (!props.uid) {
            props.history.push(`/login`);
        }
        else {
            masterСlassСhangeReserve(id, props.uid);
        }
    }


    console.log("comments в ScreenMasterClass ...................", comments);



    if (data) {
        return (<div className="card">

            <Slider {...settings}>
                {data.images.map((item) => (<div key={item.src}> <img src={item.src} className='card-img-top' /> </div>))}
            </Slider>

            <button className="btn btn-primary" onClick={masterСlassСhangeReserveHandler}> {data.isRes(props.uid) ? 'Отменить резерв' : 'Зарезервировать'}</button>

            <div className="card-body">
                <h5 className="card-title">{data.NameMasterClass}</h5>
                <p className="card-text">{data.DescriptionMasterClass}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">Свободных мет: {data.vacancies}</li>
                <li className="list-group-item">Цена: 1000</li>

                {/*'DD:MM:YYYY HH:mm'*/}
                <li className="list-group-item">Дата: {moment(data.DateMasterClass).locale("ru", localization).format('LLLL')}</li>
            </ul>

            <UserList usersReserv={usersReserv}/>

            <ListComments comments={comments} id={id} user={user} handleCancel={() => { }} />

        </div>

        )
    }

    else {
        return (<div></div>)
    }

}

//handleCancel = {() => setParentId('')} 

const mapStateToProps = state => {
    return {
        uid: state.user.uid
    }
}

export default connect(mapStateToProps)(ScreenMasterClass);