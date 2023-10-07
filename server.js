const express = require('express');
const { DiscussServiceClient } = require('@google-ai/generativelanguage');
const { GoogleAuth } = require('google-auth-library');
const cors = require('cors');

const MODEL_NAME = 'models/chat-bison-001';
const API_KEY = 'AIzaSyB5cnt7pDDek6G6xbHYg5IppWyhRqPEgDY'; 

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const app = express();

app.use(express.json());

app.use(cors());

app.post('/get-response', async (req, res) => {
  const userInput = req.body.userInput;

  const result = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      context: 'Respond to all questions with a rhyming poem.',
      messages: [{ content: userInput }],
    },
  });

  res.json({ response: result[0].candidates[0].content });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});