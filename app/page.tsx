import React from "react";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl"> Welcome </h1>
      <Link href="/properties"> Show Properties </Link>
    </div>
  );
};

export default page;
