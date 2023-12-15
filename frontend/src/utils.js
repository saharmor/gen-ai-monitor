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

export function generateCellContent(modelData, modelKeyName, modelValue) {
  // check if a curreny field
  if (modelValue === undefined) {
    if (modelKeyName === 'pricePerPrompt') {
      return modelData['currency'] + calculatePricePerPrompt(modelData["promptTokensCount"], modelData['generatedCompletionTokenCount'], modelData['pricePer1kTokensInput'], modelData['pricePer1kTokensCompletion']).toFixed(3);
    } else if (modelKeyName === 'pricePer100Prompts') {
      return modelData['currency'] + (calculatePricePerPrompt(modelData["promptTokensCount"], modelData['generatedCompletionTokenCount'], modelData['pricePer1kTokensInput'], modelData['pricePer1kTokensCompletion']) * 100).toFixed(2);
    }

    return '-'
  }

  if (/price/i.test(modelKeyName)) {
    return modelData['currency'] + modelValue;
  }

  return modelValue;
}
