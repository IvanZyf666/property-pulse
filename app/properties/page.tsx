import React from "react";
import Link from "next/link";

type Props = {};

const PropertiesPage = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl"> Properties </h1>
      <Link href="/"> Go Home </Link>
    </div>
  );
};

export default PropertiesPage;
