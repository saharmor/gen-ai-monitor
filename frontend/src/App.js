import React from 'react';
import './App.css';

const tableData = [
  {
    model: "GPT-3",
    lastVersion: "3.5",
    pricePerPrompt: "$0.02",
    pricePer1kTokensInput: "$0.01",
    pricePer1kTokensCompletion: "$0.02",
    avgLatency: "100ms",
    mmlu: "85%",
    chatArenaRanking: "1st"
  },
  {
    model: "GPT-4",
    lastVersion: "3.5",
    pricePerPrompt: "$0.02",
    pricePer1kTokensInput: "$0.01",
    pricePer1kTokensCompletion: "$0.02",
    avgLatency: "100ms",
    mmlu: "85%",
    chatArenaRanking: "1st"
  },
];

function App() {
  const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 align-center">
      <div className="flex-grow">
        <div className="flex-grow">
          <div className="flex flex-col items-center justify-center my-12">
            <h1 className="text-4xl font-semibold mb-6 text-primary">LLMs Cockpit</h1>
            <div className="flex w-full max-w-4xl overflow-x-auto">
              <table className="w-full mx-auto text-center">
                <thead className="bg-gray-200">
                  <tr>
                    {headers.map(header => (
                      <th key={header} className="px-4 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        {header.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {headers.map(header => (
                        <td key={header} className="border px-4 py-2">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="inset-x-0 bottom-0 pr-24 pl-24">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 mx-2">How it works</a> ·
                <a href="https://x.com/theaievangelist" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 mx-2">@theaievangelist</a>
              </div>
              <div className="text-sm text-gray-600">
                Stay in the know 👉 <a href="http://aitidbits.ai?utm_source=llm-cockpit&utm_medium=growth" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">AI Tidbits</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;