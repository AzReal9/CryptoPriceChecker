import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
      res.render("index.ejs");
    } catch (error) {
      res.render("index.ejs", { error: error.message,} );
    }
});

app.post("/", async (req, res) => {
    try {
      const coin = req.body.coin;
      
      const response = await axios.get(API_URL + `/tickers/${coin}`);
      const result = response.data;
     res.render("index.ejs", {data: result});
    }
    catch (error) {
        res.render("index.ejs", { error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
