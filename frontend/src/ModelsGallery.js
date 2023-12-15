import React from 'react';

const ModelsGallery = ({ modelsData, inputPromptTokenCount }) => {
    // chunk the modelsData into groups of two
    const chunkModels = (data, size) => {
        return data.reduce((acc, val, i) => {
            if (i % size === 0) acc.push([]);
            acc[acc.length - 1].push(val);
            return acc;
        }, []);
    };

    const chunkedModelsData = chunkModels(modelsData, 2);

    return (
        <div className="flex-grow flex-col px-4">
            {chunkedModelsData.map((modelGroup, index) => (
                <div key={index} className="flex flex-wrap -mx-4 mb-4">
                    {modelGroup.map((model) => {
                        const modelName = model.displayName;
                        const inputPromptCost = inputPromptTokenCount * parseFloat(model.pricePer1kTokensInput) / 1000;
                        const outputGenerationCost = model.pricePer1kTokensCompletion * parseFloat(model.generatedCompletionTokenCount) / 1000;
                        const totalCost = inputPromptCost + outputGenerationCost;

                        return (
                            <div key={modelName} className="w-1/2 px-4 flex flex-col">
                                <label htmlFor={modelName} className="block text-sm font-medium text-gray-700">{modelName}</label>
                                <textarea
                                    id={modelName}
                                    value={model.generatedCompletion}
                                    rows={10}
                                    readOnly
                                    disabled
                                    className="mt-1 p-4 shadow-sm w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                                <div className="text-right text-sm font-medium text-gray-700 mt-2 text-secondary">
                                {model.generatedCompletionTokenCount} output tokens • <span style={{ color: '#0ab50a' }}>${totalCost.toFixed(3)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ModelsGallery;
