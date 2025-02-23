import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAuthentication } from "../../lib/reactquery/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TUserCreateProp } from "../../types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useCreateUserAuthentication();
  const { register, handleSubmit, reset } = useForm();
  const handleFormSubmit = handleSubmit(async (data) => {
    if (!data) {
      return toast.error("Please fill all the fields");
    }
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.password.trim() ||
      !data.confirmPassword.trim()
    ) {
      return toast.error("Please fill all the fields");
    }
    if (data.password !== data.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }
    try {
      await mutateAsync(data as TUserCreateProp);
      reset();
      navigate("/app");
      toast.success(data.message);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.message);
    }
  });
  return (
    <>
      {/* Sign Up Section */}
      <div className="animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Create New Account
        </h2>
        <p className="text-neutral-600 text-lg mb-8">
          Join our community and start creating quizzes
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <input
                disabled={isPending}
                {...register("name")}
                type="text"
                id="name"
                className="w-full text-black px-4 py-2 input input-bordered"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                disabled={isPending}
                {...register("email")}
                type="email"
                id="signup-email"
                className="w-full px-4 py-2 input input-bordered text-black"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <input
                disabled={isPending}
                {...register("password")}
                type="password"
                id="signup-password"
                className="w-full px-4 py-2 input input-bordered text-black"
                placeholder="Create a password"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-neutral-700"
              >
                Confirm Password
              </label>
              <input
                disabled={isPending}
                {...register("confirmPassword")}
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 input text-black input-bordered"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className={`w-full btn btn-primary ${
                isPending ? "no-animation btn-disabled" : ""
              } `}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner bg-white"></span>
                  <span className="text-white">Creating...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-center text-sm text-neutral-600">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
