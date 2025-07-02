"use client";
import React, { useEffect, useState } from "react";
import { GetQuestionByUserId } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import QuestionsPagination from "@/components/QuestionsPagination";

export default function ViewMyQuestions({ userId }: { userId: string }) {
  const [MyQuestions, setMyQuestions] = useState<
    QuestionSchema[] | ErrorSchema
  >();
  useEffect(() => {
    const get = async () => {
      const result: QuestionSchema[] | ErrorSchema = await GetQuestionByUserId(
        userId
      );
      setMyQuestions(result);
    };
    get();
  }, [userId]);
  return (
    <div className=" p-6">
      <h1 className="text-2xl">My Questions</h1>
      {MyQuestions == null ? (
        <h1 className="p-4">You dont have any questions</h1>
      ) : (
        <React.Fragment>
          <QuestionsPagination MyQuesions={MyQuestions} />
          {(MyQuestions as QuestionSchema[]).length < 1 ? (
            <h1 className="p-4">You dont have any questions</h1>
          ) : (
            <></>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
