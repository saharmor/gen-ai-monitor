import llamaTokenizer from 'llama-tokenizer-js'

export function countTokens(text) {
  return llamaTokenizer.encode(text).length;
}