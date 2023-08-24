require('dotenv').config();
const axios = require("axios");
const cheerio = require("cheerio");
const { processText } = require('../utils/helper');
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const tiktoken = require('tiktoken');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const scrapData = async (req, res, next) => {
  console.log('API got called');
  try {
    const scrapedData = await axios.get(req.query.url);
    const html = scrapedData.data;
    const $ = cheerio.load(html);
    const websiteText = $('p').text();
    const result = processText(websiteText);

    const encoding = tiktoken.get_encoding('gpt2');

    // Encode the text and count the tokens
    const tokens = encoding.encode(result);
    console.log('token: ', tokens.length);

    const shortText = cutTextToTokens(result, 15000);

    // console.log({ shortText });
    const newTokens = encoding.encode(shortText);
    console.log('token: ', newTokens.length);

    let prompt = 'please summarize the following text'
    prompt = req.query.isBullets ? +`:\n\n${shortText}`: `in bullet points:\n\n${shortText}`;

    const response = await client.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
    });

    const summary = response.choices[0].text;

    console.log(summary);
    // const summary = result;

    res.send({ status: 'success', data: { summary } });
  } catch (err) {
    next(err);
  }
};

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

const createAndDownloadPdf = async (req, res, next) => {
   // Create a document
   const doc = new PDFDocument;

   res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');

   doc.text(req.body, 100, 100);

   doc.pipe(res);
   // Finalize PDF file
   doc.end();
}

module.exports = { scrapData, createAndDownloadPdf };
