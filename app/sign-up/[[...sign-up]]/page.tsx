import React from "react";
import { SignUp } from "@clerk/nextjs";
type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="w-screen flex justify-center mt-8">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
