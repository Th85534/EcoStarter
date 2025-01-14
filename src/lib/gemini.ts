import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

const genAI = new GoogleGenerativeAI(env.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function analyzeLifestyle(formData: any) {
  const prompt = `Analyze the following lifestyle data and provide eco-friendly recommendations:
    ${JSON.stringify(formData, null, 2)}`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function calculateCarbonFootprint(lifestyleData: any) {
  const prompt = `Based on the following lifestyle data, calculate monthly carbon footprint in kg CO2:
    ${JSON.stringify(lifestyleData, null, 2)}
    
    Provide the response in the following JSON format with double-quoted property names:
    {
      "monthlyFootprint": number,
      "breakdown": {
        "transportation": number,
        "energy": number,
        "consumption": number,
        "waste": number
      }
    }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}