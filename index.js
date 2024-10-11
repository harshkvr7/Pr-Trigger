import express from "express";

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/api/pr', (req, res) => {
    console.log(req.query.event);
    console.log(req.query.pr_number);
    console.log(req.query.action);

    res.send("done");
})

app.listen(port, () => {
    console.log("Server running on http://localhost:3000/");
})