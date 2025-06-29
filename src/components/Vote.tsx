"use client";
import AddVote, { GetVotes } from "@/app/actions/votes";
import { ErrorSchema, VoteSchema } from "@/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

interface VoteProps {
  answerId: string;
}

export default function Vote({ answerId }: VoteProps) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [votes, setVotes] = useState<{ upVote: number; deVote: number }>({
    upVote: 0,
    deVote: 0,
  });
  useEffect(() => {
    const BringVotes = async () => {
      const result = await GetVotes(answerId);
      const upVote = (result as VoteSchema[]).filter(
        (value) => value.value == 1
      );
      const deVote = (result as VoteSchema[]).filter(
        (value) => value.value == -1
      );
      setVotes({ upVote: upVote.length, deVote: deVote.length });
    };
    BringVotes();
  }, [answerId]);

  const handleVote = (value: 1 | -1) => {
    if (!session) {
      toast.error("You have to login", {
        position: "bottom-center",
      });
      return;
    }
    startTransition(async () => {
      const result = await AddVote({
        userId: session.user.id,
        answerId,
        value,
      });

      // Ensure result.value is 1 or -1 if it's a VoteSchema
      if (
        "value" in result &&
        typeof result.value === "number" &&
        (result.value === 1 || result.value === -1)
      ) {
        (result as { value: 1 | -1 }).value = result.value as 1 | -1;
      }

      if ((result as ErrorSchema).error) {
        toast.error((result as ErrorSchema).message, {
          position: "bottom-center",
        });
      } else {
        toast.success("Vote Added", {
          position: "bottom-center",
        });
      }
    });
  };

  return (
    <>
      {isPending ? (
        <div className="flex flex-row justify-center items-center p-1 bg-white m-4 rounded-2xl shadow-2xl">
          Wait
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center p-1 bg-white m-4 rounded-2xl shadow-2xl">
          <div
            onClick={() => handleVote(1)}
            className="rounded-2xl inline-block p-3 text-center cursor-pointer text-2xl hover:bg-gray-500 transition-colors"
          >
            &uarr;
          </div>
          {votes.upVote}
          <div
            onClick={() => handleVote(-1)}
            className="rounded-2xl inline-block p-3 text-center cursor-pointer text-2xl hover:bg-gray-500 transition-colors"
          >
            &darr;
          </div>
          {votes.deVote}
        </div>
      )}
    </>
  );
}
