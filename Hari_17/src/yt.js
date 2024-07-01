import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import Masonry from 'react-responsive-masonry';

const YT = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          key: 'AIzaSyApU4ZlTvQnyIMJCmvf_mfc8eA0EKMz98Q', // Replace with your actual YouTube API key
        },
      })
      .then((response) => {
        setVideos(response.data.items.slice(0, 10));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    setQuery('');
    inputRef.current.focus();
  };

  const handleClickThumbnail = (video) => {
    setCurrentVideo(video);
  };

  const renderVideoPlayer = () => {
    if (!currentVideo) {
      return null;
    }

    return (
      <div className="video-player">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video Player"
        ></iframe>
        <h2>{currentVideo.snippet.title}</h2>
        <p>{currentVideo.snippet.description}</p>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search YouTube videos..."
          value={query}
          onChange={handleInputChange}
          required
          ref={inputRef}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>
      <div className="video-list">
        <Masonry columnsCount={3} gutter="10px">
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-item card" onClick={() => handleClickThumbnail(video)}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">{video.snippet.title}</h5>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
      {renderVideoPlayer()}
    </div>
  );
};

export default YT;
