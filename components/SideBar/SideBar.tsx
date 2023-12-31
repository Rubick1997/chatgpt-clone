"use client";

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { ChatRow, NewChatButton } from "./components";
import { db } from "@/firebase";
import { ModelSelection } from "..";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChatButton />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 m-y-2">
            {loading && <div className="animate-pulse text-center text-white">Loading Chats...</div>}
            {chats?.docs.map((chat) => {
              return <ChatRow key={chat.id} id={chat.id} />;
            })}
          </div>
        </div>
      </div>
      {session ? (
        <img
          onClick={() => signOut()}
          src={session?.user?.image!}
          alt="user image"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      ) : null}
    </div>
  );
}

export default SideBar;
