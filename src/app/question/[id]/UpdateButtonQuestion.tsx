"use client";
import { Button } from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";

export default function UpdateButtonQuestion({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.id == userId ? (
        <Button
          variant="contained"
          style={{ backgroundColor: "orange" }}
          onClick={() => {
            window.location.href = `./${questionId}/update/${userId}`;
          }}
        >
          Update
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
