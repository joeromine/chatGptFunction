const OpenAI = require("openai");
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.GPT
});


run("Happy birthday jack and jill")// Low Score
run("you want some smurf frog powder?")// High Score

async function run(statment){

    const gptResponse  = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ 
          role: 'user', 
          content: `create new Score object with the score set to the appropriateness of the statement "${statment}"  with a value between 1 and 10. 1 being very appropriate and 10 being not appropriate at all.` }],
          functions:[
            {
              name: "createScoreObject",
              parameters: {
                type: "object",
                properties: {
                    statment: {
                        type: "string",
                        description: "statement to be evaluated"
                    },
                    score: {
                        type: "integer"
                    },
                },
            }
            }
          ],
          function_call: { name: "createScoreObject"}
      }); 
      
      const functionCall = gptResponse.choices[0].message.function_call;
      const json = JSON.parse(functionCall.arguments);
      console.log(JSON.stringify(json));
}
