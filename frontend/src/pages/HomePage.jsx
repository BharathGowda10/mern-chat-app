import { useEffect } from "react";
import ChatCard from "../components/ChatCard";
import ChatWindow from "../components/ChatWindow";
import { useMessageStore } from "../store/useMessageStore";

const HomePage = () => {
  const { getUser, users, setSelectedUser } = useMessageStore();
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleUserClick = (userId) => {
    setSelectedUser(users.find((user) => user._id === userId));
  };

  return (
    <div className="h-full w-full">
      {/* Mobile/Tablet: Horizontal avatar slider */}
      <div className="block lg:hidden w-full overflow-x-auto py-2">
        <div className="flex gap-4 px-2">
          {users?.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="flex-shrink-0">
                <ChatCard user={user} handleUserClick={handleUserClick} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
      {/* Desktop: Sidebar + Chat */}
      <div className="hidden lg:grid mx-auto w-[1024px] h-full grid-cols-3 gap-4">
        <div className="col-span-1 bg-gray-100 rounded-lg p-2">
          <div className="p-4">
            {users?.length > 0 ? (
              users.map((user) => (
                <ChatCard
                  key={user._id}
                  user={user}
                  handleUserClick={handleUserClick}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-lg p-4 shadow">
          <ChatWindow />
        </div>
      </div>
      {/* Mobile/Tablet: Chat window full width */}
      <div className="block lg:hidden w-full h-[calc(100vh-80px)]">
        <ChatWindow />
      </div>
    </div>
  );
};

export default HomePage;
