"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {};

function SignInButton({}: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign in
    </Button>
  );
}

export default SignInButton;
