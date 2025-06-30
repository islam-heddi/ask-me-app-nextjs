"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Menu() {
  const router = useRouter();
  const { data: session } = useSession();

  const profile = (
    <>
      <p className="cursor-pointer" onClick={() => router.push("/profile")}>
        {session?.user.name}
      </p>
      <Button
        variant="contained"
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        Sign Out
      </Button>
    </>
  );

  const logReg = (
    <>
      <Button variant="contained" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => router.push("/register")}>
        Register
      </Button>
    </>
  );

  return (
    <header className="bg-white p-4 flex flex-row justify-between items-center">
      <h1 className="text-3xl cursor-pointer" onClick={() => router.push("/")}>
        Ask Me
      </h1>
      <menu className="flex flex-row flex-wrap gap-5 items-center">
        {!session ? logReg : profile}
      </menu>
    </header>
  );
}
