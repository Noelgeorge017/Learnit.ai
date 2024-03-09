const apiUrl = 'https://api.openai.com/v1/chat/completions';
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.OPENAPI

async function generateCompletion(userInput) {
  try {
    console.log('User input:', userInput);
    if (!userInput) {
      throw new Error('User input is required');
    }

    const response = await axios.post(apiUrl, {
      messages: [{
        role: 'user', content: `
      Summarize a lengthy text into a concise and comprehensive form, retaining all crucial points without overly simplifying
       or omitting essential information, to facilitate the generation of course chapters.Ensure that the summary retains all crucial 
       points without overly simplifying or omitting essential information. Text - ${userInput}
      ` }],
      model: 'gpt-4-turbo-preview',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    console.log('Response:', response.data.choices[0].message.content);
    return response.data.choices[0].message;
  } catch (error) {
    console.error('Error making request:', error.message);
    throw error;
  }
}
module.exports = { generateCompletion }