import llamaTokenizer from 'llama-tokenizer-js'

export function countTokens(text) {
  return llamaTokenizer.encode(text).length;
}

export function calculatePricePerPrompt(inputPromptTokenCount, completionTokenCount, pricePer1kTokensInput, pricePer1kTokensCompletion) {
  return pricePer1kTokensInput * inputPromptTokenCount / 1000 + pricePer1kTokensCompletion * completionTokenCount / 1000;
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}