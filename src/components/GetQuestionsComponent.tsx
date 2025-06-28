import React from "react";
import { GetQuestions } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import Link from "next/link";
export default async function GetQuestionsComponent() {
  const result: QuestionSchema[] | ErrorSchema = await GetQuestions();
  if ((result as ErrorSchema).error) return <div>result?.message</div>;
  return (
    <div className="flex flex-col w-2/4">
      {(result as QuestionSchema[]).map((value, index) => (
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
    </div>
  );
}
