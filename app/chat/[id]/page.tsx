import { Chat, ChatInput } from "@/components";

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}
export default ChatPage;

type Props = { params: { id: string } };
