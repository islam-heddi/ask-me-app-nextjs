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
    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}

export async function UpdateAnswer(answerId: string, body: string) {
  try {
    const result = await prisma.answer.update({
      where: {
        id: answerId,
      },
      data: {
        body,
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

export async function DeleteAnswer(id: string) {
  try {
    await prisma.vote.deleteMany({
      where: {
        answerId: id,
      },
    });

    const result = await prisma.answer.delete({
      where: {
        id,
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
