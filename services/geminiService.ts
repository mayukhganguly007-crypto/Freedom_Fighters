
import { GoogleGenAI } from "@google/genai";

export const transformImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Using gemini-2.5-flash-image for image-to-image editing
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1], // Strip the data:image/png;base64, prefix
            mimeType: 'image/png',
          },
        },
        {
          text: `${prompt}. Ensure the facial features of the original person are maintained but adjusted to look like the historical character. The result should be highly realistic, cinematic, and respectful to the historical legacy.`,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from the model.");
};
