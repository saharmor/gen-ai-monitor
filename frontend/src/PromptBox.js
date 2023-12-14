import React from 'react';

const PromptBox = ({ boxName, prompt, tokenCount }) => {
    return (
        <div className="px-4">
            <label htmlFor={boxName} className="block text-sm font-medium text-gray-700">{boxName}</label>
            <textarea
                id={boxName}
                value={prompt}
                readOnly
                disabled
                rows={10}
                className="mt-1 p-4 shadow-sm w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            <div className="text-right text-sm font-medium text-gray-700 mt-2 text-secondary">
                {tokenCount} tokens
            </div>
        </div>
    );
};

export default PromptBox;

