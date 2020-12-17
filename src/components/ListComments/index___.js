import React from 'react'
import CommentApp from '../CommentApp';

import {
    Comment, Avatar, Form, Button, List, Input,
  } from 'antd';


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

const ListComments = ({comments}) => {

    console.log('comments *************************', comments);

return (
    <div>

    <h4>Комментарии</h4>
       
       {comments.filter(item => !item.parentId).map((item)=><CommentApp 
       key = {item.id} 
       parent = {item} 
       comments = {comments}
       content={(
        <Editor
          onChange={()=>{}}
          onSubmit={()=>{}}
          submitting={()=>{}}
          value={''}
        />
      )}
       
       
       />)}

    </div>
)

}

//export default ListComments;
