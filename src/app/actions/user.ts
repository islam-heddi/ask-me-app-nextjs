"use server";
import { prisma } from "@/lib/prisma";

export default async function getUser(id: string) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      id: result?.id,
      email: result?.email,
      reputation: result?.reputation,
      name: result?.name,
    };
  } catch (err) {
    console.error(err);
    return {
      error: "internal server error",
      message: new Error(err as string).message,
    };
  }
}
