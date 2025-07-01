"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QuestionSchema, ErrorSchema } from "@/types/types";

export default function Pagination({
  MyQuesions,
}: {
  MyQuesions: QuestionSchema[] | ErrorSchema;
}) {
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  useEffect(() => {
    if (MyQuesions as QuestionSchema[]) {
      const pg: number = (MyQuesions as QuestionSchema[]).length / 5;
      setPages(parseInt(pg.toFixed() + 1));
    }
  }, [MyQuesions]);

  const handleIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value));
    setStartIndex(currentPage - 1);
    setEndIndex(currentPage + 5);
  };

  return (
    <div className="flex flex-col">
      {(MyQuesions as QuestionSchema[])
        .filter(
          (_, index) =>
            index >= startIndex && index <= endIndex && currentPage <= pages
        )
        .map((value, index) => (
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
      <div>
        Page :{" "}
        <input
          className="w-[40px] border-black border-2"
          type="number"
          min="1"
          onChange={(e) => handleIndex(e)}
          value={currentPage}
        />
        /{pages.toFixed()}
      </div>
    </div>
  );
}
