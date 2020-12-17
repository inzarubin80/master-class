import {
    Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import moment from 'moment';
import React, { useState } from "react";
import { db } from '../../firebase';
import CommentApp from '../CommentApp';
const TextArea = Input.TextArea;



const CommentList = ({ comments }) => 
{

    const dataSource = comments.filter(item => !item.parentId);

return (
    <List
        dataSource={dataSource}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <CommentApp {...props} comments = {comments} key = {props.id} />}
    />
)
};


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

    const [messageText, setMessageText] = useState('');
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = () => {

        if (messageText == '') {
            return;
        }

        setSubmitting(true);

        return db.collection('masterClassComments').doc(id).collection('comments').add(
            {
                content: messageText,
                uid: user.uid,
                parentId: ''
            }

        )
            .then(docRef => docRef.get())
            .then(doc => {
                setMessageText('');
                setSubmitting(false);
                console.log(doc);
            }
            );
    }

    const handleChange = (e) => {
        setMessageText(e.target.value);
    }



    return (
        <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={(
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                )}
                content={(
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={messageText}
                    />

                )}

            />
        </div>
    );
}


export default ListComments;
