import OpenAI from "openai";

let openai = null;

// ✅ Only initialize if key exists
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export const generateFeedback = async (data) => {
  // 🔁 If no API key → return mock response
  if (!openai) {
    return `
Focus Score: ${data.focusScore}%

Suggestions:
- Try reducing distractions
- Take short breaks (Pomodoro)
- Avoid frequent tab switching
`;
  }

  // 🤖 Real AI
  const prompt = `
Analyze this student's study behavior:

Focus Score: ${data.focusScore}%
Idle Time: ${data.idleTime}s
Tab Switches: ${data.tabSwitches}
Session Duration: ${data.seconds}s

Give 3 short, practical suggestions to improve focus.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};