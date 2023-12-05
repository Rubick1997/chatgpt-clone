import { DocumentData } from "firebase/firestore";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ message }: Props) {
  const isChatGpt = message.user.role === "assistant";
  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message?.user.avatar} alt="" className="h-8 w-8" />
        <Markdown className="pt-1 text-sm" remarkPlugins={[remarkGfm]}>
          {message.text}
        </Markdown>
      </div>
    </div>
  );
}
export default Message;

type Props = { message: DocumentData };
