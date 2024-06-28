import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

function generateComment() {
  return {
    name: faker.name.firstName(),
    text: faker.lorem.lines(),
    avatar: faker.image.avatar(),
    likes: 0, // add initial likes count
  };
}

const initialComments = Array.from({ length: 7 }, generateComment);

function LikeButton({ likes, onLike }) {
  return (
    <div className="ui labeled button" tabIndex="0" onClick={onLike}>
      <div className="ui red button">
        <i className="heart icon"></i> Like
      </div>
      <a className="ui basic red left pointing label">{likes}</a>
    </div>
  );
}

function Content() {
  const [commentData, setCommentData] = useState(initialComments);

  const handleLike = (index) => {
    const newComments = [...commentData];
    newComments[index].likes += 1;
    setCommentData(newComments);
  };

  return (
    <div className="body" style={{ width: '100%', padding: '10px' }}>
      <h2>
        <b>This is React</b>
      </h2>

      <div className="ui comments" style={{ width: '100%' }}>
        {commentData.map((comment, index) => (
          <div className="comment" key={index}>
            <a className="avatar">
              <img
                src={comment.avatar}
                alt="avatar"
                style={{ borderRadius: '50%' }}
              />
            </a>
            <div className="content" style={{ borderRadius: '20%' }}>
              <a className="author">{comment.name}</a>
              <div className="metadata">
                <span className="date">
                  {index === 0
                    ? 'Today at 5:42PM'
                    : index === 1
                    ? 'Yesterday at 12:30AM'
                    : '5 days ago'}
                </span>
              </div>
              <div className="ui blue inverted segment">
                <div className="text" style={{ color: 'white' }}>
                  {comment.text}
                </div>
              </div>
              <div className="actions">
                <LikeButton likes={comment.likes} onLike={() => handleLike(index)} />
                <div className="ui labeled button" tabIndex="0">
                  <div className="ui basic blue button">
                    <i className="comment icon"></i> Reply
                  </div>
                  <a className="ui basic left pointing blue label">1,048</a>
                </div>
              </div>
            </div>
            {index === 1 && (
              <div className="comments">
                <div className="comment">
                  <a className="avatar">
                    <img
                      src={comment.avatar}
                      alt="avatar"
                      style={{ borderRadius: '50%' }}
                    />
                  </a>
                  <div className="content">
                    <a className="author">{faker.name.firstName()}</a>
                    <div className="metadata">
                      <span className="date">Just now</span>
                    </div>
                    <div className="text">{comment.text}</div>
                    <div className="actions">
                      <a className="reply">Reply</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
