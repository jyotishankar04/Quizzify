import { Link } from "react-router-dom";

const SignUpForm = () => {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 input input-bordered"
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
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-neutral-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 input input-bordered"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
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
