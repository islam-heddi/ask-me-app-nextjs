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
      setPages(pg);
    }
    setCurrentPage(1);
    setStartIndex(0);
    setEndIndex(10);
  }, [MyQuesions]);

  return (
    <div className="flex flex-col">
      {(MyQuesions as QuestionSchema[])
        .filter((_, index) => index >= startIndex && index <= endIndex)
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
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => {
            if (currentPage > 0) {
              setStartIndex((prev) => prev - 5);
              setEndIndex(startIndex - 1);
              setCurrentPage((prev) => prev - 1);
            }
          }}
        >
          Prev
        </span>{" "}
        Page :{currentPage}/{pages}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => {
            if (currentPage <= pages) {
              setStartIndex(endIndex + 1);
              setEndIndex((prev) => prev + 5);
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          Next
        </span>
      </div>
    </div>
  );
}
