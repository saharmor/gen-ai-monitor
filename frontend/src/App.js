import React, { useEffect, useState } from 'react';
import { generateCellContent, toCamelCase } from './utils';
import './App.css';

import PromptBox from './PromptBox';
import ModelsGallery from './ModelsGallery';
import Footer from './Footer';

const header = ["Display name", "Last change", "Price per prompt", "Price per 100 prompts", "Price per 1k tokens input", "Price per 1k tokens completion", "MMLU", "Chat Arena Elo ranking"]

function App() {
  const [configModelsData, setConfigModelsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/fetch-report');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConfigModelsData(data);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    };

    fetchData();
  }, []);

  const inputPromptTokensCount = !configModelsData ? 0 : configModelsData.modelsData[0]["promptTokensCount"];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full mx-auto px-4 mb-4 sm:px-6 lg:px-8" style={{ maxWidth: '80%' }}>
        <h1 className="text-4xl font-semibold mb-4 text-primary text-center mt-12">LLMs Cockpit</h1>
        <h3 className="text-2xl mb-6 mt-2 text-secondary text-center">Updated information for large language models</h3>
        {!configModelsData && <div>Loading...</div>}
        {configModelsData && <>
          <div className="w-full overflow-x-auto mb-12">
            <table className="w-full mx-auto text-center">
              <thead className="bg-gray-200">
                <tr>
                  {header.map(header => (
                    <th key={header} className="px-4 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {configModelsData.modelsData.map((model, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {header.map((header, headerIndex) => {
                      const key = toCamelCase(header);
                      return (
                        <td key={headerIndex} className="border px-4 py-2">
                          {generateCellContent(model, key, model[key])}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right text-sm text-gray-700 mt-2 pr-2 text-secondary">
              Last update: {configModelsData.lastUpdate}
            </div>
          </div>
          {/* Take the first model input prompt toekns count even though it might not be the same across LLMs */}
          <PromptBox prompt={configModelsData.inputPrompt} boxName={"Input prompt"} tokenCount={inputPromptTokensCount} />
          <div className="mt-8 flex justify-around mb-8">
            <ModelsGallery modelsData={configModelsData.modelsData} inputPromptTokenCount={inputPromptTokensCount} />
          </div>
        </>
        }
        <Footer />
      </div>
    </div>
  );
}

export default App;
