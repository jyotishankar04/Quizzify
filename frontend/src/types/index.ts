/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type TContextType = {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// Props types

export type TUserCreateProp = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type TUserLoginProp = {
  email: string;
  password: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
};

// User

export type TUserState = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
export type Submission = {
  id: string;
  userId: string; // Foreign key referencing the user's ID
  user?: TUser; // Optional user object
  quizId: string; // Foreign key referencing the quiz's ID
  quiz?: TQuiz; // Optional quiz object
  avgScore: number; // Average score across attempts
  avgDuration: number; // Average duration across attempts
  totalAttempts: number; // Total number of attempts made by the user for this quiz
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  attempts?: Attempt[]; // Optional array of attempts for this submission
};

export type Attempt = {
  id: string;
  submissionId: string; // Foreign key referencing the submission's ID
  submission?: Submission; // Optional submission object
  totalScore: number; // Total score achieved in this attempt
  totalQuestions: number; // Total number of questions in this attempt
  quizDuration: number; // Time taken to complete the quiz in this attempt
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  userId?: string; // Optional foreign key referencing the user's ID
  quizId?: string; // Optional foreign key referencing the quiz's ID
  users?: TUser; // Optional user object
  // quiz?: TQuiz; // Optional quiz object}
};

// Quizs types
export type TQuizOptions = {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
};

export type TQuestion = {
  id: string;
  text: string;
  options: TQuizOptions[];
  quizId: string;
  createdAt: string;
  updatedAt: string;
};

export type TQuiz = {
  id: string;
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
  questions: TQuestion[];
  authorId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    questions: number;
  };
};

export type TOnlyQuiz = {
  id: string;
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
  createdAt: string;
  quizDuration: number;
  isPublic: boolean;
  authorId: string;

  updatedAt: string;
  _count: {
    questions: number;
    submissions: number;
    Attempt: number;
  };
};

export type TQuizCreate = {
  topic: string;
  topicContext: string;
  quizLength: number;
  quizLevel: string;
};

export type TProfileUpdate = {
  name?: string;
  instagram_username?: string;
  twitter_username?: string;
  github_username?: string;
  website_url?: string;
  bio?: string;
  address?: string;
};
