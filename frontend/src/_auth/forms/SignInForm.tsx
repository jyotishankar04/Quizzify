import { Link } from "react-router-dom";

const SignInForm = () => {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                className="w-full px-4 py-2 input input-bordered"
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
                type="password"
                id="signup-password"
                className="w-full px-4 py-2 input input-bordered"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
            >
              Sign In
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
