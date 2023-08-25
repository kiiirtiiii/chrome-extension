const express = require("express");
const router = express.Router();
const { scrapeDataAndGenerateSummary, createAndDownloadPdf } = require("../controllers/chrome_extension");
const { validator } = require('../middlewares/validator');
const {getSummarySchema, getPdfSchema} = require('../models/schemas/chrome_extension');

router.get('/summary', validator('query', getSummarySchema), scrapeDataAndGenerateSummary);
router.post('/download/pdf', validator('body', getPdfSchema), createAndDownloadPdf);

module.exports = router;
