"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  return (
    <header className="bg-white p-4 flex flex-row justify-between items-center">
      <h1 className="text-3xl cursor-pointer" onClick={() => router.push("/")}>
        Ask Me
      </h1>
      <menu className="flex flex-row flex-wrap gap-5">
        <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button variant="outlined" onClick={() => router.push("/register")}>
          Register
        </Button>
      </menu>
    </header>
  );
}
