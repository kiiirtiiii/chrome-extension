const tiktoken = require('tiktoken');

const processText = (text) => {
    const trimmedText = text.replace(/\r?\n|\r|\t|\s\s+/g, ' ').replace(/<[^>]*>?/gm, '').trim(); 
    return getShortText(trimmedText);
}

const getShortText = (text) => {
    const encoding = tiktoken.get_encoding('gpt2');
  
    // Encode the text and count the tokens
    const tokens = encoding.encode(text);
    console.log('token: ', tokens.length);

    const shortText = cutTextToTokens(text, 15000);

    const newTokens = encoding.encode(shortText);
    console.log('token: ', newTokens.length);

    return shortText;
}

function cutTextToTokens(text, maxTokens) {
    const tokens = text.trim().split(/\s+/); // Split by whitespace
    let selectedTokens = [];
    let currentTokenCount = 0;

    for (const token of tokens) {
        if (currentTokenCount + token.length <= maxTokens) {
        selectedTokens.push(token);
        currentTokenCount += token.length + 1; // +1 for space
        } else {
        break;
        }
    }

    return selectedTokens.join(' ');
}

module.exports = { processText };