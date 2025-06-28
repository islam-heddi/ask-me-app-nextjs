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

export type ErrorSchema = {
  message: string;
  error: string;
};
