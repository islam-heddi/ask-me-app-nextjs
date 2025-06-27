"use server";
import { prisma } from "@/lib/prisma";
import { QuestionSchema } from "@/types/types";

export async function AddQuestion(data: QuestionSchema) {
  try {
    await prisma.question.create({
      data: {
        body: data.body,
        title: data.title,
        userId: data.userId,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}
