"use client";
import React from "react";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { DeleteAnswer } from "@/app/actions/answers";

export default function DeleteAnswerButton({
  userId,
  answerId,
}: {
  userId: string;
  answerId: string;
}) {
  const { data: session } = useSession();
  const handleDelete = async () => {
    try {
      await DeleteAnswer(answerId);
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
        <Button
          variant="contained"
          style={{
            backgroundColor: "red",
          }}
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
