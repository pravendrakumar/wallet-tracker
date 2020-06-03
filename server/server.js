const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path = require("path");
const rootPath = path.resolve(__dirname);
const bodyParser = require("body-parser");
app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/transactions", (req, res) => {
  fs.readFile(rootPath + "/db.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});
app.post("/add", (req, res) => {
  const data = fs.readFileSync(rootPath + "/db.json");
  const parsedData = JSON.parse(data);
  const newData = [...parsedData.transactions, { ...req.body }];
  const result = fs.writeFileSync(
    rootPath + "/db.json",
    JSON.stringify({ transactions: newData })
  );
  res.send(result);
});

app.put("/update", (req, res) => {
  const data = fs.readFileSync(rootPath + "/db.json");
  const parsedData = JSON.parse(data);
  const newData = parsedData.transactions.map((trans) => {
    if (trans.id === req.body.id) {
      return { ...req.body };
    } else {
      return trans;
    }
  });
  const result = fs.writeFileSync(
    rootPath + "/db.json",
    JSON.stringify({ transactions: newData })
  );
  res.send(result);
});

app.delete("/delete/:Id", (req, res) => {
  const data = fs.readFileSync(rootPath + "/db.json");
  const parsedData = JSON.parse(data);
  const filterData = parsedData.transactions.filter(
    (trans) => trans.id !== +req.params.Id
  );
  const result = fs.writeFileSync(
    rootPath + "/db.json",
    JSON.stringify({ transactions: filterData })
  );
  res.send(result);
});
app.listen(8000, () => {
  console.log("server is running on http://localhost:8000");
});
