import { GetAnswers } from "@/app/actions/answers";
import { AnswerSchema, ErrorSchema } from "@/types/types";
import React from "react";
import Vote from "./Vote";
import getUser from "@/app/actions/user";
import DeleteAnswerButton from "./DeleteAnswer";
import UpdateAnswerButton from "./UpdateAnswerButton";

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
        (data as AnswerSchema[]).map(async (value, index) => (
          <div className="mb-6" key={index}>
            <div className=" p-6 bg-white m-4 rounded-2xl shadow-2xl">
              <p>By : {(await getUser(value.userId)).name}</p>
              <p className="p-5">{value.body}</p>
              <p>{value.createdAt.toISOString()}</p>
              <UpdateAnswerButton
                body={value.body}
                answerId={value.id}
                userId={value.userId}
              />
            </div>
            <DeleteAnswerButton answerId={value.id} userId={value.userId} />
            <Vote answerId={value.id} />
          </div>
        ))
      )}
    </div>
  );
}
