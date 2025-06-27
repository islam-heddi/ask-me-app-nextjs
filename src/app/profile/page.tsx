"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddQuestion from "@/components/AddQuestion";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <div className="bg-white m-4 p-8 rounded-4xl">
        <h1 className="text-4xl">Welcome {session?.user?.name}</h1>
        <p>Email : {session?.user?.email}</p>
      </div>
      <AddQuestion userId={session?.user?.id as string} />
    </>
  );
}
