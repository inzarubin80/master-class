import {
    Comment, Avatar, Form, Button, List, Input, Modal, Collapse,Statistic
} from 'antd';

import React, { useState, useEffect } from "react";
import CommentApp from '../CommentApp';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from "../../redux/app/appActions"
import { addComment, updateComment, deleteComment } from '../../api/firebaseApi'



const TextArea = Input.TextArea;

const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Добавить комментарий
        </Button>
        </Form.Item>
    </div>
);

const ListComments = (props) => {


    const {comments, user, id, history } = props;

    const dispatch = useDispatch();


    const delCommentId = useSelector(state => state.app.delCommentId);
    const answerComentId = useSelector(state => state.app.answerComentId);
    const modifiedCommentId = useSelector(state => state.app.modifiedCommentId);
    const [newContent, setNewContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [replyContent, setreplyContent] = useState('');

    const [submitting, setSubmitting] = useState(false);
    

    const [displayedComments, setDisplayedComments] = useState([]);


    const delcomment = comments.find(item => item.id === delCommentId);
    const delContent = delcomment ? delcomment.content : null;

    const { Panel } = Collapse;

    const handleAddSubmit = (id, answerComentId, messageText) => {


        if (!user) {
            props.history.push(`/login`);
            return;
        }

       const uid = user.uid;
        
        if (messageText === '') {
            return;
        }

        setSubmitting(true);

        return addComment(id,
            {
                content: messageText,
                uid: uid,
                parentId: answerComentId
            }
        )
            .then(docRef => docRef.get())
            .then(doc => {

                setSubmitting(false);

                if (answerComentId) {
                    setreplyContent('');
                    dispatch(appActions.setAnswerCommentId(''));
                }
                else {
                    setNewContent('');
                }

            }
            ).catch((e)=>{ setSubmitting(false)});
    }


    const handleUpdateSubmit = () => {



        


        if (editContent === '') {
            return;
        }


        setSubmitting(true);

        return updateComment(id, modifiedCommentId, { content: editContent })
            .then(docRef => {

                setSubmitting(false);
                dispatch(appActions.setModifiedCommentId(''));
                setEditContent('')
               
            }).catch(e=>{ setSubmitting(false);})
    }


    const handleDeleteSubmit = () => {
        return deleteComment(id, delCommentId)
            .then(docRef => {
                dispatch(appActions.setDelCommentId(''));
            })
    }

    useEffect(() => {
        if (modifiedCommentId) {
            const content = comments.find(item => item.id === modifiedCommentId).content;
            setEditContent(content.props.children);
        }

    }, [modifiedCommentId]);


    useEffect(() => {

        const newDisplayedComments = comments.filter(item => !item.parentId || comments.find(itemParent => itemParent.id === item.parentId));
        setDisplayedComments(newDisplayedComments);

    }, [comments]);



    return (

        <div>
            <Collapse defaultActiveKey={[]} onChange={()=>{}}>
                <Panel header = {(<Statistic title="Комментарии" value={displayedComments.length} precision={0}/>)} key="1">

                {setDisplayedComments.length > 0 && <div>

                    <Modal okText={'Да'} cancelText={'Отмена'} title={answerComentId && comments.find(item => item.id === answerComentId).content} onOk={() => handleAddSubmit(id, answerComentId, replyContent)} onCancel={() => dispatch(appActions.setAnswerCommentId(''))} visible={answerComentId}>
                        <Form.Item>
                            <TextArea rows={4} onChange={(e) => setreplyContent(e.target.value)} value={replyContent} />
                        </Form.Item>
                    </Modal>

                    <Modal okText={'Да'} cancelText={'Отмена'} onOk={() => handleUpdateSubmit()} onCancel={() => dispatch(appActions.setModifiedCommentId(''))} visible={modifiedCommentId}>
                        <Form.Item>
                            <TextArea rows={4} onChange={(e) => setEditContent(e.target.value)} value={editContent} />
                        </Form.Item>
                    </Modal>

                    <Modal visible={delCommentId} title={'Удалить этот комментарий?'} onOk={() => handleDeleteSubmit()} okText={'Да'} okType={'danger'} cancelText={'Отмена'} onCancel={() => dispatch(appActions.setDelCommentId(''))}>
                        {delContent}
                    </Modal>


                    <List
                        dataSource={displayedComments.filter(item => !item.parentId)}
                        //header={`${displayedComments.length} Комментариев`}
                        // itemLayout="horizontal"
                        renderItem={props => <CommentApp {...props} comments={displayedComments} key={props.id} />}
                    />
                </div>}

                <Comment
                    avatar={(
                        <Avatar

                            src={user ? user.photoURL : ""}
                            alt={user ? user.displayName : ''}


                        />
                    )}
                    content={(
                        <Editor
                            onChange={(e) => setNewContent(e.target.value)}
                            onSubmit={() => handleAddSubmit(id, '', newContent)}
                            value={newContent}
                            submitting = {submitting}
                        />

                    )}

                />
                
                </Panel>
            </Collapse>

        </div>


    );
}


export default ListComments;
