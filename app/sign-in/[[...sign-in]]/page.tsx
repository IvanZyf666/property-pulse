"use client";
import React, { useState } from "react";
import { SignIn } from "@clerk/nextjs";
// import Spinner from "@components/Spinner";
type Props = {};

const SignUpPage = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="w-screen flex justify-center mt-20">
      {/* {loading && <Spinner loading={loading} />} */}
      <SignIn />
    </div>
  );
};

export default SignUpPage;
