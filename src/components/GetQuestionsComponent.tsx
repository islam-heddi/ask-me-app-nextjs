"use client";
import React, { useEffect, useState } from "react";
import { GetQuestions } from "@/app/actions/questions";
import { ErrorSchema, QuestionSchema } from "@/types/types";
import QuestionsPagination from "./QuestionsPagination";
export default function GetQuestionsComponent() {
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
  return (
    <div className="w-3/6 max-[1050px]:w-full">
      <QuestionsPagination MyQuesions={Questions} />
    </div>
  );
}
