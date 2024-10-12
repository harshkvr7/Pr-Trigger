import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.json());

app.post('/api/pr', async (req, res) => {
    const prData = req.body.event.pull_request;
    const repoData = req.body.event.repository;
    const prNumber = prData.number;

    const filesUrl = `${repoData.url}/pulls/${prNumber}/files`;
    
    try {
        const response = await axios.get(filesUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const changedFiles = response.data;
        const fileNames = changedFiles.map(file => file.filename);
        
        console.log("Updated files in PR:", fileNames);

        res.json({ message: "Files fetched", files: fileNames });
    } catch (error) {
        console.error("Error fetching PR files:", error);
        res.status(500).send("Failed to fetch files");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
