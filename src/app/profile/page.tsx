import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Access denied</div>;
  return <div>page profile {session?.user?.name}</div>;
}
