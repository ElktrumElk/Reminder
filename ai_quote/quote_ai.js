import OpenAI from "openai";
import express from "express";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({

  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"

});


// Simple quote endpoint
app.post("/quote", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: "Theme is required" });

    const response = await client.responses.create({
      model: "llama-3.1-8b-instant",
      input: `generate a real quote from a real lengend or professor with the name of the quoter and the website you get it from.
          return in json format only.
          format should look like this:
          {
            "Quoter": name_of_the_quoter,
            "Quote" : The_quote_of_the_person",
            "source": the_website_url
          }
  `
    });
    const resp = JSON.parse(response.output_text);
    console.log(resp);

    res.json(resp);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to generate quote" });

  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));