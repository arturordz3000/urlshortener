"use client";

import React, { FC, useCallback, useState } from 'react';

export const SUCCESSFUL_TEST_ID = 'Successful';
export const SUCCESSFUL_LINK_TEST_ID = 'SuccessfulLink';
export const SUCCESSFUL_COPIED_TEST_ID = 'SuccessfulCopied';
export const SUCCESSFUL_COPY_BUTTON_TEST_ID = 'SuccessfulCopyButton';

interface SuccessfulProps {
    link: string;
}

const Successful: FC<SuccessfulProps> = ({
    link
}) => {
    const [ showCopied, setShowCopied ] = useState(false);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(link);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
    }, [link]);

    return (
        <>
            <div data-testid={SUCCESSFUL_TEST_ID} className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Success!</span>
                <div className="ms-3 text-sm font-medium">
                    Here's the link: <a href="#" className="font-semibold underline hover:no-underline" data-testid={SUCCESSFUL_LINK_TEST_ID}>{link}</a>.
                </div>
            </div>
            <button data-testid={SUCCESSFUL_COPY_BUTTON_TEST_ID} type='button' onClick={() => copyToClipboard()} className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Copy to clipboard</button>
            { showCopied &&  <span data-testid={SUCCESSFUL_COPIED_TEST_ID}> Copied!</span> }
        </>
    );
}

export default Successful;
