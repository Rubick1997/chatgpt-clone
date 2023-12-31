"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ModelSelection } from "..";
import useSWR from "swr";

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-4-vision-preview",
  });

  //use swr to get model

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        role: "user",
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    //Toast notification to say loading
    const notification = toast.loading("One moment, thinking ...");

    await axios
      .post(
        "/api/askQuestion",
        { prompt: input, chatId, model, session },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // toast notification to say successful
        toast.success("Here is your answer!", { id: notification });
      })
      .catch((error) => toast.error(error.message, { id: notification }));
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg  text-sm">
      <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
        <input
          disabled={!session}
          value={prompt}
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11a37f] cursor-pointer hover:opacity-40 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}
export default ChatInput;

type Props = { chatId: string };
