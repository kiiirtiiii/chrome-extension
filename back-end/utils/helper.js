const axios = require('axios');
const cheerio = require('cheerio');
const {encode, decode} = require('gpt-3-encoder');

const scrapeData = async(url) => {
    const scrapedData = await axios.get(url);
    const html = scrapedData?.data;
    const $ = cheerio.load(html);
    return $('p').text();   // returning all the text form the <p> tag
}

const processText = ({text, prompt, responseToken, maxToken}) => {
    // processing the scraped text
    const trimmedText = text.replace(/\r?\n|\r|\t|\s\s+/g, ' ').replace(/<[^>]*>?/gm, '').trim(); 
    
    // calculating tokens
    const [promptToken, textToken] = _getTokens(trimmedText, prompt);

    // total count of the tokens should be equal to the supported token count that some model provides
    const allowedTextTokens = maxToken - (responseToken + promptToken.length + 10); // taking buffer of 5 tokens

    // truncate text to max tokens
    return _truncateToTokens(textToken, allowedTextTokens);
}

const _getTokens = (text, prompt) => {
    let promptToken; let textToken;

    // getting tokens in strings
    const promptTokenArr = encode(prompt);
    const textTokenArr = encode(text);

    return [
        promptToken = {
            arr: promptTokenArr,
            length: promptTokenArr.length, 
        },
        textToken = {
            arr: textTokenArr,
            length: textTokenArr.length,
        },
    ]
}

const _truncateToTokens = (textToken, allowedTextTokens) => {
    if(textToken.length > allowedTextTokens){
        textToken.arr.length = allowedTextTokens;    // truncate the token array
        return decode(textToken.arr);    // decode back into a string
    }
    return decode(textToken.arr);
}


module.exports = { scrapeData, processText };