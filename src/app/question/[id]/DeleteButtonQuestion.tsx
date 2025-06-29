"use client";
import React from "react";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { DeleteQuestion } from "@/app/actions/questions";

export default function DeleteQuestionButton({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) {
  const { data: session } = useSession();
  const handleDelete = async () => {
    try {
      await DeleteQuestion(questionId);
      toast.success("deleted succesfully", {
        position: "bottom-center",
      });
    } catch (err: unknown) {
      toast.error(err as string, {
        position: "bottom-center",
      });
    }
  };
  return (
    <>
      {session?.user.id == userId ? (
        <Button variant="contained" onClick={() => handleDelete()}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
