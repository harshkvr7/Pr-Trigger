import express from "express";

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/api/pr', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log("Server running on http://localhost:3000/");
})

module.exports = app