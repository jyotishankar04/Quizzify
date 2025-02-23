import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { _faqData } from "../../../constants/home.constants";
import {
  useGetProfile,
  useGetSupportQueries,
  useSendSupportQuery,
} from "../../../lib/reactquery/react-query";
import LoadingModal from "../../PupUploading";
import { getNormalMMdoYYformat } from "../../../lib/momentjs";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Query {
  id: string;
  queryTitle: string;
  queryDescription: string;
  reply: string | null;
  isSolved: boolean;
  createdAt: string;
  user: User;
}

function sortQueries(queries: Query[]): Query[] {
  return queries.sort((a, b) => {
    // If a is solved and b is not, a comes first
    if (a.isSolved && !b.isSolved) return -1;
    // If b is solved and a is not, b comes first
    if (!a.isSolved && b.isSolved) return 1;
    // If both are solved or both are unsolved, maintain original order
    return 0;
  });
}

const HelpAndSupport = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const { mutateAsync: sendSupportQuery, isPending: isSupportQueryPending } =
    useSendSupportQuery();

  const {
    isLoading: isSupportQueriesLoading,
    data: supportQueries,
    isSuccess: isSupportQueriesSuccess,
  } = useGetSupportQueries();
  const { isLoading: isProfileLoading, data: existingProfile } =
    useGetProfile();

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      await sendSupportQuery({
        queryTitle: data.queryTitle,
        queryDescription: data.queryDescription,
      });
      reset(); // Reset form after successful submission
      queryClient.invalidateQueries({ queryKey: ["supportQueries"] });
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send your message. Please try again.");
    }
  });

  if (isProfileLoading) {
    return <LoadingModal isVisible={isProfileLoading} text="Loading..." />;
  }
  if (isSupportQueriesSuccess) {
    sortQueries(supportQueries.data);
  }

  return (
    <div className="w-full h-full p-6 flex flex-col items-center overflow-auto bg-gray-200">
      <h1 className="text-3xl font-semibold mb-8">Help & Support</h1>

      {/* FAQs Section */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {_faqData.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white shadow-sm"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={onSubmit} className="bg-white p-6 shadow-sm rounded-lg">
          {/* Name Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              disabled
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={existingProfile?.data.name}
            />
          </div>

          {/* Email Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              disabled
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={existingProfile?.data.email}
            />
          </div>

          {/* Query Title Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Query Title</span>
            </label>
            <input
              placeholder="How can we help you?"
              className={`input input-bordered w-full ${
                errors.queryTitle ? "input-error" : ""
              }`}
              {...register("queryTitle", {
                required: "Query Title is required",
              })}
            />
            {errors.queryTitle && (
              <span className="text-red-500 text-sm mt-1">
                {errors.queryTitle.message?.toString()}
              </span>
            )}
          </div>

          {/* Query Description Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Query Message</span>
            </label>
            <textarea
              placeholder="How can we help you?"
              className={`textarea textarea-bordered w-full min-h-32 h-32 ${
                errors.queryDescription ? "textarea-error" : ""
              }`}
              {...register("queryDescription", {
                required: "Query Message is required",
              })}
            />
            {errors.queryDescription && (
              <span className="text-red-500 text-sm mt-1">
                {errors.queryDescription.message?.toString()}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSupportQueryPending}
          >
            {isSupportQueryPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl mb-8">
        {isSupportQueriesLoading ? (
          <div className="w-full max-w-4xl mb-8">Loading...</div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Previous Queries</h2>
            <div className="space-y-4">
              {supportQueries.data.length > 0 ? (
                supportQueries?.data.map((query: Query) => (
                  <PreviousQueries
                    key={query.id}
                    queryTitle={query.queryTitle}
                    queryDescription={query.queryDescription}
                    createdAt={query.createdAt}
                    isSolved={query.isSolved}
                    id={query.id}
                    user={query.user}
                    reply={query.reply}
                  />
                ))
              ) : (
                <div>
                  <p className="text-gray-600">You have no previous queries.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const PreviousQueries: React.FC<Query> = ({
  queryTitle,
  queryDescription,
  createdAt,
  isSolved,
  reply,
  user,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card max-w-4xl bg-base-100 shadow-sm p-4">
      {/* User Info Section */}
      <div className="mb-4 flex items-center gap-2">
        <div className="avatar">
          <div className="w-8 h-8 rounded-full">
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">{queryTitle}</h1>
          <p className="text-gray-600 text-sm">{queryDescription}</p>
          <p className="text-gray-600 text-sm">
            Created on {getNormalMMdoYYformat(createdAt)}
          </p>
        </div>

        <div>
          <button
            className={`btn ${
              isSolved ? "btn-success text-white" : "btn-error text-white"
            }`}
          >
            {isSolved ? "Solved" : "Unsolved"}
          </button>
        </div>
      </div>

      {/* Reply Section */}
      {isSolved && reply && (
        <div className="mt-4">
          <button
            onClick={toggleExpand}
            className="btn btn-ghost btn-sm text-primary"
          >
            {isExpanded ? "Hide Reply" : "Show Reply"}
          </button>
          {isExpanded && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{reply}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HelpAndSupport;
