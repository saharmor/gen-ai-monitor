import React, { useState } from 'react';
import { countTokens } from './utils';

const PromptBox = ({ boxName, defaultPrompt, tokenCount, setTokenCount }) => {
    const [prompt, setPrompt] = useState(defaultPrompt);

    const handleChange = (e) => {
        const newText = e.target.value;
        setPrompt(newText);
        setTokenCount(countTokens(newText));
    };

    return (
        <div className="w-1/2 px-4">
            <label htmlFor={boxName} className="block text-sm font-medium text-gray-700">{boxName}</label>
            <textarea
                id={boxName}
                value={prompt}
                onChange={handleChange}
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

