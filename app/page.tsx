import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";

type Props = {};

const HomePage = (props: Props) => {
  return (
    // <div className="flex min-h-screen flex-col items-center p-24">
    <div>
      <Hero />
      <InfoBoxes />
    </div>
  );
};

export default HomePage;
