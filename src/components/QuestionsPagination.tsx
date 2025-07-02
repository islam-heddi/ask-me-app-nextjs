"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QuestionSchema, ErrorSchema } from "@/types/types";

export default function Pagination({
  MyQuesions,
}: {
  MyQuesions: QuestionSchema[] | ErrorSchema;
}) {
  const itemsPerPage: number = 5;

  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [result, setResult] = useState<QuestionSchema[]>([]);
  useEffect(() => {
    if (MyQuesions as QuestionSchema[]) {
      setPages(
        Math.ceil((MyQuesions as QuestionSchema[]).length / itemsPerPage)
      );
      setResult(getPage(MyQuesions as QuestionSchema[], 1));
    }
  }, [MyQuesions]);

  const getPage = (data: QuestionSchema[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="flex flex-col">
      {result.length < 1
        ? "No Questions are available"
        : result.map((value, index) => (
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
            if (currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
              setResult(
                getPage(MyQuesions as QuestionSchema[], currentPage - 1)
              );
            }
          }}
        >
          Prev
        </span>{" "}
        {currentPage}/{pages}{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => {
            if (currentPage < pages) {
              setCurrentPage((prev) => prev + 1);
              setResult(
                getPage(MyQuesions as QuestionSchema[], currentPage + 1)
              );
            }
          }}
        >
          Next
        </span>
      </div>
    </div>
  );
}
