export type UserSchema = {
  email: string;
  password: string;
  name: string;
};

export type QuestionSchema = {
  id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: Date;
};

export type AnswerSchema = {
  id: string;
  body: string;
  questionId: string;
  userId: string;
  createdAt: Date;
};

export type ErrorSchema = {
  message: string;
  error: string;
};

export type VoteSchema = {
  id?: string;
  userId: string;
  value: 1 | -1;
  answerId: string;
};
