const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const scrabbleScore = require('./scrabble-score.js').score;

const config = {
  name: 'scrabble-score-service',
  port: 3001,
  host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.get('/', (req, res) => {
  res.status(200).send('Scrabble score is running');
});

app.get('/:word', (req, res, err) => {
  const word = req.params.word;
  const score = scrabbleScore(word);
  res.json({ payload: { score } });
});

app.listen(config.port, e => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on port ${config.port}`);
});
