import express from 'express';
import { scrapeBrokerCheck } from './puppeteer-brokercheck-scraper.js';

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const { crdNumber } = req.body;
    if (!crdNumber) return res.status(400).json({ error: 'Missing crdNumber' });

    console.log(`Received scrape request for CRD: ${crdNumber}`);

    const result = await scrapeBrokerCheck(crdNumber);

    console.log('Scrape successful:', result);
    res.json(result);
  } catch (err) {
    console.error('Scrape failed:', err);
    res.status(500).json({ error: err.message });
  }
});
