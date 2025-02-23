import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  useGetProfile,
  useUpdateProfileData,
  useUploadUserAvatar,
} from "../../../lib/reactquery/react-query";
import LoadingModal from "../../PupUploading";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUsernameFromUrl } from "../../../utils/settings.utils";

const GeneralSettings = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);

  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const {
    isLoading: isProfileLoading,
    data: existingProfile,
    isSuccess: isProfileSuccess,
  } = useGetProfile();
  const { mutateAsync: uploadUserAvatarMutation, isPending: isImageUploading } =
    useUploadUserAvatar();
  const { mutateAsync: updateProfileMutation, isPending: isProfileUpdating } =
    useUpdateProfileData();

  const handleDataUpdate = handleSubmit(async (data) => {
    try {
      await updateProfileMutation(data);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });

  const handleImageUpdate = async () => {
    if (!selectedFile) {
      return toast.error("Please select an image");
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await uploadUserAvatarMutation(formData);

      setImage(URL.createObjectURL(selectedFile)); // Update UI with the new image
      setSelectedFile(null);
      setIsImageEditing(false);
      toast.success("Profile image updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Error updating profile image");
    }
  };

  if (isProfileLoading) {
    return (
      <LoadingModal
        isVisible
        text="Loading Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }

  if (!isProfileSuccess) return null;

  if (isImageUploading) {
    return (
      <LoadingModal
        isVisible
        text="Updating Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }

  return (
    <div className="w-full overflow-auto h-full pt-8 flex flex-col justify-start items-center">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <img
            src={image || existingProfile?.data?.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-gray-300 rounded-full cursor-pointer">
            <Pencil size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!isImageEditing}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const file = e.target.files[0];
                  setImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
          </label>
          {isImageEditing ? (
            <button
              type="button"
              onClick={handleImageUpdate}
              disabled={!selectedFile}
              className="mt-2 btn btn-primary btn-sm"
            >
              Update Image
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsImageEditing(!isImageEditing)}
              className="mt-2 btn btn-primary btn-sm"
            >
              Edit Image
            </button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="w-full mt-10 h-full flex flex-col justify-start items-center">
        <form
          onSubmit={handleDataUpdate}
          className="mt-4 w-full flex flex-col gap-4 items-center max-w-md"
        >
          <div className="form-control w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-primary mb-4 btn-sm"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              defaultValue={existingProfile?.data?.name || ""}
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              disabled={!isEditing}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="eg. 123 Main St, City, State, Country"
              className="input input-bordered w-full"
              {...register("address")}
              defaultValue={existingProfile?.data?.address || ""}
              disabled={!isEditing}
            />
          </div>

          <div className="w-full flex flex-col">
            <h1 className="text-2xl font-semibold">Social Links</h1>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Instagram</span>
              </label>
              <input
                type="text"
                placeholder="eg. john_doe04"
                className="input input-bordered w-full"
                defaultValue={
                  existingProfile?.data?.instagram_url &&
                  getUsernameFromUrl(existingProfile?.data?.instagram_url || "")
                }
                {...register("instagram_username")}
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Twitter</span>
              </label>
              <input
                type="text"
                placeholder="eg. john_doe04"
                className="input input-bordered w-full"
                defaultValue={
                  existingProfile?.data?.twitter_url &&
                  getUsernameFromUrl(existingProfile?.data?.twitter_url || "")
                }
                {...register("twitter_username")}
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">LinkedIn</span>
              </label>
              <input
                type="text"
                placeholder="eg. linkedin.com/in/john_doe"
                className="input input-bordered w-full"
                defaultValue={
                  (existingProfile?.data?.linkedin_url &&
                    getUsernameFromUrl(existingProfile?.data?.linkedin_url)) ||
                  ""
                }
                {...register("linkedin_username")}
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Github</span>
              </label>
              <input
                type="text"
                placeholder="eg. linkedin.com/in/john_doe"
                className="input input-bordered w-full"
                defaultValue={
                  (existingProfile?.data?.github_url &&
                    getUsernameFromUrl(existingProfile?.data?.github_url)) ||
                  ""
                }
                {...register("github_username")}
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Website</span>
              </label>
              <input
                type="text"
                placeholder="eg. https://www.example.com"
                className="input input-bordered w-full"
                defaultValue={existingProfile?.data?.website_url || ""}
                {...register("website_url")}
                disabled={!isEditing}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!isEditing || isProfileUpdating}
          >
            {isProfileUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettings;
