"use server";
import { prisma } from "@/lib/prisma";

export default async function AddAnswer({
  questionId,
  body,
  userId,
}: {
  questionId: string;
  body: string;
  userId: string;
}) {
  try {
    const result = await prisma.answer.create({
      data: {
        questionId: questionId,
        body: body,
        userId: userId,
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

export async function GetAnswers(questionId: string) {
  try {
    const result = await prisma.answer.findMany({
      where: {
        questionId,
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
