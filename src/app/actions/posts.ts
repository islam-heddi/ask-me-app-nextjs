"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserSchema } from "@/types/types";

export const register = async (data: UserSchema) => {
  try {
    const isExisting = await prisma.user.findMany({
      where: {
        email: data.email,
      },
    });
    if (isExisting.length > 0)
      return {
        error: "Email already exists",
      };
    const pwd = await bcrypt.hash(data.password, 10);
    const resData = await prisma.user.create({
      data: {
        name: data.name as string,
        email: data.email as string,
        password: pwd,
      },
    });
    return resData;
  } catch (error) {
    console.error(error);
    return {
      error: "internal server error",
    };
  }
};
