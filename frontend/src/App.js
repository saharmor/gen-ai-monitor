import React, { useState } from 'react';
import { countTokens } from './utils';
import './App.css';

import PromptBox from './PromptBox';

const header = ["Model", "Last change", "Price per prompt", "Price per 100 prompts", "Price per 1k tokens input", "Price per 1k tokens completion", "MMLU", "Chat Arena Elo ranking"]

const modelsData = [
  {
    model: "GPT-4",
    lastChange: "Nov 6th, 2023",
    pricePer1kTokensInput: "$0.01",
    pricePer1kTokensCompletion: "$0.02",
    mmlu: "85%",
    chatArenaEloRanking: "1217"
  },
  {
    model: "Claude 2.1",
    lastChange: "Nov 20th, 2023",
    pricePer1kTokensInput: "$0.01",
    pricePer1kTokensCompletion: "$0.02",
    mmlu: "85%",
    chatArenaEloRanking: "1217"
  }
]


const defaultPrompt = "Help me write a performance peer review. I will provide you with my colleague's name and peer feedback you will turn into an amazing elaborated yet to-the-point performance review I could then directly paste into my HR system.\n\nGuidelines:\n- Your first paragraphs should explore my colleague's strengths. Then, my colleague's improvement areas.\n- Try to specify concrete work-related traits where possible. For example, teamwork, critical mindset, agency, technical aptitude, etc.\n- Use performance figures from my feedback if those are available\n- Use anecdotes and examples from my feedback if those are available\n- Do not use names and do not quote directly\n- You can use the articles I have attached which discuss the art of writing a performance review. I found those helpful and correct.\n- If a user uploads their company ladder or operating principles, you HAVE TO map each feedback point to one principle/ladder entry. So each strength/improvement starts with a ladder entry name or operating principle.\n\nTake a deep breath and work on this problem step by step. YOU GOT THIS!"
const defaultOutput = "Help me write a performance peer review. I will provide you with my colleague's name and peer feedback you will turn into an amazing elaborated yet to-the-point performance review I could then directly paste into my HR system."

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}

function calculatePricePerPrompt(prompt, completion, pricePer1kTokensInput, pricePer1kTokensCompletion) {
  const promptTokens = prompt.split(' ').length;
  const completionTokens = completion.split(' ').length;
  const pricePerPrompt = pricePer1kTokensInput * promptTokens / 1000 + pricePer1kTokensCompletion * completionTokens / 1000;
  return pricePerPrompt.toFixed(2);
}



function App() {
  const [promptTokenCount, setPromptTokenCount] = useState(countTokens(defaultPrompt));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '80%' }}>
        <h1 className="text-4xl font-semibold mb-4 text-primary text-center mt-12">LLMs Cockpit</h1>
        <h3 className="text-2xl mb-6 mt-2 text-secondary text-center">Updated information for large language models</h3>
        <div className="w-full overflow-x-auto mb-12">
          <table className="w-full mx-auto text-center">
            <thead className="bg-gray-200">
              {header.map(header => (
                <th key={header} className="px-4 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </thead>
            <tbody className="text-gray-700">
              {modelsData.map((model, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {header.map((header, headerIndex) => {
                    const key = toCamelCase(header);
                    return (
                      <td key={headerIndex} className="border px-4 py-2">
                        {model[key] !== undefined ? model[key] : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
{console.log(calculatePricePerPrompt(defaultPrompt, defaultOutput, 0.01, 0.02))}
        <div className="mt-8 flex justify-around mb-8">
          <PromptBox defaultPrompt={defaultPrompt} boxName={"Input prompt"} tokenCount={promptTokenCount} setTokenCount={setPromptTokenCount}/>
          {/* <PromptBox defaultPrompt={defaultOutput} boxName={"Output completion"} /> */}
        </div>

        <footer className="py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 mx-2">How it works</a> ·
              <a href="https://x.com/theaievangelist" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 mx-2">@theaievangelist</a>
            </div>
            <div className="text-sm text-gray-600">
              Stay in the know 👉 <a href="http://aitidbits.ai?utm_source=llm-cockpit&utm_medium=growth" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">AI Tidbits</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
