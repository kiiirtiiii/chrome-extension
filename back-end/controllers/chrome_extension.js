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
      prompt: req.query.regenerate ? prompts.REGENERATE_SUMMARY : prompts.GET_SUMMARY,
      responseToken: +req.query.response_token,
      maxToken: OPEN_AI_MODELS.DAVINCI_003.MAX_TOKEN
    });

    const temperature = req.query.regenerate ? 0.5 : 0.3
    const prompt = req.query.regenerate ? `${prompts.REGENERATE_SUMMARY}\n\n${processedText}`:`${prompts.GET_SUMMARY}\n\n${processedText}`;

    // generating summary using openAI api
    const response = await client.completions.create({
      model: OPEN_AI_MODELS.DAVINCI_003.MODEL,  // currently the best model provided by openAI to give text-summary related response
      prompt,
      max_tokens: +req.query.response_token,  // length of the summary
      temperature // randomness of the response. best to keep it as close to 0
    });

    const summary = response?.choices[0]?.text.trim();

    res.send({ status: 'success', data: summary  });
  } catch (err) {
    next(err);
  }
};

const scrapeDataAndGenerateKeypoints = async (req, res, next) => {
  try {
    console.log(`scrapeDataAndGenerateKeypoints api called with req:- ${JSON.stringify(req.query)}`);
    // using cheerio to srape data
    const websiteText = await scrapeData(req.query.url);

    // refining the scraped text
    const processedText = processText({
      text: websiteText,
      prompt: req.query.regenerate ? prompts.REGENERATE_KEYPOINTS : prompts.GET_KEY_POINTS,
      responseToken: +req.query.response_token,
      maxToken: OPEN_AI_MODELS.DAVINCI_003.MAX_TOKEN
    });

    const temperature = req.query.regenerate ? 0.5 : 0.1
    const prompt = req.query.regenerate ? `${prompts.REGENERATE_KEYPOINTS}\n\n${processedText}`:`${prompts.GET_KEY_POINTS}\n\n${processedText}`;

    // generating key-points using openAI api
    const response = await client.completions.create({
      model: OPEN_AI_MODELS.DAVINCI_003.MODEL,  // currently the best model provided by openAI to give text-summary related response
      prompt,
      max_tokens: +req.query.response_token,  // length of the summary
      temperature // randomness of the response.
    });

    const majorPoints = response?.choices[0]?.text.trim();

    res.send({ status: 'success', data: majorPoints  });
  } catch (err) {
    next(err);
  }
};

const createAndDownloadPdf = async (req, res, next) => {
  try{
    console.log(`createAndDownloadPdf api called with req:- ${JSON.stringify(req.body)}`);
    // Create a document
    const doc = new PDFDocument;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=summary${uuidv4()}.pdf`);

    // adding text to the doc
    doc.text(req.body.text, 100, 100);
    // using pipe to stream the pdf at front-end
    doc.pipe(res);
    // Finalize PDF file
    doc.end();
  }catch(err){
    console.log(err);
    next(err);
  }
}

module.exports = { scrapeDataAndGenerateSummary, scrapeDataAndGenerateKeypoints, createAndDownloadPdf };
