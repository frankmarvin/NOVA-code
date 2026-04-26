import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askAI(prompt, context = "") {
  const res = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "You are an expert coding assistant." },
      { role: "user", content: context + "\n\n" + prompt }
    ]
  });

  return res.choices[0].message.content;
    }
