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

export async function GetQuestions() {
  try {
    const result = await prisma.question.findMany();

    return result;
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}

export async function GetQuestionById(id: string) {
  try {
    const result = await prisma.question.findUnique({
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

export async function DeleteQuestion(id: string) {
  try {
    await prisma.answer.deleteMany({
      where: {
        questionId: id,
      },
    });
    await prisma.question.delete({
      where: {
        id,
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

export async function UpdateQuestion(
  questionId: string,
  body: string,
  title: string
) {
  try {
    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        body: body,
        title,
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
