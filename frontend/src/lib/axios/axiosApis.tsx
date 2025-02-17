import axios from "axios";
import {
  TProfileUpdate,
  TQuizCreate,
  TUserCreateProp,
  TUserLoginProp,
  TUserState,
} from "../../types";

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Auth API
export const createUserAccount = async (user: TUserCreateProp) => {
  const response = await axiosApi.post("/auth/register", user);
  return response.data;
};

export const loginUserAccount = async (user: TUserLoginProp) => {
  const response = await axiosApi.post("/auth/login", user);
  return response.data;
};

export const logoutUserAccount = async () => {
  const response = await axiosApi.post("/auth/logout");
  return response.data;
};

export const checkSession = async (): Promise<{
  success: boolean;
  message: string;
  data: TUserState;
}> => {
  const response = await axiosApi.get("/auth/session");
  return response.data;
};

// Quizzes API

export const createQuiz = async (quiz: TQuizCreate) => {
  const response = await axiosApi.post("/quiz/create", quiz);
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axiosApi.get("/quiz/list");
  return response.data;
};

export const getSingleQuiz = async (id: string) => {
  const response = await axiosApi.get(`/quiz/${id}`);
  return response.data;
};

export const getSingleQuizQuestionsByid = async (id: string) => {
  const response = await axiosApi.get(`/quiz/${id}/questions`);
  return response.data;
};

export const updateQuizData = async (id: string, data: TQuizCreate) => {
  const response = await axiosApi.patch(`/quiz/${id}`, data);
  return response.data;
};
export const deleteQuiz = async (id: string) => {
  const response = await axiosApi.delete(`/quiz/${id}`);
  return response.data;
};

export const submitAnswer = async (
  props: { duration: string; id: string } & Record<string, string>
) => {
  const response = await axiosApi.post(`/quiz/${props.id}/submit`, {
    ...props,
    duration: props.duration,
  });
  return response.data;
};

export const getResultByAttemptId = async (id: string, attemptId: string) => {
  const response = await axiosApi.get(`/quiz/${id}/attempts/${attemptId}`);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosApi.get(`/user`);
  return response.data;
};

export const updateProfile = async (data: TProfileUpdate) => {
  const response = await axiosApi.patch(`/user`, data);
  return response.data;
};

// Stats
export const getDashboardStats = async () => {
  const response = await axiosApi.get(`/stats/dashboard`);
  return response.data;
};
