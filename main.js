const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
   res.send("Hello , World! Gemini");
})

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generate = async (prompt) => {
  try {
    const result = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    })
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.log("response error", error);
  }
};

app.get('/api/content',async(req,res) => {
   try{
      const data = req.body.question;
      const result = await generate(data);
      res.send({
         "result": result
      })
   }
   catch(err){
      res.send("error: "+ err)
   }
})

app.listen(3000 , ()=>{
   console.log('Server is up and running on posrt 3000');
})
//generate(question); 
