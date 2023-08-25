require('dotenv').config();

const PDFDocument = require('pdfkit');
const openai = require('openai');
const prompts = require('../utils/prompts.json');
const {v4: uuidv4} = require('uuid');
const {OPEN_AI_MODELS} = require('../constants/appContants');
const { scrapeData, processText } = require('../utils/helper');

const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const scrapeDataAndGenerateSummary = async (req, res, next) => {
  try {
    console.log(`scrapeDataAndGenerateSummary api called with req:- ${JSON.stringify(req.query)}`);
    // using cheerio to srape data
    const websiteText = await scrapeData(req.query.url);

    // refining the scraped text
    const processedText = processText({
      text: websiteText,
      prompt: prompts.GET_SUMMARY,
      responseToken: +req.query.response_token,
      maxToken: OPEN_AI_MODELS.DAVINCI_003.MAX_TOKEN
    });

    const prompt = `${prompts.GET_SUMMARY}\n\n${processedText}`;

    // generating summary using openAI api
    const response = await client.completions.create({
      model: OPEN_AI_MODELS.DAVINCI_003.MODEL,  // currently the best model provided by openAI to give text-summary related response
      prompt,
      max_tokens: +req.query.response_token,  // length of the summary
      temperature: 0.3  // randomness of the response. best to keep it as close to 0
    });

    const summary = response?.choices[0]?.text.trim();

    res.send({ status: 'success', data: summary  });
  } catch (err) {
    next(err);
  }
};

const createAndDownloadPdf = async (req, res, next) => {
  try{
    // Create a document
    const doc = new PDFDocument;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(`Content-Disposition', 'attachment; filename=summary_${uuidv4()}.pdf`);

    // adding text to the doc
    doc.text(req.body, 100, 100);
    // using pipe to stream the pdf at front-end
    doc.pipe(res);
    // Finalize PDF file
    doc.end();
  }catch(err){
    next(err);
  }
}

module.exports = { scrapeDataAndGenerateSummary, createAndDownloadPdf };
