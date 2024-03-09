const apiUrl = 'https://api.openai.com/v1/chat/completions';
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.OPENAPI

async function mermaidQuery(userInput) {
    try {
        console.log('User input:', userInput);
        if (!userInput) {
            throw new Error('User input is required');
        }

        const response = await axios.post(apiUrl, {
            messages: [
                {
                    role: "system",
                    content: "You are an AI capable of generating mermaid MD diagrams."
                },
                {
                    role: "user",
                    content: `
follow the new mindmap syntax here to generate the mindmap mermaid diagram:

mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
                `
                },
                {
                    role: "user",
                    content: `Generate a mindmap mermaid diagram based on the following text: \n\n${userInput}\n\nmermaid diagram:`
                }
            ],
            model: 'gpt-4-turbo-preview',
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // console.log('Response:', response.data.choices[0].message.content);
        return response;
    } catch (error) {
        console.error('Error making request:', error.message);
        throw error;
    }
}
module.exports = { mermaidQuery }