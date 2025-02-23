import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createQuiz,
  createUserAccount,
  deleteQuiz,
  getDashboardStats,
  getMyProfile,
  getQuizzes,
  getResultByAttemptId,
  getSingleQuiz,
  getSingleQuizQuestionsByid,
  getSupportQueries,
  loginUserAccount,
  logoutUserAccount,
  manualPasswordUpdate,
  sendSupportQuery,
  submitAnswer,
  updateProfile,
  updateQuizData,
  uploadUserAvatar,
} from "../axios/axiosApis";
import {
  TProfileUpdate,
  TQuizCreate,
  TUserCreateProp,
  TUserLoginProp,
} from "../../types";

export const useCreateUserAuthentication = () => {
  return useMutation({
    mutationFn: (user: TUserCreateProp) => createUserAccount(user),
  });
};

export const useLoginUserAuthentication = () => {
  return useMutation({
    mutationFn: (user: TUserLoginProp) => loginUserAccount(user),
  });
};

export const useLogoutUserAuthentication = () => {
  return useMutation({
    mutationFn: () => logoutUserAccount(),
  });
};

// Create Quiz

export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: (quiz: TQuizCreate) => createQuiz(quiz),
  });
};

export const useGetAllQuizzes = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: () => getQuizzes(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};

export const useGetSingleQuiz = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getSingleQuiz(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useUpdateQuizData = (id: string) => {
  return useMutation({
    mutationFn: (data: TQuizCreate) => updateQuizData(id, data),
  });
};

export const useDeleteQuiz = (id: string) => {
  return useMutation({
    mutationFn: () => deleteQuiz(id),
  });
};

export const useGetSingleQuizQuestionsByid = (id: string) => {
  return useQuery({
    queryKey: ["quizQuestion", id],
    queryFn: () => getSingleQuizQuestionsByid(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useSubmitAnswer = (id: string) => {
  return useMutation({
    mutationFn: (props: { duration: string } & Record<string, string>) =>
      submitAnswer({
        ...props,
        id,
        duration: props.duration.toString(),
      }),
  });
};

export const useGetResultByAttemptId = (id: string, attemptId: string) => {
  return useQuery({
    queryKey: ["quizResult", id, attemptId],
    queryFn: () => getResultByAttemptId(id, attemptId),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};

export const useUpdateProfileData = () => {
  return useMutation({
    mutationFn: (data: TProfileUpdate) => updateProfile({ ...data }),
  });
};
export const useUploadUserAvatar = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return uploadUserAvatar(data);
    },
  });
};

export const useManualPasswordUpdate = () => {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => manualPasswordUpdate(data),
  });
};

// Dashboard Stats
export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStats(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};

// Support API
export const useSendSupportQuery = () => {
  return useMutation({
    mutationFn: (data: { queryTitle: string; queryDescription: string }) =>
      sendSupportQuery(data),
  });
};
export const useGetSupportQueries = () => {
  return useQuery({
    queryKey: ["supportQueries"],
    queryFn: () => getSupportQueries(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};
