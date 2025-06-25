import React from "react";
import { Button } from "@mui/material";
import { GoogleIcon, GithubIcon } from "./CustomIcons";
import { signIn } from "next-auth/react";
export default function OAuthGoogleGithub() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outlined"
        onClick={() => signIn("google")}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
      <Button
        variant="outlined"
        onClick={() => signIn("github")}
        startIcon={<GithubIcon />}
      >
        Sign in with GitHub
      </Button>
    </div>
  );
}
