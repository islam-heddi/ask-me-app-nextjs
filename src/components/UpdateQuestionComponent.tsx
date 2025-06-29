"use client";
import React, { useEffect, useTransition } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { GetQuestionById, UpdateQuestion } from "@/app/actions/questions";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateQuestionComponent({
  userId,
  questionId,
}: {
  questionId: string;
  userId: string;
}) {
  const navigate = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const textRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  useEffect(() => {
    const get = async () => {
      const current = await GetQuestionById(questionId);
      if (current && !("error" in current)) {
        setTitle(current.title);
        setBody(current.body);
      } else {
        toast.error("Failed to fetch question data", {
          position: "bottom-center",
        });
      }
    };
    get();
  }, [questionId]);

  const handleUpdate = () => {
    if (title.length < 2) {
      toast.error("the title should be greater than 2", {
        position: "bottom-center",
      });
      return;
    }
    const body = textRef.current?.value;
    if (body == "") {
      toast.error("the body is empty", {
        position: "bottom-center",
      });
      return;
    }
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await UpdateQuestion(
        questionId,
        body as string,
        title
      );

      if (result?.error)
        toast.error("Error" + JSON.stringify(result?.error), {
          position: "bottom-center",
        });
      else
        toast.success("Question added", {
          position: "bottom-center",
        });
      navigate.back();
    });
  };

  if (userId != session?.user.id)
    return <div>You are not allowed to update this question</div>;
  return (
    <div className="bg-white m-4 p-8 rounded-4xl">
      <h1 className="text-4xl">Update a question</h1>
      <TextField
        error={title.length > 5 ? false : true}
        label="Title"
        variant="standard"
        type="text"
        className="w-full p-4 m-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        defaultValue={body}
        className="w-full p-4 m-4 h-24 resize-none border-black border-1"
        placeholder="Write you question here"
        ref={textRef}
      ></textarea>
      <Button
        variant="contained"
        style={{
          backgroundColor: "orange",
        }}
        onClick={() => handleUpdate()}
      >
        {isPending ? "Wait" : "Update"}
      </Button>
    </div>
  );
}
