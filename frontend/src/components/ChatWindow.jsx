import ChatHeader from "./ChatHeader";
import image from "../assets/avatar.jpg";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatInputBox from "./ChatInputBox";
import { useEffect } from "react";
import ChatWindowDefault from "./ChatWindowDefault";

const ChatWindow = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    subscribeToMessage,
    unSubscribeMessage,
  } = useMessageStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessage();
    return () => unSubscribeMessage();
  }, [getMessages, selectedUser, subscribeToMessage, unSubscribeMessage]);

  if (!selectedUser) {
    return <ChatWindowDefault />;
  }
  return (
    <div className="relative h-full bg-gray-50 rounded-lg shadow">
      {/* Fixed Header */}
      <div className="sticky top-0 left-0 right-0 z-10 bg-gray-50 p-4 rounded-t-lg shadow-sm">
        <ChatHeader user={authUser} />
      </div>

      {/* Scrollable Messages */}
      <div className="absolute top-16 left-0 right-0 bottom-20 overflow-y-auto px-4 py-10 space-y-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser.user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile pic"
                  src={
                    message.senderId === authUser.user._id
                      ? authUser.user.profilePic || image
                      : selectedUser.profilePic || image
                  }
                />
              </div>
            </div>
            <div className="chat-bubble max-w-xs">
              {message.image && (
                <img
                  src={message.image}
                  alt="sent"
                  className="mb-1 rounded-md max-w-[200px] max-h-[200px] object-cover"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Input Box at bottom of chat window container */}
      <div className="absolute left-0 right-0 bottom-0 z-20 bg-gray-50 p-4 border-t shadow-sm rounded-b-lg">
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatWindow;
