import React, { useTransition } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { AddQuestion as addQuestionApi } from "@/app/actions/questions";
import { QuestionSchema } from "@/types/types";
import { toast } from "react-toastify";

export default function AddQuestion({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const textRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const handleAdd = () => {
    setError("");
    if (title.length < 2) {
      setError("the title should be greater than 2");
      return;
    }
    const body = textRef.current?.value;
    if (body == "") {
      setError("the body is empty");
      return;
    }
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await addQuestionApi({
        title,
        body,
        userId,
      } as QuestionSchema);

      if (result?.error)
        toast.error("Error" + JSON.stringify(result?.error), {
          position: "bottom-center",
        });
      else
        toast.success("Question added", {
          position: "bottom-center",
        });
    });
  };
  return (
    <div className="bg-white m-4 p-8 rounded-4xl">
      <h1 className="text-4xl">Start a new question</h1>
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
        className="w-full p-4 m-4 h-24 resize-none border-black border-1"
        placeholder="Write you question here"
        ref={textRef}
      ></textarea>
      <Button variant="contained" onClick={() => handleAdd()}>
        {isPending ? "Wait" : "Add"}
      </Button>
      <p className="text-red-500">{error}</p>
    </div>
  );
}
