import { Comment } from 'antd';
import React from 'react'

const CommentApp = (props) => {

        return (<Comment
                key={props.id}
                actions={props.actions}
                author={props.author}
                avatar={props.avatar}
                content={props.content}
                datetime={props.datetime}>
                {props.comments.filter(child => props.id == child.parentId).map((child) => { return CommentApp({ ...props, ...child }) })}
        </Comment>)
}

export default CommentApp;


