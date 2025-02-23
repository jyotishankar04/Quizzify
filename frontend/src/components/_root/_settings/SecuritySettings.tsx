import { useForm } from "react-hook-form";
import { useManualPasswordUpdate } from "../../../lib/reactquery/react-query"; // Replace with your actual API hook
import toast from "react-hot-toast";
import LoadingModal from "../../PupUploading";
import { AxiosError } from "axios";

const SecuritySettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { mutateAsync: updatePasswordMutation, isPending: isUpdating } =
    useManualPasswordUpdate(); // Replace with your actual mutation hook

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await updatePasswordMutation({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      reset();
      toast.success("Password updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: AxiosError | any) {
      console.error("Error updating password:", error);
      toast.error(error?.response.data.message);
    }
  };

  if (isUpdating) {
    return <LoadingModal isVisible={isUpdating} text="Updating..." />;
  }

  return (
    <div className="w-full h-full flex p-4 items-center flex-col">
      <h1 className="text-2xl font-semibold">Update Password</h1>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit({
            currentPassword: e.currentPassword,
            newPassword: e.newPassword,
            confirmPassword: e.confirmPassword,
          });
        })}
        className="flex flex-col max-w-xl gap-4 mt-4 w-full"
      >
        {/* Current Password */}
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">Current Password</span>
          </label>
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered w-full"
            {...register("currentPassword", {
              required: "This field is required",
            })}
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">
              {errors.currentPassword.message?.toString()}
            </span>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-full"
            {...register("newPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message?.toString()}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message?.toString()}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;
