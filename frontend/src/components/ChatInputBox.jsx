import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import imageCompression from "browser-image-compression";

const ChatInputBox = () => {
  const { sendMessage, selectedUser } = useMessageStore();
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    fileInputRef.current.value = null;
  };

  const handleSend = async () => {
    if (!message.trim() && !imageFile) return;
    let base64Image;
    try {
      if (imageFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        base64Image = await imageCompression.getDataUrlFromFile(compressedFile);
      }

      await sendMessage(
        { text: message.trim(), image: base64Image },
        selectedUser._id
      );
    } catch (error) {
      console.log("failed in sending image text", error);
    }
    // Reset after sending

    setMessage("");
    setImageFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="p-4 border-t bg-base-100 flex flex-col gap-2">
      {/* Image Preview */}
      {imageFile && (
        <div className="relative w-fit">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="max-w-[200px] max-h-[200px] rounded shadow"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-gray-800 text-white p-1 rounded-full hover:bg-red-500"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-2">
        {/* Text Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 input input-bordered"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Upload image"
        >
          <Image size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() && !imageFile}
          className={`p-2 rounded ${
            message.trim() || imageFile
              ? "bg-primary text-white hover:bg-primary-focus"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
