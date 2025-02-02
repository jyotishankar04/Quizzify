/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleQuizQuestionsByid,
  //   useUpdateQuizQuestions,
} from "../../../lib/reactquery/react-query";
import LoadingModal from "../../PupUploading";

const EditQuizQuestions = () => {
  const { quizId: id } = useParams();
  const { data, isLoading } = useGetSingleQuizQuestionsByid(id as string);
  //   const updateQuizQuestions = useUpdateQuizQuestions();

  const [questions, setQuestions] = useState(data?.data.questions || []);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <LoadingModal isVisible={isLoading} text="Loading..." />;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    try {
      //   await updateQuizQuestions.mutateAsync({ id, questions });
      setIsEditing(false);
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update quiz.");
    }
  };

  return (
    <div className="card max-w-7xl m-auto mt-5 flex flex-col items-center">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-semibold">Questions</h1>
        <button className="btn btn-primary" onClick={handleEditToggle}>
          {isEditing ? "Cancel" : "Edit Quiz"}
        </button>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {questions.map((question: any, qIndex: number) => (
            <div key={question.id}>
              {isEditing ? (
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-lg">
                  {qIndex + 1}. {question.text}
                </p>
              )}
              <ol className="list-disc list-inside ml-8 flex flex-col gap-1">
                {question.options.map((option: any, oIndex: number) => (
                  <li key={option.id} className="hover:underline">
                    {isEditing ? (
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="input input-bordered w-full"
                      />
                    ) : (
                      option.text
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
      {isEditing && (
        <button className="btn btn-success mt-4" onClick={handleSave}>
          Save Changes
        </button>
      )}
    </div>
  );
};

export default EditQuizQuestions;
