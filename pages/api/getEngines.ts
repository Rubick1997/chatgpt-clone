import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/chatgpt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = (await openai.models.list()).data;
  const modelOptions = models.map((m) => ({
    value: m.id,
    label: m.id,
  }));
  res.status(200).json({ modelOptions });
}

type Option = { value: string; label: string };

type Data = { modelOptions: Option[] };
