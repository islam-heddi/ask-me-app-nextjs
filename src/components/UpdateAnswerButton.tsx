"use client";
import { Button } from "@mui/material";
import React from "react";
import UpdateAnswerComponent from "./UpdateAnswerComponent";
import { useSession } from "next-auth/react";

export default function UpdateAnswerButton({
  answerId,
  userId,
}: {
  userId: string;
  answerId: string;
}) {
  const { data: session } = useSession();
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  return (
    <>
      {session?.user.id == userId ? (
        <div>
          <Button
            style={{
              backgroundColor: "orange",
            }}
            variant="contained"
            onClick={() => setIsUpdate(!isUpdate)}
          >
            Update
          </Button>
          <div
            className={`${
              isUpdate ? "block" : "hidden"
            } w-1/3 fixed z-10 top-2/6`}
          >
            <div
              onClick={() => setIsUpdate(false)}
              className="inline text-white bg-blue-500 cursor-pointer rounded-2xl p-6"
            >
              Quit
            </div>
            <UpdateAnswerComponent answerId={answerId} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
