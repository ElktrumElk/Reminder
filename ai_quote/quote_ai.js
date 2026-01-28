import OpenAI from "openai";
import express from "express";
import cors from "cors"
import "dotenv/config";

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

    const response = await client.responses.create({
      model: "llama-3.1-8b-instant",
      input: `You are an assistant that ONLY outputs JSON in the following format:

{
  "Quoter": name_of_the_quoter,
  "Quote": The_quote_of_the_person,
  "source": the_website_url,
  "web_name": name of the website,
}

Rules:
1. Do NOT include any text outside of JSON.
2. Fill every field with real-looking content.
3. "Quoter" should be a real or believable person.
4. "Quote" should be a valid short quote attributed to that person.
5. "source" should be a valid-looking URL where the quote could be found.
6. "web_name" should match the website of the URL.
7. Always output proper JSON with double quotes and no trailing commas.
8. Don't fetch quote you have already fetched.
9. Don't fetch the same quote from the same person but different quotes.

Generate one example.

  `,
      temperature: 1,
      top_p: 0.9
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
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on http://localhost:${PORT}`));