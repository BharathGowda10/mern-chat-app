import { Camera } from "lucide-react";
import avatar from "../assets/avatar.jpg";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import imageCompression from "browser-image-compression";

const ProfilePage = () => {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const profile = e.target.files[0];
    if (!profile) return;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(profile, options);
      const base64Image = await imageCompression.getDataUrlFromFile(
        compressedFile
      );
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    } catch (error) {
      console.error("Image compression failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-6 px-2 sm:px-0">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6 mt-10">
          <div className="relative">
            <img
              src={selectedImage || authUser.user.profilePic || avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />
            <label
              htmlFor="profile-pic-upload"
              className="absolute bottom-1 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-md"
            >
              <Camera />
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {authUser?.user?.fullName || "Unnamed"}
          </h2>
          <p className="text-xs">
            {isUpdatingProfile
              ? "Uploading...."
              : "Click on the camera icon to upload Picture"}
          </p>
        </div>

        {/* Editable Info */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="input input-bordered w-full mb-3"
            value={authUser?.user?.fullName || "Unnamed"}
            readOnly
          />
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={authUser?.user?.email || "Unnamed"}
            readOnly
          />
        </div>

        {/* Account Information Tab */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Account Information
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-900">Jan 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Active Status</span>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
