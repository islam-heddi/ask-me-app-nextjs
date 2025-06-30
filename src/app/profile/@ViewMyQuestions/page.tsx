"use client";
import React from "react";
import { useSession } from "next-auth/react";
import View from "./View";

export default function ViewMyQuestions() {
  const { data: session } = useSession();

  return <View userId={session?.user.id as string} />;
}
