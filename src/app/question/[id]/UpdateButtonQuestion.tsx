"use client";
import { Button } from "@mui/material";
import React from "react";

export default function UpdateButtonQuestion({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) {
  return (
    <div>
      <Button
        variant="contained"
        style={{ backgroundColor: "orange" }}
        onClick={() => {
          window.location.href = `./${questionId}/update/${userId}`;
        }}
      >
        Update
      </Button>
    </div>
  );
}
