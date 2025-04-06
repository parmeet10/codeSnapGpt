import Tesseract from 'tesseract.js';

const extractText = async (imagePath) => {
  try {
    const textData = await Tesseract.recognize(imagePath, 'eng');

    return textData.data.text;
  } catch (err) {
    throw err;
  }
};

export default { extractText };
