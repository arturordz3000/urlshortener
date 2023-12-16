import React, { FC } from 'react';

interface UrlInputProps {
    onShortenButtonClicked: (url: string) => void;
}

const UrlInput: FC<UrlInputProps> = ({
    onShortenButtonClicked
}) => {
  return (
    <div data-testid='UrlInput'>
        <label htmlFor="url_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Introduce your URL</label>
        <input type="text" id="url_input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://google.com/" required />
        <button onClick={() => onShortenButtonClicked("")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shorten!</button>
    </div>
  );
};

export default UrlInput;
