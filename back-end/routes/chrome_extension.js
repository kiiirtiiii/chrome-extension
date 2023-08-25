const express = require("express");
const router = express.Router();
const { scrapeDataAndGenerateSummary, scrapeDataAndGenerateKeypoints, createAndDownloadPdf } = require("../controllers/chrome_extension");
const { validator } = require('../middlewares/validator');
const {getSummaryAndKeypointsSchema, getPdfSchema} = require('../models/schemas/chrome_extension');

router.get('/summary', validator('query', getSummaryAndKeypointsSchema), scrapeDataAndGenerateSummary);
router.get('/key-points', validator('query', getSummaryAndKeypointsSchema), scrapeDataAndGenerateKeypoints);
router.post('/download/pdf', validator('body', getPdfSchema), createAndDownloadPdf);

module.exports = router;
