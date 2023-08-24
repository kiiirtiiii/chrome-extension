const express = require("express");
const router = express.Router();

const { scrapData, createAndDownloadPdf } = require("../controllers/scrapper");

router.get('/scrap', scrapData);
router.post('/download-pdf', createAndDownloadPdf);

module.exports = router;
