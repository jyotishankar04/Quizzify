import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  useGetProfile,
  useUpdateProfileData,
} from "../../../lib/reactquery/react-query";
import LoadingModal from "../../PupUploading";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUsernameFromUrl } from "../../../utils/settings.utils";

const GeneralSettings = () => {
  const [image, setImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const {
    isLoading: isProfileLoading,
    data: existingProfile,
    isSuccess: isProfileSuccess,
  } = useGetProfile();

  const {
    mutateAsync: updateProfileMutation,
    isPending: isProfileUpdating,
    isSuccess: isProfileUpdated,
    isError: isProfileUpdateError,
  } = useUpdateProfileData();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleDataUpdate = handleSubmit(async (data) => {
    await updateProfileMutation({
      ...data,
    });
  });

  if (isProfileLoading) {
    return (
      <LoadingModal
        isVisible={isProfileLoading}
        text="Loading Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }

  if (!isProfileSuccess) {
    return null;
  }

  if (isProfileUpdating) {
    return (
      <LoadingModal
        isVisible={isProfileUpdating}
        text="Updating Profile..."
        textContext="Please wait while we process your request"
      />
    );
  }
  if (isProfileUpdated) {
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Profile updated successfully");
  }

  if (isProfileUpdateError) {
    toast.error("Error updating profile");
  }

  return (
    <div className="w-full h-full pt-8 flex flex-col justify-start items-center">
      <div className="w-full overflow-auto pb-4  h-full flex flex-col justify-start items-center">
        <div className="avatar relative group mt-2">
          <div className="w-32 h-32 rounded-full ring ring-offset-2 ring-base-100">
            <img
              src={image || existingProfile.data.avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute opacity-0 w-full h-full rounded-full top-0 left-0 cursor-pointer overflow-hidden z-50"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700/0 group-hover:bg-gray-700/50 w-full h-full flex justify-center items-center rounded-full">
            <div className="text-white w-full opacity-0 group-hover:opacity-100 h-full flex justify-center items-center">
              <Pencil className="w-10 h-10" />
            </div>
          </div>
        </div>
        <button className="btn mt-8 btn-primary">Update Image</button>
        <form
          onSubmit={handleDataUpdate}
          className="mt-4 w-full flex  flex-col gap-4 items-center max-w-md"
        >
          <div className="form-control w-full">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              defaultValue={existingProfile.data.name}
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
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
              defaultValue={existingProfile.data.address}
            />
          </div>

          <div className="w-full flex flex-col ">
            <h1 className="text-2xl font-semibold">Social Links</h1>

            <div className="flex flex-col ">
              <label htmlFor="" className="label">
                <span className="label-text">Instagram</span>
              </label>
              <input
                type="text"
                placeholder="eg. jhon_doe04"
                className="input input-bordered w-full"
                defaultValue={getUsernameFromUrl(
                  existingProfile.data.instagram_url
                )}
                {...register("instagram_username")}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="label">
                <span className="label-text">Twitter</span>
              </label>
              <input
                type="text"
                placeholder="eg. jhon_doe04"
                className="input input-bordered w-full"
                defaultValue={getUsernameFromUrl(
                  existingProfile.data.twitter_url || ""
                )}
                {...register("twitter_username")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="label">
                <span className="label-text">Linkedin</span>
              </label>
              <input
                type="text"
                placeholder="eg. jhon_doe04"
                className="input input-bordered w-full"
                defaultValue={existingProfile.data.linkedin_url}
                {...register("linkedin_username")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="label">
                <span className="label-text">Github</span>
              </label>
              <input
                type="text"
                placeholder="eg. jhon_doe04"
                className="input input-bordered w-full"
                defaultValue={existingProfile.data.github_url}
                {...register("github_username")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="label">
                <span className="label-text">Website</span>
              </label>
              <input
                type="text"
                placeholder="eg. jhon_doe04"
                className="input input-bordered w-full"
                defaultValue={existingProfile.data.website_url}
                {...register("website_url")}
              />
            </div>
          </div>
          <button
            className="btn btn-primary w-full"
            disabled={isProfileUpdating}
          >
            {isProfileUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettings;
