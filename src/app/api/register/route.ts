import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { validation } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Starting a request");
  const reqData = await req.json();
  const check = validation.validate(reqData);
  if (check.error)
    return NextResponse.json({ error: check.error.details }, { status: 400 });
  const isExisting = await prisma.user.findMany({
    where: {
      email: reqData?.email,
    },
  });
  if (isExisting.length > 0)
    return NextResponse.json("ERROR email already exists", { status: 400 });
  const pwd = await bcrypt.hash(reqData?.password, 10);
  const resData = await prisma.user.create({
    data: {
      name: reqData?.name as string,
      email: reqData?.email as string,
      password: pwd,
    },
  });

  return NextResponse.json(resData, { status: 200 });
}
