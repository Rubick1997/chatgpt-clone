import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt || !chatId) {
    res.status(400).json({ answer: "Bad Request" });
    return;
  }

  // Chat gpt query

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "No answer",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      role: "assistant",
      _id: "Chat",
      name: "ChatGPT",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session.user.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}

type Data = { answer: string };
