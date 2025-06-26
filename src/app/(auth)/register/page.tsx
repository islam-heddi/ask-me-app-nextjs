/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useTransition } from "react";
import { Button, TextField, Divider, Chip } from "@mui/material";
import Link from "next/link";
import OAuthGoogleGithub from "@/components/OAuthGoogleGithub";
import { toast } from "react-toastify";
import { register } from "@/app/actions/posts";

function registerPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async () => {
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await register({
        email,
        password,
        name,
      });

      if (result?.error)
        toast.error("Error" + JSON.stringify(result?.error), {
          position: "bottom-center",
        });
    });
  };

  return (
    <div className="grid place-items-center h-[100vh]">
      <div className="flex flex-col w-[100%] gap-3 p-6 items-center justify-center">
        <h1 className="text-3xl">Register</h1>
        <TextField
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Username"
          type="text"
        />
        <TextField
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
        />
        <TextField
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <div className="flex flex-row gap-3 flex-wrap">
          <Button
            disabled={isPending}
            className="m-3"
            onClick={() => handleSubmit()}
            variant="contained"
          >
            {isPending ? "Wait ...." : "Submit"}
          </Button>
          <Button
            className="m-3"
            onClick={() => {
              setEmail("");
              setPassword("");
              setName("");
            }}
            variant="contained"
            sx={{
              bgcolor: "red",
            }}
          >
            Reset
          </Button>
        </div>
        <p>
          IF you have an account, your can login{" "}
          <Link href="/login" className="text-blue-400">
            from here
          </Link>
          .
        </p>
        <Divider>
          <Chip label="OR" size="medium" />
        </Divider>
        <OAuthGoogleGithub />
      </div>
    </div>
  );
}

export default registerPage;
