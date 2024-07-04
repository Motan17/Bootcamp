import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './features/counter/counterSlice';
import { Add as AddIcon, Remove as RemoveIcon, RestartAlt as RestartAltIcon } from '@mui/icons-material';

function Redus() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold mb-6">
        Counter: {count}
      </div>
      <div className="flex space-x-4">
        <button
          className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={() => dispatch(increment())}
        >
          <AddIcon className="mr-2" />
          Increment
        </button>
        <button
          className="flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-red-300 disabled:cursor-not-allowed"
          onClick={() => dispatch(decrement())}
          disabled={count === 0}
        >
          <RemoveIcon className="mr-2" />
          Decrement
        </button>
        <button
          className="flex items-center px-6 py-3 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => dispatch(reset())}
        >
          <RestartAltIcon className="mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default Redus;