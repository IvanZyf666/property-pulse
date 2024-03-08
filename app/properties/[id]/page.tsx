"use client";
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

type Props = {};

const PropertyPage = (props: Props) => {
  const router = useRouter();
  // /properties/132
  const { id } = useParams();
  // /properties/132?name=iamtest
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        Go Home Id:{id} {name && `Name: ${name}`}
      </button>
    </div>
  );
};

export default PropertyPage;
