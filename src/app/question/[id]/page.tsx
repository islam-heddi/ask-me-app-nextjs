import React from "react";
import { GetQuestionById } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import AddAnswerComponent from "@/components/AddAnswerComponent";
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
        <h1 className="text-[20px]">
          <i className="text-gray-600">title:</i>{" "}
          {(data as QuestionSchema).title}
        </h1>
        <p>{(data as QuestionSchema).body}</p>
        <p>{(data as QuestionSchema).createdAt.toISOString()}</p>
      </div>
      <AddAnswerComponent questionId={id} />
    </div>
  );
}
