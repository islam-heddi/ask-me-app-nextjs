import { GetAnswers } from "@/app/actions/answers";
import { AnswerSchema, ErrorSchema } from "@/types/types";
import React from "react";
import Vote from "./Vote";

export default async function ViewAnswers({
  questionId,
}: {
  questionId: string;
}) {
  const data: AnswerSchema[] | ErrorSchema = await GetAnswers(questionId);
  return (
    <div className="w-2/4">
      <h1 className="text-2xl">Answers</h1>
      {(data as AnswerSchema[]).length < 1 ? (
        <div>No Answers are available</div>
      ) : (
        (data as AnswerSchema[]).map((value, index) => (
          <div className="mb-6" key={index}>
            <div className=" p-6 bg-white m-4 rounded-2xl shadow-2xl">
              <p className="p-5">{value.body}</p>
              <p>{value.createdAt.toISOString()}</p>
            </div>
            <Vote userId={value.userId} answerId={value.id} />
          </div>
        ))
      )}
    </div>
  );
}
