import { MessageSquare } from "lucide-react";

const ChatWindowDefault = () => {
  return (
    <div className="h-screen items-center bg-gray-100 py-20 flex flex-col text-center">
      <MessageSquare  size={64} className="py-4"/>
      <h2>Welcome to Chat app please select your friends to chat</h2>
    </div>
  );
};

export default ChatWindowDefault;
