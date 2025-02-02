import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserAuthentication } from "../../lib/reactquery/react-query";
import toast from "react-hot-toast";
import { TUserLoginProp } from "../../types";

const SignInForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutateAsync, isPending } = useLoginUserAuthentication();

  const handleFormSubmit = handleSubmit(async (data) => {
    if (!data) {
      return toast.error("Please fill all the fields");
    }
    if (!data.email.trim() || !data.password.trim()) {
      return toast.error("Please fill all the fields");
    }
    try {
      await mutateAsync(data as TUserLoginProp);
      reset();
      navigate("/app");
      toast.success(data.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  });
  return (
    <>
      {/* Sign Up Section */}
      <div className="animate__animated  animate__fadeIn">
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
                htmlFor="signup-email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                {...register("email")}
                disabled={isPending}
                type="email"
                id="signup-email"
                className="w-full px-4 py-2 input text-black input-bordered"
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
                {...register("password")}
                disabled={isPending}
                type="password"
                id="signup-password"
                className="w-full px-4 py-2 input text-black input-bordered"
                placeholder="Create a password"
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
                  <span className="text-white">Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <div className="text-center">
              <p className="text-neutral-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
