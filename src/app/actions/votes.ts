"use server";
import { VoteSchema } from "@/types/types";
import { prisma } from "@/lib/prisma";

export default async function AddVote({ userId, answerId, value }: VoteSchema) {
  try {
    const checkVote = await prisma.vote.findMany({
      where: {
        userId,
        answerId,
      },
    });

    if (checkVote.length > 0) {
      const result = await prisma.vote.update({
        where: {
          id: checkVote[0].id,
        },
        data: {
          value,
        },
      });
      return result;
    }
    const result = await prisma.vote.create({
      data: {
        userId,
        answerId,
        value,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}

export async function GetVotes(answerId: string) {
  try {
    const result = await prisma.vote.findMany({
      where: {
        answerId,
      },
    });

    return result;
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}
