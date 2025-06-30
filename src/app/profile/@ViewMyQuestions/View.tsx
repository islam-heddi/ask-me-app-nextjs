"use client";
import React, { useEffect, useState } from "react";
import { GetQuestionByUserId } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import Link from "next/link";

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
          {(MyQuestions as QuestionSchema[]).map((value, index) => (
            <div key={index}>
              <div className="p-6 bg-white m-4 rounded-2xl shadow-2xl">
                <h1 className="text-[20px]">
                  <i className="text-gray-600">title:</i> {value.title}
                </h1>
                <p>{value.body}</p>
                <p>{value.createdAt.toISOString()}</p>
                <Link
                  href={`/question/${value.id}`}
                  className="inline-block text-blue-600 cursor-pointer"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
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
