import {
    Comment, Avatar, Form, Button, List, Input, Modal
} from 'antd';

import React, { useState, useEffect } from "react";
import CommentApp from '../CommentApp';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from "../../redux/app/appActions"
import { addComment, updateComment, deleteComment } from '../../api/firebaseApi'
import { ExclamationCircleOutlined } from '@ant-design/icons';


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
                Add Comment
        </Button>
        </Form.Item>
    </div>
);

const ListComments = ({ comments, user, id }) => {

    const dispatch = useDispatch();
    
    
    const delCommentId = useSelector(state => state.app.delCommentId);
    const answerComentId = useSelector(state => state.app.answerComentId);
    const modifiedCommentId = useSelector(state => state.app.modifiedCommentId);
    
    
    
    const [newContent, setNewContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [replyContent, setreplyContent] = useState('');


    const delcomment = comments.find(item => item.id == delCommentId); 
    
    const delContent = delcomment?delcomment.content:null;

    

  
    const handleAddSubmit = (id, uid, answerComentId, messageText) => {

        if (messageText == '') {
            return;
        }
        return addComment(id,
            {
                content: messageText,
                uid: uid,
                parentId: answerComentId
            }
        )
            .then(docRef => docRef.get())
            .then(doc => {
                if (answerComentId) {

                    setreplyContent('');
                    dispatch(appActions.setAnswerCommentId(''));
                    
                }
                else {
                    setNewContent('');
                }
            }
            );
    }


    const handleUpdateSubmit = () => {

        if (editContent == '') {
            return;
        }
        return updateComment(id, modifiedCommentId, {content: editContent})
            .then(docRef => {
                dispatch(appActions.setModifiedCommentId(''));
                setEditContent('')
            })
    }
    

    
    const handleDeleteSubmit = () => {
        return deleteComment(id, delCommentId)
            .then(docRef => {
                dispatch(appActions.setDelCommentId(''));
            })
    }

    useEffect(() => {
        if (modifiedCommentId){
            const content  = comments.find(item => item.id == modifiedCommentId).content;
            setEditContent(content.props.children);
        }
        
    }, [modifiedCommentId]);




    return (<div>
        {comments.length > 0 && <div>

            <Modal okText = {'Да'} cancelText = {'Отмена'} title={answerComentId && comments.find(item => item.id == answerComentId).content} onOk={() => handleAddSubmit(id, user.uid, answerComentId, replyContent)} onCancel={() => dispatch(appActions.setAnswerCommentId(''))} visible={answerComentId}>
                <Form.Item>
                    <TextArea rows={4} onChange={(e) => setreplyContent(e.target.value)} value={replyContent} />
                </Form.Item>
            </Modal>

            <Modal okText = {'Да'} cancelText = {'Отмена'}  onOk={() => handleUpdateSubmit()} onCancel={() => dispatch(appActions.setModifiedCommentId(''))} visible={modifiedCommentId}>
                <Form.Item>
                    <TextArea rows={4} onChange={(e) => setEditContent(e.target.value)} value={editContent} />
                </Form.Item>
            </Modal>

            <Modal  visible={delCommentId} title={'Удалить этот комментарий?'} onOk={() => handleDeleteSubmit()}  okText = {'Да'} okType = {'danger'} cancelText = {'Отмена'}  onCancel={() => dispatch(appActions.setDelCommentId(''))}>
               {delContent}
            </Modal>


            <List

                dataSource={comments.filter(item => !item.parentId)}
                header={'Коментарии'}
                itemLayout="horizontal"
                renderItem={props => <CommentApp {...props} comments={comments} key={props.id} />}
            />
        </div>}

        <Comment
            avatar={(
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            )}
            content={(
                <Editor
                    onChange={(e) => setNewContent(e.target.value)}
                    onSubmit={() => handleAddSubmit(id, user.uid, '', newContent)}
                    value={newContent}
                />

            )}

        />
    </div>
    );
}


export default ListComments;
