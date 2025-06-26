"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return <div>page profile {session?.user?.name}</div>;
}
