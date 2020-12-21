import {
    Comment, Avatar, Form, Button, List, Input, Modal
} from 'antd';

import React from "react";

import CommentApp from '../CommentApp';

import { useSelector, useDispatch } from 'react-redux';
import * as appActions from "../../redux/app/appActions"

import { addComment } from '../../api/firebaseApi'

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
    const commentText = useSelector(state => state.app.commentText);
    const parentId = useSelector(state => state.app.parentId);
    const quoteText = useSelector(state => state.app.quoteText);


    const handleSubmit = (id, uid, parentId, messageText) => {

        if (messageText == '') {
            return;
        }
        return addComment(id,
            {
                content: messageText,
                uid: uid,
                parentId: parentId
            }
        )
            .then(docRef => docRef.get())
            .then(doc => {
                console.log(doc);

                if (parentId){
                    dispatch(appActions.setQuoteText(''));
                    dispatch(appActions.setParentId(''));
                    
                }

                else {
                    dispatch(appActions.setCommentText('')); 
                }

                

            }
            );
    }

    
    return (<div>
            {comments.length > 0 && <div>
                <Modal title={parentId && comments.find(item => item.id == parentId).content} onOk={() => handleSubmit(id, user.uid, parentId, quoteText)} onCancel={() => dispatch(appActions.cancelQuote())} visible={parentId}>
                    <Form.Item>
                        <TextArea rows={4} onChange={(e) => dispatch(appActions.setQuoteText(e.target.value))} value={quoteText} />
                    </Form.Item>
                </Modal>
                <List

                    dataSource={comments.filter(item => !item.parentId)}
                    header={`${comments.length} ${comments.length > 1 ? 'Коментариев' : 'Коментарий'}`}
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
                        onChange={(e) => dispatch(appActions.setCommentText(e.target.value))}
                        onSubmit={() => handleSubmit(id, user.uid, '', commentText)}
                        //submitting={submitting}
                        value={commentText}
                    />

                )}

            />
        </div>
    );
}


export default ListComments;
