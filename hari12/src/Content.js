

import React from 'react';
import { faker } from '@faker-js/faker';

function generateComment() {
  return {
    name: faker.name.firstName(),
    
    text: faker.lorem.lines(),
  };
}

const comments = Array.from({ length: 4 }, generateComment);
const avatar_data = faker.image.avatar();



function content() {
  return (


<div className="body"style={{ width: '100%'}}>
<h2>
  <b>This is React</b>
</h2>

<div className="ui comments" style={{ width: '100%'}}>

<h3 className="ui dividing header">Comments</h3>
{comments.map((comment, index) => (
<div className="comment" key={index}>
<a className="avatar">
<img src={faker.image.avatar()} alt="avatar" />
</a>
<div className="content">
<a className="author">{comment.name}</a>
<div className="metadata">
<span className="date">{index === 0 ? 'Today at 5:42PM' : index === 1 ? 'Yesterday at 12:30AM' : '5 days ago'}</span>
</div>
<div className="text">{comment.text}</div>
<div className="actions">
<a className="reply">Reply</a>
</div>
</div>
{index === 1 && (
<div className="comments">
<div className="comment">
  <a className="avatar">
  <img src={faker.image.avatar()} alt="avatar" />
  </a>
  <div className="content">
    <a className="author">{faker.name.firstName()}</a>
    <div className="metadata">
      <span className="date">Just now</span>
    </div>
    <div className="text">You are always so right :)</div>
    <div className="actions">
      <a className="reply">Reply</a>
    </div>
  </div>
</div>
</div>
)}
</div>
))}
<form className="ui reply form">
<div className="field">
<textarea></textarea>
</div>
<div className="ui blue labeled submit icon button">
<i className="icon edit"></i> Add Reply
</div>
</form>
</div>


</div>)}
export default content;