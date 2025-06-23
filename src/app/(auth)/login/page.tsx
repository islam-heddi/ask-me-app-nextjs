/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function loginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="grid place-items-center h-[100vh]">
      <div className="flex flex-col w-[70%] gap-3 p-6 items-center justify-center">
        <h1 className="text-3xl">Login</h1>
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
            className="m-3"
            onClick={() => alert(`Hello ${name}`)}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            className="m-3"
            onClick={() => {
              setEmail("");
              setPassword("");
            }}
            variant="contained"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
