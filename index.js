const OpenAI = require("openai");
require('dotenv').config()




async function run(){




    const gptResponse  = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ 
          role: 'user', 
          content: "create new Score object with the score bing the appropratness of the statemnt with a value between 1 and 10. 1 being very approprate and 10 being not approprate at all" }],
          functions:[
            {
              name: "createScoreObject",
              parameters: {
                type: "object",
                properties: {
                    statment: {
                        type: "string"
                    },
                    score: {
                        type: "integer"
                    },
                },
                required: ["name", "colour", "age"]
            }
            }
          ],
          function_call: { name: "createScoreObject" }
      });
    
      const json = JSON.parse(gptResponse.choices[0].message.content);
    
}

const openai = new OpenAI({
    apiKey: process.env.GPT
  });

const statment = "Happy birthday jack and jill" //Update statment to test