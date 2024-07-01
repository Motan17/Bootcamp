import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Masonry from 'react-responsive-masonry';

const ACCESS_TOKEN = '6avVgvJtlTNIr75DAYr0BeHhPQNV09gWX6FmWZ7BNFg';

class Isi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      query: '',
      results: [],
      error: null,
    };
    this.imageRefs = [];
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.setState({ currentTime: `${hours}:${minutes}:${seconds}` });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  performSearch = (event) => {
    event.preventDefault(); // Prevent default form submission
    const { query } = this.state;
    if (query.trim() === '') {
      return;
    }

    axios
      .get(`https://api.unsplash.com/search/photos`, {
        params: {
          client_id: ACCESS_TOKEN,
          query: query,
        },
      })
      .then((response) => {
        this.setState({ results: response.data.results, error: null });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        if (error.response) {
          this.setState({ error: `Error: ${error.response.status} - ${error.response.data.message}` });
        } else if (error.request) {
          this.setState({ error: 'Error: No response received from server' });
        } else {
          this.setState({ error: `Error: ${error.message}` });
        }
      });
  };

  setImageRef = (element) => {
    if (element) {
      element.style.objectFit = 'cover';
      this.imageRefs.push(element);
    }
  };

  render() {
    const { currentTime, query, results, error } = this.state;

    return (
      <div className="max-w-[80rem] mx-auto p-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current time:</label>
        <div className="relative max-w-[20%] mx-auto">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <i className="fas fa-clock w-4 h-4 text-gray-500 dark:text-gray-400"></i>
          </div>
          <div className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {currentTime}
          </div>
        </div>

        <form className="max-w-[100%] mx-auto mt-4" onSubmit={this.performSearch}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={query}
              onChange={this.handleInputChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="w-full">




        <Masonry columnsCount={3} gutter="10px">
        {results.length > 0 &&
            results.map((result) => (
              <div key={result.id} className="p-1">
                <img ref={this.setImageRef} src={result.urls.small} alt={result.description || 'Image'} className="rounded-lg w-full"/> 
              </div>
          ))}
        </Masonry>
          {/* {results.length > 0 &&
            results.map((result) => (
              <div key={result.id} className="p-1">
                <img ref={this.setImageRef} src={result.urls.small} alt={result.description || 'Image'} className="rounded-lg w-full"/> 
              </div>
            ))} */}
        </div>
      </div>
    );
  }
}

export default Isi;
