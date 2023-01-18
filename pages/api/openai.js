import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 250,
  });

  res.status(200).json({
    isUser: false,
    name: 'OpenAI', 
    text: response.data.choices[0].text.slice(2),
    time: response.data.created,
    picture: 'https://robohash.org/OpenAI'
  });
}
