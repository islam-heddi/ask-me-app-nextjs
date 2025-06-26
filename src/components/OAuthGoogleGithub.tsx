import React from "react";
import { Button } from "@mui/material";
import { GoogleIcon, GithubIcon } from "./CustomIcons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OAuthGoogleGithub() {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

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
