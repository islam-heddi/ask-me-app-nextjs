"use client";
import React, { useTransition } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { UpdateAnswer } from "@/app/actions/answers";

export default function UpdateAnswerComponent({
  answerId,
  body,
}: {
  answerId: string;
  body: string;
}) {
  const [isPending, startTransition] = useTransition();
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const handleAnswer = async () => {
    startTransition(async () => {
      try {
        const body = textRef.current?.value;
        if (!body) {
          toast.error("Error the body should be not empty", {
            position: "bottom-center",
          });
          return;
        }
        if (!session) {
          toast.error("You have to log in", {
            position: "bottom-center",
          });
          return;
        }
        await UpdateAnswer(answerId, body);
        toast.success("Updated succesfully", {
          position: "bottom-center",
        });
      } catch (err: unknown) {
        toast.error(err as string, {
          position: "bottom-center",
        });
      }
    });
  };

  return (
    <div className="p-6 bg-white m-4 rounded-2xl shadow-2xl">
      <h1 className="text-2xl">Update Answer</h1>
      <textarea
        defaultValue={body}
        className="w-full p-4 m-4 h-24 resize-none border-black border-1"
        placeholder="Write you question here"
        ref={textRef}
      ></textarea>
      <Button variant="contained" onClick={() => handleAnswer()}>
        {isPending ? "WAIT" : "Update"}
      </Button>
    </div>
  );
}
