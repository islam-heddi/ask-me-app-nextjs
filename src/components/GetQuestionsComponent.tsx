"use client";
import React, { useEffect, useState } from "react";
import { GetQuestions } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import QuestionsPagination from "./QuestionsPagination";
//import getUser from "@/app/actions/user";
//import Link from "next/link";
export default function GetQuestionsComponent() {
  //const result: QuestionSchema[] | ErrorSchema = await GetQuestions();
  //if ((result as ErrorSchema).error) return <div>result?.message</div>;
  const [Questions, setQuestions] = useState<QuestionSchema[] | ErrorSchema>(
    []
  );
  useEffect(() => {
    const get = async () => {
      const result = await GetQuestions();
      setQuestions(result);
    };
    get();
  }, []);
  // const len = (result as QuestionSchema[]).length;
  // const pages: number = len / 6;
  //const currentPage = 0;
  return (
    <div>
      {/* <div className="flex flex-col w-2/4">
          {(result as QuestionSchema[])
            .filter((_, index) => index > currentPage && index < currentPage + 7)
            .map(async (value, index) => (
              <div key={index}>
                <div className="p-6 bg-white m-4 rounded-2xl shadow-2xl">
                  <p>By : {(await getUser(value.userId)).name}</p>
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
          {pages.toFixed()} || {len}
        </div>*/}
      <QuestionsPagination MyQuesions={Questions} />
    </div>
  );
}
