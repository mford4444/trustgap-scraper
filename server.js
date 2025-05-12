import express from 'express';
import { scrapeBrokerCheck } from './puppeteer-brokercheck-scraper.js';

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const { crdNumber } = req.body;
    if (!crdNumber) return res.status(400).json({ error: 'Missing crdNumber' });

    const result = await scrapeBrokerCheck(crdNumber);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (_, res) => res.send('BrokerCheck Scraper Running'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Scraper listening on port 3000');
});
