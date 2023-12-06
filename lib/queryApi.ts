import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  // todo: get all messages from chatId and append to prompt to build context

  const res = await openai.chat.completions
    .create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch((err) => `Chat Gpt was unable to respond (Error: ${err.message})`);

  return res;
};

export default query;
