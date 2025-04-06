import fs from 'fs';
import dotenv from 'dotenv';

import ocr from './tesseract.js';
import openAi from './openAi.js';
import nodemailer from './nodemailer.js';

dotenv.config();

const interval = process.env.FUNCTION_INTERVAL;
const sspath = process.env.SCREENHOT_PATH;

const blacklistedShots = ['.DS_Store'];

const detectNewScreenshots = async (sspath) => {
  try {
    const screenshots = fs.readdirSync(sspath);

    for (const shot of screenshots) {
      if (!blacklistedShots.includes(shot)) {
        blacklistedShots.push(shot);
        try {
          const extractedText = await ocr.extractText(`${sspath}/${shot}`);

          const gptResponse = await openAi.askGpt(extractedText);

          await nodemailer.sendMail(
            process.env.EMAIL,
            process.env.TO_EMAIL,
            'welcome, stabilise yourself',
            gptResponse.message.content,
          );
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      } else {
        console.log(blacklistedShots);
      }
    }
  } catch (err) {
    console.log(err);
  }

  setTimeout(detectNewScreenshots, process.env.INTERVAL, sspath);
};

detectNewScreenshots(sspath);
