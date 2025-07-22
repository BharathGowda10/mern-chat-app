import image from "../assets/avatar.jpg";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../utils";

const ChatCard = ({ user, handleUserClick }) => {
  const { onlineUsers } = useAuthStore();
  return (
    <div
      className="flex items-center bg-white shadow-lg p-4 rounded mb-1 cursor-pointer"
      onClick={() => handleUserClick(user._id)}
    >
      <div className="shrink-0 border-gray-90 relative">
        <img
          className="size-12 rounded-full bg-gray-900"
          src={user.profilePic || image}
          alt={`${user.fullName}-avatar`}
        />
        {onlineUsers?.includes(user._id) && (
          <span className="size-3 right-0 bottom-1 bg-green-500 absolute rounded-full ring-2"></span>
        )}
      </div>
      {/* Hide details on md and below, show on lg+ */}
      <div className="hidden lg:flex flex-1 min-w-0 ms-4">
        <div>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.fullName}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            How are you
          </p>
        </div>
      </div>
      <div className="hidden text-xs lg:inline-flex items-center text-base text-green-500 font-semibold text-gray-900 dark:text-white">
        {formatTime(user.createdAt)}
      </div>
    </div>
  );
};

export default ChatCard;
