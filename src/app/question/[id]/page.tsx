import React from "react";
import { GetQuestionById } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import AddAnswerComponent from "@/components/AddAnswerComponent";
import ViewAnswers from "@/components/ViewAnswers";
import getUser from "@/app/actions/user";
import DeleteQuestionButton from "./DeleteButtonQuestion";
import UpdateButtonQuestion from "./UpdateButtonQuestion";

export default async function GetQuestionId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await GetQuestionById(id);
  if (!data) return <div>Question not found.</div>;
  const result: QuestionSchema | ErrorSchema = data;
  if ((result as ErrorSchema).error)
    return <div>{(result as ErrorSchema).message}</div>;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/4 p-6 bg-white m-4 rounded-2xl shadow-2xl">
        <p>By : {(await getUser((data as QuestionSchema).userId)).name}</p>
        <h1 className="text-[20px]">
          <i className="text-gray-600">title:</i>{" "}
          {(data as QuestionSchema).title}
        </h1>
        <p>{(data as QuestionSchema).body}</p>
        <p>{(data as QuestionSchema).createdAt.toISOString()}</p>
        <div className="flex flex-row flex-wrap gap-4">
          <UpdateButtonQuestion
            questionId={(data as QuestionSchema).id}
            userId={(data as QuestionSchema).userId}
          />
          <DeleteQuestionButton
            userId={(data as QuestionSchema).userId}
            questionId={(data as QuestionSchema).id}
          />
        </div>
      </div>
      <AddAnswerComponent questionId={id} />
      <ViewAnswers questionId={id as string} />
    </div>
  );
}
