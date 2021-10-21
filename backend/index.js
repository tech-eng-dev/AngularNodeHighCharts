const express = require('express');
const app = express();
const got = require('got');
const cors = require('cors');
const port = 3000;
const API_URI = 'https://api.github.com/search/repositories';

app.use(cors());

app.get('/repositories', async (req, res, next) => {
  try {
    const language = req.query?.q?.split(':')[1];
    const repo_count = req.query?.per_page;
    const results = [];
    const resp = await got(API_URI, {searchParams: req.query});
    const resBodyJson = JSON.parse(resp.body);
    resBodyJson?.items?.forEach(item => {
      results.push({
        repository_name: item?.name,
        star_count: item?.stargazers_count
      });
    });
    return res.status(200).send({
      repo_count: repo_count,
      language: language,
      results: results
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
