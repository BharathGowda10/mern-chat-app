import { useMessageStore } from "../store/useMessageStore";
import image from "../assets/avatar.jpg";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useMessageStore();
  return (
    <div className="flex items-center justify-between border-b pb-3 mb-3">
      <img
        src={selectedUser.profilePic || image}
        alt={`${selectedUser.fullName}-chatHeader`}
        className="size-12 rounded-full mr-3"
      />
      <div className="flex-1">
        <div className="font-semibold text-gray-900">
          {selectedUser.fullName}
        </div>
        <div className="text-xs text-gray-500">
          {onlineUsers?.includes(selectedUser._id) ? "online" : "offline"}
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
