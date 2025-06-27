export type UserSchema = {
  email: string;
  password: string;
  name: string;
};

export type QuestionSchema = {
  title: string;
  body: string;
  userId: string;
};
