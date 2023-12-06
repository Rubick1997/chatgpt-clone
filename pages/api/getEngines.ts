import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/chatgpt";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = (await openai.models.list()).data;
  const modelOptions = models.map((m) => {
    return { value: m.id, label: m.id };
  });
  res.status(200).json({ modelOptions });
}

type Option = { value: string; label: string };

type Data = { modelOptions: Option[] };
