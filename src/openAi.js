import OpenAi from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

const askGpt = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `${process.env.OPENAI_GENERAL_PROMPT}: ${text}`,
        },
      ],
    });

    return response.choices[0];
  } catch (err) {
    throw err;
  }
};

export default {
  askGpt,
};
