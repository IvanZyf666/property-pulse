"use client";
import React from "react";
import PropertyAddForm from "@/components/PropertyAddForm";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

type Props = {};

const PropertyAddPage = (props: Props) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    return (
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <PropertyAddForm />
          </div>
        </div>
      </section>
    );
  }

  // not signed in, redirect to sign in page
  router.push("/sign-in");
  return null;
};

export default PropertyAddPage;
