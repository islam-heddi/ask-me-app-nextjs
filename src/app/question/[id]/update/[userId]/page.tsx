import UpdateQuestionComponent from "@/components/UpdateQuestionComponent";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; userId: string }>;
}) {
  const id = (await params).id;
  const userId = (await params).userId;
  return (
    <div>
      <UpdateQuestionComponent userId={userId} questionId={id} />
    </div>
  );
}
