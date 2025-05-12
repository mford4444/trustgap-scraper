// flyio-scraper-app

// --------------------
// FILE: index.js
// --------------------
import express from 'express';
import { scrapeBrokerCheck } from './scraper.js';

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send('BrokerCheck Scraper is live'));

app.post('/scrape', async (req, res) => {
  try {
    const { crdNumber } = req.body;
    if (!crdNumber) return res.status(400).json({ error: 'Missing crdNumber' });

    console.log(`Scraping CRD: ${crdNumber}`);
    const result = await scrapeBrokerCheck(crdNumber);
    res.json(result);
  } catch (err) {
    console.error('Scrape failed:', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Fly.io app listening on port ${port}`);
});
