require('dotenv').config();

const axios = require("axios");
const cheerio = require("cheerio");
const { processText } = require('../utils/helper');
const prompts = require('../utils/prompts.json');
// const openai = require('openai');
// const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

    console.log({result});

    const prompt = `${prompts.GET_SUMMARY}\n\n${result}`;

  //   const response = await client.completions.create({
  //     model: 'text-davinci-003',
  //     prompt,
  //     max_tokens: 500,
  //   });

    const response = await axios.post(process.env.SUMMARY_API_URL, {  
      temperature: 0.5,
      prompt,
      max_tokens: 250, // Adjust the number of tokens for desired summary length
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const summary = response.data.choices[0].text.trim();

    res.send({ status: 'success', data: { summary } });
  } catch (err) {
    next(err);
  }
};

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
